---
layout: post
title:  "Document of Wkhtmltopdf in simple chinese"
date:   2014-03-22 11:31:59
categories: jekyll update
excerpt: "wkhtmltopdf是一个可以把html文档转化成pdf文档的程序，下面是它的手册"
---
# wkhtmltopdf 0.10.2 rc2 手册

<p>wkhtmltopdf是一个可以把html文档转化成pdf文档的程序，下面是它的手册</p>

## 联系方式

如果你想报告bug，或者有新的需求，请访问https://code.google.com/p/wkhtmltopdf/issues/list， 如果你有任何问题请联系我： http://www.madalgo.au.dk/~jakobt/#about

## 减掉的功能

wkhtmltopdf的有些版本和Qt的版本不一样，少了一些补丁，这些版本缺少一些特性，你可以通过wkhtmltopdf --version来确定你的版本，你可以使用稳定版本来获取所有的功能。

下面这些特性只在带补丁的QT版本中包含：

* 可以打印多个html文档到一个pdf中
* 运行时不需要x11服务
* 给pdf增加文档缩略图
* 增加页眉页脚
* 生成目录
* 增加链接
* 使用屏幕媒体类型来输出（Printing using the screen media type）
* 禁用webket的自动缩放功能

##许可证
版权 （c) 2010 wkhtmltopdf/wkhtmltoimage 作者。
许可证：GPLv3+: GNU GPL 版本3 或更高http://gnu.org/licenses/gpl.html。这是自由软件：你可以随便修改，重新发布。没有法律上的授权限制。

##作者
原作者：Jan Habermann, Christian Sciberras 和 Jakob Truelsen. 进一步修改的有Mehdi Abbad, Lyes Amazouz, Pascal Bach, Emmanuel Bouthenot, Benoit Garret 和 Mario Silva.

##大纲
```bash
wkhtmltopdf [全局选项]... [对象]... <输出文件>
```

##文档对象

wkhtmltopdf可以把一些对象放到输出的文档中（pdf）中，这里的对象可以是独立网页，封面页，或者目录。这些对象根据命令行里添加的顺序添加。选项可以基于对象指定，或者指定全局的选项。属于全局的选项只能放在全局选项的地方。

一个页面对象把单独的一个网页内容放到输出文件中。

```
(page)? <输入 url/文件名称> [页面选项]
```

页面对象的选项可以放到全局选项和页面选项区域。这些选项可以在Page Option和Header and footer options 找到。
一个封面对象把单页的内容放到输出文件，这个页面不出现在目录中，也没有页眉页脚。

```
cover <input url/文件名称> [页面选项]...
```

所有可以指定给页面对象的选项可以指定给封面。

目录对象插入一个目录到输出文档中。

```
toc [toc 选项]...
```

所有的可以指定给页面对象的选项也可以指定给目录对象，另外toc option专属的选项也可以被指定。 目录是通过XSLT生成的，这意味着你可以设定它的样式。你可以指定默认的xslt文件来帮你做这个事，使用选项 --dump-default-toc-xsl来获取这个xsl文档，以便帮助你建立自己的样式文件， 使用--dump-outline来支持轮廓（outline）, 看 outline options 部分。

##test table

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

##全局选项

参数 	 |详细参数          |	值格式  	| 说明
----| ----------------------- | -------- 	| ----------
         | --collate 		| 			| 当打印多份拷贝时校对（默认） 
         | --no-collate		|			| 当打印多份拷贝时不要校对
         | --cookie-jar		| <path\> 	| 提供的jar文件中读取或写入cookie
         | copies			| <number\> | 打印到pdf文件中的拷贝数（默认1）
-d,		 | --dpi 			| <dpi\> 	| 明确的指定dpi,(在基于x11的系统上无效)
-H,		 | --extended-help	| 	 		| 显示更全面的帮助，细节。
-g,		 | --grayscale		| 			| 黑白模式
-h,		 | --help 			| 			| 显示帮助
		 | --htmldoc		|			| 输出程序的html文档
		 | --image-dip*		| <integer\>| 当嵌入图片时指定dpi(默认600)
		 | --image-quality	| <integer\>| 压缩jpeg使用的压缩比(默认94)
