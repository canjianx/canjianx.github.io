---
layout: post
title:  "Handlebars Cn Document"
date:   2014-03-28 11:31:59
excerpt: "Handlebars 能让你很容易的建立有效的语义化的模板。"
---


Handlebars 能让你很容易的建立有效的语义化的模板。

Mustache 模板和Handlebars兼容，所以你可以使用Mustache模板，导入到Handldbars中，然后开始使用Handlebars的其他高级功能。

## 开始

Handlebars模板看上去像一般的HTML, 嵌入了handlebars表达式

```html
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>
```

Handlebars表达式是包含在“\{\{\}\}”的，例如\{\{内容\}\}。

你可以把模板放到<script>标签中以便传给浏览器

```html
<script id="entry-template" type="text/x-handlebars-template">
  template content
</script>
```

在javascript中使用`Handlebars.compile`来编译模板。

```javascript
var source = $("#entry-template").html();
var template = Handlebars.compile(source);
```

预编译模板也可以。它可以产生一个更小的需要的运行时库而且省下了浏览器中的编译时间。这在移动设备中是很重要的。

通过内容和模板的结合来获取HTML结果

```
var context = {title: "My New Post", body: "This is my first post!"}
var html = template(context);
```

结果是

```
<div class="entry">
  <h1>My New Post</h1>
  <div class="body">
    This is my first post!
  </div>
</div>
```

## HTML转码

使用\{\{表达式\}\}返回的html是转码过的HTML. 如果你不希望Handlebars转码，就使用三重大括号，`\{\{\{\}\}\}`

```html
<div class="entry">
  <h1>\{\{title\}\}</h1>
  <div class="body">
    \{\{\{body\}\}\}
  </div>
</div>
```

和这样的内容结合

```javascript
{
  title: "All about <p> Tags",
  body: "<p>This is a post about &lt;p&gt; tags</p>"
}
```

结果是

```
<div class="entry">
  <h1>All About &lt;p&gt; Tags</h1>
  <div class="body">
    <p>This is a post about &lt;p&gt; tags</p>
  </div>
</div>
```

Handlebars不会对`Handlebars.SafeString`转码。如果你写一个产生html的帮助函数，你将会经常使用这样的代码`new Handlebars.SafeString(result)`。 这样的环境下，你将会想手动包装参数（使用HTML标签包装）

```javascript
Handlebars.registerHelper('link', function(text, url) {
  text = Handlebars.Utils.escapeExpression(text);
  url = Handlebars.Utils.escapeExpression(url);
  var result = '<a href="' + url + '">' + text + '</a>';
  return new Handlebars.SafeString(result);
});
```

这个函数将会包装传入的参数，但是让返回值安全，这样Handlebars将 不会对它做转码，即使"\{\{\{\}\}\}"没使用。

## 块表达式

块表达式可以让你定义一个帮助函数，它可以使用非当前的数据来调用一段模板。让我们看下面产生列表的例子：

```
\{\{#list people\}\}
    \{\{firstName\}\} \{\{lastName\}\}
\{\{/list\}\}
```

如果我们有下面的数据：

```javascript
{
  people: [
    {firstName: "Yehuda", lastName: "Katz"},
    {firstName: "Carl", lastName: "Lerche"},
    {firstName: "Alan", lastName: "Johnson"}
  ]
}
```

我们创建了一个名字为list的帮助函数，用来创建我们的HTML列表。这个帮助函数接收`people`为第一个参数， 和一个选项对象为第二个参数。这个选项包含一个属性叫`fn`。你可以像普通的Handlebars模板一样调用它。

```javascript
Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";
  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }
  return out + "</ul>";
});
```

运行后，模板将会被渲染成：

```
<ul>
  <li>Yehuda Katz</li>
  <li>Carl Lerche</li>
  <li>Alan Johnson</li>
</ul>
```

块表达式有更多的特性，例如可以创建一个else块（例如，在内建的if帮助函数)

因为当你在块函数调用`options.fn(context)`时内容是转码过的。 Handlebars就不再对块函数返回值再做转码。 如果做了，内部的内容就经过了两次转码了。

## Handlebars目录结构。

Handlebars支持简单的目录结构，像Mustache.

```
<p>\{\{name\}\}</p>
```

Handlebars还支持嵌套的目录，使查找下面这种嵌套的属性成为可能。

