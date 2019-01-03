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


2. 模板字符串 \`xxxx\` ,可以用 xfun\`${xx}, ${yy}\`, 符号中间可以用可以直接换行,输出时会保留
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

// 可以拿来传多参数给函数
function hello(n1,n2){
	console.log(n1,n2)
}
const arr = ['imooc', 'woniu'];
hello.apply(null,arr)// 以前方式
hello(...arr) // 解构赋值
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

7. 数值扩展
```js
console.log(0b111110111); // 二进制503
console.log(0o767);// 八进制503

// 是否有尽
Number.isFinite(); // false
Number.isFinite(0); // false
Number.isFinite(NaN); // false
Number.isFinite(15); // true

// 是否为整数
Number.isInterger(25); // true
Number.isInterger(25.0); // true
Number.isInterger(25.1); // false
Number.isInterger('1'); // false

// 整数极值
Number.MIN_SAFE_INTEGER; // -9007199254740991
Number.MAX_SAFE_INTEGER; // 9007199254740991

// 是否是安全数字
Number.isSafeInteger(10); // true
Number.isSafeInteger('a'); // false

// 判断带小数的整数部分，并返回   es5中 Math.floor
Math.trunc(4.999); // 4
Math.trunc(4.1); // 4

// 判断 与 0的关系
Math.sign(-111); // -1
Math.sign(0); // 0
Math.sign(111); // 1
Math.sign('a'); // NaN
Math.sign('100'); // 1

// 立方根
Math.cbrt(8); // 2
Math.cbrt('a'); // NaN
```

8. 数组扩展
```js
// 把变量转换成数组
Array.of('a',12,3,4)

// 数组转换
Array.from(arguments); // 让arguments有数组的方法
Array.from(arguments, x=> x+2; // 所有的参数都进行+2处理

// 数组填充 fill
[1,2,3,4].fill(10); // [10,10,10,10]
[1,2,3,4].fill(10,1,3); // [1,10,10,4]

// 查找匹配的
[1,2,3,6666666666666,5].find((i)=>i>3); // 6666666666666
[1,2,3,6666666666666,5].findIndex((i)=>i>3); // 3
[1,2,NaN].includes(NaN); // true
[1,2,NaN].includes(1); // true
```

8. 函数扩展
```js
/// 参数默认值 默认值一定要居后
function test(x,y = 'world'){
    console.log(x, y);
}
test('hello'); // hello world
function test(x='a',y){} // 会有什么后果吗？
```
```js
let x = 'test';
function test(x, y = x){
    console.log(x,y)
}
test('see'); // see see
```
```js
// rest参数 ...rest, rest后面不能再有参数
function test(...arg){
    // arg
}
```
```js
// 扩展运算符， 和 rest类似于逆运算
console.log(...[1,2,4])// 1 2 4
console.log('a', ...[1,2,4])// a 1 2 4
```
```js
// 尾调用 -- 函数式编程， 函数的最后是不是一个函数
// 查-----------！！！！！！！！！！！！！！！
// 不断调用或者 不断嵌套其他函数，就使用 尾调用
function tail(x){
    console.log('tail', x);
}
function fx(x){
    return tail(x);
}
fx(123);
```

9. 对象扩展
```js
// 简介表示法
let a = 1;
let b = 2;
let obj = { a,b } // {a: 1, b: 2}
let obj1 = { hello(){console.log(123)}}// { hello: function(){ console.log(123)}}

// 属性表达式
let a = 'b';
let obj = {
    [a]: 'c'
}// { 'b': 'c' }

// 扩展运算符
Object.assign // 浅拷贝
//  for of方法


// Object新增方法
let {a,b,...c} = {a: 1, b: 2, c: 'ddd', d:'ccc'};
c = {
    c: 'ddd',
    d: 'ccc'
}
```

10. Symbol数据类型,  定义和作用
> 这种数据类型提供一个独一无二的值
```js
const a = 5;
const b = 5;
a === b; // true

const a1 = Symbol();
const a2 = Symbol();
a1 === a2; // false

// 用Symbol.for可以使其相等
let a3 = Symbol.for('aaaa');
let a4 = Symbol.for('aaaa');
a3 === a4;// true
```
使用
```js
// 可以使obj的key不冲突
let a1 = Symbol.for('abc');
let obj = {
    [a1]: '123',
    'abc': 345,
    'c': 456
}

// obj中使用Symbol做key值时， for in，和let of 是取不到
for( let [key, value] of Object.entries(obj)){
    console.log('let of', key, value);
}

Object.entries(obj); // [["abc", 345], ["c", 456]]

// 可以用Object.getOwnPropertySymbols(obj)来获取
Object.getOwnPropertySymbols(obj); //[Symbol(abc)]
// obj[Object.getOwnPropertySymbols(obj)[0]]; // '123'

// 可以获取全部的key值
Reflect.ownKeys(obj); //  ["abc", "c", Symbol(abc)]
```

11. 数据结构 Set(不可重复的数组) Map(key可以是任意数据类型的obj)) WeakSet WeakMap
```js
let list = new Set();
list.add(5);
list.add(7);
list.add(5);// 会被忽略，不会报错

console.log('size', list.size); // 类似于arr的length 2

// 或者直接用arr来声明
let arr = [1,2,3,4,5];
let list = new Set(arr);
list.length; // 5

// 快速去重 数据类型不同 不会被去掉 2 --- '2'
let arr = [1,2,3,4,5,4,3,2,1];
let list = new Set(arr);
list.length; // 5
// 或者直接处理
let uniqArr = [...new Set(arr)]; // [1,2,3,4,5]

// set 方法
let arr = ['add', 'delete', 'clear', 'has'];
let list = new Set(arr);
list.has('delete'); // true
list.delete('add'); // true 删除成功
list.clear(); // undefined
list; // Set{}

// 利用for of进行循环
let arr = ['add', 'delete', 'clear', 'has'];
let list = new Set(arr);
for(let key of list.keys()){
    console.log('keys::', key)
}

for(let key of list.values()){
    console.log('values::', key)
}
// 两个for 都是 add delete clear has
```
```js
// weakSet只能用对象， 对象是浅拷贝, size方法没有
let weakset = new WeakSet();
let arg = {};
weakset.add(arg);
// weakset.add(2); // TypeError
```
```js
let map = new Map();
let arr = ['123'];

// 设置key和value
map.set(arr, 456);
map.get(arr); // 456
map; // Map(1) {Array(1) => 456}

// 直接传入 key value声明
let map = new Map([['a', 123], ['b', 456]]);
map; // Map(2) {"a" => 123, "b" => 456}

// 方法
let map = new Map([['a', 123], ['b', 456]]);
map.size; // 2
map.delete('a'); // true
map.clear();// undefined

// 遍历之类的方法 都与Set相同
```
```js
// key值必须obj， 不能遍历  没有size
let weakmap = new WeakMap();
```
12. map set array 的增删改查 区别
```js
let map = new Map();
let array = [];
// 增
map.set('t1', 1);
arr.push({t: 1});

// 查
map.has('t'); //true
array.find(item => item.t); // {t: 1}

// 改
map.set('t', 2);
array.forEach(item => item.t? item.t = 2: '');

// 删
map.delete('t');
array.splice(array.findIndex(item => item.t), 1)
```
set 和 obj
```js
let item = {t: 1};
let map = new Map();
let set = new Set();
let obj = {};

//增
map.set('t', 1);
set.add(item);
obj['t'] = 1;

// 查
map.has('t');
set.has(item);
't' in obj

// 改
map.set('t', 2);
item.t = 2;
obj['t'] = 2;

// 删
map.delete('t');
set.delete(item);
delete obj['t']
```

13. Proxy 和 Reflect
```js
let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
};