-l, 	 | --lowquality 	|			| 生成低质量的pdf/ps,节省结果文档空间很有用。
		 | --manpage		| 			| 输出程序的手册
-B,		 | --margin-bottom	| <unitreal\>| 设置页面底部留白(默认10mm)
-L,		 | --margin-left	| <unitreal\>| 设置页面左边留白(默认10mm)
-R,		 | --margin-right	| <unitreal\>| 设置页面右边留白(默认10mm)
-T,		 | --margin-top		| <unitreal\>| 设置页面顶部留白(默认10mm)
-O,		 | --orientation	| <orientation\>| 设置页面方向，Landscape(横向)，或者Portrait(纵向)
 		 | --output-format 	| <format\>	| 指定输出格式，pdf或者ps, 不需要文件名后缀了
 		 | --page-height	| <unitreal\>| 页面高度
-s,		 | --page-size		| <Size\> 	| 设置页面大小，默认A4
 		 | --page-width		| <unitreal\>| 页面宽度
 		 | --no-pdf-compression*|		| 在pdf对象上不使用无损压缩
-q, 	 | --quiet			|			| 简化信息输出
 		 | --read-args-from-stdin|		| 从stdin(标准输入)读取参数
		 | --readme			|			| 输出程序的readme
		 | --title 			| <text\> 	| 指定生成文档的标题，如果没有指定第一个文档的标题会被使用。
		 | --use-xserver* 	| 			| 使用x server
-V, 	 | --version 		| 			| 输出版本信息。

带\*标记的是只在补丁版的QT中才能使用。

## 缩略图选项

| | | 说明
------------ | ------------ | -------- 	| ----------
		| --dump-default-toc-xsl* |		| 把默认的toc xsl输出到(stdout)标准输出
		| --dump-outline* 	| <文件\>	| 把默认的轮廓文件输出到一个指定的文件
		| --outline* 		| 			| 在生成的pdf中添加缩略图（默认）
		| --no-outline*		|			| 不使用缩略图
		| --outline-depth*	| <级别\> 	| 设置缩略图的深度，默认是4.

带\*标记的是只在补丁版的QT中才能使用。

##页面选项

|  	    |  		| 
------------ | ------------ | -------- 	| ----------
		| --allow					| <路径\>| 允许从指定的目录加载文件
		| --background 				|| 打印背景（默认）
		| --no-background 			|| 不打印背景
		| --checkbox-checked-svg	| <路径\>| 使用svg渲染选中的复选框
		| --checkbox-svg 			| <路径\>| 使用svg渲染一般的复选框
		| --cookie 					|| 设置额外的cookie (可重复的)
		| --custom-header			|| 设置额外的http头 (可重复的)
		| --custom-header-propagation|| 为每一个资源请求通过--custom-header增加http 头
		| --no-custom-header-propagation|| 不为每一个资源请求通过--custom-header增加http 头
		| --debug-javascript		|| 显示js的调试信息到stdout
		| --no-debug-javascript		|| 不显示js调试信息。
		| --default-header* 		|| 增加默认的页眉，总页数放到左边，当前页码放在右边，类似于 --header-left='[webpage]' --header-right='[page]/[toPage]' --top 2cm --header-line
		| --encoding				| <编码\>| 为输入指定默认的文本编码
		| --disable-external-links* || 不允许制作到远程web页面的链接
		| --enable-external-links*	|| 允许制作到远程web页面的链接
		| --disable-forms*			|| 不转化html的表单（默认）
		| --enable-forms*			|| 转化表单
		| --images				 	|| 加载打印图片（默认）
		| --no-images				|| 不加载打印图片
		| --disable-internal-links* || 不允许制作本地链接
		| --enable-internal-linkes* || 允许制作本地连接
		| --disable-javasript		|| 不允许web页面运行js
		| --enable-javascript		|| 允许web页面运行js
		| --javasript-delay			| <毫秒\>| 等待js运行完成 默认200ms
		| --load-error-handling		| <处理方法\>| 指定页面如何处理页面加载失败的情况 忽略或者跳过或者终止（默认终止）
		| --disable-local-file-access|| 不允许读取本地文件，除非显式使用--allow
		| --enable-local-file-access|| 允许读取本地文件。
		| --minimum-font-size		| <整数\>| 最小文字大小
		| --exclude-from-outline*	|| 不要把这个页面包含到目录或者缩略图里
		| --include-in-outine*		|| 在目录或者缩略图里包含此页（默认）
		| --page-offset				| <偏移量\> | 设置起始页码（默认0）
		| --password				| <密码\> | http认证密码
		| --disable-plugins			|| 不允许安装插件 默认
		| --enable-plugins			|| 允许安装插件， 但插件可能不工作
		| --post 					| <名称\> <值\>| 增加一个额外的post域，可重复
		| --post-file 				| <名称\> <值\>| 增加一个额外的文件，可重复
		| --print-media-type* 		|| 使用打印的媒体类别代替屏幕
		| --no-print-media-type* 	|| 不使用打印的媒体类别代替屏幕
		| --proxy 					| <代理\>| 使用代理
		| --radiobutton-checked-svg | <路径\>| 渲染单选框选中时使用svg
		| --radiobutton-svg 		| <路径\>| 渲染单选框未选中时使用svg
		| --run-script 				| <js\>| 当页面加载完成时运行额外的js
		| --disable-smart-shrinking*|| 不允许智能缩放，使得像素/dpi不固定
		| --enable-smart-shrinking  || 允许智能缩放（默认）
		| --stop-slow-scripts 		|| 终止一直在运行的js
		| --no-stop-slow-scripts 	|| 不终止一直在运行的js
		| --disable-toc-back-links* || 不允许从小结的头链接到目录 （默认）
		| --enable-toc-back-links* 	|| 允许从小结头部链接到目录
		| --user-style-sheet		| <url\>| 指定用户样式表，为每一页加载
		| --username				| <用户名\>| http认证的用户名
		| --window-status			| <windowStatus\>| 等待window.status直到这个值，才开始渲染页面
		| --zoom					| <浮点型\> | 使用缩放因子，默认1

