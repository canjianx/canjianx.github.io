---
layout: post
title:  "atom和Node-webkit之间的不同"
date:   2014-11-7 12:31:59
categories: node.js atom
excerpt: "atom 文档，翻译"
src: https://github.com/canjianx/atom
---

Like Node-Webkit, atom-shell provides a platform to write desktop applications
with JavaScript and HTML, and has Node integration to grant access to low level
system in web pages.

和Node-Webkit一样，atom-shell也提供了一种是用javascript和html来写桌面程序的一个平台，都是继承了Node并且可以在web页面中访问底层接口。

But there are also fundamental differences between the two projects that make
atom-shell a completely separate product from Node-Webkit:

但是有几点不同，足以分清两者。

**1. Entry of application**

**1. 程序入口**

In Node-Webkit, the main entry of an application is a web page, you specify a
main page in the `package.json` and it would be opened in a browser window as
the applications main window.

在Node-Webkit，主程序入口是一个web页面，你在`package.json`中设置一个主页面，它将作为程序的主窗口一样在一个浏览器窗口打开。

While in atom-shell, the entry point is a JavaScript script, instead of
providing a URL directly, you need to manually create a browser window and load
html file in it with corresponding API. You also need to listen to window events
to decide when to quit the application.

然而在atom-shell， 入口是一个javascript脚本，而不是直接提供一个URL，你需要手动创建一个浏览器窗口然后使用相关的API来加载html文件。你还需要监听窗口消息来决定是否退出程序。

So atom-shell works more like the Node.js runtime, and APIs are more low level,
you can also use atom-shell for web testing purpose like
[phantomjs](http://phantomjs.org/).

所以atom-shell更像实时Node.js，而且APIs更底层，你也可以使用atom-shell来做测试。像[phantomjs](http://phantomjs.org/)。

**2. Build system**

**2. 构建系统**

In order to avoid the complexity of building the whole Chromium, atom-shell uses
[libchromiumcontent](https://github.com/brightray/libchromiumcontent) to access
Chromium's Content API, libchromiumcontent is a single, shared library that
includes the Chromium Content module and all its dependencies. So users don't
need a powerful machine to build atom-shell.

为了避免整个Chromium系统的复杂性，atom-shell使用[libchromiumcontent](https://github.com/brightray/libchromiumcontent)来访问Chromium的API。libchromiumcontent是一个单独的，共享库，包含了Chromium的主体模块和所有的依赖。所以用户不需要一个强劲的机器来构建atom-shell。

**3. Node integration**

**3. Node的集成**

In Node-Webkit, the Node integration in web pages requires patching Chromium to
work, while in atom-shell we chose a different way to integrate libuv loop to
each platform's message loop to avoid hacking Chromium, see the
[`node_bindings`](../../atom/common/) code for how that was done.

在Node-Webkit，将Node集成到web页面，需要给Chromium打个补丁，但是在atom-shell，我们选择了不同的路来集成libuv的事件循环到每个平台的消息循环，来避免侵入Chromium，看[`node_bindings`](../../atom/common/)的代码来了解是怎么做到的。

**4. Multi-context**

**4. 多上下文**

If you are an experienced Node-Webkit user, you should be familiar with the
concept of Node context and web context, these concepts were invented because
of how the Node-Webkit was implemented.

如果是使用过Node-Webkit，你应该熟悉Node上下文环境和web上下文环境，这些概念是因为Node-Webkit的实现而发明出来的。

By using the [multi-context](http://strongloop.com/strongblog/whats-new-node-js-v0-12-multiple-context-execution/)
feature of Node, atom-shell doesn't introduce a new JavaScript context in web pages.

但是使用Node的特性[multi-context](http://strongloop.com/strongblog/whats-new-node-js-v0-12-multiple-context-execution/)，atom-shell不需要再在web页面上介绍一个新的javascript执行环境。
