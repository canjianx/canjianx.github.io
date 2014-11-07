---
layout: post
title:  "atom 文档 自定义Atom"
date:   2014-08-15 12:31:59
categories: node.js atom
excerpt: "atom 文档，自定义atom"
src: https://github.com/canjianx/atom
---

要修改设置，配置外观，安装包，只要在在当前窗口按`cmd-,`来打开配置视图。

## 修改外观

Atom自带了明亮和较暗的外观，和几个语法高亮外观，你也可以制作自己的外观。

打开设置视图，在左边选在`Themes`,  你可以通过下来菜单来选在语法和整体的外观。

你也可以在这里安装更多的外观包。

## 安装包

你可以安装没有打包的安装包，在左边打开`Packages`面板。你可以看到几个新的包，你也可以在这里搜索，发布在[atom.io](http://atom.io/packages)的包列在这里。

你也可以在命令行通过`apm`来安装包

之前先确定一下你是否安装了`apm`，在终端：

```sh
apm help install
```

你应该看奥关于`apm install`命令的细节。

如果没有看到，打开Atom运行`_Atom > Install Shell Commands_` 然后安装`apm`和`atom`命令。

可以使用`apm install`来安装包，命令如下：

* `apm install <package_name>` 安装最新版本
* `apm install <package_name@package_version>` 安装特定的版本。

例如`apm install emmet@0.1.5`就是安装[Emmet](https://github.com/atom/emmet)包的`0.1.5`版本到`~/.atom/packages`.

你也可以使用`apm`来找新包并安装：

* `apm search coffee` 是找CoffeeScript的包。
* `apm view emmet` 是查看一个包的详细信息。

## 自定义快捷键

Atom的按键映射和样式表一样，就像样式通过使用选择器把样式应用到元素上，Atom按键映射使用选择器来关联按键和消息。这里是一个例子，摘自Atom的内建按键映射：

```coffee
'.editor':
 'enter': 'editor:newline'

'mini.editor input'
 'enter': 'core:confirm'
```

这个按键映射定义了两种不同情况下回车键的含义。在一遍的编辑器，按下`enter`触发`editor:newline`的事件，它能让编辑器插入新的一行。如果同样的按键发
生在包含一个小型的选择框列表下，它就触发一个基于绑定在更特殊的选择器上的`core.confirm`事件。

默认情况下， `~/.atom/keymap.cson`在Atom启动的时候载入。它总是在最后被载入，给你一个机会重写这个绑定，使用定义在Atom核心按键映射或者第三方的包。

你可以在`_Atom > Open Your Keymap_`菜单打开这个文件。

你可以能想知道所有有效的命令，打开设置视图，然后选择`_keybindings_`，可以显示所有的当前使用的按键映射。

## 高级设置

Atom从你的Atom目录的`config.cson`来载入配置的。它包含了[CoffeeScript风格的JSON][cson](CSON):

```coffee
"core":
  "excluedVcsIgnoredPaths": true
"editor":
  "fontSize": 18
```

配置内容用包的名称或者两个核心的名字`core`和`editor`来划分。

### 配置按键引用

- `core`
  - `disabledPackages`: 禁用的一组包的名称，数组
  - `excludeVcsIgnoredPaths`: 不要搜索包含在_.gitigore_中的文件
  - `ignoredNames`: Atom通盘忽略的文件名
  - `projectHome`: 假设的工程目录
  - `themes`: 加载的一系列外观的名字，数组，按照级联的顺序?
- `editor`
  - `autoIndent`: 启用/禁用基本的自动缩进 默认为`true`
  - `nonWordCharacters`: 不是单词的一个字符串，来定义单词边界
  - `fontSize`: 编辑器的字体大小
  - `fontFamily`: 编辑器的字体样式
  - `invisibles`: 为不可见特殊字符渲染定义的映射表 Specify characters that Atom renders for invisibles in this hash
      - `tab`: tab键字符 Hard tab characters
      - `cr`: 回车符 Carriage return (for Microsoft-style line endings)
      - `eol`: `\n` characters
      - `space`: 空格 Leading and trailing space characters
  - `normalizeIndentOnPaste`: 启用/禁用粘贴进入的tabs转换成空格 Enable/disable conversion of pasted tabs to spaces
  - `preferredLineLength`: 一行的长度 默认是`80` Identifies the length of a line (defaults to `80`)
  - `showInvisibles`: 是否给不可见字符留位置，渲染的时候。默认是`false` Whether to render placeholders for invisible characters (defaults to `false`)
  - `showIndentGuide`: 显示/隐藏光标 Show/hide indent indicators within the editor
  - `showLineNumbers`: 显示/隐藏行号 Show/hide line numbers within the gutter
  - `softWrap`: 显示/隐藏编辑器内的折行 Enable/disable soft wrapping of text within the editor
  - `softWrapAtPreferredLineLength`: 显示/隐藏 定义在`preferredLineLength`的折行 Enable/disable soft line wrapping at `preferredLineLength`
  - `tabLength`: tab占的空格数，默认是2 Number of spaces within a tab (defaults to `2`)
- `fuzzyFinder` 模糊查找
  - `ignoredNames`: *只在*模糊查找中忽略的文件 Files to ignore *only* in the fuzzy-finder
- `whitespace`
  - `ensureSingleTrailingNewline`: 是否减少文件末尾的多个新行 Whether to reduce multiple newlines to one at the end of files
  - `removeTrailingWhitespace`: 启用/禁用在行末尾加上标记。 Enable/disable striping of whitespace at the end of lines (defaults to `true`)
- `wrap-guide` 折行纲领
  - `columns`: 带有`pattern`和`column`键的hash，来匹配当前编辑框和列的位置。hash的数组 Array of hashes with a `pattern` and `column` key to match the
     the path of the current editor to a column position.

### 快速个人修改

### init.coffee

When Atom finishes loading, it will evaluate _init.coffee_ in your _~/.atom_
directory, giving you a chance to run arbitrary personal [CoffeeScript][] code to
make customizations. You have full access to Atom's API from code in this file.
If customizations become extensive, consider [creating a package][creating-a-package].

当Atom加载完成，它会模拟一个_init.coffee_在你的_~/.atom_目录，给你一个机会运行自己的代码，你可以在这个文件中访问atom的api。如果自定义变得昂贵了，考虑
考虑建个包来做这个事。

You can open this file in an editor from the _Atom > Open Your Init Script_
menu.

可以通过在编辑器_Atom > Open Your Init Script_菜单打开这个文件

For example, if you have the Audio Beep configuration setting enabled, you
could add the following code to your _~/.atom/init.coffee_ file to have Atom
greet you with an audio beep every time it loads:

例如，如果你想启用有声音提示的设置，你可以加下面的代码到你的`_~/.atom/init.coffee_`让Atom在加载的时候用声音来你

```coffee
atom.beep()
```

This file can also be named _init.js_ and contain JavaScript code.

这个文件也可以命名为_init.js_然后包含javascript代码。

### styles.less

### styles.less

If you want to apply quick-and-dirty personal styling changes without creating
an entire theme that you intend to publish, you can add styles to the
_styles.less_ file in your _~/.atom_ directory.

如果你想快速直接的修改样式，而不是一整套的外观发布，你可以在文件_styles.less中加一些样式。

You can open this file in an editor from the _Atom > Open Your Stylesheet_ menu.

可以通过_Atom > Open your Stylesheet_菜单来做这件事

For example, to change the color of the cursor, you could add the following
rule to your _~/.atom/styles.less_ file:

例如，修改光标的颜色，你可以增加下面的规则到 _~/.atom/styles.less_文件:

```less
.editor.is-focused .cursor {
  border-color: pink;
}
```

Unfamiliar with LESS? Read more about it [here][LESS].

不熟悉LESS? 更多的可以看[这里][LESS]

This file can also be named _styles.css_ and contain CSS.

这个文件也可以额命名成_styles.css_然后包含css

[creating-a-package]: creating-a-package.md
[create-theme]: creating-a-theme.md
[LESS]: http://www.lesscss.org
[CSON]: https://github.com/atom/season
[CoffeeScript]: http://coffeescript.org/
