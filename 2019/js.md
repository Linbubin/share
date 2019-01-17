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


4. window.onload 和 DOMContentLoaded的区别             浏览器渲染过程
5. 用js创建10个a标签,点击弹出相应序号                    闭包
6. 实现一个模块加载器,实现类似require                    js模块化
7. 实现数组随机排序                                     基础算法