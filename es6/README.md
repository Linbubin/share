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