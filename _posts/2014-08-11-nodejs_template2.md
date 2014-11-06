---
layout: post
title:  "在node.js构建一个模板语言，第二部分：启动"
date:   2014-08-11 13:31:59
categories: node.js template 翻译
excerpt: "node.js工程学，以及制作一个简单易懂，功能强大的template语言。"
---

现在我们有了要做什么的清晰的想法，让我们来启动这些事情吧。贯穿这个系列，我准备尝试尽可能的把我做的每一件事都记录下来。我将会跳过一些主题，但是我会给出一些链接，我这里也鼓励你跳过你已经熟悉的部分

目录

1, [建立一个git仓库][git repo]
2, [建一个package.json文件][creating a package.json file]
3, [启动Gulp]
4, [启动Mocha]
5, [写第一个测试]
6, [持续集成还有Github Flow]
7, [启动Travis CI]
8, [结论]

[git repo]: "git repo"

## 首先是Git

在建立我们的代码仓库之前，我们需要给我们的模板语言起个名字，经过长时间的争论和审核，我决定给名字"Sumo"。我保证你不想知道其他的可选名字。

在这里我不讲如何在github上建一个仓库，如果你不熟悉这个过程，Github上有个[文档][https://help.github.com/articles/creating-a-new-repository]可以看看

现在我们已经在github上建立了仓库，现在让我们打开命令行终端把仓库克隆到本机吧

> git clone https://github.com/mgmeyers/sumo.git

## 建立 package.json

现在让我们来建立我们的package.json.  这个文件是我们项目的清单。它管理者我们项目例如名称，作者，版本等信息。它也可以让我们来管理依赖。

打开Sumo的目录 然后运行：

> npm init

这个便利的命令提示你提供工程的信息，然后给你生成一个package.json

这里是我输入的信息，圆括号中的是默认值，npm init 会尝试一些智能引导。

> name: (sumo) 
> version: (0.0.0) 
> description: An HTML-ish JavaScript templating system
> entry point: (index.js) 
> test command: gulp test
> git repository: (https://github.com/mgmeyers/sumo.git) 
> keywords: templating
> author: Matthew Meyers <hello@matthewmeye.rs>
> license: (ISC) MIT

它将创建一个package.json包含：

```javascript
{
  "name": "sumo",
  "version": "0.0.0",
  "description": "An HTML-ish JavaScript templating system",
  "main": "index.js",
  "scripts": {
    "test": "gulp test"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/mgmeyers/sumo.git"
  },
  "keywords": [
    "templating"
  ],
  "author": "Matthew Meyers <hello@matthewmeye.rs>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/mgmeyers/sumo/issues"
  },
  "homepage": "https://github.com/mgmeyers/sumo"
}
```

你会注意到我们已经在gulp test中设置了我们的test命令。我们还没有安装gulp，所以我们将会建立一个运行我们Mocha test的一个任务。如果我们愿意，可以通过npm test来运行我们的命令，但是更重要的是我们要在每次把更新推送到github的时候来通过Travis CI来运行这个命令。

我们可以回过头来修改这个文件，现在让我们提交一下我们的修改

> git add .
> git commit -m "Adds package.json"

## 安装 Gulp

如果你不熟悉，gulp是一个自动化大量开发任务的工具，例如：

- 运行测试
- 检查程序语法错误
- 编译SASS/LESS
- 压缩CSS/JS
- 连接文件

你可以在[这里](http://gulpjs.com/plugins/)找到完整的gulp插件列表。

安装gulp需要两步，首先，我们需要确保gulp安装在全局环境中，使用带`-g`参数的`npm install`。这样我们就可以使用命令行来运行gulp任务了。例如gulp test。

>npm install -g gulp

接下来，我们将安装gulp而且把它保存成我们项目的依赖。这样可以让我们写我们的gulp任务像一个模块一样。

>npm install gulp --save-dev

如果这时候查看package.json，那它应该是这样的：

```javascript
{
  "name": "sumo",
  "version": "0.0.0",
  // ...
  "devDependencies": {
    "gulp": "^3.8.7"
  }
}
```

如果你删除了node_modules目录，并且把这个仓库克隆到不同的机器，你可以使用下面的命令来安装你的依赖。

> npm install

注意：这里还有一个保存模块作为产品环境的依赖的选项是`--save`，不同在于使用的那个package文件。如果你的程序信赖的是NPM模块，这个模块就是产品依赖，如果他只是为了构建，测试，和其他的开发任务。这就是开发依赖，执行`npm install --production`只会安装产品依赖。

在我们提交任何改动之前，让我们确认一下node_modules目录包含在git ignores文件中，这样我们可以不把这些依赖放入我们的仓库。如果你没有.gitignore文件，在仓库的根目录创建一个。它的内容应该包含：

> # Ignore the `node_modules` folder
> node_moduels

让我们提交我们的改动

> git add .
> git commit -m "Adds gulp as a dependency"

## 我们的第一个Gulp任务

现在我们有了gulp, 让我们来创建我们的第一个gulp任务：语法检查（linting）. 代码语法检查的目的是分析代码然后当有潜在的语法错误和不好的代码风格的时候提醒我们。我们将使用[JSHint](http://www.jshint.com/)来保证我们的代码没有基本的语法错误。

首先，我们得安装gulp-jshint 插件和jshint-stylish使用命令：

> npm install gulp-jshint jshint-stylish --save-dev.

注意 jshint-stylish的目的是让我们的jshint在终端更好看。

## 安装gulpfile.js

接下来让我们在根目录创建一个名字为"gulpfile.js"的文件。这个文件是gulp来查询任务定义的。如果你在终端运行gulp lint, gulp 将会在这个文件中查找lint任务。

## gulpfile.js

到[这个仓库](https://github.com/mgmeyers/sumo/blob/master/gulpfile.js)看完整的gulpfile。

首先，让我们引入我们需要的模块和安装我们的任务架构。

```javascript
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('lint', function () {
  // Perform some linting here
});
```

我们将要确保我们检查所有的文件，包括我们的gulpfile！想做到这一点，首先我们要告诉gulp哪些文件需要处理。

```javascript
gulp.task('lint', function () {
  /**
   * We want to lint all of the JavaScript files in
   * the current directory as well as the `tests`
   * directory
   *
   * `gulp.src()` returns a stream. By returning 
   * `gulp.src()`, we indicate that this task should
   * be run asynchronously
   */
  return gulp.src(['./*.js', './tests/*.js']);
});
```

现在我们决定了哪些文件需要检测，让我们来指定gulp真正要做的事情。

```javascript
gulp.task('lint', function () {
  return gulp.src(['./*.js', './tests/*.js'])
    /**
     * First, we pipe our files through `jshint`
     */
    .pipe(jshint())
    /**
     * Then we'll use the default reporter. This
     * is what actually outputs any errors to the
     * console.
     */
    .pipe(jshint.reporter(stylish))
    /**
     * Finally, we want jshint to terminate the
     * gulp task when it finds an error.
     */
    .pipe(jshint.reporter('fail'));
});
```

现在我们在终端运行gulp lint，它将会在我们所有的javascript文件上运行jshint，其中包含gulpfile.js

现在 gulp lint的输出应该是想这样：

>[gulp] Using gulpfile /home/matt/Documents/Projects/sumo/gulpfile.js
>[gulp] Starting 'lint'...
>[gulp] Finished 'lint' after 30 ms

为了演示，我们删除了gulpfile.js中最后的一个分号， 然后运行gulp lint 我们可能得到的信息是这样的：

>[gulp] Using gulpfile /home/matt/Documents/Projects/sumo/gulpfile.js
>[gulp] Starting 'lint'...
>
>/home/matt/Documents/Projects/sumo/gulpfile.js
>  line 20  col 3  Missing semicolon.
>
>✖ 1 problem
>
>[gulp] 'lint' errored after 71 ms JSHint failed for: /home/matt/Documents/Projects/sumo/gulpfile.js
>
>/home/matt/Documents/Projects/sumo/node_modules/gulp/node_modules/orchestrator/index.js:153
>      throw err;
>            ^
>Error: JSHint failed for: /home/matt/Documents/Projects/sumo/gulpfile.js

让我们增加分号，并提交修改

>git add .
>git commit -m "Adds gulpfile.js and js linting"

## 安装Mocha

让我们使用gulp来运行我们的测试，到现在我们应该已经熟悉了通过npm安装包了，所以继续来安装gulp-mocha包然后保存成开发依赖。

接下来，在gulpfile顶部，让我们引入gulp-macha。

```javascript
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha = require('gulp-mocha');
```

现在我们可以创建新的任务。 让我们叫它"task"。我们也系统测试之前我们的的code没有语法错误，所以我们希望运行test之前运行lint.

```javascript
/**
 * Let's create a task called `test`. We've
 * designated `lint` as a dependency for
 * this task, so `test` will only run after
 * `lint` has completed.
 */
gulp.task('test', ['lint'], function () {

  return gulp.src('./tests/*.js', { read: false })
    /**
     * Let's pipe all of the JavaScript files
     * in our test folder through mocha. Mocha
     * also has various reporters available.
     * I prefer `spec`, but feel free to choose
     * the one you like best.
     */
    .pipe(
      mocha({
        reporter: 'spec'
      })
    );
});
```

更详细的信息请看[mocha document](http://visionmedia.github.io/mocha/#reporters)。

## 写一些基础测试

好，现在我们已经安装好mocha了，我们可以写一些基础的测试了，我们的第一个测试将会是简单的IO测试。 让我们写3个测试：

1, 一个String应该不被修改
2, 标准的html应该不被修改
3, 畸形的输入应该不被修改

虽然这些很简单，但是它们提供了很好的测试基线。如果它们任何一个失败，说明在代码中有了严重的错误，而且我们应该尽可能快的捕捉到所有的严重的错误。

让我们在工程根目录创建一个tests目录，在这个目录下创建一个文件 01-simple-io.js。这样取名字完全是让我更容易找到。可以随便起名字的，但是改好后不要再动。

在01-simple-io.js中，让我们从建立我们的依赖开始

```js
/**
 * If we don't specify a file name, require will use 
 * `index.js`, which is our main file (or will be 
 * when we create it).
 */
var sumo = require('../');
/**
 * We'll use the assertion library built into node.
 */
var assert = require('assert');
```

## 断言的一个注意

如果你不熟悉，那么这句是给你准备的，断言库的目的是当某些条件属实了就抛出一个异常。例如：

```js
var a = 2;
var b = 1;

/**
 * assert.equal(actualValue, expectedValue, [message])
 * 
 * This assertion will pass, so nothing will happen.
 * The message will be passed along only if the assertion
 * fails.
 */
assert.equal(a - 1, b, 'a - 1 does not equal b');

/**
 * This assertion will NOT pass, so an error will
 * be thrown. The error text will be: 'a - 1 does equal b'
 */
assert.notEqual(a - 1, b, 'a - 1 does equal b');

/**
 * You can also simply pass in an expression
 * that evaluates to a boolean value
 * 
 * assert(value, message)
 */
assert(a > b, 'a is not greater than b');
```

大部分的测试框架使用这些错误来确定测试是通过还是失败。支持node的断言库有很多。有一些简单有一些复杂。内建的断言库我更倾向于小一点。但这只是个人的倾向而已。关于Node的断言库和有效的方法的更多的信息可以看看[node.js的文档](http://nodejs.org/api/assert.html)。[Chai](http://chaijs.com/)也是值得一看的。这也是node社区最受欢迎的断言库之一。

注意，我们知道一些基本的断言，让我们开始写一些测试吧。

## 写测试

首先，我们需要`describe`我们的测试套件。这样可以让相关的测试放到一起。

```js
// `describe` is a function defined by mocha
describe('Simple IO', function () {
  // Tests go here...
});
```

注意： 如果你将来想组织你的测试，你可以使用多`describe`函数嵌套。

接下来，我们要`describe`我们的第一个测试了。

```js
describe('Simple IO', function () {
  /**
   * the function `it` takes in a string describing 
   * the test or tests being performed and a function
   * that should throw an exeption if the test(s)
   * have failed
   */
  it(
    'should return an unmodified string when a plain string is passed in', 
    function () {
      var string = 'Hello!';

      assert.equal(
        /**
         * We haven't implemented `sumo.compile()` yet,
         * but this is how I imagine it will be used.
         * We can always come back and update our tests
         * if we need to.
         */
        sumo.compile(string, { name: 'Bob' }), 
        /**
         * The output of `sumo.compile(string)` should
         * be the same as `string`, since `string`
         * doesn't contain any templating logic.
         */
        string, 
        /**
         * This message will let us know exactly
         * which test failed, and will only be
         * displayed when the test fails.
         */
        'Plain string does not match output string'
      );
    }
  );
});
```

如果传入`sumo.complile()`的普通的字符串出来的时候有任何形式的改变，这个测试就失败，注意我们还没有开始写任何的功能代码。这是测试驱动开发的重要的一个步骤。我们先写测试，然后看着他们失败，然后我们写可以使他们通过的产品代码，运行测试之前，我们应该创建一些基础的测试中使用的对象和函数。

我们将会在工程目录下创建一个名字叫`index.js`的文件。在它里面，我们将会定义`sumo`然后定义一个`compile()`方法。

```js
var sumo = {
  // Nothing here yet...
};

sumo.compile = function () {
  // Nothing here yet...
};

/**
 * `module.exports` will be returned by `require('sumo')`
 */
module.exports = sumo;
```

现在可以使用`gulp test`来运行测试了。 它的输出是：

>[gulp] Using gulpfile /home/matt/Documents/Projects/sumo/gulpfile.js
>[gulp] Starting 'lint'...
>[gulp] Finished 'lint' after 41 ms
>[gulp] Starting 'test'...
>
>
>  Simple IO
>    1) should return unmodified string when plain string is passed in
>
>
>  0 passing (3ms)
>  1 failing
>
>  1) Simple IO should return unmodified string when plain string is passed in:
>     AssertionError: Plain string does not match output string
>     [...Stack trace removed...]
>
>
>
>[gulp] 'test' errored after 13 ms 1 test failed.

这是一种成功。我们的测试正确的失败了。现在我们需要增加一些产品逻辑是它通过。

回到`index.js`，让我们具体化`sumo.compile()`

```js
sumo.compile = function (templateStr) {
  return templateStr;
};
```

哈，就这？

像我之前说的。我们只想写足够通过测试的代码。如果我们现在运行测试，我们将会看到我们的测试确实通过了。

>[gulp] Using gulpfile /home/matt/Documents/Projects/sumo/gulpfile.js
>[gulp] Starting 'lint'...
>[gulp] Finished 'lint' after 43 ms
>[gulp] Starting 'test'...
>
>
>  Simple IO
>    ✓ should return unmodified string when plain string is passed in 
>
>
>  1 passing (3ms)
>
>[gulp] Finished 'test' after 11 ms

如果我们没开始写任何代码来处理模板语法你觉得奇怪，那么我请求你跟着我知道下一个小结，那里我们会写一些真正的产品代码。写测试的过程，看着他们失败，然后实现仅仅能让他们通过的代码这些就是测试驱动开发的核心，往前走之前，我们来看看这个系统的好处。

让我们再增加两个测试到`01-simple-io.js`

```js
describe('Simple IO', function () {
  it(
    'should return unmodified string when plain string is passed in', 
    function () {
      var string = 'Hello!';
      assert.equal(
        sumo.compile(string, { name: 'Bob' }),
        string,
        'Plain string does not match output string'
      );
    }
  );

  it(
    'should return unmodified HTML when plain HTML is passed in', 
    function () {
      var html = '<div>Hello!</div>';
      assert.equal( 
        sumo.compile(html, { name: 'Bob' }), 
        html, 
        'Plain HTML does not match output HTML'
      );
    }
  );

  it(
    'should return malformed input unchanged', 
    function () {
      var html = '<div>{ name</div>';
      var malformedCount = '<count collection="test"';

      assert.equal(
        sumo.compile(html, { name: 'Bob' }), 
        html, 
        'Malformed input does not match output'
      );

      assert.equal(
        sumo.compile(malformedCount, { test: [1,2,3] }), 
        malformedCount, 
        'Malformed count does not match output'
      );
    }
  );
});
```

我们不动任何的产品代码，让我们看看`gulp test` 会怎么样。

>[gulp] Using gulpfile /home/matt/Documents/Projects/sumo/gulpfile.js
>[gulp] Starting 'lint'...
>[gulp] Finished 'lint' after 56 ms
>[gulp] Starting 'test'...
>
>
>  Simple IO
>    ✓ should return unmodified string when plain string is passed in 
>    ✓ should return unmodified HTML when plain HTML is passed in 
>    ✓ should return malformed input unchanged 
>
>
>  3 passing (3ms)
>
>[gulp] Finished 'test' after 12 ms

好极了！试着不要去管开始写的测试，而是回去增加更多的测试，重要的事情是开始定义产品最渴望的功能，这样我们就有了一个很清晰的开发路线。

## 关于测试一个小的工程和一个大的工程

往前走之前还有件事我想告诉大家。为这样一个工程准备的测试用例的这种方式是不必要的。如果是一个大的工程使用一个该如何组织。这个工程足够小，我们可以使用功能来组织测试用例，然而在一个大的工程里，使用模块或者组件来组织测试用例可能更清楚一些。然后在根据功能。你可以给整个javascript语言来写一个测试。测试可能是这样的：

>- Array
>  - Array.prototype.find
>    - Shouldn't throw a TypeError if IsCallable(predicate) is true
>    - Find on empty array should return undefined
>    - The length property of the find method should be 1
>    - [...etc]
>  - Array.prototype.indexOf
>    - [...etc]
>  - [...etc]
>- Number
>  - Number.isNaN
>    - should return false if called with a boolean
>    - should return true if called with NaN
>    - should return false if called with a non-number Object
>    - [...etc]
>  - [...etc]

更新代码提交

>git add .
>git commit -m "Adds mocha and simple IO tests"

## 持续集成和Github Flow

好，快达到目标了。开始写功能代码之前的最后一个任务是安装一个持续集成的服务。

那些熟悉持续集成的同学可能要问为啥在这么小的一个项目中而且只有一个开发者还要使用持续集成呢。感觉有点杀鸡用宰牛刀了。但是至少这是一个实践好的开发习惯的一个机会。 这也是这个系列的真正价值。

## 什么是持续集成

在web开发世界，持续集成的部分有点模糊。关于持续集成是什么很多人有很多理解。而且往往是针锋相对的。有一些讨论来自不同的开发生态。例如，一个c++程序是构建，测试，部署，都是和node.js程序是完全不同的。

持续集成的核心是一种开发方法。尝试降低基于同一个代码集不同开发人员之间的摩擦。这种摩擦可能是两个开发人员在相同代码上的冲突。或者是在集成过程中产生的bug。持续集成的最终目的是主代码集上不包含失败的构建。

如何应用到我们的工程上呢？在一个大工程中有多个部件和多个开发人员，持续集成的需求可能更明显，在我们的例子中，，我们只使用了持续集成方法论䬅的很小的一部分。和Github flow绑定来确保我们的主分支一直是可以产品化的。我们将会集中注意到持续集成系统的核心功能上。

1, 所有的代码都应该包含在代码版本控制仓库里，包含构建需要的工具以及测试。
2, 开发人员应该尽可能频繁的提交主分支代码。
3, 代码应该被自动构建而且每次提交都应该是被测的。

## 什么是`Github Flow`?

`Github Flow`是另一个方法来确保我们主分支没有失败的构建。`Github Flow`核心原理是：

1, 主分支总是可以被部署的。例如，如果你是工作在一个web app上主分支应该总是可以部署到live服务器上的。
2, 所有的工作应该在描述性的分支完成。
3, 尽早，尽快提交你的分支。
4, 当工作完成后，它应该通过一个pull请求合并到主分支。

## 把两者合并

这里是我们的系统怎样工作的：

1, 我们有了工程所需要的所有部件后，我们将不再直接往主分支提交了。
2, 当我们要增加一个新功能时，我们从创建一个新的分支开始
3, 当我们想集成新功能到主分支去的时候，我们将会提交一个pull请求道开发分支。
4, 开发分支将被Travis Ci测试，如果所有的测试都通过了，我们合并开发分支到主分支。

这整个系统的目的是最大限度的减少进入主分支的bug。成员越多，模块越多，代码越复杂。这个I型同的作用越大。

## 安装Travis CI

什么是Travis CI 从那里让它进入我们的工作流呢？Travis CI背后的理念是非常简单的。它检测一个github仓库。然后当有提交的时候运行任意一个构建或者测试脚本。然后通知我们构建或测试是否成功。

安装Travis CI有点小麻烦，首先你需要使用Github账号登陆到Travis CI。 然后增加一个新的仓库到Travis.它将允许我们选择一个仓库。

让我们选在sumo。

现在我们在Travis CI端已经完成了，很简单是不是？谜题的最后一块是我们的.traivs.yml 文件。这个文件告诉Travis我们工程环境的需要还有那个分支它应该检测修改。让我们在工程根目录来创建这个文件。

```yml
# First, we need to tell Travis which 
# language we're using, and what version
language: node_js
node_js:
  - "0.10"

# Then, let's specify which branches 
# we want Travis to monitor for changes.
# In our case, We only want our tests to 
# run when we push to the master or 
# development branches
branches:
  only:
    - master
    - development
```

这就是所有要做的事情，让我们提交代码。

>git add .
>git commit -m "Adds Travis CI config"
>git push origin master

Travis现在可以自动按队列的形式运行`npm test`命令。当完成后Travis将会发邮件告诉我们状态。我们也可以看Travis CI公告板来获取更多的信息。



## 结论

好了！我们现在有了一个固定的工作流和一个开发环境，这个环境在理论上能增强代码的质量。从这里开始我们将开始真正的写功能代码了。在下一节中，我们将开始实现`<count/>`标签。

像往常一样，如果你有任何问题，请增加评论，如果看到任何错误，让我知道。