带\*标记的是只在补丁版的QT中才能使用。

##页眉页脚选项

|  	    |  		| 
------------ | ------------ | -------- 	| ----------
|--footer-center*| <text\>| 页脚居中的文本
|--footer-font-name| <name\>| 设置页脚字体名称，默认Arial
|--footer-font-size| <size\>| 设置页脚字体大小，默认12
|--font-html*| <url\>| 增加一个html的页脚
|--footer-left*| <text\>| 页脚左对齐的文本
|--footer-line*| <text\>| 在页脚上面显示一条线
|--no-footer-line*|| 在页脚上不显示线
|--footer-right*| <text\>| 页脚右对齐的文本
|--footer-spacing*|<real\>| 页脚和内容之间的空间，单位mm 默认0
|--header-center*|<text\>| 页眉居中的文本
|--header-font-name|<name\>| 页眉字体名称，默认Arial
|--header-font-size*|<size\>| 页眉字体大小 默认12
|--header-html*|<url\>| 增加一个html的页眉
|--header-left*|<text\>| 页眉左对齐的文本
|--header-line*|| 页眉下显示分割线
|--no-header-line*|| 页眉下不显示分割线
|--header-right*|<text\>| 页眉右对齐的文本
|--header-spacing|<real\>| 页眉和内容之间的空间 单位mm 默认0
|--replace*|<name\> <vlaue\>| 用value代替name,在页眉页脚中。

##目录选项

|--disable-dotted-lines*||不允许使用虚线
|--toc-header-text*|<text\>| 目录的文本，默认Table of Content.
|--toc-level-indentation*|<width\>| 目录中每一级的缩进，默认1em
|--disable-toc-links*|| 不允许从目录链接到内容
|--toc-text-size-shrink*|<real\>| 目录中每一级字体的缩放，默认0.8
|--xsl-style-sheet*|<file\>| 使用支持的xsl样式来打印目录

##使用代理

默认情况下，代理可以从环境变量proxy,all_proxy和http_proxy中读取，也使用-p来指定代理

```
<type> := "http://" | "socks5://"
<serif> := <username> (":" <password>)? "@"
<proxy> := "None" | <type>? <sering>? <host> (":" <port>)?
```

这里有几个例子。

```
http://user:password@myproxyserver:8080
socks5://myproxyserver
None
```

