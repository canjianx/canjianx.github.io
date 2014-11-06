---
layout: post
title:  "atom-shell 程序发布"
date:   2014-11-6 13:31:59
categories: node.js atom-shell 翻译
excerpt: "atom-shell 文档，程序发布"
---

To distribute your app with atom-shell, you should name the folder of your app
as `app`, and put it under atom-shell's resources directory (on OS X it is
`Atom.app/Contents/Resources/`, and on Linux and Windows it is `resources/`),
like this:

使用atom-shell发布你的程序，你需要把你的程序的文件夹命名成`app`，然后把它放到atom-shell的资源目录下（在OS X下面是`Atom.app/Contents/Resources/`，在linux和windows下它是`resources/`）

像这样：

On Mac OS X:
在 Max OS

```text
atom-shell/Atom.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

On Windows and Linux:
在windows和linux上

```text
atom-shell/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Atom.app` (or `atom` on Linux, and `atom.exe` on Windows), and
atom-shell will start as your app. The `atom-shell` directory would then be
your distribution that should be delivered to final users.

然后运行`Atom.app`（或者在linux上运行`atom`，在windows上运行`atom.exe`），这样atom-shell将会启动你的程序。`atom-shell`目录将会成为你给最终客户的发布。

## Build with grunt
## 使用grunt来构建

If you build your application with `grunt` there is a grunt task that can
download atom-shell for your current platform automatically:
[grunt-download-atom-shell](https://github.com/atom/grunt-download-atom-shell).

如果你使用`grunt`来构建你的程序，这里有一个grunt 任务可以给你自动下载你的平台需要的atom-shell
[grunt-download-atom-shell](https://github.com/atom/grunt-download-atom-shell).