```html
<div class="entry">
  <h1>\{\{title\}\}</h1>
  <h2>By \{\{author.name\}\}</h2>
  <div class="body">
    \{\{body\}\}
  </div>
</div>
```

配套的数据内容为

```javascript
var context = {
  title: "My First Blog Post!",
  author: {
    id: 47,
    name: "Yehuda Katz"
  },
  body: "My first post. Wheeeee!"
};
```

这样就使Handlebars 模板使用更多的原始的JSON.

嵌套的Handlebars目录还能使用"../", 代表父节点。

```html
<h1>Comments</h1>
<div id="comments">
  \{\{#each comments\}\}
  <h2><a href="/posts/\{\{../permalink\}\}#\{\{id\}\}">\{\{title\}\}</a></h2>
  <div>\{\{body\}\}</div>
  \{\{/each\}\}
</div>
```

虽然这个链接是在comments块内，但它可以回到父级去获取它的永久链接。

`../`是引用了父级的模板域，而不是升级到内容的上一级目录中。是因为块级帮助函数可以调用任意的内容，所以上升一级目录的描述不如引用父级模板域贴切。

Handlebars还允许使用`this`来解决数据域和帮助函数之间的名字冲突。

```html
<p>\{\{./name\}\} or \{\{this/name\}\} or \{\{this.name\}\}</p>
```

上面任何一种表述都会调用数据当前路径中的name，而不是帮助函数中同名的变量。

## 使用\{\{!\}\} 或者 \{\{!-- --\}\}来做注释

你可以在Handlebars模板中像在代码中一样使用注释。因为这是几个级别的逻辑，所以这个是个好的实践。

```html
<div class="entry">
  \{\{! only output this author names if an author exists \}\}
  \{\{#if author\}\}
    <h1>\{\{firstName\}\} \{\{lastName\}\}</h1>
  \{\{/if\}\}
</div>
```

这里的注释是不会出现在结果输出中，如果你想显示，只能使用html的注释，它们会被输出。

```
<div class="entry">
  \{\{! This comment will not be in the output \}\}
  <!-- This comment will be in the output -->
</div>
```

如果注释中想包含任何Handlebars的关键字例如`\}\}`应该使用`\{\{!--内容--\}\}`。

## 帮助函数

Handlebars帮助函数可以访问模板关联的任何数据。你可以使用`Handlebars.registerHelper`来注册一个帮助函数

```html
<div class="post">
  <h1>By \{\{fullName author\}\}</h1>
  <div class="body">\{\{body\}\}</div>
  <h1>Comments</h1>
  \{\{#each comments\}\}
  <h2>By \{\{fullName author\}\}</h2>
  <div class="body">\{\{body\}\}</div>
  \{\{/each\}\}
</div>
```

使用的数据和帮助函数

```javascript
var context = {
  author: {firstName: "Alan", lastName: "Johnson"},
  body: "I Love Handlebars",
  comments: [{
    author: {firstName: "Yehuda", lastName: "Katz"},
    body: "Me too!"
  }]
};
Handlebars.registerHelper('fullName', function(person) {
  return person.firstName + " " + person.lastName;
});
```

结果是

```html
<div class="post">
  <h1>By Alan Johnson</h1>
  <div class="body">I Love Handlebars</div>
  <h1>Comments</h1>
  <h2>By Yehuda Katz</h2>
  <div class="body">Me Too!</div>
</div>
```

帮助函数接收当前的数据域为函数的this域。

```html
<ul>
  \{\{#each items\}\}
  <li>\{\{agree_button\}\}</li>
  \{\{/each\}\}
</ul>
```

当使用的数据和帮助函数是这样的：

```javascript
var context = {
  items: [
    {name: "Handlebars", emotion: "love"},
    {name: "Mustache", emotion: "enjoy"},
    {name: "Ember", emotion: "want to learn"}
  ]
};
Handlebars.registerHelper('agree_button', function() {
  return new Handlebars.SafeString(
    "<button>I agree. I " + this.emotion + " " + this.name + "</button>"
  );
});
```

结果为:

```html
<ul>
  <li><button>I agree. I love Handlebars</button></li>
  <li><button>I agree. I enjoy Mustache</button></li>
  <li><button>I agree. I want to learn Ember</button></li>
</ul>
```