// 拦截方法都是 return 布尔值(不是的话,也会被转义)
let monitor = new Proxy(obj, {
    // 拦截对象属性的读取
    get(target, key){
        // 不管读取什么属性， 都要把2017换成2018
        return target[key].replace('2017', '2018')
    },
    // 拦截对象属性的设置
    // ??? return 意义在哪里
    // 可以不return ，但是需要将其赋值修改
    set(target, key, value){
        if(key === 'name'){
            return target[key]=value;
        }else{
            return target[key];
        }
    },
    // 拦截key in object操作
    has(target, key){
        if(key === 'name'){
            return 123
        }else{
            return false;
        }
    },
    // 拦截delete
    deleteProperty(target, key){
        if(key.indexOf('_') > -1){
            delete target[key];
            return true;
        }else{
            return false
        }
    },
    // 拦截Object.keys, Object.getOwnPropertySymbols,Object.getOwnPropertyNames
    ownKeys(target){
        return Object.keys(target).filter(item => item != 'time')
    }
}); // 创建代理商

monitor.time;
'time' in monitor; // false
'name' in monitor; // true
delete monitor.time
Object.keys(monitor); // ["name", "_r"]
```
Reflect也是相同
```js
let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
};

console.log(Reflect.get(obj, 'time')) // "2017-03-11"
Reflect.set(obj, 'name', 'billy');
console.log(obj);  // -----> name -> billy
```
例子
通过 proxy将 对象和 赋值 完全隔开
```js
function validator(target, validator){
    return new Proxy(target, {
        _validator: validator,
        set(target, key, value, proxy){
            if(target.hasOwnProperty(key)){
                let va = this._validator[key];
                if(!!va(value)){
                    return Reflect.set(target, key, value, proxy)
                }else{
                    throw Error(`不能设置${key}到${value}`)
                }
            }else{
                throw Error(`${key} 不存在`)
            }
        }
    })
}

const personValidators = {
    name(val){
        return typeof val === 'string'
    },
    age(val){
        return typeof val === 'number' && val > 18
    }
}

class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
        return validator(this, personValidators);
    }
}

const person = new Person('lilei', 30);
person.name = 48 // Uncaught Error: 不能设置name到48


