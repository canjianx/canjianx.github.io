---
layout: post
title:  "Fast, Nimble PDF Generation For Ruby"
date:   2014-03-25 11:31:59
categories: jekyll update
---

# Prawn: Fast, Nimble PDF Generation For Ruby
# Prawn: Ruby下的快速的，敏捷的PDF生成工具

org/prawnpdf/prawn)
Prawn is a pure Ruby PDF generation library that provides a lot of great functionality while trying to remain simple and reasonably performance. Here are some of the important features we provide:

Prawn是一个纯的ruby pdf生成库， 它在提供了很多很好的功能的同时，尽力保持简单,和高效。下面是我们提供的一些重要的特性

* Vector drawing support, including lines, polygons, curves, ellipses, etc.
* 支持绘制矢量图，包括线，多边形，曲线，椭圆，等等。
* Extensive text rendering support, including flowing text and limited inline formatting options. 
* 广泛的文字渲染支持，包括延伸文字以及各种格式选项
* Support for both PDF builtin fonts as well as embedded TrueType fonts
* 支持pdf的嵌入字体和内建字体
* A variety of low level tools for basic layout needs, including a simple grid system
* 大量的低级别的基本布局需要的工具，包括一个简单的栅格系统
* PNG and JPG image embedding, with flexible scaling options
* 支持嵌入PNG和JPG, 同时有灵活的缩放系统。
* Reporting tools for rendering complex data tables, with pagination support
* 支持复杂表格， 支持页码。
* Security features including encryption and password protection
* 安全特性，包含加密和密码保护。
* Tools for rendering repeatable content (i.e headers, footers, and page numbers)
* 渲染重复内容的工具（例如，页眉，页脚，页码）
* Comprehensive internationalization features, including full support for UTF-8 based fonts, right-to-left text rendering, fallback font support, and extension points for customizable text wrapping.
* 综合的国际化特性，包括基于UTF-8的全支持，从右往左的文字渲染，预留文字的支持（fallback font）, 还有扩展字体包装。这里不是很清晰
* Support for PDF outlines for document navigation
* 支持PDF目录
* Low level PDF features, allowing users to create custom extensions by dropping down all the way to the PDF object tree layer. (Mostly useful to those with knowledge of the PDF specification)
* 低级别的pdf特性，允许用户创建自定义的扩展，通过下拉树状所有的pdf对象（对有pdf规格知识的人有用）
* Lots of other stuff!
还有很多其他东西。
## Should You Use Prawn?
## 你应该使用Prawn么？
If you are looking for a highly flexible PDF document generation system, Prawn might be the tool for you. It is not a reporting tool or a publishing toolchain, though it could be fairly easily used to build those things.
如果你在找一个高灵活的PDF文档生成系统， Prawn可能是你要找的工具，它不是一个报表工具，或者发布工具链，虽然它可以很轻松的做这件事。

One thing Prawn is not, and will never be, is an HTML to PDF generator. For those needs, consider looking into FlyingSaucer via JRuby, or one of the webkit based tools, like Wicked or PDFKit. We do have basic support for inline styling but it is limited to a very small subset of functionality and is not suitable for rendering rich HTML documents.
Prawn 有一件事不能也不准备做，从html到pdf的生成器。如果你需要那样的工具，可以考虑看看使用JRuby的FlyingSaucer，或者另外一个基于webkit的工具，像Wicked 或者PDFKit. 我们做的是基本的内部样式的支持但是它被限制在一个很小的功能子目录，而且不适合渲染复杂的HTML文档。

## Supported Ruby Versions and Implementations
## 支持的Ruby版本和实现
Because Prawn is pure Ruby and all of its runtime dependencies are maintained
by us, it should work pretty much anywhere. We officially support
MRI {1.9.3, 2.0.0, 2.1.x} and jruby 1.7.x (>= 1.7.9) in 1.9 mode, however 
we will accept patches to fix problems on other 
Ruby platforms if they aren't too invasive.
因为Prawn是一个纯Ruby库，而且它的运行时依赖是被我们维护的它可以在所有的地方工作的相当好。 我们官方支持MRI(1.9.3, 2.0.0, 2.1.x)还有jruby(1.7.x（>=1.7.9)在1.9的模式，然而 我们将会接受修复其他ruby平台的补丁， 如果这些补丁不是特别具有侵略性的话。

## Installing Prawn
## 安装Prawn

Prawn is distributed via RubyGems, and can be installed the usual way that you install gems: by simply typing `gem install prawn` on the command line. 
Prawn是童工RubyGems发布的，可以通过简单的在命令行输入`gem install prawn`来安装

