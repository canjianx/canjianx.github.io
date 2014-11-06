---
layout: post
title:  "在node.js构建一个模板语言，第三部分：实现第一个目标标签"
date:   2014-11-06 13:31:59
categories: node.js template 翻译
excerpt: "node.js工程学，以及制作一个简单易懂，功能强大的template语言。"
---

现在我们建立了开发环境和工作流，终于可以开始写产品代码了。我们将从`count`标签开始，它从一个集合中数元素的数量（例如一个数组或者对象）

## `count`的规格说明书

开始之前，让我尽可能详细的定义一下`count`的功能。

`count`将要做：

1, 用一个游标来替换它自己
2, 接受一个`collection`集合属性
  ** 在`count`标签里，名称为`collection`的一个标签。
  ** 可以通过标点`.`来嵌套访问`collection`
3, 如果`collection`是`undefined`就输出错误的文本。
4, 当没有集合对象定义触发一个错误
5, 如果`collection`找不到就输出一个错误的文本。
6, 如果找不到集合对象，就触发一个错误
7, `collection`不是一个`Object`或者`Array`输出错误文本
8, 如果集合对象不是`Object`或者`Array`，触发一个错误
9, 输出`length`属性，如果`collection`是个`数组`
10, 输出`Object.keys(collection)`的`length`属性，如果`collection`是个`Object`

通过这份规格书，我们不仅清晰的定义了一个开发目标，而且定义了我们所需要的大部分的测试。多么便捷啊！

## 这条路上的一个关键点

现在到了开发这个项目的一个关键点：我们要决定怎么样解析我们的模板文件。这里需要考虑很多种因素，我们最关心的两个是速度和实现复杂度。因为我们现在处理的是HTML，所以我们想使用已经存在的，基于节点的HTML解析器。如果能找到一个HTML解析器能让我们很方便的查询到我们的模板字串那就更好了。

## 进入 `Cheerio`

太感谢了，`Cheerio`刚刚好是一个容易使用，基于节点的HTML解析器，而且还提供了类似jQuery一样的接口去访问html字串。完美！我对`Cheerio`有两个关注点是：

1, 速度， 我不知道它处理一个大点的模板文件需要花多久。
2, 内存使用，如果我们需要处理大的模板文件，或者生成大量的html，很有可能内存使用会使一个问题。

我对我们能解决这些问题有信心。所以，让我们先不要过早的去考虑优化的问题。如果你因为我正在做一个可怕的设计已经抓狂了，那么让我知道。

## 我们的第一个测试

前面小结说过，写产品代码之前先写测试，没啥好说的，开始。

首先，我们为`count`创建一个新的git分支

>git checkout -b count

接下来，让我们在`./tests/`目录中创建一个名字为`02-count.js`的文件。在这个文件中我们为第一个测试将会加上必要的模块和描述。

```js
var sumo = require('../');
var assert = require('assert');

describe('<count />', function () {
  it('should output error text if `collection` is not supplied.', function () {
    // Write test here
  });
});
```

好极了，我们想让我们的错误信息是怎么样的呢，类似一条注释的html如何？ 像这样：

```html
<!-- Sumo Count Error: No collection provided -->
```

在我看来挺好的。 让我继续填充我们的测试

```js
it('should output error text if `collection` is not supplied', function () {
  var actual = sumo.compile(
    '<count />', 
    { test: [1, 2, 3, 4] }
  );

  var expected = '<!-- Sumo Count Error: No collection provided -->';

  assert.equal(
    actual, 
    expected, 
    'Error text should be output if no collection is provided'
  );
});
```

运行一下，看看Mocha的输出是什么：

>  <count />
>    1) should output error text if `collection` is not supplied.
>
>
>  6 passing (3ms)
>  1 failing
>
>  1) <count /> should output error text if `collection` is not supplied:
>
>      AssertionError: Error text should be output if no collection is supplied
>      + expected - actual
>
>      +<!-- Sumo Count Error: No collection provided -->
>      -<count />

好极了，我们的测试失败了，显示了我们想要的错误信息。现在我们需要把他们对上号。

## 通过测试

