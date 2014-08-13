---
layout: post
title:  "在node.js构建一个模板语言，第二部分：启动"
date:   2014-08-11 13:31:59
categories: node.js template 翻译
excerpt: "node.js工程学，以及制作一个简单易懂，功能强大的template语言。"
---

现在我们有了要做什么的清晰的想法，让我们来启动这些事情吧。贯穿这个系列，我准备尝试尽可能的把我做的每一件事都记录下来。我将会跳过一些主题，但是我会给出一些链接，我这里也鼓励你跳过你已经熟悉的部分

## 为我们的项目起个名字

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

我们可以回过头来修改这个文件，现在让我们提交一下我们的修改

> git add .
> git commit -m "Adds package.json"

安装 Gulp

如果你不熟悉，gulp是一个自动化大量开发任务的工具，例如：

- 运行测试
- 检查程序语法错误
- 编译SASS/LESS
- 压缩CSS/JS
- 连接文件

你可以在[这里](http://gulpjs.com/plugins/)找到完整的gulp插件列表。

现在让我们的package.json已经建立，让我安装gulp并把它保存成开发依赖。

> npm install gulp --save-dev

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

如果希望使用命令行，我们还需要把gulp安装成全局版本。

> npm install -g gulp

在我们提交任何改动之前，让我们确认一下node_modules目录包含在git ignores文件中，这样我们可以不把这些依赖放入我们的仓库。如果你没有.gitignore文件，在仓库的根目录创建一个。它的内容应该包含：

> # Ignore the `node_modules` folder
> node_moduels

让我们提交我们的改动

> git add .
> git commit -m "Adds gulp as a dependency"

## 安装JSHint

现在我们有了gulp, 让我们来创建我们的第一个gulp任务：语法检查（linting）.我们将使用[JSHint](http://www.jshint.com/)来保证我们的代码没有基本的语法错误。

首先，我们得安装gulp-jshint 插件使用命令：

> npm install gulp-jshint --save-dev.

接下来让我们在根目录创建一个名字为"gulpfile.js"的文件。这个文件是gulp来查询任务定义的。如果你在终端运行gulp lint, gulp 将会在这个文件中查找lint任务。

## gulpfile.js

到[这个仓库](https://github.com/mgmeyers/sumo/blob/master/gulpfile.js)看完整的gulpfile。

首先，让我们引入我们需要的模块和安装我们的任务架构。

```javascript
var gulp = require('gulp');
var jshint = require('gulp-jshint');

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
    .pipe(jshint.reporter('default'))
    /**
     * Finally, we want jshint to terminate the
     * gulp task when it finds an error.
     */
    .pipe(jshint.reporter('fail'));
});
```

现在我们在终端运行gulp lint，它将会在我们所有的javascript文件上运行jshint，其中包含gulpfile.js

注意：你可以创建你自己的报告器，或者使用预先定义的，想知道更多信息请看[这里](https://github.com/spenceralger/gulp-jshint#jshint-reporters)

## 安装Mocha

让我们使用gulp来运行我们的测试，到现在我们应该已经熟悉了通过npm安装包了，所以继续来安装gulp-mocha包然后保存成开发依赖。

接下来，在gulpfile顶部，让我们引入gulp-macha。

```javascript
var gulp = require('gulp');
var jshint = require('gulp-jshint');
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

1, 一个String应该返回unmodified
2, 标准的html应该返回unmodified
3, malformed输入应该返回unmodified

虽然这些很简单，但是它们提供了很好的测试基线。如果它们任何一个失败，说明在代码中有了严重的错误，而且我们应该尽可能快的捕捉到所有的严重的错误。

让我们在工程根目录创建一个tests目录，在这个目录下创建一个文件 01-simple-io.js。这样取名字完全是让我更容易找到。可以随便起名字的，但是改好后不要再动。

## 安装Travis CI

待续

## 结论

待续