##页眉和页脚

使用--header-*和--footer-*参数可以把页眉页脚添加到文档中，在页眉页脚中支持一些文本字符串，例如--header-left下面这些变量将会被替换

* *[page] 被打印的当前页码(index)代替
* *[frompage] 被打印的第一页码代替
* *[topage] 被打印的最后一页码代替
* *[webpage] 页面的url代替
* *[section] 被当前section的名字代替
* *[subsection] 被当前的子部分名字代替
* *[date] 被系统的日期格式替换当前日期代替
* *[time] 被系统当前时间代替
* *[title] 被当前页面的标题代替
* *[doctitle] 被输出文档的标题代替。

像在一个例子中指定了

```
--header-right "Page [page] of [toPage]"
```

将会产生Page x of y, 这里x是当前页面的页码，y是最后一页的页码，出现在页面的右上角。
页眉页脚也支持html文档，上面的例子类似于下面的这个html

```html
<html><head><script>
function subst() {
  var vars={};
  var x=document.location.search.substring(1).split('&');
  for (var i in x) {var z=x[i].split('=',2);vars[z[0]] = unescape(z[1]);}
  var x=['frompage','topage','page','webpage','section','subsection','subsubsection'];
  for (var i in x) {
    var y = document.getElementsByClassName(x[i]);
    for (var j=0; j<y.length; ++j) y[j].textContent = vars[x[i]];
  }
}
</script></head><body style="border:0; margin: 0;" onload="subst()">
<table style="border-bottom: 1px solid black; width: 100%">
  <tr>
    <td class="section"></td>
    <td style="text-align:right">
      Page <span class="page"></span> of <span class="topage"></span>
    </td>
  </tr>
</table>
</body></html>
```

从这个例子可以看出，可以传参数进入页眉页脚的html文档中。

##缩略图
带有qt补丁的wkhtmltopdf支持pdf缩略图，像书签一样。可以使用--outline来进行开关。缩略图是基于<h*\>标签产生。更深入的描述请看目录部分
缩略图有时候可能很深，如果<h*\>标签有很多层次，可以使用--outline-depth控制边界。

##目录
可以在命令行增加一个toc来给pdf增加目录。例如

```
wkhtmltopdf toc http://doc.trolltech.com/4.6/qstring.html qstring.pdf
```

这个目录基于h标签(例如<h1\><h2\>)来生成的，首先生成一个xml,然后使用xslt转换成html.

生成的xml文档可以使用--dump-outline输出来看。

```
wkhtmltopdf --dump-outline toc.xml http://doc.trolltech.com/4.6/qstring.html qstring.pdf
```

xslt文档可以用--xsl-style-sheet来指定。

```
wkhtmltopdf toc --xsl-style-sheet my.xsl http://doc.trolltech.com/4.6/qstring.html qstring.pdf
```

--dump-default-toc-xsl可以用来获取默认的xslt样式文件到标准输出，这是你写自己的样式的一个好的开始。

```
wkhtmltopdf --dump-default-dox-xsl
```

这个xml文档是在http://code.google.com/p/wkhtmltopdf/outline的名字空间内，它有一个根节点叫“outline”,这个节点包含了很多“item”节点。一个“item”可以包含别的“item”，这些是缩略图的子部分。一个“item”有如下的属性
* title 这个小结的名字
* page 这个小结的页码
* link 这个小结的链接
* backLink 连回的一个名字
提醒：toc选项只使用默认的样式表，所以自定义的样式表不起作用的。

##分页
webket 现有的分页算法还有很多待改进的地方。webkit把所有的东西都渲染到一个长的页面里。然后把他们裁分到几个页面。这意味着如果你有两列文本，其中一个正好被半行切分。webkit将把这行切成两部分，一部分在上页，一部分在下页。它也会把图片切分到两页里面。如果你使用补丁版的QT,你可以使用css属性page-break-inside来做几分补救。这不是一个简单的解决方案，除非能组织你的html文档在每一个页面能干净利落的切分。

可以看看http://code.google.com/p/wkhtmltopdf/issues/detail?id=9, http://code.google.com/p/wkhtmltopdf/issues/detail?id=33 and http://code.google.com/p/wkhtmltopdf/issues/detail?id=57.

