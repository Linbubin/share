# 查漏补缺及面试题
1. 
```js
function countdown(n) {
  while (n --> 0) console.log(n);
}
countdown(3) // n --> 0 会被当作 n-- > 0
```
2. 
> null是一个表示“空”的对象，转为数值时为0；undefined是一个表示”此处无定义”的原始值，转为数值时为NaN。

3. 小数十进制转二进制
```js
0.5(10)
-> 0.5 * 2 = 1  // 0.1(2)

0.1(10)
-> 0.1 * 2 = 0.2 // 0
-> 0.2 * 2 = 0.4 // 0
-> 0.4 * 2 = 0.8 // 0
-> 0.8 * 2 = 1.6 // 1
-> 0.6 * 2 = 1.2 // 1
-> 0.4 * 2 = 0.4 // 0
-> // 0.00011 0011 0011 0011 0011(循环)
```
4. js内置函数
> Object Array Boolean Number String Function Date RegExp Error

5. 按存储方式来区分变量类型
> 值类型和引用类型

6. 如何理解json
> js中是一个js对象`JSON.parse  JSON.stringify`,也是一种数据格式{}

7. 原型和原型链

8. 变量提升
```js
var a = 100;
function xx(){
	a = 20;
	console.log(a);
	var a;
}
a // 100;
xx(); // 20
a // 100
```

9. new
简化版
```js
function Foo(name){
	// this = {};
	this.name = name;
	// return this
}
var foo = new Foo('billy')
```

10. this指向
* 构造函数 -> 实例
* 对象属性 -> 对象
* 函数 -> 全局window
* call, apply, bind -> 第一个参数
> 如果第一个参数为空,null,undefined 都会默认指向Window
* 箭头函数 -> 箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this,在声明时已经决定调用哪一层的this. setTimeout setInterval 指向和setTimeout函数同级的this
* setTimeout 回调函数 里面会变成 window
```javascript
function fn0() {
    return {
        fn1: function () {
             var obj = {
                a: function() { console.log(this) },
                b: {
        	        c: () => console.log(this)
    	        }
    	    }
    	    return obj;
        }
    }
}

fn0().fn1().b.c() // 确定是obj同级的this  得到的{fn1: f}对象
```

11. 闭包
函数作为返回值
```js
function F1(){
	var a = 100;
	return function(){
		console.log(a)
	}
}
var f1 = F1();
var a = 200;
f1(); // 100
```
函数作为参数来传递
```js
function F1(){
	var a = 100;
	return function(){
		console.log(a)
	}
}
var f1 = F1();
function F2(fn){
	var a = 200;
	fn();
}
F2(f1); // 100
```
开发中的应用： 设置私有变量

12. 异步
场景： 在可能发生等待的情况(定时任务,网络请求,事件绑定-比如onload或者onerror事件)

单线程： 一次只能干一件事

同步异步区别：同步会阻塞(alert)

13. 随机数
Math.random 在url上增加 可以清除缓存

14. DOM
基本数据结构: dom树结构
常用API: 
```
获取dom document.get**** querySelectorAll
新增 删除节点 appendChild(node) 如果是页面上原来有的，会移动位置 removeChild
获取父节点 parentElement
获取子节点 childNodes
```
attribute和property区别: property 节点基础属性class style, attribute setAttribute 节点额外属性 date-origin
property只是一个js对象的属性的修改和获取, attribute是对html标签属性的修改和获取 	

15. BOM
检测浏览器类型 `navigator.userAgent`
拆解url的各部分 `location href protocal pathname search hash`
url后退前进 `history.back() history.forward()`

16. Ajax
```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "/api", false);
xhr.onreadystatechange = function(){
	if(xhr.readyState==4){
		if(xhr.status==200){
			alert(xhr.responseText)
		}
	}
}
xhr.send(null)
```
readyState:
0 - 还没调用send方法
1 - 已经调用send方法，正在发送请求
2 - send执行完成，已经接收到全部相应内容
3 - 正在解析相应内容
4 - 相应内容解析完成，可以在客户端调用

status：
2xx - 表示成功请求处理。如200
3xx - 需要重定向，浏览器直接跳转
4xx - 客户端请求错误,如404
5xx - 服务端错误

