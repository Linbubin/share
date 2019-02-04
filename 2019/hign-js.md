# 进阶查漏补缺面试题

31-4 剩下所有
5-8 F:\BaiduNetdiskDownload\前端跳槽面试必备技巧

9-10 改简历
11 观望
12-14 F:\BaiduNetdiskDownload\HTMl5与CSS3实现动态网页


1. 模块化
webpack rollup
import export 的语法

2. class 和 构造函数
> * 用class作继承,子class的constructor必须写super(),其参数传给父class的constructor当做参数。<br />
> * class子类new出来的实例会带有父class的constructor里面的值<br /> 

```js
{
    function Animal(name){
        this.name = name
    }
    Animal.prototype.say = function(){
        console.log('say::', this.name)
    }

    function Dog(age){
        this.age = age;
    }

    Dog.prototype = new Animal('billy');

    const dog = new Dog('28');

    console.log(dog)
}
{
    class Animal{
        constructor(name, age){
            this.name = name;
        }
        eat(){
            console.log(animal)
        }
    }

    class Dog extends Animal{
        constructor(name, age){
            super(name);
            this.age = age;
        }
        say(){
            console.log(this.name + this.age)
        }
    }
    const dog = new Dog('billy', 18)
    console.log(dog)
    console.log(dog.__proto__)
}
```

3. promise
```js
// 原
function loadImg(src, successFun, failFun){
    var  img = document.createElement('img');
    img.onload = function(){
        successFun();
    }
    img.failFun = function(){
        failFun()
    }
    img.src = src;
}

// promise
function loadImg(src){
    const promise = new Promise((resolve, reject) => {
        var img = document.createElement('img');
        img.onload = function(){
            resolve(img);
        }
        img.failFun = function(){
            reject()
        }
        img.src = src;
    })
    return promise
}
var src = 'xxx';
var result = loadImg(src);

result.then(function(img){
    // 第一个成功的函数
    console.log(img.with)
}, function(){
    // 失败的函数
    console.log('failed')
})
// 如果还要写成功的另外函数就
result.then(function(){
    // 第二个成功的函数
    console.log('successFun2');
})

```

4. es6中常用的功能
* let/const
* 多行字符串/模板变量
* 解构赋值
* 块级作用域
* 函数默认参数
* 箭头函数 this指向函数体最近一层的this, 书写简便化

5. jquery 原型的实际应用 
jquery用$选择器获得的变量,都有css html方法,都是从原型中获得
```js
// selector

// Array.prototype.call(document.querySelector(selector))

// this[i] = dom[i]
```

6. 单线程 多线程
> 单线程，只有一个线程,只能做一件事情。<br>
> 存在的原因: 避免DOM渲染冲突.(js修改DOM,多线程修改dom就会出问题)

异步的问题:
* 没有按照书写方式执行,可读性差
* callback中不容易模块化

event-loop：
事件轮询,先将异步函数挂起（放到异步队列）,等待时间结束，由事件管理器将其拿回到调用栈中

7. jquery 1.5的变化
> jQ 1.5之前ajax 使用success: xxx, fail: xxx, 1.5之后用.then(successFun, failFun)
* 无法改变js异步和单线程的本质
* 只能写法上杜绝callback这种形式
* 很好体现: 开放封闭原则(对扩展开放,对修改封闭)

```js
// jquery deffered
// 第一类 dtd.resolve dtd.reject
// 第二类 dtd.then dtd.done dtd.fail
function waitHandle(){
    var dtd = $.Deferred();

    var wait = function(dtd){
        vat task = function(){
            console.log('执行完成');
            dtd.resolve(); // 成功传入
            dtd.reject(); // 失败传入
        }
        setTimeout(task, 2000);
        // return dtd; // 返回deffered对象
        return dtd.promise(); // 返回promise对象
    }
    return wait(dtd)
}

var w = waitHandle();
// w.then(successFun, errorFun)
$.when(w).then(successFun, errorFun)
```

8. promise
```js
return new Promise((resolve, reject) => {
    // resolve();
    // reject();
})
```
promise.then().catch()

```js
// 链式操作
// 第一个then中return的值会成为第二个return的初始值
result1.then(()=>{
    // xxxx
    return something // something为普通类型,则被当做下一个.then的参数,something为promise类型,则被当做下个.then的promise执行
}).then((something)=>{
    // xxx
}).catch(err => {
    // handle Error
})
```

Promise.all & Promise.race
```js
// result 和 result2 为promise类型
Promise.all([result, result2]).then(datas => {
    console.log(datas)
})
Promise.race([result, result2]).then(datas => {
    console.log(datas)
})
```

9. async/await
> 将异步转为同步
```js
// import 'babel-polyfill'  // 因为是es7,多加一条 babel兼容
// 最基本使用
const load = async function(){
    const result1 = await loadImg('src1');
    console.log(result1)
    const result2 = await loadImg('src2');
    console.log(result2)
}
load();
```

10. generator 和异步的关系

11. 虚拟DOM(virtual dom)
api: snabbdom 的 h(标签，属性， 子) 和patch(原dom,新dom)函数
是什么: 用js模拟dom结构
为什么: dom操作非常昂贵
如何使用: snabbdom的h和patch函数
介绍diff算法: diff是什么，为什么用
diff是linux的基本命令，git diff也有
vdom中diff是为了找出需要更新的节点

12. MVVM

13. 组件化和react
组件化理解
jsx本质是什么
jsx和vdom的关系
setState的过程
阐述自己对react和vue的认识