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
* 箭头函数 -> 箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this,在声明时已经决定调用哪一层的this. setTimeout setInterval 指向和setTimeout函数同级的this
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
cookie 本身用于客户端和服务器端通信，但是有本地存储功能j，就被借用了。document.cookie = xxx来获取和设置
缺点： 存储量太小，只有4KB   所有http请求都带着，会影响获取资源的效率  api太简单，需要封装才能用

sessionStorage(浏览器关了，就会清理) localStorage(不执行清除,就不会清除)
HTML5专门为存储而设计,最大容量5M
api简单易用: localStorage.setItem(key, value); localStorage.getItem(key) get在ios的safari隐藏模式下会报错

区别: 
1. 容量
2. 是否携带在ajax中
3. api的易用性


4. window.onload 和 DOMContentLoaded的区别             浏览器渲染过程
5. 用js创建10个a标签,点击弹出相应序号                    闭包
6. 实现一个模块加载器,实现类似require                    js模块化
7. 实现数组随机排序                                     基础算法