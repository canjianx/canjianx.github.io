dnode is an asynchronous rpc system for node.js that lets you call remote functions.

dnode是为node.js量身定做的异步远程调用系统，能让你调用远程机器的函数。

You can pass callbacks to remote functions, and the remote end can call the functions you passed in with callbacks of its own and so on. It's callbacks all the way down!

你可以传递一个回调函数给远程函数，远程函数运行完了可以调用你传递的函数。

## example

### listen and connet

server:

```javascript
var dnode = require('dnode');
var server = dnode({
    transform : function (s, cb) {
        cb(s.replace(/[aeiou]{2,}/, 'oo').toUpperCase())
    }
});
server.listen(5004);
```

client 

```javascript
var dnode = require('dnode');

var d = dnode.connect(5004);
d.on('remote', function (remote) {
    remote.transform('beep', function (s) {
        console.log('beep => ' + s);
        d.end();
    });
});
```

输出：
```
$ node server.js &
[1] 27574
$ node client.js
beep => BOOP
```
## streaming

The .connect() and .listen() calls in the previous example are just convenience methods for piping to and from readable/writable streams. Here's the previous example with the streams set up explicitly:

前面的例子中的connect和linsten函数调用只是一个联通读写流的简单方法。下面是前面例子使用流的方法。

服务端

```javascript
var dnode = require('dnode');
var net = require('net');

var server = net.createServer(function (c) {
    var d = dnode({
        transform : function (s, cb) {
            cb(s.replace(/[aeiou]{2,}/, 'oo').toUpperCase())
        }
    });
    c.pipe(d).pipe(c);
});

server.listen(5004);
```

客户端

```javascript
var dnode = require('dnode');
var net = require('net');

var d = dnode();
d.on('remote', function (remote) {
    remote.transform('beep', function (s) {
        console.log('beep => ' + s);
        d.end();
    });
});

var c = net.connect(5004);
c.pipe(d).pipe(c);
```

输出
```
$ node server.js &
[1] 27586
$ node client.js 
beep => BOOP
```

浏览器中的dnode
Since dnode instances are just readable/writable streams, you can use them with any streaming transport, including in the browser!
因为dnode 实例只是读写流，所以你可以和任何流传输使用，包括浏览器

This example uses the streaming interface provided by shoe, which is just a thin wrapper on top of sockjs that provides websockets with fallbacks.

这个例子使用shoe提供的流接口，shoe只是提供websockets的功能的sockjs的一个包装。

First whip up a server:
首先起个服务

```javascript
var http = require('http');
var shoe = require('shoe');
var ecstatic = require('ecstatic')(__dirname + '/static');
var dnode = require('dnode');

var server = http.createServer(ecstatic);
server.listen(9999);

var sock = shoe(function (stream) {
    var d = dnode({
        transform : function (s, cb) {
            var res = s.replace(/[aeiou]{2,}/, 'oo').toUpperCase();
            cb(res);
        }
    });
    d.pipe(stream).pipe(d);
});
sock.install(server, '/dnode');
```

Then write some browser code:

然后写一些浏览器的代码：

```javascript
var domready = require('domready');
var shoe = require('shoe');
var dnode = require('dnode');

domready(function () {
    var result = document.getElementById('result');
    var stream = shoe('/dnode');

    var d = dnode();
    d.on('remote', function (remote) {
        remote.transform('beep', function (s) {
            result.textContent = 'beep => ' + s;
        });
    });
    d.pipe(stream).pipe(d);
});
```

Install the dependencies for this example then compile the browser code with browserify:

安装这个例子的依赖库，然后编译用browserify来编译浏览器代码。

```javascript
$ npm install dnode shoe domready ecstatic
$ npm install -g browserify
$ browserify client.js -o static/bundle.js
```

现在在index.html中增加一个：

```html
<script src="/bundle.js"></script>
<div id="result"></div>
```

然后访问http://localhost:9999,你将会在页面上看到beep=>boop

## 方法：

```javascript
var dnode = require('dnode')
```

### var d = dnode(cons, opts={})

Create a new readable/writable dnode stream object d. All the usual stream methods are at your disposal: pipe(), write(), end().

创建一个新的可读写的dnode流对象d, 一般的流方法都是支持的。：pipe(), write(), end()。

If cons is a function, it will be called new cons(remote, d) to create a new instance object. Otherwise its value will be used directly. When cons is called as a function, the remote ref will be an empty unpopulated object.

如果cons是一个函数，它将会被调用new cons(remote, d)来创建一个新的实例，否则值将会被直接使用，如果cons作为一个函数调用，远端的引用将成为一个空对象。

By default, dnode uses weakmaps to garbage collect unused callbacks automatically. This behavior prevents memory leaks in long-running connections.

默认的，dnode使用weakmaps去自动垃圾回收不用的回调函数。这个行为在长时间运行的连接中会阻止内存泄露

You can turn weakmaps off by setting opts.weak = false

可以使用opts.weak = false来关闭这个功能。

d.connect(...)

This method is a shortcut for setting up a pipe between d and a new net.connect() stream.
这个方法是在d和新的连接流之间建立管道的简单方法。

The host, port, and callback arguments supplied will be inferred by their types.
主机，端口，回调的参数将会被它们的类别识别。

If you pass a callback in as an argument, it will be added as a listener to the 'remote' event.

如果你传递一个回调参数，它将会被当成一个remote的消息的监听这。

Returns the d object.

返回d 对象。


dnode.connect(...)

不使用构造函数创建一个连接的简单方法。

d.listen(...)
是net.createServer()然后网络流和新的dnode流建立管道的简单方法。

dnode.listen(...)

## events

d.on("remote", cb)

d.on("local", cb)

d.on("fail", cb)

d.on("error", cb)

d.on("end", cb)


## 安装

```
npm install dnode
```

## 协议

dnode uses a newline-terminated JSON protocol[documented in the dnode-protocol project](https://github.com/substack/dnode-protocol/blob/master/doc/protocol.markdown#the-protocol)

dnode使用的协议。

## 其他语言中的dnode

这些dnode协议实现可以让你在不同的语言中进行远程调用。

* [dnode-perl](https://github.com/substack/dnode-perl)
* [dnode-ruby](https://github.com/substack/dnode-ruby)
* [dnode-php](https://github.com/bergie/dnode-php)
* [dnode-php-sync-client](https://github.com/erasys/dnode-php-sync-client)
* [dnode-java](https://github.com/aslakhellesoy/dnode-java)

## 无耻插件

Want to make sure your crazy javascript-heavy app still works in other browsers? Give browserling a spin! Browsers in your browser. Powered by dnode.

想确保你的重量级的app在别的浏览器也能工作？ 试试[browserling](https://browserling.com/)! 浏览器中的浏览器， dnode出品。