现在我们有了一个测试，让我们移向`index.js`来实现能让我们测试通过的代码。我将会引入cheerio模块，这次我们要把它保存成产品依赖所以使用`--save`而不是`--save-dev`。

第一个事就是扩充`sumo.compile`。给我们的`process`函数增加一些样板。

```js
var cheerio = require('cheerio');

var sumo = {
  /**
   * `elements` is a list of all of the template tags 
   * we will be searching for and processing. 
   */
  elements: [
    'count'
  ],

  /**
   * `process` will house all of the functions that will 
   * process the template tags above.
   */
  process: {}
};

/**
 * Let's cache a reference to `sumo.process`.
 */
var process = sumo.process;

sumo.compile = function (templateStr) {

  /**
   * First, we'll want to create an array of all tags in 
   * `templateStr` that need to processed.
   */
  var toProcess = this.elements.filter(function (element) {

    /**
     * To do this, we'll filter out all elements that
     * don't occur in the template string.
     */
    var filter = new RegExp('<' + element + '.*?>');

    return filter.test(templateStr);
  });

  /**
   * If `toProcess` isn't empty, then we know we have 
   * template tags to process.
   */
  if (toProcess.length) {

    /**
     * Let's load `templateStr` into `cheerio` and bind 
     * the result to `$`, so we can use a familiar 
     * jQuery like syntax.
     *
     * We need to set xmlMode to true to better handle 
     * self closing tags like `<count />`
     */
    var $ = cheerio.load(templateStr, { 
      xmlMode: true 
    });

    /**
     * Now we can process each tag in the template
     * string.
     */
    toProcess.forEach(function (element) {

      /**
       * `element` is the name of the tag we are looking 
       * to process. If there is a function with the same 
       * name in the `process` object, then we'll execute 
       * it and pass in our HTML via the Cheerio object.
       */
      if (typeof process[element] === 'function') {
        process[element]($);
      }
    });

    /**
     * Finally, we will return the contents of `$` as a
     * string.
     */
    return $.html();
  }

  /**
   * If there are no tags to process, just return
   * the template string unchanged.
   */
  return templateStr;
};

module.exports = sumo;
```

接下来，让我们来实现这个`process.count`。

```js
process.count = function ($) {

  /**
   * First, we'll iterate through each of the `count` 
   * elements in our parsed template string
   */
  $('count').each(function () {

    /**
     * Then cache a reference to the current `count` 
     * element.
     */
    var $el = $(this);

    /**
     * Now we can look for the `collection` attribute.
     */
    var collection = $el.attr('collection');

    /**
     * If there is no `collection` attribute supplied, 
     * then we'll output error text.
     */
    if (collection === undefined) {
      $el.replaceWith(
        '<!-- Sumo Count Error: No collection supplied -->'
      );
    }
  });
};
```

在理论上，我们的测试英爱可以通过了。让我们运行`gulp test`试试看。

>  <count />
>    ✓ should output error text if `collection` is not supplied 
>
>
>  7 passing (8ms)

成功。

## 触发错误事件

我们的下一个任务是除了写上面的错误字串之外，触发一个错误的事件，我们还要却表正确的错误信息传递给事件。

```js
it('should emit an error event if `collection` is not supplied', function () {
  var eventFired = false;

  /**
   * We'll use `once` instead of `on` to create a
   * single use event handler.
   */
  sumo.once('error', function (err) {
    var actual = err;
    var expected = 'Count: No collection supplied';

    /**
     * Let's make sure the error message is correct
     */
    assert.equal(
      actual, 
      expected, 
      'Error message should be: No collection supplied'
    );
    eventFired = true;
  });

  sumo.compile('<count />');

  /**
   * We also need to make sure the event actually fired
   */
  assert(eventFired, 'Error event should be emitted');
});
```

运行测试应该可以看到一个错误：

>  <count />
>    ✓ should output error text if `collection` is not supplied 
>    1) should emit an error event if `collection` is not supplied.
>
>
>  7 passing (8ms)
>  1 failing

## 实现一个事件系统

为了使这个测试通过，我们需要实现一个事件系统。幸亏Node有`events`模块包含了我们需要的所有功能。