```

14. 类和对象
```js
// 定义和生成实例
class Parent{
    constructor(name = 'billy'){
        this.name = name;
    }
}
let v_parent = new Parent('是我');
```
```js
// 类的继承 extends
class Child extends Parent{
    constructor(name='child'){
        super(name); // super一定放第一行
        this.type = 'child'
    }
}
```
```js
// 静态方法--通过类去调用，而不是通过实例去调用
class Parent{
    constructor(name = 'billy'){
        this.name = name;
    }
    static tell(){
        console.log('tell');
    }
}
Parent.tell();
```
```js
// 静态属性
class Parent{
    constructor(name = 'billy'){
        this.name = name;
    }
}
Parent.type = 'test'; // 因为没有类似于static的静态属性定义方法，所以直接给他赋值
Parent.type // test
```
```js
// getter  setter
class Parent{
    constructor(name = 'billy'){
        this.name = name;
    }
    get longName(){
        return 'mk' + this.name
    }

    set longName(value){
        this.name = value
    }
}

let v = new Parent

```


15. promise
> `Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）
```js
// 在执行resolve和reject之前，promise实例始终处于 pending 状态，只有执行 resolve 才会表示成功,同样 执行 rejected 则会进入失败
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    
    resolve(value);
  } else {
    reject(error);
  }
});

// promise.then可以传2个参数，第一个是接收 resolve的参数（必选）,第二个是接收 reject的参数(可选)
promise.then(function(value){
    // resolve传出的value
}, function(error){
    // reject传出的error
})

// 调用 resolve和reject不会终止promise的运行
// 由于状态只能从pending变成其他，所以 reject和resolve谁写在前面，就先到那一块去
new Promise((resolve, reject) => {
    resolve(1);
    console.log(2);
    reject(3);
    console.log(4)
}).then((i)=> console.log(i+10),j=>console.log(j+100))

// 不过一般来说，在 resolve或reject后面的操作应该放在then中执行，
// 所以加个return 就可以忽略后续的操作
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```
```js
// 除了.then 还有一个.catch方法
const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});

promise.catch(function(error) {
  console.log(error);
});
// .catch可替换成.then如下
promise.then(null, function(error) {
  console.log(error);
});
// 同理 上述写法可以换成
// 写法一
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法二
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```
```js
// 一般情况下， 不要使用then的第二个参数，用catch来接收
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```
解决异步操作问题
```js
// es5中回调 解决异步操作
let ajax = function(callback){
    console.log('执行')
    setTimeout(function(){
        callback&&callback.call()
    }, 1000);
};

ajax(function(){
    console.log('timeout1');
})
```
```js
// promise的写法
let ajax = function(){
    console.log('执行2');
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve()
        }, 1000)
    })
}

ajax().then(function(){
    console.log('promise', 'timeout2')
})
```
```js
// 用promise实现依次回调
let ajax = function(){
    console.log('执行2');
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve()
        }, 1000)
    })
}

ajax().then(function(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve()
        }, 2000)
    })
}).then(function(){
    console.log('timeout3')
})
```
```js
// promise报错 catch
let ajax = function(num){
    console.log('执行4');
    return new Promise(function(resolve, reject){
        if(num >5){
            resolve()
        }else{
            throw new Error('出错了')
        }
    })
}

ajax(6).then(function(){
    console.log('log',6);
}).catch(function(e){
    console.log('error:', e)
})
```
实例
```js
// 所有图片加载完再添加到页面
function loadImg(src){
    return new Promise((resolve, reject)=>{
        let img = document.createElement('img');
        img.src = src;
        img.onload=()=>{
            resolve(img);
        }
        img.onerror=()=>{
            reject(err)
        }
    })
}

function showImgs(imgs){
    imgs.forEach(img=>{
        document.body.appendChild(img);
    })
}

// Promise.all 是将多个实例组装成一个实例
// 只有当 所有的图片都加载好， 才会实现then， 只要有一个err，就会到catch
Promise.all([
    loadImg('http://asdasdasd.asdasdasd.asdasd'),
    loadImg('http://asdasdasd.asdasdasd.xxxxxx'),
    loadImg('http://asdasdasd.asdasdasd.cccccccc'),
    loadImg('http://asdasdasd.asdasdasd.zzzzz'),
]).then(showImgs);
```
```js
// promise.race   先到先得
// 有一个图片加载完，就显示到页面
function loadImg(src){
    return new Promise((resolve, reject)=>{
        let img = document.createElement('img');
        img.src = src;
        img.onload=()=>{
            resolve(img);
        }
        img.onerror=()=>{
            reject(err)
        }
    })
}

function showImgs(img){
    let p = document.createElement('p');
    p.appendChild(img);
    document.body.appendChild(p);
}

// 有一个完成，就直接执行then， 其他then就不去了
Promise.race([
    loadImg('http://asdasdasd.asdasdasd.asdasd'),
    loadImg('http://asdasdasd.asdasdasd.xxxxxx'),
    loadImg('http://asdasdasd.asdasdasd.cccccccc'),
    loadImg('http://asdasdasd.asdasdasd.zzzzz'),
]).then(showImgs);
```