17. 跨域
浏览器有同源策略，不允许ajax访问其他域接口
跨域条件: 协议 域名 端口 有一个不同就算跨域
可跨域标签： img（可能防盗链， 可以加载站长统计的图片来进行打点统计） link(cnd) script(jsonp)
JSONP:
```js
// src对应的url返回的值会被解析成js直接执行 ---> eval('返回值')
<script>
window.callback = function(data){
	console.log(data)
}
</script>
<script src="http://www.wuqiu.xyz/api">
</script>
```
服务端设置 http header

18. cookie sessionStorage localStorage区别:
cookie 本身用于客户端和服务器端通信，但是有本地存储功能，就被借用了。document.cookie = xxx来获取和设置
缺点： 存储量太小，只有4KB   所有http请求都带着，会影响获取资源的效率  api太简单，需要封装才能用

sessionStorage(浏览器关了，就会清理) localStorage(不执行清除,就不会清除)
HTML5专门为存储而设计,最大容量5M
api简单易用: localStorage.setItem(key, value); localStorage.getItem(key) get在ios的safari隐藏模式下会报错

区别: 
1. 容量
2. 是否携带在ajax中
3. api的易用性

19. AMD 异步模块化定义
require
`<script src="require.js" data-main='./main.js'></script>`
```js
define(['xx.js'], ()=>{
	return {
		funName: () => {}
	}
})
define(()=>{})
require(['a.js'], () => {
	// dosomething
})
```

20. commonJS
```js
// util.js
module.exports = {
	funcName: () => {
		// dosomething
	}
}

// a-util.js
var util = require('util.js');
module.exports = {
	funcName: () => {}
}
```

21. http-server

22. webpack
```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		app: './app.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
}
```

23. 页面加载
输入url到页面加载过程：
url ->  浏览器根据DNS服务器得到域名的IP地址 -> 向ip服务器发送http请求 -> 服务器接受 处理 并返回http请求 > 浏览器接收到html信息  -> 浏览器根据html---DOMTree, CSS---CSSOM 将DOM和CSSOM整合成RenderTree， 根据RenderTree开始渲染和展示,其中遇到`<script>`标签会执行并阻塞渲染   -> 加载html -> html中的静态资源 

window.onload和DOMContentLoaded的区别
```js
window.addEventListener('load', function(){
	// 页面全部资源加载完才会执行，包括图片、视频等
})
document.addEventListener('DOMContentLoaded', function(){
	// DOM 渲染完即可执行， 此时图片、视频可能还没加载完
})
```

24. 性能优化
> 多使用内存、缓存,减少请求次数
从哪入手：
加载页面和静态资源 - 静态资源的压缩合并、静态资源缓存、使用CDN让资源加载更快、使用ssr后端渲染,数据直接输出到HTML中
页面渲染 - CSS放前面,JS放后面、懒加载(图片懒加载-先src一个很小的图片,data-src写原图,在js里面取到data-src里面的原图地址,赋值给src、下拉加载更多)、减少DOM查询、减少DOM操作、事件节流(input框 输入马上搜索 keydown会连续按,就clearTimeout 停下来再去查)、尽早执行操作(DOMContentLoaded)

25. 安全性
XSS跨站请求攻击 - 文章中偷偷插入一段`<script>`, 预防: `<` -> `&lt`
XSRF跨站请求攻击 - 利用你已有的cookie，通过隐藏的`<img src='xxx.com/pay?id=123'>`进行直接购买,预防: 增加指纹、密码、短信验证码

26. 内存泄漏
意外的全局变量 被遗忘的计时器或回调函数 脱离文档的DOM引用 闭包

27. 函数防抖
input输入时自动查询,如果输入过快 就要清空定时器

28. web安全攻击手段及防范
xss(cross site scripting) 跨站脚本攻击: 对 script 等标签进行编码
csrf(cross site request forgery) 跨站请求伪造： 请求地址增加token验证
sql注入(SQL injection): 杜绝用户提交的参数入库并执行,对sql进行转义,进行sql测试

29. 前端缓存
http缓存 浏览器缓存
浏览器缓存 有 cookie,localstorage,sessionStorage 其中 sessionStorage在页面关闭时就会被清除