```js
var cheerio = require('cheerio');

/**
 * We'll use the `EventEmitter` to handle all of our 
 * event related needs.
 */
var EventEmitter = require('events').EventEmitter;

/**
 * Since we don't need a constructor function, let's just 
 * make `sumo` an event emitter. This will allow us bind
 * events like so: 
 * 
 * sumo.on('error', function () {})
 */
var sumo = new EventEmitter();

/**
 * Let's cache a reference to `sumo.process` and 
 * `sumo.elements`
 */
var process = sumo.process = {};
var elements = sumo.elements = [
  'count'
];
```

现在我们可以修改一下`processs.count()`来触发一个错误事件

```js
process.count = function ($) {
  $('count').each(function () {
    var $el = $(this);
    var collectionName = $el.attr('collection');
    if (collectionName === undefined) {

      /**
       * Emit `error` event and supply a message.
       */
      sumo.emit('error', 'Count: No collection supplied');

      $el.replaceWith(
        '<!-- Sumo Count Error: No collection supplied -->'
      );
    }
  });
};
```

现在所有的测试应该都通过 是么？

>  <count />
>  [gulp] 'test' errored after 76 ms Count: No collection supplied
>    1) should output error text if `collection` is not supplied
>    ✓ should emit an error event if `collection` is not supplied. 
>
>
>  7 passing (37ms)
>  1 failing
>
>  1) <count /> should output error text if `collection` is not supplied:
>     Count: No collection supplied

哦，那里出错了，我们的测试没通过！不要担心，我们需要在测试代码中加点东西。因为我们正在触发一个错误的事件，我们应该确保它到达Mocha之前截获它，不然我们的测试将会失败。 让我增加一个截获所有事件的处理。

```js
describe('<count />', function () {
  /**
   * Catch all error handler
   */
  sumo.on('error', function () {});

  /**
   * ... Tests here ...
   */
});
```

让我们看看是不是工作。

>  <count />
>    ✓ should output error text if `collection` is not supplied 
>    ✓ should emit an error event if `collection` is not supplied. 
>    ✓ should supply correct error message to error event if `collection` not supplied. 
>
>
>  8 passing (10ms)

欧了。

让我们提交一下修改然后继续。

>git add .
>git commit -m "Adds tests for and implements `no collection supplied` error"

注意：为了减短篇幅我缩减了大部分的git commit。一般情况下，你应该在每次测试通过的时候提交。

现在我们完成了第一个错误的构建，我们以后可以复用很多这里的代码。正因为此，我不准备把所有的都放到这篇文章中。但是你可以看[所有的测试]()和[所有的实现]()

## `Counting`

现在我们处理了所有错误的情况，现在让我们真正的来数一些集合吧。

```js
var testString = '<count collection="test" />';
it('should output the correct count of Array', function () {
  var collection = [1, 2, 3, 4];
  assert.equal(
    sumo.compile(testString, { test: collection }),
    '4',
    'Count of array is incorrect'
  );
});

it('should output the correct count of Object', function () {
  var collection = {
    1: 1,
    2: 2,
    3: 3,
    4: 4
  };
  assert.equal(
    sumo.compile(testString, { test: collection }),
    '4',
    'Count of object is incorrect'
  );
});
```

为了使这些测试通过，我们先要提供一些模板数据到`process.compile`函数里面。

```js
/**
 * Pass in the `data` parameter
 */
sumo.compile = function (templateStr, data) {
  var toProcess = elements.filter(function (element) {
    var filter = new RegExp('<' + element + '.*?>');
    return filter.test(templateStr);
  });

  if (toProcess.length) {
    var $ = cheerio.load(templateStr, { xmlMode: true });

    toProcess.forEach(function (element) {

      /**
       * Pass in the `data` parameter
       */
      if (typeof process[element] === 'function') {
        process[element]($, data);
      }

    });

    return $.html();
  }

  return templateStr;
};
```

现在我们有了一些可以数的东西，回到我们的`count`函数，让我们先让测试通过。