You can also install from git if you'd like, the _master_ branch contains the latest developments, and _stable_ represents the latest bug fixes to the currently released version of Prawn. If you go this route, using Bundler is encouraged.

如果你想你也可以通过git来安装。主分支包含了最新开发版和最新稳定版的bug修复版，如果你想使用这个版本，鼓励使用Bundler。
## Hello World!
## Hello World!

If the following code runs and produces a working PDF file, you've successfully installed Prawn.
    require "prawn"
    Prawn::Document.generate("hello.pdf") do
      text "Hello World!"
    end
Of course, you'll probably want to do more interesting things than that...
如果下面的代码可以运行，说明你的Prawn安装成功了。
```
    require "prawn"
    Prawn::Document.generate("hello.pdf") do
      text "Hello World!"
    end
```
当然， 你肯定想做比这有意思多的事情。。。

## Manual
## 手册
Felipe Doria provided us with a beautiful system for generating a user manual from our examples. This can be generated from the prawn source or you can download a pre-generated snapshot of it at http://prawnpdf.org/manual.pdf
Felipe Doria 给我们提供了从我们的例子里生成手册的一个漂亮的系统。手册可以通过prawn来生成，或者从http://prawnpdf.org/manual.pdf下载一份
Note that while we will try to keep the downloadable manual up to date, that it's provided as a convenience only and you should generate the manual yourself if you want to be sure the code in it actually runs and works as expected. To build the manual, here's what you need to do:
注意我们将会尽力保持可下载的手册是最新的，它提供独一份的便利版本，当你想确定代码的确是可以像期望的那样工作的话，你应该自己生成这份手册，下面是你需要做得。
1. clone the repository
- 克隆这个版本库
2. switch to the stable branch (optional, stay on master for development version)
- 切换到稳定的分支（可选，如果想要开发版，就待在主分支）
3. install bundler if necessay
- 如果需要安装bundler
4. run `bundle install`
- 运行`bundle install`
5. run `bundle exec rake manual`, which will generate _manual.pdf_ in the project root
- 运行 `bundle exec rake manual`, 这将会在项目根目录生成manual.pdf. 
## Release Policies
## 发布策略
Before upgrading Prawn on one of your projects, you should read our [API
compatibility](https://github.com/prawnpdf/prawn/wiki/API-Compatibility-Notes)
guidelines. Generally speaking, you can expect tiny version updates to always be
safe upgrads, but minor and major updates can introduce incompatibilities.
在升级你的项目中的prawn之前，你应该阅读我们的[api 兼容性](https://github.com/prawnpdf/prawn/wiki/API-Compatibility-Notes) 指南。通常而言，你可以期望很小的地方是安全升级的，但是主要的功能是不兼容的。

Be sure to read the release notes each time we cut a new release and lock your gems accordingly. 
You can find the project CHANGELOG at: https://github.com/prawnpdf/prawn/wiki/CHANGELOG
确保每次阅读发布通告，有时候我们会砍一些功能，所以确保你锁定你的gems 你可以找到项目的修改日志https://github.com/prawnpdf/prawn/wiki/CHANGELOG
## Support 
## 支持

The easiest way to get help with Prawn is to post a message to our mailing list:
最简单的获取帮助的方式是发送邮件到邮件列表：
<http://groups.google.com/group/prawn-ruby>
Feel free to post any Prawn related question there, our community is very responsive and will be happy to help you figure out how to use Prawn, or help you determine whether it's the right tool for the task you are working on.
你可以发送所有的prawn相关的问题到那里，我们的社区是很负责的而且也很乐意帮助你指出应该怎样使用Prawn,或者帮助你是否你适合使用这个工具。
Please make your posts to the list as specific as possible, including code samples and output where relevant. Do not post any information that should not be shared publicly, and be sure to reduce your example code as much as possible so that those who are responding to your question can more easily see what the issue might be.
请确保你的提交是尽量别人没有提交过的，最好包含代码样例和相关的输出，不要发送任何不应该公开的信息。而且请确保你提交的代码最小化，这样别人可以很容易的找到问题所在。
## Contributing
## 贡献
If you've found a bug or want to submit a patch, please enter a ticket into our github tracker:
如果你发现一个bug或者像提交一个补丁，在我们的github tracker中增加一个ticket
<http://github.com/prawnpdf/prawn/issues>
We strongly encourage bug reports to come with failing tests or at least a reduced example that demonstrates the problem. Similarly, patches should include tests, API documentation, and an update to the manual where relevant. Feel free to send a pull request early though, if you just want some feedback or a code review before preparing your code to be merged.
我们极力的鼓励报告带有失败的测试用例的bug。可以重现的问题，同样的补丁应该包含测试，api文档，和相关的手册的更新。如果你只是想获得一些反馈，或者在你的代码合并进去之前做个代码检查也请尽早的发送pull请求。

If you are unsure about whether or not you've found a bug, or want to check to see whether we'd be interested in the feature you want to add before you start working on it, feel free to post to our mailing list.

如果你不确定是否发现了bug,或者想看看我们是不是在开发你希望的特性，请发送邮件到邮件列表。

You can run our test suite in a few different ways:
你可以通过这几个途径来运行测试用例
1. Running `rake` will run the entire test suite excluding any unresolved issues
- 运行`rake` 将会运行所有的测试用例，除了那些没解决的bug
2. Running `rspec` will run the entire test suite including unresolved issues
- 运行`rspec`将会运行所有的测试用例，包含了那些没解决的bug
3. Running `rspec -t unresolved` will run *only* unresolved issues
- 运行`rspce -t unresolved` 将会只运行没解决的问题
4. Running `rspec -t issue:NUMBER` will run the tests for a specific issue
- 运行`rspec -t issue:NUMBER`将会运行指定的问题
These filters make it possible for us to add failing test cases for bugs that
are currently being researched or worked on, without breaking the typical
full suite run.
这些过滤器可以让我们轻松的为bug增加失败的测试用例, 不需要打断传统的全套测试用例。
## Maintenance team
## 维护团队
Prawn has always been heavily dependent on community contributions, with dozens
of people contributing code over the year. In that sense, the lines have
blurred to the point where we no longer have a strong distinction between core
developers and contributors.
Prawn依赖的是社区的贡献， 几十个人几年来贡献代码， 所以，看上去核心团队和贡献者之间的界限已经模糊了。
That said, there are a few folks who have been responsible for cutting releases,
merging important pull requests, and making major decisions about the
overall direction of the project. 
即便如此，这里有几个folks是用来裁剪发布，合并重要的功能，决定项目的方向。
### Current maintainers
### 当前的维护人员
These are the folks to contact if you have a maintenance-related issue with
Prawn:
如果你有维护相关的问题，请联系下面几个folk.
* Gregory Brown (sandal)
* Evan Sharp (PacketMonkey)
* Alexander Mankuta (cheba)
### Inactive maintainers
### 不活跃的维护人员
These folks have helped out in a maintenance role in the past, but are no longer
actively involved in the project:
这几个folk是用来维护以前的版本，在当前活跃的版本中已经不采纳的。
* Brad Ediger (bradediger)
* James Healy (yob)
* Daniel Nelson (Bluejade)
* Jonathan Greenberg (jonsgreen)
* Jamis Buck (jamis)
## License
## 版权
Prawn is released under a slightly modified form of the License of Ruby, allowing you to choose between Matz's terms, the GPLv2, or GPLv3. For details, please see the LICENSE, GPLv2, and GPLv3 files.
Prawn是在Ruby的版权的修订版，允许你在Matz's GPLv2 GPLv3中选择，详情请查阅相关文档。

If you contribute to Prawn, you will retain your own copyright but must agree to license your code under the same terms as the project itself.
如果你是prawn的贡献者，你可以保持自己的版权，但是必须同意你的代码作为项目的一部分在相同的版权下。
## History
## 历史
Prawn was originally developed by Gregory Brown, under the auspices of the Ruby
Mendicant Project, a grassroots initiative in which the Ruby community
collectively provided funding so that Gregory could take several months off of
work to focus on this project.
Prawn期初是由Gregory Brown开发的，在Ruby mendicant Project赞助下，这样他可以几个月专注于这件事。
Over the last several years, we've received code contributions from dozens of
people, which is amazing considering the low-level nature of this project. You can find the full list of folks 
who have at least one patch accepted to Prawn on github at https://github.com/prawnpdf/prawn/contributors
过去的几年中，我们已经收到几十个人的代码贡献，考虑到这个项目的底层的的天性，这真的是很神奇。你可以找到在https://github.com/prawnpdf/prawn/contributors 找到所有的人。

After a long hiatus, Gregory resumed slow-by-steady maintenance work on Prawn
starting in November 2013. This was made possible thanks to some modest
funding from Madriska, Inc. (Brad Ediger's company) to see the project
through to its 1.0 release.
经过长时间的空档期，从2013年11月Gregory重新开始了他Prawn的维护工作。 感谢来自Madriska,Inc的资金资助使得1.0发布

The fate of Prawn after 1.0 is uncertain, it's not a very easy project 
to maintain. That said, we hope it keeps moving along!
1.0以后的Prawn的命运就不确定，毕竟它不是一个特别容易维护的项目。即便如此，我们也希望它能走的更远。