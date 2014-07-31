---
layout: post
title:  "Assert Library-assert"
date:   2014-04-23 13:31:59
categories: jekyll update
excerpt: "断言库介绍1"
---

##1 assert.js

assert.js是Nodejs中的标准断言库对浏览器的移植。原始的代码和测试用例来自Node.js, 已经为浏览器的兼容做了相应的修改。

例如，你可以和Mocha一起使用，在服务端或者客户端。Mocha不提供它自己的断言库。

###1 在客户端和服务端执行相同的测试。

你可以使用标准的断言模块，当你在Node.js中运行Mocha

相同的测试可以用这个库在浏览器中运行。

###2 怎样使用

```javascript
<script src="assert.js"></script>
<script src="path/to/testing-framework.js"></script>
<script src="path/to/your/test.js"></script>
```

###3 运行

####浏览器

打开test/index.html然后打开控制台看看。

####node.js
```
> node test/test-assert.js
All Ok
```

版权
MIT(same as Node.js)