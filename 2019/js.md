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
> 
4. window.onload 和 DOMContentLoaded的区别             浏览器渲染过程
5. 用js创建10个a标签,点击弹出相应序号                    闭包
6. 实现一个模块加载器,实现类似require                    js模块化
7. 实现数组随机排序                                     基础算法