30. symbol 符号
特性: 独一无二, 只读
```js
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();
s1 === s2 // false
// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2 // false
```

有时候并不想知道他具体是什么，只是单纯的做区分， 就用 symbol.
obj[symbolxx] = 1;

31. 服务端渲染ssr和客户端渲染的区别
* 服务端渲染
* 定义:将数据填充到html中,统一返回. 
* 利: 利于SEO(搜索引擎优化),首屏渲染快.
* 弊: 不容易维护,前端改代码,后端的html也要跟着改.

* 客户端渲染
* 定义:先返回html,然后利用生命周期函数,进行数据查询,再二次渲染.
* 利: 前后端分离,交互性好.
* 弊: 不利于SEO爬虫看不到完整的代码,首屏渲染慢.

32. 浏览器事件有哪些过程? 为什么一般在冒泡阶段, 而不是在捕获阶段注册监听? addEventListener 参数分别是什么 ? 
```js
// DOM 0级监听
const btn = document.getElementById("btn");
btn.onclick = function(e) {
    console.log("You clicked me!");
};
// DOM 2级监听
const btn = document.getElementById("btn");
const handler = function() {
    // handler logic
}
btn.addEventListener("click", handler, false);
btn.removeEventListener("click", handler);
```
addEventListener 第三个参数true为捕获, false为冒泡
事件触发过程:  捕获阶段、目标阶段和冒泡阶段
event.stopPropagation() 或 e.cancelBubble = true; 来阻止对应事件
preventDefault()组织浏览器默认事件
ie8 attacEvent detachEvent 
事件委托：
```html
<ul id="parent-list">
	<li id="post-1">Item 1</li>
	<li id="post-2">Item 2</li>
	<li id="post-3">Item 3</li>
	<li id="post-4">Item 4</li>
	<li id="post-5">Item 5</li>
	<li id="post-6">Item 6</li>
</ul>
<script>
	document.getElementById("parent-list").addEventListener("click", function(e) {
		// target 与 srcElement 指触发事件的元素 li
		// currentTarget 指事件所绑定的元素 ul
		console.log(e)
		if(e.target && e.target.nodeName == "LI") {
			console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
		}
	}, true);
</script>
```

因为冒泡阶段注册监听可以进行事件委托.
addEventListener参数, 1 - 事件名称, 2 - 回调函数, 3 - true为捕获,false为冒泡 默认为冒泡

33. Array.from 代替展开操作符 … 来映射迭代，因为它避免了创建媒介数组
```js
// bad
const baz = [...foo].map(bar);
// good
const baz = Array.from(foo, bar);

// Array.from 第一个参数为
```

34. 规范
* 始终将默认参数放在最后。
```js
// bad
function handleThings(opts = {}, name) {
// ...
}
// good
function handleThings(name, opts = {}) {
// ...
}
```

* 不要 export(导出) 可变绑定。
```js
// bad
let foo = 3;
export { foo };
// good
const foo = 3;
export { foo };
```

* 导出纯对象使用PascalCase 式命名
```js
const AirbnbStyleGuide = {
  es6: {
    },
};
export default AirbnbStyleGuide;
```

35. async + for
```js
const countAsync = getAsync.getCountAsync(params);
async.parallel(countAsync, function (err, result) {
  if (err) {
    console.log(err);
  }
  
  // result
  /**
   * {
   *  a: xx,
   *  b: zz,
   *  c: cc,
   *  d: dd
   * }
   */
  return res.status(200).json({ success: true });
})
// ----
getCountAsync: function(type){
  let out = {};
  Object.keys(condObj).forEach(val => {
    out[val] = function(callback){
      axios.get('xxx')
        .then(_r => callback(null, _r.data.length))
        .catch(err => callback(err, 0))
    }
  })
  return out;
}
```

36. 判断是否为奇数
```js
// 正常操作
num % 2 === 1; // true为奇数, false为偶数
// 位操作
num & 1; // 1为奇数, 0为偶数
```

37. axios 同步请求
```js
# 利用 co 库,在内部将请求 同步化
co(function *(){
  var data = yield axios.get('url')
  console.log(data);
  console.log(456);
	// data   456
})
```