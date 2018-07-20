1. let const 会形成TDZ(Temporal Dead Zone)
```js
var value = "global";

// 例子1
(function() {
    console.log(value);

    let value = 'local';
}());

// 例子2
{
    console.log(value);

    const value = 'local';
};
```
都是undefined，因为 执行前会先扫描一遍，将 let和const声明的变量 放到 TDZ中， 执行到该变量时，才将他释放

ask: 以下闭包该如何解决
```js
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 3
```
ask: 为什么下面会输出不一样的结果
```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc

for (var i = 0; i < 3; i++) {
  var i = 'abc';
  console.log(i);
}
// abc
```
ask: 将 var 改成let和const 结果会显示什么
```js
var funcs = [], object = {a: 1, b: 1, c: 1};
for (var key in object) {
    funcs.push(function(){
        console.log(key)
    });
}

funcs[0]()
```


2. 模板字符串 \`xxxx\` ,可以用 xfun\`${xx}, ${yy}\`
3. 箭头函数
本身没有this,所以用bind，call不会影响到他
```js
var value = 1;
var result = (() => this.value).bind({value: 2})();
console.log(result); // 1
```
箭头函数没有自己的 arguments 对象，这不一定是件坏事，因为箭头函数可以访问外围函数的 arguments 对象：
```js
function constant() {
    return () => arguments[0]
}

var result = constant(1);
console.log(result()); // 1
```
如果一定要访问自己的arguments
```
let sayName = (...names) => names;
```
箭头函数没有new关键字，不能用 new funName来调用，同时 也不存在new.target和prototype super