---
layout: post
title:  "node.js的更好的错误处理模块VError"
date:   2014-08-12 13:31:59
categories: node.js error handle 翻译
excerpt: "node.js的错误处理"
src: http://npmawesome.com/posts/2014-08-11-verror/
---

在你的应用中有一个很好地错误处理策略是很重要的。不只是为了快速定位bug,而且为了在操作失败的时候能给用户传播适合的信息。我想传播(propagating)在这里是适合的术语。如果你构建了一个程序架构，它由好几层组成，而且精心布置了几个第三方的模块。你将会一遍又一遍的面临同样一个问题：如何处理来自更低一层的不同的错误信息，并使得程序更健壮？

我在我的程序中使用了一种模式，被Joyent高度推荐(看 [Error Handling in Node.js](https://www.joyent.com/developers/node/design/errors))。这种模式是包装错误对象，而不是只把他们传递给回调函数。只是简单的传递而非扩展错误可以被当成一个反例。例如：

```javascript
'use strict';

var fs = require('fs');

exports.readConfig = function readConfig (file, callback) {
  function onRead (err) {
    if (err) {
      //
      // Anti-Pattern alert!
      // Don't just spit the
      // "raw" error object back.
      //
      return callback(err);
    }
  }

  fs.readFile(file, onRead);
};
```

一个清晰的多的方法是创建一个新的错误对象，然后抛出异常，这就是[David Pacheco](https://github.com/davepacheco)的[VError](http://browsenpm.org/package/verror)的关键所在。它提供了一种功能，可以通过保留每一个的信息来合并错误对象，结果将会是串起来的信息，这个信息可以给你完整的函数链。这样你可以快速定位哪里出错了。让我们来看看吧

> npm install verror

这个模块可以看成是原生的error对象的一个替代品

```javascript
'use strict';

var fs = require('fs');
var VError = require('verror');

exports.readConfig = function readConfig (file, callback) {
  function onRead (err, content) {
    if (err) {
      return callback(new VError(err, 'failed to read config file "%s"', file));
    }

    try {
      content = JSON.parse(content);
    } catch (e) {
      return callback(new VError(e, 'failed to parse config file "%s"', file));
    }

    callback(null, content);
  }

  fs.readFile(file, onRead);
};
```

请注意，这个模块支持print式的错误消息构建，这太酷了。如果我们这样执行上面的函数

```javascript
exports.readConfig('/not/available.json', function onRead (err, config) {
  if (err) {
    return console.error(err.message);
  }
  ...
});
```

这显然会出错，因为这个配置文件不存在，打印的消息是这样的：

> failed to read config file "/not/available.json": ENOENT, open '/not/available.json'

所以如果你把根运行环境放到VErro的构造函数，你将会完整的相关的信息，这好极了！但是如果你想看到最高级的错误消息但是也想通过程序来访问较低层的错误这样可以么？verror提供了另外一个构造器来应对这种情况，叫做WError。它在较低层封装所有的错误对象，但是把最高一层的消息放到message属性里。如果你想访问其他的被包装的对象，你可以通过在WError实例上调用toString()来做到这一点。

想实际看看这两种方式，请确保查看[runnable example](http://runnable.com/U-jCJRV1J_sSBLic/verror-module-example-for-node-js-for-npmawesome-and-errors)和[example repository](https://github.com/npmawesome/example-verror)

## 接下来是？

你有你自己关于node.js错误处理的最佳实践，我对它们非常好奇，如果在评论里读到的话我会非常非常高兴。