16. Iterator 和```for...of```循环
```for...of``` 是通过Iterator接口来实现的

```js
let arr = ['hello', 'world'];
let map = arr[Symbol.iterator]();
map.next(); // {value: "hello", done: false}
map.next(); // {value: "world", done: false}
map.next(); // {value: undefined, done: true} done--true就是没有了
```
自定义Interator接口
```js
// 先遍历start， 再遍历end
let obj = {
    start: [1,3,2],
    end: [7,9,8],
    [Symbol.iterator](){
        let self = this;
        let index = 0;
        let arr = self.start.concat(self.end);
        let len = arr.length;
        return{
            next(){
                if(index < len){
                    return {
                        value: arr[index++],
                        done: false
                    }
                }else{
                    return {
                        value: arr[index++],
                        done: true
                    }
                }
            }
        }
    }
}

for(let key of obj){s
    console.log(key)
}
```

17. Generator
基本概念
```js
let tell = function* (){
    console.log(1);
    yield 'a';
    console.log(2);
    yield 'b';
    console.log(3);
    return 'c'
}

let k = tell(); // 在yield之前所有操作都没执行

console.log(k.next()); // 执行第一个yield之前所有代码
console.log(k.next());
console.log(k.next());
console.log(k.next());
```
next函数的用法
```js
let obj = {};
obj[Symbol.iterator] = function* (){
    yield 1;
    yield 2;
    yield 3;
}

for(let value of obj){
    console.log(value)
}
```
状态机： 一直next下  循环abc
```js
let state = function* (){
    while(1){
        yield 'A';
        yield 'B';
        yield 'C';
    }
}

let status = state();
status.next();
status.next();
status.next();
status.next();
status.next();
```
async类似代码
```js
let state = async function (){
    while(1){
        await 'A';
        await 'B';
        await 'C';
    }
}

let status = state();
status.next();
status.next();
status.next();
status.next();
status.next();
```
实例： 抽奖剩余次数统计
```js
let draw = function(count){
    console.info(`剩余${count}次`);
}

let residue = function * (count){
    while (count > 0){
        count --;
        yield draw(count);
    }
}

let star = residue(5);
star.next()
```
实例： 长轮询
```js
let ajax = function* (){
    yield new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve({code: 0})
        }, 200)
    })
}

let pull = function(){
    let generator = ajax();
    let step = generator.next();
    step.value.then(function(d){
        if(d.code!=0){
            setTimeout(function(){
                console.log('wait');
                pull()
            }, 1000)
        }else{
            console.log(d)
        }
    })
}

pull();
```

18. Decorator
> 修饰器: 修改类行为的函数

```js
let readonly = function(target, name, descriptor){
    descriptor.writable = false;
    return descriptor
};

class Test{
    @readonly
    time(){
        return '2017-03-11'
    }
}

let test = new Test();

// test.time = function(){
//     console.log('reset time')
// }// 会报错

console.log(test.time()); // '2017-03-11'
```

```js
let typename = function(target, name, descriptor){
    descriptor.myname = 'hello';
};

@typename
class Test{

}

console.log('类修饰符', Test.myname);
// 第三方库直接调用修饰器: core-decorators
```
广告的show和click
```js
let log = (type) => {
    return function(target, name, descriptor){
        let src_method = descriptor.value;
        descriptor.value = (...arg) => {
            src_method.apply(target, arg);
            console.info(`log ${type}`)
        }
    }
}

class AD{
    @log('show')
    show(){
        console.info('ad is show')
    }
    @log('click')
    click(){
        console.info('ad is click')
    }
}

let ad = new AD();
ad.show();
ad.click();
```
```


2. 模板字符串 \`xxxx\` ,可以用 xfun\`${xx}, ${yy}\`, 符号中间可以用可以直接换行,输出时会保留
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

// 可以拿来传多参数给函数
function hello(n1,n2){
	console.log(n1,n2)
}
const arr = ['imooc', 'woniu'];
hello.apply(null,arr)// 以前方式
hello(...arr) // 解构赋值
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

7. 数值扩展
```js
console.log(0b111110111); // 二进制503
console.log(0o767);// 八进制503

// 是否有尽
Number.isFinite(); // false
Number.isFinite(0); // false
Number.isFinite(NaN); // false
Number.isFinite(15); // true

// 是否为整数
Number.isInterger(25); // true
Number.isInterger(25.0); // true
Number.isInterger(25.1); // false
Number.isInterger('1'); // false

// 整数极值
Number.MIN_SAFE_INTEGER; // -9007199254740991
Number.MAX_SAFE_INTEGER; // 9007199254740991

// 是否是安全数字
Number.isSafeInteger(10); // true
Number.isSafeInteger('a'); // false

// 判断带小数的整数部分，并返回   es5中 Math.floor
Math.trunc(4.999); // 4
Math.trunc(4.1); // 4

// 判断 与 0的关系
Math.sign(-111); // -1
Math.sign(0); // 0
Math.sign(111); // 1
Math.sign('a'); // NaN
Math.sign('100'); // 1

