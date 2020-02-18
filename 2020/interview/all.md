# 面试题查漏补缺

1. 请分析以下代码执行结果
```js
var number = 10
function fn(){
    console.log(this.number)
}
var obj = {
    number: 2,
    show: function(fn){
        this.number = 3 // obj.number = 3
        fn() // 直接调用, this为全局 Window
        arguments[0]() // arguments调用, this 会 指向 arguments
    }
}
obj.show(fn) // this 是 obj
```

2. 实现一个 eventEmitter
```js
class EventEmitter{
    constructor(){
        this.arr = {}
    }
    on(key, fn){
        if(this.arr[key]){
            this.arr[key].push(fn)
        }else{
            this.arr[key] = [fn]
        }
    }
    emit(key, ...args){
        this.arr[key].forEach(fn => {
            fn(...args)
        })
    }
}
const emitter = new EventEmitter()

emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 
```

3. 输出结果
```js
function a(){console.log(1)}
a()
function a(){console.log(2)}
a()
function a(){console.log(3)}
a()
// 因为变量提升,所以都为3
```
换一下
```js
function a(){console.log(1)}
a()
function a(){console.log(2)}
a()
var a = function(){console.log(3)}
a()
// 2 2 3
```
再换
```js
var a = function(){console.log(1)}
a()
function a(){console.log(2)}
a()
function a(){console.log(3)}
a()
// 1 1 1
```

4. 输出结果
```js
var num = 1 // 4
var myObject = {
    num:2, // 3
    add: function(){
        this.num = 3;
        (function(){
            console.log(this.num) 
            this.num = 4
        })()
        console.log(this.num)
    },
    sub: function(){
        console.log(this.num)
    }
}

myObject.add() // 1 3
console.log(myObject.num) // 3
console.log(num) // 4
var sub = myObject.sub
sub() // 4
```