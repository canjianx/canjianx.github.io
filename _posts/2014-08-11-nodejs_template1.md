---
layout: post
title:  "在node.js构建一个模板语言，第一部分：想法"
date:   2014-08-11 13:31:59
categories: node.js template 翻译
excerpt: "node.js工程学，以及制作一个简单易懂，功能强大的template语言。"
---

欢迎来到一步一步构建node.js的基础模板语言系列的第一篇。这个世界需要另外一个模板语言么？可能不需要，但是我深信构建一个是一个很好的经历。这个系列的目标至少是关于最终产品，前期工作流和最佳实践，其中任何一个都可以运用到你的项目中去。这也是说，如果我有那里出错了或者你看到有任何改进的地方，请让我知道!

## 想法

在过去的几年里，我有机会使用大量的模板语言，基本上他们都遵循一件事情，那就是它们脱离了它们要生成的html,至少字面意思上是这样的，虽然这对我来说并不是必须的要修正的问题，但是我想创建一个很像html的模板语言应该会有趣且有用的。这不是革命性的，但你也不要认为这是很平常的，特别在node社区。

## 项目目标

- 语法应该很清晰而且看上去很像html
- 有中等html知识的人应该很容易的学会它的语法
- 工具集应该是小的，但能满足大部分人的模板需求。
- 系统应该很容易扩展
- 代码应该是有很好的文档性，可读性
- 代码应该有很好的可测性，模块化很清晰

## 自动任务

我将使用[gulp.js](http://gulpjs.com/)为这个项目来自动完成大量的任务，像运行测试。

## 测试驱动开发

我将尝试在写程序之前写测试代码，这个过程将会是：写一个小的，专门的测试，检测测试失败，然后写最少的程序代码使这个测试通过，我已经选择了Mocha作为我的测试框架，因为它是相当的直接了当，而且容易使用。

## Github

我将使用Github来管理这个项目的源代码。我将使用[Github Flow](http://scottchacon.com/2011/08/31/github-flow.html)这样我可以保持我自己还有我的开发进程是可以被管理的，而且模拟是一个团队在工作。

## 持续集成

我也将设置使用[Travis CI](https://travis-ci.org/). 它连同Github Flow, 将会保证我的主分支不会包含一个失败的构建。

## 最后结果

最终，我们有一些成果，这里是一个例子，是我想象的这个模板应该的样子。

```html
<!-- List users by name -->
<h1>User List</h1>
<p>Total users: <count collection="people" /></p>

<ul>
  <iterate 
    collection="people as index, person" 
    sort="name asc">

    <li id="person-{person.id}">
      <h2>{(index + 1)}. {person.name}</h2>


      <if condition="person.age || person.eyeColor">
        <h3>Personal Data:</h3>
        <ul>
          <if condition="person.age">
            <li>{person.age}</li>
          </if>
          <if condition="person.eyeColor">
            <li>{person.eyeColor}</li>
          </if>
        </ul>
      </if>

      <if condition="person.friends.length">
        <ul>
          <iterate 
            collection="person.friends as friend" 
            sort="name asc">

            <li id="{friend.id}">{friend.name}</li>

          </iterate>
        </ul>
        <else>
          {person.name} has no friends :`(
        </else>
      </if>

    </li>

  </iterate>
</ul>
```

在第二部分，我将会介绍如何安装Mocha, Travis CI 还有我将会写一些基础的测试用例， 如果你有任何的评论和建议，请在下面评论或者给我一封邮件。