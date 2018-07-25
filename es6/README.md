> es6强制开启严格模式 `use strict`
1. let const 会形成TDZ(Temporal Dead Zone)
const 声明是 必须赋值，否则会报错 `const a = 1;`
const 指向的位置不能变，但是指向该位置的对象 可以变
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

4. 解构赋值
```js
let a,b,c;

// 数组赋值
[a,b] = [1,2];
console.log(a,b);// 1,2

[a,b,...c] = [1,2,3,4,5,6];
console.log(c); // [3,4,5,6]


// 对象解构赋值
{a,b} = {a:1, b: 2};
console.log(a,b); // 1,2
```
默认值
```js
let a,b,c;
[a,b,c=3] = [1,2];
console.log(a,b,c); // 1,2,3

[a,b,c] = [1,2];
console.log(c); // undefined
```
使用
```js
// 变量交换
let a=1,b=2;
[a,b] = [b,a];
console.log(a,b);

// 接受函数返回
function f(){
    return [1,2]
}
let a,b;
[a,b] = f();
console.log(a,b) // 1,2
// 或者
function f(){
    return [1,2,3,4]
}
let a,b;
[a,,b] = f();
console.log(a,b); // 1,3
[a, ...b] = f();
console.log(b); // [2,3,4]


//对象解构赋值使用
let o = {p:42, q:true};
let {p,q} = o;
console.log(p,q); // 42, true

let {a=10,b=5} = {a:3};
console.log(a,b);// 3, 5

// 高级
let metaData = {
    title: 'abc',
    test: [{
        title: 'test',
        desc: 'description'
    }]
}
let {title: esTitle, test:[{title: cnTitle}] = metaData;
console.log(esTitle, cnTitle); // abc, test
```

5. 正则
```js
// es5
let regex = new RegExp('xyz','i');
let regex2 = new RegExp(/xyz/i);

console.log(regex.test('xyz123'), regex2.test('xyz123'));// true true

// es6 新增
let regex3 = new RegExp(/xyz/ig, 'i');
console.log(regex3.flags); // 输出修饰符， 如果第二个参数是修饰符，则会覆盖前面的修饰符

// y修饰符  和 g修饰符都是全局匹配，但是在第二次匹配时，必须是第一次匹配的下个字符才算成功
// g 只要在上次匹配的后面 符合匹配就行
let s = 'bbb_bb_b';
let a1 = /b+/g;
let a2 = /b+/y;
console.log('one',a1.exec(s), a2.exec(s)); //one, ['bbb', index: 0, input: 'bbb_bb_b'],['bbb', index: 0, input: 'bbb_bb_b']
console.log('two',a1.exec(s), a2.exec(s)); //one, ['bb', index: 4, input: 'bbb_bb_b'], null
console.log(a1.sticky, a2.sticky); // false, true   是否开启u字符

// u修饰符 unicode, 处理字符串中 大于2个字节的，就加u
// 之前的.并非匹配所有的字符
let u1 = /^\uD83D/;
let u2= /^\uD83D/u;

console.log(u1.test('\uD83D\uDC2A')); // true 没加u当成字符串
console.log(u2.test('\uD83D\uDC2A')); // false 加u当成unicode

console.log(/\u{61}/.test('a')); // false
console.log(/\u{61}/u.test('a')); // true

// 原来的.代替>0且<ffff的字符
let str = `\u{20BB7}`;
console.log(/^.$/.test(str)); // false
console.log(/^.$/u.test(str)); // true
```
6. 字符串的判断
```js
let str = 'string';
// 判断是否包括 以xxx开始  以xxx结尾
console.log('includes', str.includes("i"));// true
console.log('startsWith', str.startsWith("str"));// true
console.log('endsWith', str.endsWith("ing"));// true

// 重复某个字符多次
console.log(str.repeat(2)); // stringstring

// 长度不够，补白
console.log('1'.padStart(2, '0'))// 2的长度， 不够就向前补0
console.log('1'.padEnd(2, '0'))//  2的长度， 不够就向后补0

// 字符串模板
let user = {
    name : 'list',
    info : 'hello world'
}
abc`i am ${user.name} , ${user.info}`
function abc(s, v1, v2){
    console.log(s, v1, v2);
    return s + v1 + v2
}

// 对所有\进行转义，让他不再换行
console.log(String.raw`Hi\n${1+2}`); // Hi\n3
console.log(`Hi\n${1+2}`); // Hi \n 3
```