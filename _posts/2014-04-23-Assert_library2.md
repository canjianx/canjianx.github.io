---
layout: post
title:  "Assert Library - jShould"
date:   2014-04-23 13:31:59
categories: jekyll update
excerpt: "断言库介绍2"
---

##jShuold

jShould 是QUnit的断言库。jShould可以让开发者更快的写单元测试，它可以让开发者更容易的读写删除断言字符串

###怎样使用

首先，下载，并和QUnit一起引用
```javascript
<script src="qunit.js"></script>
<script src="jshould.js"></script>
```
现在你可以在QUnit中使用简单的链式的jShould语法

```javascript
test("qunit jshould test 1", function () {
    var num = 3,
        username = 'john_doe';

    jShould(num).shouldEqual(3);

    // or use the $$ shorthand
    $$(num).shouldEqual(3);

    $$(username)
        .shouldNotBeNull()
        .shouldBeDefined()
        .shouldNotContain('<');
});
```

jShould是可扩展的，所以你可以创建你自己的断言，更复杂的，可复用的断言。

```javascript
$$.extend('shouldBeValidUsername', 'The username should have been valid.', function (username) {
    return username != null && username.indexOf('<') === -1;
});

test("qunit jshould test 1", function () {
    var username = 'john_doe';  

    $$(username).shouldBeValidUsername();
});
```
### 文档

#### 核心

```javascript
jShould(value)
```

定义 一个值，变量或者表达式来运行断言

```javascript
jShould(3);
```

也可以使用短的格式

```javascript
$$(3)
```

```javascript
$$.noConflict()
```

返回jShould和$$的变量给它源值。？？？

重命名

```javascript
var Assert = $$.noConflict();

// EXAMPLE: Now you can use your own name when asserting:
Assert(3).shouldByType('number');
```

```javascript
$$.extend(name, message, expression)
```

扩展jShould

name是扩展时jShould中的方法名
message是测试执行后显示的结果。
expression是带一个参数的函数，需啊哟判断的值。

```javascript
// EXAMPLE:
$$.extend('shouldBeValidUsername', 'The username should have been valid.', function (value) {
    return value != null && value.indexOf('<') === -1;
});

$$('john_doe').shouldBeValidUsername();
```

####API

```javascript
.shoudEqual(value)
```

判断相等,和Qunit中的深度相等一样。

```javascript
// EXAMPLE
var car = { color: 'green' };
$$(car).shouldEqual({ color: 'green' });
```

shouldNotEqual(value)

判断不同，和QUnit中的深度不相等一样。

```javascript
// EXAMPLE
var car = { color: 'green' };
$$(car).shouldNotEqual({ color: 'red' });
```

.shouldBeType(type)

判断类型相同，和javascript中的typeof 类似。

```javascript
// EXAMPLE
var car = { color: 'green' };
$$(car).shouldBeType('object');
```

.shouldContain(value)
包含，如果内容是个字符串，通过字符串查找完成。如果是个数组，用数组来找这个值，如果是个对象，用keys去找。

```javascript
// EXAMPLE
$$('my name is').shouldContain('name');
$$([0, 10, 20]).shouldContain(10);
$$({ color: 'green' }).shouldContain('color');
```

.shouldNotContain(value)
类似shouldContain()

```javascript
// EXAMPLE
$$('john_doe').shouldNotContain('; DROP');
$$([0, 10, 20]).shouldNotContain(30);
$$({ color: 'green' }).shouldNotContain('make');
```

.shouldBeNull()

```javascript
// EXAMPLE
var username = null;
$$(username).shouldBeNull();
```

.shouldNotBeNull()

```javascript
// EXAMPLE
var username = 'john_doe';
$$(username).shouldNotBeNull();
```

.shouldByEmpty()

```javascript
// EXAMPLE
$$('').shouldBeEmpty();
$$([]).shouldBeEmpty();
$$({}).shouldBeEmpty();
```

.shouldNotBeEmpty()

```javascript
// EXAMPLE
$$('john_doe').shouldNotBeEmpty();
$$([10, 20, 30]).shouldNotBeEmpty();
$$({ color: 'green' }).shouldNotBeEmpty();
```

.shouldBeUndefined()

```javascript
// EXAMPLE
var username;
$$(username).shouldBeUndefined();
```

.shouldBeDefined()

```javascript
// EXAMPLE
var username = 'john_doe';
$$(username).shouldBeDefined();
```

.shouldBeTrue()

```javascript
// EXAMPLE
$$(10 < 100).shouldBeTrue();
$$(!!1).shouldBeTrue();
```

.shouldBeFalse()

```
// EXAMPLE
$$(10 > 100).shouldBeFalse();
$$(!!window.myProp).shouldBeFalse();
```

.shouldBeLessThan(num) .shouldbeMoreThan(num)

```javascript

// EXAMPLE
$$(10).shouldBeLessThan(100);
// EXAMPLE
$$(100).shouldBeMoreThan(10);
```

.shouldThrowException()
```javascript
// EXAMPLE
var errorFunc = function() {
    throw new Error('Oh crap.');
};

$$(errorFunc).shouldThrowException();
```
