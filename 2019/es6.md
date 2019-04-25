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
promise
async await

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