// 立方根
Math.cbrt(8); // 2
Math.cbrt('a'); // NaN
```

8. 数组扩展
```js
// 把变量转换成数组
Array.of('a',12,3,4)

// 数组转换
Array.from(arguments); // 让arguments有数组的方法
Array.from(arguments, x=> x+2; // 所有的参数都进行+2处理

// 数组填充 fill
[1,2,3,4].fill(10); // [10,10,10,10]
[1,2,3,4].fill(10,1,3); // [1,10,10,4]

// 查找匹配的
[1,2,3,6666666666666,5].find((i)=>i>3); // 6666666666666
[1,2,3,6666666666666,5].findIndex((i)=>i>3); // 3
[1,2,NaN].includes(NaN); // true
[1,2,NaN].includes(1); // true
```

8. 函数扩展
```js
/// 参数默认值 默认值一定要居后
function test(x,y = 'world'){
    console.log(x, y);
}
test('hello'); // hello world
function test(x='a',y){} // 会有什么后果吗？
```
```js
let x = 'test';
function test(x, y = x){
    console.log(x,y)
}
test('see'); // see see
```
```js
// rest参数 ...rest, rest后面不能再有参数
function test(...arg){
    // arg
}
```
```js
// 扩展运算符， 和 rest类似于逆运算
console.log(...[1,2,4])// 1 2 4
console.log('a', ...[1,2,4])// a 1 2 4
```
```js
// 尾调用 -- 函数式编程， 函数的最后是不是一个函数
// 查-----------！！！！！！！！！！！！！！！
// 不断调用或者 不断嵌套其他函数，就使用 尾调用
function tail(x){
    console.log('tail', x);
}
function fx(x){
    return tail(x);
}
fx(123);
```

9. 对象扩展
```js
// 简介表示法
let a = 1;
let b = 2;
let obj = { a,b } // {a: 1, b: 2}
let obj1 = { hello(){console.log(123)}}// { hello: function(){ console.log(123)}}

// 属性表达式
let a = 'b';
let obj = {
    [a]: 'c'
}// { 'b': 'c' }

// 扩展运算符
Object.assign // 浅拷贝
//  for of方法


// Object新增方法
let {a,b,...c} = {a: 1, b: 2, c: 'ddd', d:'ccc'};
c = {
    c: 'ddd',
    d: 'ccc'
}
```

10. Symbol数据类型,  定义和作用
> 这种数据类型提供一个独一无二的值
```js
const a = 5;
const b = 5;
a === b; // true

const a1 = Symbol();
const a2 = Symbol();
a1 === a2; // false

// 用Symbol.for可以使其相等
let a3 = Symbol.for('aaaa');
let a4 = Symbol.for('aaaa');
a3 === a4;// true
```
使用
```js
// 可以使obj的key不冲突
let a1 = Symbol.for('abc');
let obj = {
    [a1]: '123',
    'abc': 345,
    'c': 456
}

// obj中使用Symbol做key值时， for in，和let of 是取不到
for( let [key, value] of Object.entries(obj)){
    console.log('let of', key, value);
}

Object.entries(obj); // [["abc", 345], ["c", 456]]

// 可以用Object.getOwnPropertySymbols(obj)来获取
Object.getOwnPropertySymbols(obj); //[Symbol(abc)]
// obj[Object.getOwnPropertySymbols(obj)[0]]; // '123'

// 可以获取全部的key值
Reflect.ownKeys(obj); //  ["abc", "c", Symbol(abc)]
```

11. 数据结构 Set(不可重复的数组) Map(key可以是任意数据类型的obj)) WeakSet WeakMap
```js
let list = new Set();
list.add(5);
list.add(7);
list.add(5);// 会被忽略，不会报错

console.log('size', list.size); // 类似于arr的length 2

// 或者直接用arr来声明
let arr = [1,2,3,4,5];
let list = new Set(arr);
list.length; // 5

// 快速去重 数据类型不同 不会被去掉 2 --- '2'
let arr = [1,2,3,4,5,4,3,2,1];
let list = new Set(arr);
list.length; // 5
// 或者直接处理
let uniqArr = [...new Set(arr)]; // [1,2,3,4,5]

// set 方法
let arr = ['add', 'delete', 'clear', 'has'];
let list = new Set(arr);
list.has('delete'); // true
list.delete('add'); // true 删除成功
list.clear(); // undefined
list; // Set{}

// 利用for of进行循环
let arr = ['add', 'delete', 'clear', 'has'];
let list = new Set(arr);
for(let key of list.keys()){
    console.log('keys::', key)
}

for(let key of list.values()){
    console.log('values::', key)
}
// 两个for 都是 add delete clear has
```
```js
// weakSet只能用对象， 对象是浅拷贝, size方法没有
let weakset = new WeakSet();
let arg = {};
weakset.add(arg);
// weakset.add(2); // TypeError
```
```js
let map = new Map();
let arr = ['123'];

// 设置key和value
map.set(arr, 456);
map.get(arr); // 456
map; // Map(1) {Array(1) => 456}

// 直接传入 key value声明
let map = new Map([['a', 123], ['b', 456]]);
map; // Map(2) {"a" => 123, "b" => 456}

// 方法
let map = new Map([['a', 123], ['b', 456]]);
map.size; // 2
map.delete('a'); // true
map.clear();// undefined

// 遍历之类的方法 都与Set相同
```
```js
// key值必须obj， 不能遍历  没有size
let weakmap = new WeakMap();
```
12. map set array 的增删改查 区别
```js
let map = new Map();
let array = [];
// 增
map.set('t1', 1);
arr.push({t: 1});

// 查
map.has('t'); //true
array.find(item => item.t); // {t: 1}

// 改
map.set('t', 2);
array.forEach(item => item.t? item.t = 2: '');

// 删
map.delete('t');
array.splice(array.findIndex(item => item.t), 1)
```
set 和 obj
```js
let item = {t: 1};
let map = new Map();
let set = new Set();
let obj = {};

//增
map.set('t', 1);
set.add(item);
obj['t'] = 1;

// 查
map.has('t');
set.has(item);
't' in obj

// 改
map.set('t', 2);
item.t = 2;
obj['t'] = 2;

// 删
map.delete('t');
set.delete(item);
delete obj['t']
```

13. Proxy 和 Reflect
```js
let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
};