如果你的帮助函数返回的HTML不想被转码，请确保返回一个新的`Handlebars.SafeString`。

## 内建的帮助函数

### `with` 块帮助函数

一般情况下， Handlebars模板对应相应的数据传入编译函数

```javascript
var source = "<p>\{\{lastName\}\}, \{\{firstName\}\}</p>";
var template = Handlebars.compile(source);
template(\{firstName: "Alan", lastName: "Johnson"\});
```

结果是

```html
<p>Johnson, Alan</p>
```

你可以使用内建的`with`块级帮助函数把内容转到一个特定的模板中。

```html
<div class="entry">
  <h1>\{\{title\}\}</h1>
  \{\{#with author\}\}
  <h2>By \{\{firstName\}\} \{\{lastName\}\}</h2>
  \{\{/with\}\}
</div>
```

数据为：

```javascript
{
  title: "My first post!",
  author: {
    firstName: "Charles",
    lastName: "Jolley"
  }
}
```

结果为：

```html
<div class="entry">
  <h1>My first post!</h1>
  <h2>By Charles Jolley</h2>
</div>
```

### `each` 块帮助函数

可以使用内建的`each`帮助函数来遍历一个列表。在块内，你可以使用this来代表正在遍历的元素。

```html
<ul class="people_list">
  \{\{#each people\}\}
  <li>\{\{this\}\}</li>
  \{\{/each\}\}
</ul>
```

使用的数据：

```javascript
{
  people: [
    "Yehuda Katz",
    "Alan Johnson",
    "Charles Jolley"
  ]
}
```

结果为

```html
<ul class="people_list">
  <li>Yehuda Katz</li>
  <li>Alan Johnson</li>
  <li>Charles Jolley</li>
</ul>
```

你可以在任意域中使用this来引用当前域。

你可以选择使用`\{\{else\}\}` 部分来显示列表为空的时候该显示的内容。

```html
\{\{#each paragraphs\}\}
  <p>\{\{this\}\}</p>
\{\{else\}\}
  <p class="empty">No content</p>
\{\{/each\}\}
```

在`each`中遍历元素时，你可以有选择的引用当前循环的索引，使用`\{\{@index\}\}`

```html
\{\{#each array\}\}
  \{\{@index\}\}: \{\{this\}\}
\{\{/each\}\}
```

如果是对象遍历器，`\{\{@key\}\}`代表当前的`key`名字：

```html
\{\{#each object\}\}
  \{\{@key\}\}: \{\{this\}\}
\{\{/each\}\}
```

在数组循环中第一个和最后一个可以使用`@first`和`@last`来标记，在对象中循环，只有`@first`有效。

### `if` 块级帮助函数

可以使用`if` 帮助函数来有选择的渲染一个块。如果它的参数是`false`, `undefined`, `null`, `""`, 或者 `[]` (一个假值）， Handlerbars将不渲染这个块。

```html
<div class="entry">
  \{\{#if author\}\}
  <h1>\{\{firstName\}\} \{\{lastName\}\}</h1>
  \{\{/if\}\}
</div>
```

如果使用空的数据， `author`将会是`undefined`，那么结果就是：

```html
<div class="entry">
</div>
```

当使用一个块表达式，你可以为表达式返回一个假值指定一个模板域。这个域，被叫做其他域，使用`\{\{else\}\}`。

```html
<div class="entry">
  \{\{#if author\}\}
    <h1>\{\{firstName\}\} \{\{lastName\}\}</h1>
  \{\{else\}\}
    <h1>Unknown Author</h1>
  \{\{/if\}\}
</div>
```

### `unless` 块帮助函数

可以会用`unless`帮助函数作为`if`帮助函数的一个反例。它返回假值时渲染块。

```html
<div class="entry">
  \{\{#unless license\}\}
  <h3 class="warning">WARNING: This entry does not have a license!</h3>
  \{\{/unless\}\}
</div>
```

如果发现当前域的`license`是假值，  Handlebars将会显示这个警告。不然就啥都不显示。

### `log`块级帮助函数

`log`帮助函数可以帮助做记录来记录数据的状况，在执行模板的时候。

```html
\{\{log "Look at me!"\}\}
```

委托给`Handlebars.logger.log`。这个函数是可以被重写的。

## 内建的工具函数

Handlebars为帮助函数提供了大量的工具函数， 它们都在`Handlebars.Util`作用域下