```js
process.count = function ($, data) {
  $('count').each(function () {
    var $el = $(this);
    var collectionName = $el.attr('collection');
    var collection = data[collectionName];

    /**
     * ...abbreviated...
     */

    /**
     * Get the length of the passed in array. We need to 
     * make sure `count` is a string, or else we'll run into
     * issues with Cheerio
     */
    var count = collection.length.toString();

    $el.replaceWith(count);
  });
};
```

这应该能满足第一个测试，看它通过测试之后我们开始第二个。

```js
process.count = function ($, data) {
  $('count').each(function () {
    var $el = $(this);
    var collectionName = $el.attr('collection');
    var collection = data[collectionName];

    /**
     * ...abbreviated...
     */

    /**
     * If the collection is an array
     */
    var count = Array.isArray(collection) ?

      /**
       * Get its length
       */
      collection.length.toString() :

      /**
       * Else, create an array of the object's
       * keys and get the length of that.
       */
      Object.keys(collection).length.toString();

    $el.replaceWith(count);
  });
};
```

如果我们运行测试，我们可以看到我们的count标签可以正确的数集合了。

## 最终测试

我们已经接近目标了。现在我们可以正确数对象和数组了。现在让我们来写一个测试来处理`collection`标签中的点嵌套。

```js
it('should support dot notation in collection identifier', function () {
  var testString = '<count collection="test.arr" />';
  var collection = {
    arr: [1, 2, 3]
  };

  assert.equal(
    sumo.compile( testString, { test: collection } ),
    '3',
    'Incorrect count with dot notation'
  );
});
```

让我们使这个通过：

```js
process.count = function ($, data) {
  $('count').each(function () {
    var $el = $(this);
    var collectionName = $el.attr('collection');
    var collection = data[collectionName];

    /**
     * ...abbreviated...
     */

    /**
     * If the collection name contains `.`, then split the 
     * name into an array.
     */
    if (/\./.test(collectionName)) {
      collection = collectionName.split('.')
        /**
         * We'll use the `Array#reduce` method to crawl 
         * down the correct branch of the object tree. The 
         * first time `reduce` fires, `prev` will reference 
         * `data`. After that, `prev` will be a reference 
         * to the next branch of the `data` object.
         */
        .reduce(function (prev, curr) {
          /**
           * If we encounter `undefined` anywhere in the 
           * process, then we will just return `undefined`. 
           * This will allow us to emit a 
           * 'collection not found' error below.
           */
          if (prev === undefined || prev[curr] === undefined) {
            return undefined;
          }
          /**
           * Else, we'll traverse the rest of the object. 
           * What we return here will become `prev` in the 
           * next iteration of `reduce`. If there are no 
           * iterations left, this is what will be returned 
           * to `collection`.
           */
          return prev[curr];
        }, data);
    }

    /**
     * ...abbreviated...
     */
  });
};
```

哇哦！现在我们有了`<count/>`标签功能了。当我们完成其他的tag后我们可以回头看看咱们写的测试代码和实现代码。我们实现了规格书里面的所有的东西。

## 集成我们的改动

这一小节还有最后一个任务，就是集成我们的代码到主分支。让我们确保所有的测试都提交了。然后让我们把我们的`count`分支合并到远程主分支吧

>git push origin count

现在让我们登陆到Github上然后提交一个pull reuqest 到我们的development分支，如果你还没有一个开发分支，你可以通过github提供的接口创建一个。

在页面右边点击一下pull request按钮。然后点`New pull request`。 在这个页面上你可以选development作为你的代码基，把count作为他的一个分支。然后点击`Create pull request`。因为我们只有一个开发者，所以我们可以继续合并我们的修改。

如果我们登陆到Travis CI，我们可以看到我们的测试运行，我们可以等Travis给我们的通知邮件。我们用同样的方法合并开发到主分支。

对于这个特殊的系统而言，这个系统看上去有点冗余以及不必要，但是这是实践的一个好习惯。在一个大型的团队中使用这个就显得很重要了。

## 总结

这就是这篇所有的内容，如果有问题，随时联系我，反馈或者关注！在下一小节，我们将回过头来重构一些代码，我们需要找到一个方法使我们的功能更模块化，更好的扩展性，以及更好的可持续性。