// 拦截方法都是 return 布尔值(不是的话,也会被转义)
let monitor = new Proxy(obj, {
    // 拦截对象属性的读取
    get(target, key){
        // 不管读取什么属性， 都要把2017换成2018
        return target[key].replace('2017', '2018')
    },
    // 拦截对象属性的设置
    // ??? return 意义在哪里
    // 可以不return ，但是需要将其赋值修改
    set(target, key, value){
        if(key === 'name'){
            return target[key]=value;
        }else{
            return target[key];
        }
    },
    // 拦截key in object操作
    has(target, key){
        if(key === 'name'){
            return 123
        }else{
            return false;
        }
    },
    // 拦截delete
    deleteProperty(target, key){
        if(key.indexOf('_') > -1){
            delete target[key];
            return true;
        }else{
            return false
        }
    },
    // 拦截Object.keys, Object.getOwnPropertySymbols,Object.getOwnPropertyNames
    ownKeys(target){
        return Object.keys(target).filter(item => item != 'time')
    }
}); // 创建代理商

monitor.time;
'time' in monitor; // false
'name' in monitor; // true
delete monitor.time
Object.keys(monitor); // ["name", "_r"]
```
Reflect也是相同
```js
let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
};

console.log(Reflect.get(obj, 'time')) // "2017-03-11"
Reflect.set(obj, 'name', 'billy');
console.log(obj);  // -----> name -> billy
```
例子
通过 proxy将 对象和 赋值 完全隔开
```js
function validator(target, validator){
    return new Proxy(target, {
        _validator: validator,
        set(target, key, value, proxy){
            if(target.hasOwnProperty(key)){
                let va = this._validator[key];
                if(!!va(value)){
                    return Reflect.set(target, key, value, proxy)
                }else{
                    throw Error(`不能设置${key}到${value}`)
                }
            }else{
                throw Error(`${key} 不存在`)
            }
        }
    })
}

const personValidators = {
    name(val){
        return typeof val === 'string'
    },
    age(val){
        return typeof val === 'number' && val > 18
    }
}

class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
        return validator(this, personValidators);
    }
}

const person = new Person('lilei', 30);
person.name = 48 // Uncaught Error: 不能设置name到48


```

14. 类和对象
```js
// 定义和生成实例
class Parent{
    constructor(name = 'billy'){
        this.name = name;
    }
}
let v_parent = new Parent('是我');
```
```js
// 类的继承 extends
class Child extends Parent{
    constructor(name='child'){
        super(name); // super一定放第一行
        this.type = 'child'
    }
}
```
```js
// 静态方法--通过类去调用，而不是通过实例去调用
class Parent{
    constructor(name = 'billy'){
        this.name = name;
    }
    static tell(){
        console.log('tell');
    }
}
Parent.tell();
```
```js
// 静态属性
class Parent{
    constructor(name = 'billy'){
        this.name = name;
    }
}
Parent.type = 'test'; // 因为没有类似于static的静态属性定义方法，所以直接给他赋值
Parent.type // test
```
```js
// getter  setter
class Parent{
    constructor(name = 'billy'){
        this.name = name;
    }
    get longName(){
        return 'mk' + this.name
    }

    set longName(value){
        this.name = value
    }
}

let v = new Parent

