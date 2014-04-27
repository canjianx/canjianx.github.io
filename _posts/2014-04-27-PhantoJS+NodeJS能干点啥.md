---
layout: post
title:  "PhantomJS + Node.js能干点啥？"
date:   2014-04-23 13:31:59
categories: jekyll update
excerpt: "用PhantomJS + Node.js自动扒取网页数据。"
---

## 背景

这里总结两个公司的任务，一个是到公共网站扒一些数据，要求每天都去扒，因为数据每天都会更新。第二个是测试公司web页面的UI问题。由于公司测试人员比较少，各个技术大大也不提倡多用测试。

## 选择工具

使用两个工具，PhantomJS和NodeJS

其实扒取网站数据有很多工具可以选择，以前用另一个工具[jsDom](https://www.npmjs.org/package/jsdom)+NodeJS的http支持抓过豆瓣的数据，用jsDom来分析扒过来的数据。因为涉及到一些cookie以及页面上的模拟操作等等的问题。所以还是选择用PhantomJS。

用PhantomJS很快就能扒到网站的数据，并有导出的接口。然后写个函数格式化成xsl的格式，任务基本完成了。基本一个上午搞定这个事。交给老大后，给我的反馈是要自动化，记录log，可配置，发送邮件，并且要稳定，要健壮。又给我扔了回来。

自动很好做，phantomJS本身就是命令，加到系统的任务列表就可以了。但是记log文件，发送邮件，并检测失败重发这些工作用phantomJS就有点牵强了。正好前段时间开始看NodeJS。这些工作用NodeJs来完成都是很轻松的。对一个前端开发人员来说。

正好到网上搜到一个NodeJs的模块[phantomjs-node](https://github.com/sgentle/phantomjs-node)可以桥接PhantomJS。

Log, 邮件，自动化，NodeJS都有模块支持。

拿过来使用就可以了。

## 收获

phantomjs-node这个模块的工作方式是异步的，而phantomjs的API有很多设置的是同步模式。所以这里了一些误会走了一些弯路。这里有个教训。使用开源软件，文档有可能比较少。有时候代码就是最好的文档。适当的看一些代码，能做到事半功倍的效果。后面还会提到。

安装这个phantomjs-node的时候，经常失败，十分恼火，使用国内的淘宝做的npm镜像[使用方法](http://cnpmjs.org/)也经常失败，只好看看代码了，原来是要安装phantomJS。从原始的网站去拿，难怪在国内访问国外的确是很慢的。所以我就用下载工具把需要的phantomJs下载回来，它会自动判断下载的文件。然后顺利安装成功。又一次的证明看一些代码的必要性。

异步代码嵌套的层次太多了，代码很恐怖，有很多大括号嵌套。有一个编译器，可以转化这种代码，好看一点，编译后成了这种大括号的代码，之前还是比较好看的。比较适合phantomjs-node这种编程模式。有这样一个[工具](https://github.com/BYVoid/continuation)，程序开发到现在几乎所有的元素都有人已经做好了。商业中需要快速实现业务的方法就是拥抱开源，参与开源。如果这些模块都很熟悉，搭建一个程序是很快的事情。也许这就是现在快速开发的一个捷径。

在使用phantomjs-node的时候使用的版本不对，结果导致nodeJs0.10.4和phantomjs结果一直出错。只能使用nodeJs 0.8.4。后来更新了版本了就支持了。说明使用开源软件，必须要参与进去。如果只是拿来主义，那么必定走弯路吃闷亏。

## 学习的模块化知识

1, 使用[Cron](https://github.com/ncb000gt/node-cron)实现自动化，熟悉linux的人可以无阻碍的使用这个东西，cron本身就是linux的东西，如果是window出身的可能还得参考一下[时间格式](http://en.wikipedia.org/wiki/Cron)

2, [log](https://npmjs.org/package/log)模块

3, [emialjs](https://github.com/eleith/emailjs)来发送邮件

4, [phantomjs-noe](https://github.com/sgentle/phantomjs-node)用来桥接nodeJs和phantomJS

5, windows系统设置服务运行使用instsrv.exe, srvany.exe

## 后续

测试webUI，做前端的人使用浏览器开发者工具可以很方便的找到页面中样式的问题，使用phantomJS嵌入js代码使用js代码定位dom元素，然后来判断需要测试的东西，并自动这些，不就是一个web UI的自动化测试方案么？另外还支持cookie，支持js操作dom，可以模拟一些事件来实现页面自动化，并增加一些测试接口出来做到完整的web UI测试并不是天方夜谭。有很多测试框架都已经内嵌phantomJS。例如QUnit，Mocha等。结合Grunt来工作，可以使工作更顺利，效率更高，还有开源社区的很多支持。

## 畅想

比较windows开发和linux开发不难发现。windows是重平台，linux是重组合。windows的程序开发的东西基本上都是微软自己开发的。并在.net之后更有这种趋势。而linux是小平台，上面很多工具在程序开发中使用了几十年。经久不衰。可以说是个更开放的平台，想想当年微软和苹果在PC端的竞争是通过开放来实现的，而如今，IOS和android的竞争也是开放组件和平台之争。谁胜谁负让我们拭目以待。

## 项目代码

因为牵扯一些公司商业的东西，而且代码写的欠佳。等过一段时间整理出来后再发布出来。