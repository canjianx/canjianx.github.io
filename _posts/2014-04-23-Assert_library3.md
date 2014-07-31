---
layout: post
title:  "Assert Library - should.js"
date:   2014-04-23 13:31:59
categories: jekyll update
excerpt: "断言库介绍3"
---

## should.js

should 是一个表现力强的，可读的，忽略测试框架的断言库。这个库的主要目标是表现力和对你有帮助。它可以让你的测试代码干净，错误信息很有帮助。

它扩展了```object.prototype```，增加了一个非数字的getter。这个函数可以让你去表达这个对象应该有什么行为，它仍然返回它自己，当使用```require```的时候。

###例子

```javascript
var should = require('should');

var user = {
    name: 'tj'
  , pets: ['tobi', 'loki', 'jane', 'bandit']
};

user.should.have.property('name', 'tj');
user.should.have.property('pets').with.lengthOf(4);

// if the object was created with Object.create(null)
// then it doesn't inherit `Object` and have the `should` getter
// so you can do:

should(user).have.property('name', 'tj');
should(true).ok;

someAsyncTask(foo, function(err, result){
  should.not.exist(err);
  should.exist(result);
  result.bar.should.equal(foo);
});
```

### 开始

#### 1 安装

```javascript
$npm install should -save-dev
```

#### 2 使用

```javascript
var should = require("should");
(5).should.be.exactly(5).and.be.a.number

###在浏览器

即使被作者是100%支持es5，这并不代表它没有bug。已知的bug看看wiki

如果你在浏览器使用，请使用根目录下的should.js，或者自己创建一个。它使用browserify创建的。创建最新版本：

```javascript
# you should have browserify
$ npm install -g browserify
$ make browser
```

这段脚本产生一个window.Should。使用起来和静态的使用should一样。

```javascript
Should(5).be.exacly(5)
```

在Node.js Object.prototype扩展了should(在window.Should中增强了S)

```javascript
window.should.be.exactly(window);
// the same
// window is host object
should.be.exactly(window);
// you should not really care about it

(5).should.be.exactly(5);
```

should广泛使用了EcmaScript5，所以所有支持ES5的浏览器都是支持的（ie<=8不被支持) 详细情况看[这里](http://kangax.github.io/es5-compat-table/)

可以很简单的通过npm或者bower安装：

```javascript
npm install should --save-dev
# or
bower install visionmedia/should.js
```

### 静态的should和断言模型

极少数的情况需要静态的使用should,

```javascript
assert.fail(actual, expected, message, operator) // just write wrong should assertion
assert(value, message), assert.ok(value, [message]) // should(value).ok
assert.equal(actual, expected, [message]) // should(actual).eql(expected, [message])
assert.notEqual(actual, expected, [message]) // should(actual).not.eql(expected, [message])
assert.deepEqual(actual, expected, [message]) // should(actual).eql(expected, [message])
assert.notDeepEqual(actual, expected, [message]) // should(actual).not.eql(expected, [message])
assert.strictEqual(actual, expected, [message]) // should(actual).equal(expected, [message])
assert.notStrictEqual(actual, expected, [message]) // should(actual).not.equal(expected, [message])
assert.throws(block, [error], [message]) // should(block).throw([error])
assert.doesNotThrow(block, [message]) // should(block).not.throw([error])
assert.ifError(value) // should(value).Error (to check if it is error) or should(value).not.ok (to check that it is falsy)
```

.not
.any

### 断言

#### 链式

#### .ok

#### .true

#### .false

#### .eql(otherValue)

#### .equal(otherValue) & .exactly(otherValue)

#### .startWith(str)

#### .endWith(str)

#### .within(from, to)

#### .approximately(num, delta)

#### .above(num) & .greaterThan(num)

#### .below(num) & .lessThan(num)

#### .NaN

#### .Infinity

#### .type(str)

#### .instanceOf(constructor) & instanceOf(constructor)

#### .arguments

#### .Object, .Number, .Array, .Boolean, .Function, .String, .Error

#### .enumerable(name[, value])

#### .property(name[, value])

#### .properties(propName1, propNam2, ...) || .properties([propName1, propNam2, ...]) || .properties(obj)

#### .length(number) & .lengthOf(number)

#### .ownProperty(str) && hasOwnProperty(str)

#### .empty

#### .keys([key1, key2, ...]) & .keys(key1, key2, ...) & 。key(key)

#### .containEql(otherValue)

#### .containDeep(otherValue)

#### .match(otherValue)

#### .matchEach(otherValue)

#### .throw() & throwError()

#### .status(code)

#### .header(field[, value])

#### .json

#### .html

### 可选的错误描述

### Mocha 的例子

https://github.com/visionmedia/should.js