##页面尺寸
默认的页面大小是A4, 但是使用--page-size选项，页面大小可以被修改成几乎任意大小。例如：A3, Letter 或者Legal. 支持的全尺寸可以看
http://doc.trolltech.com/4.6/qprinter.html#PageSize-enum.
想更精细的控制页面大小，可以使用--page-height和--page-width选项。

##从标准输入读取参数
如果你需要批量转化很多页面，而且你觉得wkhtmltopdf启动太慢，你应该试试 --read-args-from-stdin.
当--read-args-from-stdin 的stdin输入的每一行送到wkhtmltopdf，都会被当成一次wkhtmltopdf的调用， 把这一行指定的参数合并到wkhtmltopdf的参数中。
例如可以这样来做：

```
echo "http://doc.trolltech.com/4.5/qapplication.html qapplication.pdf" >> cmds
echo "cover google.com http://en.wikipedia.org/wiki/Qt_(toolkit) qt.pdf" >> cmds
wkhtmltopdf --read-args-from-stdin --book < cmds
```

##稳定版本
在wkhtmltopdf网站 你可以下载一个稳定的版本http://code.google.com/p/wkhtmltopdf/downloads/list。 稳定的二进制版本可以工作在大部分的系统上，而且是带了打过补丁的QT.
不幸的是稳定版本不是特别的稳定，在linux系统上，他依赖glibc和openssl， 还有你将需要有一个xserver 但是不需要运行。你可能需要不同的字体包含xfonts-scalable（type1)和msttcorefonts. 看看这里http://code.google.com/p/wkhtmltopdf/wiki/static 有针对的问题。

##编译
如果正好因为某种原因稳定的二进制版本在你的系统上不能工作，你可能需要自己编译一下wkhtmltopdf。
GNU/LINUX:
编译之前你需要安装依赖：x11, gcc, git 还有openssl. 在Debian/Ubuntu 可以通过如下的命令

```
sudo apt-get build-dep libqt4-gui libqt4-network libqt4-webkit
sudo apt-get install openssl build-essential xorg git-core git-doc libssl-dev
```

另一方面，你必须使用自己的包管理器， 包的名字可能不一样。
首先你必须签出QT的修订版。

```
git clone git://gitorious.org/+wkhtml2pdf/qt/wkhtmltopdf-qt.git wkhtmltopdf-qt
```

接着你必须配置 编译，安装QT, 注意，这将花费一些时间，取决于你使用什么参数来配置qt.

```
cd wkhtmltopdf-qt
./configure -nomake tools,examples,demos,docs,translations -opensource -prefix ../wkqt
make -j3
make install
cd ..
```

现在要做的就是编译wkhtmltopdf。

```
git clone git://github.com/antialize/wkhtmltopdf.git wkhtmltopdf
cd wkhtmltopdf
../wkqt/bin/qmake
make -j3
```

现在你可以看到再当前的目录下面已经有可以用的wkhtmltopdf。 你可以可选择的安装它，通过：

```
make install
```

##其他操作系统和高级特性
如果你想在不同的操作系统编译，可以看看http://code.google.com/p/wkhtmltopdf/wiki/compilation.
##安装
安装wkhtmltopdf有几种方式，你可以下载已经编译好的二进制文件，你也可以自己编译。 在windows系统下，最简单的安装方式是下载最新的安装器。在linux你可以下载最新的稳定版本，然而，你仍然需要安装其他一些软件。如果想知道更多的细节，请阅读手册的稳定版本部分。

##例子
这个部分展示了几个例子来演示怎样调用wkhtmltopdf。
转换远端的html到pdf:

```
wkhtmltopdf http://www.google.com google.pdf
```

转换本地的html到pdf:

```
wkhtmltopdf my.html my.pdf
```

你也可以转换ps文件，如果你愿意的话

```
wkhtmltopdf my.html my.ps
```

生产eler2.pdf样本文件

```
wkhtmltopdf -H  http://geekz.co.uk/lovesraymond/archive/eler-highlights-2008 eler2.pdf
```

使用目录打印一本书。

```
wkhtmltopdf -H cover cover.html toc chapter1.html chapter2.html chapter3.html book.pdf
```