```


15. promise
> `Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）
```js
// 在执行resolve和reject之前，promise实例始终处于 pending 状态，只有执行 resolve 才会表示成功,同样 执行 rejected 则会进入失败
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    
    resolve(value);
  } else {
    reject(error);
  }
});

// promise.then可以传2个参数，第一个是接收 resolve的参数（必选）,第二个是接收 reject的参数(可选)
promise.then(function(value){
    // resolve传出的value
}, function(error){
    // reject传出的error
})

// 调用 resolve和reject不会终止promise的运行
// 由于状态只能从pending变成其他，所以 reject和resolve谁写在前面，就先到那一块去
new Promise((resolve, reject) => {
    resolve(1);
    console.log(2);
    reject(3);
    console.log(4)
}).then((i)=> console.log(i+10),j=>console.log(j+100))

// 不过一般来说，在 resolve或reject后面的操作应该放在then中执行，
// 所以加个return 就可以忽略后续的操作
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```
```js
// 除了.then 还有一个.catch方法
const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});

promise.catch(function(error) {
  console.log(error);
});
// .catch可替换成.then如下
promise.then(null, function(error) {
  console.log(error);
});
// 同理 上述写法可以换成
// 写法一
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法二
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```
```js
// 一般情况下， 不要使用then的第二个参数，用catch来接收
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```
解决异步操作问题
```js
// es5中回调 解决异步操作
let ajax = function(callback){
    console.log('执行')
    setTimeout(function(){
        callback&&callback.call()
    }, 1000);
};

ajax(function(){
    console.log('timeout1');
})
```
```js
// promise的写法
let ajax = function(){
    console.log('执行2');
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve()
        }, 1000)
    })
}

ajax().then(function(){
    console.log('promise', 'timeout2')
})
```
```js
// 用promise实现依次回调
let ajax = function(){
    console.log('执行2');
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve()
        }, 1000)
    })
}

ajax().then(function(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve()
        }, 2000)
    })
}).then(function(){
    console.log('timeout3')
})
```
```js
// promise报错 catch
let ajax = function(num){
    console.log('执行4');
    return new Promise(function(resolve, reject){
        if(num >5){
            resolve()
        }else{
            throw new Error('出错了')
        }
    })
}

ajax(6).then(function(){
    console.log('log',6);
}).catch(function(e){
    console.log('error:', e)
})
```
实例
```js
// 所有图片加载完再添加到页面
function loadImg(src){
    return new Promise((resolve, reject)=>{
        let img = document.createElement('img');
        img.src = src;
        img.onload=()=>{
            resolve(img);
        }
        img.onerror=()=>{
            reject(err)
        }
    })
}

function showImgs(imgs){
    imgs.forEach(img=>{
        document.body.appendChild(img);
    })
}

// Promise.all 是将多个实例组装成一个实例
// 只有当 所有的图片都加载好， 才会实现then， 只要有一个err，就会到catch
Promise.all([
    loadImg('http://asdasdasd.asdasdasd.asdasd'),
    loadImg('http://asdasdasd.asdasdasd.xxxxxx'),
    loadImg('http://asdasdasd.asdasdasd.cccccccc'),
    loadImg('http://asdasdasd.asdasdasd.zzzzz'),
]).then(showImgs);
```
```js
// promise.race   先到先得
// 有一个图片加载完，就显示到页面
function loadImg(src){
    return new Promise((resolve, reject)=>{
        let img = document.createElement('img');
        img.src = src;
        img.onload=()=>{
            resolve(img);
        }
        img.onerror=()=>{
            reject(err)
        }
    })
}

function showImgs(img){
    let p = document.createElement('p');
    p.appendChild(img);
    document.body.appendChild(p);
}

// 有一个完成，就直接执行then， 其他then就不去了
Promise.race([
    loadImg('http://asdasdasd.asdasdasd.asdasd'),
    loadImg('http://asdasdasd.asdasdasd.xxxxxx'),
    loadImg('http://asdasdasd.asdasdasd.cccccccc'),
    loadImg('http://asdasdasd.asdasdasd.zzzzz'),
]).then(showImgs);
```

16. Iterator 和```for...of```循环
```for...of``` 是通过Iterator接口来实现的

```js
let arr = ['hello', 'world'];
let map = arr[Symbol.iterator]();
map.next(); // {value: "hello", done: false}
map.next(); // {value: "world", done: false}
map.next(); // {value: undefined, done: true} done--true就是没有了
```
自定义Interator接口
```js
// 先遍历start， 再遍历end
let obj = {
    start: [1,3,2],
    end: [7,9,8],
    [Symbol.iterator](){
        let self = this;
        let index = 0;
        let arr = self.start.concat(self.end);
        let len = arr.length;
        return{
            next(){
                if(index < len){
                    return {
                        value: arr[index++],
                        done: false
                    }
                }else{
                    return {
                        value: arr[index++],
                        done: true
                    }
                }
            }
        }
    }
}

for(let key of obj){s
    console.log(key)
}
```

