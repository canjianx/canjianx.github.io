---
layout: post
title:  "atom-shell 使用原生的Node模块"
date:   2014-11-6 17:31:59
categories: node.js atom-shell 翻译
excerpt: "atom-shell 文档，使用原生的Node模块"
---

The native Node modules are supported by atom-shell, but since atom-shell is
using a different V8 version from official Node, you need to use `apm` instead
of `npm` to install Node modules.

atom-shell支持原生的Node模块，但是因为atom-shell使用的v8版本和官方Node使用的不一样，你需要使用`apm`来代替`npm`来安装Node模块。

The usage of [apm](https://github.com/atom/apm) is quite similar to `npm`, to
install dependencies from `package.json` of current project, just do:

[apm](https://github.com/atom/apm)的用法和`npm`十分类似。从当前工程的`package.json`安装只需要运行：

```bash
$ cd /path/to/atom-shell/project/
$ apm install .
```

But you should notice that `apm install module` won't work because it will
install a user package for [Atom Editor](https://github.com/atom/atom) instead.

但是你需要注意`apm install module` 不会工作，因为它将会为[Atom Editor](https://github.com/atom/atom)安装一个用户包。

## Native Node module compatibility

## 兼容原生Node模块

Since Node v0.11.x there were vital changes in the V8 API. So generally all native
modules written for Node v0.10.x wouldn't work for Node v0.11.x. Additionally
since atom-shell internally uses Node v0.11.9, it carries with the same problem.

从Node v0.11.x开始V8的api有重大改变，所以几乎所有的Node v0.10.x的原生模块在v0.11.x中都不工作。因为atom-shell是基于Node v0.11.9，所以它也有同样的问题。

To solve this, you should use modules that support both Node v0.10.x and v0.11.x.
[Many modules](https://www.npmjs.org/browse/depended/nan) do support both now.
For old modules that only support Node v0.10.x, you should use the
[nan](https://github.com/rvagg/nan) module to port it to v0.11.x.

为了解决这个问题，你应该使用同时支持v0.10.x和v0.11.x的版本
[很多模块](https://www.npmjs.org/browse/depended/nan)都支持这两者
一些只支持Node v0.10.x的老的模块，你可以使用[nan](https://github.com/rvagg/nan)把它升级到v0.11.x。

## Other ways of installing native modules
## 另一种安装原生模块的方法

Apart from `apm`, you can also use `node-gyp` and `npm` to manually build the
native modules.

和`apm`不同的，你还可以使用`node-gyp`和`npm`来手动编译原生模块。

### The node-gyp way

### `node-gyp`方式

First you need to check which Node release atom-shell is carrying via
`process.version` (at the time of writing it is v0.10.5). Then you can
configure and build native modules via following commands:

首先通过`process.version`来确定atom-shell支持的哪个Node版本，然后你可以通过下面的命令来配置编译原生模块。

```bash
$ cd /path-to-module/
$ HOME=~/.atom-shell-gyp node-gyp rebuild --target=0.10.5 --arch=ia32 --dist-url=https://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist
```

The `HOME=~/.atom-shell-gyp` changes where to find development headers. The
`--target=0.10.5` is specifying Node's version. The `--dist-url=...` specifies
where to download the headers.

`HOME=~/.atom-shell-gyp` 来修改从那里找到开发头。`--target=0.10.5`指定Node的版本。`--dist-url=...`指定从那里下载头。

### The npm way

### npm的方式。

```bash
export npm_config_disturl=https://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist
export npm_config_target=0.10.5
export npm_config_arch=ia32
HOME=~/.atom-shell-gyp npm install module-name
```
