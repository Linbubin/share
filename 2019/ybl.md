null
undefined
object
string
boolean
symbol

[] == 0 // [].toString(); -> '' -> 0

let const不提升导致的问题
> 如果在块中 在let或const声明调用变量，则提示undefined的警告
```js
const A = 1;
function a(){
  console.log(A);
}
a() // 1
function b(){
  console.log(A);
  const A = 2;
}
b() // ReferenceError: A is not defined
function c(){
  const A = 3;
  console.log(A);
}
c() // 3
```

上下文是 this，在调用时确定的
作用域是 function内外


this指向
()=> 传入当前上下文的this


new
```js
function myNew(constructor) {
  var obj = {}
  Object.setPrototypeOf(obj, constructor.prototype);
  return constructor.apply(obj, [...arguments].slice(1)) || obj
}
```

settimeout的第二个参数不是执行等待时间,是事件管理器将函数移入调用栈的等待时间[这里](https://yubolun.com/javascript-interview-handbook/)
[这里](https://medium.freecodecamp.org/the-definitive-javascript-handbook-for-a-developer-interview-44ffc6aeb54e?gi=7cdc8a29149)