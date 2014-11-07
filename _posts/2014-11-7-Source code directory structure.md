---
layout: post
title:  "atom-shell源码结构"
date:   2014-11-6 11:31:59
categories: node.js atom
excerpt: "atom 文档，翻译"
src: https://github.com/canjianx/atom
---

## Overview

## 概述

The source code of atom-shell is separated into a few parts, and we are mostly
following Chromium on the separation conventions.

atom-shell的源码分成几个部分，我们基本上遵循Chromium的拆分惯例。

You may need to become familiar with [Chromium's multi-process
architecture](http://dev.chromium.org/developers/design-documents/multi-process-architecture)
to understand the source code better.

你应该熟悉一下以便更好地理解[Chromium多进程架构](http://dev.chromium.org/developers/design-documents/multi-process-architecture)这里的源代码。

## Structure of source code

## 源码结构

* **atom** - Source code of atom-shell. atom-shell的源代码
  * **app** - System entry code. 系统实际代码
  * **browser** - The frontend including the main window, UI, and all browser
    side things. This talks to the renderer to manage web pages. 包含了主窗口，UI，以及所有浏览器端的前端代码，这里主要负责渲染管理web页面。
    * **lib** - Javascript part of browser side initialization code. 浏览器端需要javascript初始化的部分
    * **ui** - Implementation of UI stuff for different platforms. 为不同的平台实现的UI内容
      * **cocoa** - Cocoa specific source code. Cocoa专属的源码
      * **gtk** - GTK+ specific source code. GTK+专属的代码
      * **win** - Windows GUI specific source code. Windows GUI专属的源码
    * **default_app** - The default page to show when atom-shell is started 每天提供app时启动atom-shell的时候的默认页面
      without providing an app.
    * **api** - The implementation of browser side APIs. 浏览器端实现的API
       * **lib** - Javascript part of the API implementation. api的javascript实现
    * **net** - Network related code. 网络相关的代码。
    * **mac** - Mac specific Objective-C source code. object-c相关的代码
    * **resources** - Icons, platform-dependent files, etc. 图标，平台依赖的文件
  * **renderer** - Code that runs in renderer process. 在渲染进程中运行的代码
    * **lib** - Javascript part of renderer initialization code. 渲染初始化的javascript代码
    * **api** - The implementation of renderer side APIs. 渲染端api的实现
       * **lib** - Javascript part of the API implementation. api的javascript实现
  * **common** - Code that used by both browser and renderer, including some 
    utility functions and code to integrate node's message loop into Chromium's
    message loop. 共用的代码，包括公共的函数。 集成node消息循环到Chromium消息循环的代码。
    * **lib** - Common Javascript initialization code. javascript初始化的代码
    * **api** - The implementation of common APIs, and foundations of
      atom-shell's built-in modules. 实现。
       * **lib** - Javascript part of the API implementation. javascript实现的部分
* **chromium_src** - Source code that copied from Chromium. Chromium的源码
* **docs** - Documentations. 文档
* **spec** - Automatic tests.原子测试
* **atom.gyp** - Building rules of atom-shell.atom-shell的构建规则
* **common.gypi** - Compiler specific settings and building rules for other
  components like `node` and `breakpad`.其他模块的编译设置和构建规则，例如`node`和`breakpad`

## Structure of other directories
## 其他目录的结构

* **script** - Scripts used for development purpose like building, packaging,
  testing, etc. 开发目的的脚本，例如构建，打包，测试等。
* **tools** - Helper scripts used by gyp files, unlike `script`, scripts put
  here should never be invoked by users directly. gyp文件使用的帮助脚本，不像`script`，放在这里的脚本绝不可能被用户直接调用。
* **vendor** - Source code of third party dependencies, we didn't use
  `third_party` as name because it would confuse with the same directory in
  Chromium's source code tree. 第三方依赖的源码，不用`third_party`这个名字是因为容易和Chromium源码树中的这个目录混淆。
* **node_modules** - Third party node modules used for building. 用于构建的第三方模块
* **out** - Temporary output directory of `ninja`. `ninja`临时输出目录
* **dist** - Temporary directory created by `script/create-dist.py` script
  when creating an distribution. 当创建一个分发时，`script/create-dist.py`创建的临时目录。
* **external_binaries** - Downloaded binaries of third-party frameworks which
  do not support to be built via `gyp`. 下载的不想通过`gyp`构建的第三方的二进制架构
