# 高性能JavaScript编程

## 由于js会阻塞html css加载
因为脚本阻塞其他页面资源的下载过程，所以推荐的办法是:`将所有<script>标签放在尽可能接近<body> 标签底部的位置，尽量减少对整个页面下载的影响`。

每个 HTTP 请求都会产生额外的性能负担，下载一 个 100KB 的文件比下载四个 25KB 的文件要快。
一个大型 网站或网页应用需要多次请求 JavaScript 文件。你可以将这些文件整合成一个文件，只需要一个`<script>`标 签引用，就可以减少性能损失。
只有一个`<script>`标签，位于页面的底部，加载多个 JavaScript 文件。这是在 HTML 页面中包含 多个外部 JavaScript 的最佳方法。

尽管下载一个大 JavaScript 文件只产生一次 HTTP 请求，却会锁定浏览器一大段时间。为避开这种情况，你 需要向页面中逐步添加 JavaScript，某种程度上说不会阻塞浏览器。
非阻塞脚本的秘密在于，等页面完成加载之后，再加载 JavaScript 源码。从技术角度讲，这意味着在 window 的 load 事件发出之后开始下载代码。有几种方法可以实现这种效果。
1. Deferred Scripts 延期脚本 
 目标浏览器只包括 Internet Explorer 和 Firefox 3.5
> HTML 4 为`<script>`标签定义了一个扩展属性:defer。这个 defer 属性指明元素中所包含的脚本不打算修 改 DOM，因此代码可以稍后执行。但是可能不被很低版本的浏览器兼容.
> `<script type="text/javascript" src="file1.js" defer></script>`

2. Dynamic Script Elements 动态脚本元素
用 js来创建一个script标签,再引入 file1.js文件
```js
var script = document.createElement ("script");
script.type = "text/javascript";
// 可以定义script.onload来执行回调函数, 如果a脚本依赖b脚本,就在b的callback中执行a
// 当然也可以将 a b 按次序合并成一个大文件,因为是异步，所以不会造成性能的问题
script.onload = function(){ callback();

script.src = "file1.js"; document.getElementsByTagName_r("head")[0].appendChild(script);
```

3. XMLHttpRequest Script Injection XHR 脚本注入
> 此技术 首先创建一个 XHR 对象，然后下载 JavaScript 文件，接着用一个动态`<script>`元素将 JavaScript 代码注入页面

```js
var xhr = new XMLHttpRequest(); xhr.open("get", "file1.js", true); xhr.onreadystatechange = function(){
if (xhr.readyState == 4){
if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
var script = document.createElement ("script"); script.type = "text/javascript";
script.text = xhr.responseText; document.body.appendChild(script);
} }
}; xhr.send(null);
```
优点: 可以下载不立即执行的 JavaScript 代码。由于代码返回在`<script>`标签之外`(换句话说不受<script>标签约束)`，它下载后不会自动执行，这使得你可以推迟执行，直到一切都准备好了。 另一个优点是，同样的代码在所有现代浏览器中都不会引发异常。

缺点: JavaScript 文件必须与页面放置在同一个域内，不能从 CDNs 下载。

4. Recommended Nonblocking Pattern 推荐的非阻塞模式
> 推荐的向页面加载大量 JavaScript 的方法分为两个步骤:第一步，包含动态加载 JavaScript 所需的代码， 然后加载页面初始化所需的除 JavaScript 之外的部分。这部分代码尽量小，可能只包含 loadScript()函数， 它下载和运行非常迅速，不会对页面造成很大干扰。当初始代码准备好之后，用它来加载其余的 JavaScript。 例如:

```js

<script type="text/javascript" src="loader.js"></script>
<script type="text/javascript">
    loadScript("the-rest.js", function(){ Application.init();
}); </script>
```

总结:
1. `将所有<script>标签放置在页面的底部，紧靠 body 关闭标签</body>的上方。此法可以保证页面在脚本 运行之前完成解析。`
2. 将脚本成组打包。页面的`<script>`标签越少，页面的加载速度就越快，响应也更加迅速。不论外部脚本 文件还是内联代码都是如此。
3. 非阻塞方式下载js :
* 为`<script>`标签添加 defer 属性(只适用于 Internet Explorer 和 Firefox 3.5 以上版本)
* 动态创建`<script>`元素，用它下载并执行代码
* 用 XHR 对象下载代码，并注入到页面中

## Data Access 数据访问
直接量
> 直接量仅仅代表自己，而不存储于特定位置。 JavaScript 的直接量包括:字符串，数字，布尔值，对象， 数组，函数，正则表达式，具有特殊意义的空值，以及未定义。

变量
> 开发人员使用 var 关键字创建用于存储数据值。

数组项
> 具有数字索引，存储一个 JavaScript 数组对象。

对象成员
> 具有字符串索引，存储一个 JavaScript 对象。