17. Generator
基本概念
```js
let tell = function* (){
    console.log(1);
    yield 'a';
    console.log(2);
    yield 'b';
    console.log(3);
    return 'c'
}

let k = tell(); // 在yield之前所有操作都没执行

console.log(k.next()); // 执行第一个yield之前所有代码
console.log(k.next());
console.log(k.next());
console.log(k.next());
```
next函数的用法
```js
let obj = {};
obj[Symbol.iterator] = function* (){
    yield 1;
    yield 2;
    yield 3;
}

for(let value of obj){
    console.log(value)
}
```
状态机： 一直next下  循环abc
```js
let state = function* (){
    while(1){
        yield 'A';
        yield 'B';
        yield 'C';
    }
}

let status = state();
status.next();
status.next();
status.next();
status.next();
status.next();
```
async类似代码
```js
let state = async function (){
    while(1){
        await 'A';
        await 'B';
        await 'C';
    }
}

let status = state();
status.next();
status.next();
status.next();
status.next();
status.next();
```
实例： 抽奖剩余次数统计
```js
let draw = function(count){
    console.info(`剩余${count}次`);
}

let residue = function * (count){
    while (count > 0){
        count --;
        yield draw(count);
    }
}

let star = residue(5);
star.next()
```
实例： 长轮询
```js
let ajax = function* (){
    yield new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve({code: 0})
        }, 200)
    })
}

let pull = function(){
    let generator = ajax();
    let step = generator.next();
    step.value.then(function(d){
        if(d.code!=0){
            setTimeout(function(){
                console.log('wait');
                pull()
            }, 1000)
        }else{
            console.log(d)
        }
    })
}

pull();
```

18. Decorator
> 修饰器: 修改类行为的函数

```js
let readonly = function(target, name, descriptor){
    descriptor.writable = false;
    return descriptor
};

class Test{
    @readonly
    time(){
        return '2017-03-11'
    }
}

let test = new Test();

// test.time = function(){
//     console.log('reset time')
// }// 会报错

console.log(test.time()); // '2017-03-11'
```

```js
let typename = function(target, name, descriptor){
    descriptor.myname = 'hello';
};

@typename
class Test{

}

console.log('类修饰符', Test.myname);
// 第三方库直接调用修饰器: core-decorators
```
广告的show和click
```js
let log = (type) => {
    return function(target, name, descriptor){
        let src_method = descriptor.value;
        descriptor.value = (...arg) => {
            src_method.apply(target, arg);
            console.info(`log ${type}`)
        }
    }
}

class AD{
    @log('show')
    show(){
        console.info('ad is show')
    }
    @log('click')
    click(){
        console.info('ad is click')
    }
}

let ad = new AD();
ad.show();
ad.click();
```



add:
function (){
  // 块级作用域
}(); // 出错

闭包： 有权访问另一个函数作用域中的变量的函数

因为函数声明后面不能跟圆括号,函数表达式后面可以跟圆括号,`(函数声明)` => 函数表达式


```js
{
  /**
   *  函数参数的默认值与解构赋值
   *  双重赋值
   * 
   */
  function move({x = 0, y = 0} = {}) {
    return [x, y];
  }
  move({x: 3, y: 8}); // [3, 8]
  move({x: 3}); // [3, 0]
  move({}); // [0, 0]
  move(); // [0, 0] 
}
```

```js
{
  /**
   *  函数参数的默认值与解构赋值  
   * 
   */
  function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
  }
  move({x: 3, y: 8}); // [3, 8]
  move({x: 3}); // [3, undefined]
  move({}); // [undefined, undefined]
  move(); // [0, 0] 
}
```

```js
// 用 for of 来遍历 string类型
for(let code of str){
  console.log('es6',code);
}
```

es6 class
```js
// set get
{
  /**
   * ES6 get set
   * get set函数名不能与constructor的属性同名
   */
  class Person{
    constructor(name="李想",age){
      this.name=name;
      this.age=age;
    }
    static show(){
      console.log(this);
    }
    get _name(){
      return "小"+this.name
    }
    set _name(value){
      this.name=value;
    }
  }
  var person=new Person();
	Person.name;//获取值 触发get方法
	Person.name=”五三”;//设置值 触发set方法

}
```

ask： 
1. function 怎么写来着，会报错
```js
function xx(a,b=a){...}
function xx(a=b,b){...}
```
2. 箭头函数的this,嵌套在obj中的箭头函数的this ?

3. 继承
```js
{
  /**
   * ES3 构造函数的继承
   */
  function Person(name,age){
    this.name=name;
    this.age=age;
  }
  Person.prototype.show=function(){
    console.log(this.name,this.age);
  }
  function Children(name,age,year){
    Person.call(this,name,age);
    this.year=year;
  }
  Children.prototype=new Person();
  /**
   * ES6中继承 子类必须先继承Person的this对象 调用super()
   * super()调用了Person的构造函数 返回生成的子类this对象
   * super可以做为对象来调用 在普通方法里 super.show()将调用Person的方法
   * constructor 调用super可以调用到父级原型上的方法 
   * super在静态方法之中指向父类  静态方法中可调用到父类的实例属性和静态方法
   */
  class Person{
    constructor(name="李想",age){
      this.name=name;
      this.age=age;
    }
    show(){
      console.log(this.name,this.age);
    }
  }
  class Children extends Person{
    constructor(name,age,year){
      super(name,age);
      this.year=year;        
    }
    show2(){
      console.log(this.name,this.age);
    }
  }
  var  child=new Children("五昌",15,3);
}
```