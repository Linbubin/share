### let const
1. temporal dead zone ， TDZ
<!-- > 暂时性死区只是块级绑定的一个独特表现，而另一个独特表现则是在循环时使用它。 <br /> -->
> 在let const声明之前调用声明值

```js
// es5中 const的实现
const a = {}
Object.definePerproty({}, x, {
    value: 123,
    writable: false
})
```

2. 全局块级绑定
```js
var a = 1;
window.a; // 1

let xx = 1;
window.xx; // undefined
```

### 字符串
1. includes startsWith endsWith 都是接受两个参数('text', startIndex), endsWith 截取[0 - startIndex)之间,再判断是否在最后
2. str.repeat(次数)  将str重复n次输出

### 函数
1. 默认值. 在 不传入值 或 传入undefined 时会使用默认值. null时不会.
2. arguments. 在调用时如果没传入全部的参数,那么即使设置默认值 arguments.length也会和传入参数长度一致,不会因为设置默认值而添加.

### thunk函数
thunk函数 传名调用

### 异步
#### promise
#### async await
* async函数里如果没有await直接return,则返回一个promise.resolve的结果
```js
async function testAsync() {
    return "hello async";
}
const result = testAsync();
console.log(result);// Promise {<resolved>: "hello async"}
```

* await是在等待一个东西,表达式的计算结果是 Promise 对象或者其它值

如果是promise类型,他就会阻塞等待promise.resolve的返回, 如果只有promise.reject,await会跳出错误

如果是普通类型,就直接拿到返回值
```js
function getSomething() {
    return "something";
}

async function testAsync() {
    return Promise.resolve("hello async");
}

async function test() {
    const v1 = await getSomething(); // 所以不是一定要promise
    const v2 = await testAsync();
    console.log(v1, v2);
}

test(); // something hello async
```
* 优势： 处理then链


### note
去重
```js
const arr = [1,2,3,1,1,1,1,2,3,4,3,3,4,4];
Array.from(new Set(arr))
```

默认参数
```js
// 用来做必传检验
function checkParameter(){
    throw new Error('can\'t be empty');
}
function f(x=checkParameter(),y,z){
    // doSomething
}

f()// error
```

代理
```js
// es3
// es5
// es6
```