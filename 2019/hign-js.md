# 进阶查漏补缺面试题

31-4 剩下所有
5-8 F:\BaiduNetdiskDownload\前端跳槽面试必备技巧

9-10 改简历
11 观望
12-14 F:\BaiduNetdiskDownload\HTMl5与CSS3实现动态网页


1. 模块化
模块的定义: 可以理解成实现特定功能的相互独立的一组方法<br>
webpack rollup
import export 的语法

2. class 和 构造函数
> * 用class作继承,子class的constructor必须写super(),其参数传给父class的constructor当做参数,但是返回的是 子class的属性。<br />
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
// 如果要获取失败值,可以在function中return await的返回值,在外部调用.then .catch方法

async function xx(){
    const result = await loadImg('src1');
    return result
}

xx().then(i => {})
    .catch(i => {})
```

```js
// 特殊执行顺序
console.log(1)
let promiseDemo = new Promise((resolve, reject) => {
    console.log(2)
    setTimeout(() => {
        let random = Math.random()
        if (random >= 0.2) {
            resolve('success')
            console.log(3)
        } else {
            reject('failed')
            console.log(3)
        }   
    }, 1000)
})

async function test() {
    console.log(4)
    let result = await promiseDemo
    return result
}

test().then(result => {
    console.log(5)
}).catch((result) => {
    console.log(5)
})

console.log(6)

// 1 2 4 6 3 5
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
使用jq和用框架的区别: 数据和视图分离 和 数据驱动视图

MVVM的理解：modal view  view-modal(作为view和modal的桥梁)

三要素：  响应式 模板引擎 渲染
响应式： 修改data属 性，vue立刻监听.
使用 Object.defineProperty
将data属性代理到vm上
```js
var obj = {};
var name = 'zhangsan';
Object.defineProperty(obj, "name", {
    get: function(){
        console.log('get');
        return name;
    },
    set: function(newVal){
        console.log('set');
        name = newVal;
    }
})

console.log(obj.name);
obj.name = 'list'
```

模版： 本质-字符串   有逻辑 v-if v-for   嵌入js变量   模板必须转化为js代码(只有js代码有逻辑、渲染html、js变量)    

v-for: _l(list, (item)=>_c(xxx,xx,xx))
v-on: input 事件

vue整个实现流程：
* 解析模板成render函数
* 响应式开始监听
* 首次渲染,显示页面,且绑定依赖
* data属性变化,触发renderer

13. 组件化和react
数据视图分离, 数据驱动视图改变

组件化理解: 封装和复用(类似面向对象的 封装继承多态)
封装`视图、数据、变化逻辑`
复用`改变props的值,产生不同的结果`

jsx本质是什么:
jsx是语法糖  jsx解析成js React.createElement


jsx和vdom的关系  React.createElement(vnode, {style}, [children])

setState的过程

阐述自己对react和vue的认识
不同：
名字    本质     模板
vue     MVVM    模板
react   组件化   jsx

相同:
都支持组件化
数据驱动视图

14. hybird
解释: "混合",即前端和客户端的混合开发，一个界面一部分h5 + 一部分客户端
要求: 更新频繁，其中如果只更新h5可以不用审核

webview: app中的一个组件,可以承载浏览器的一个内核

file协议: 本地文件，访问速度快


具体实现：
* 前端做好静态页面（html, js, css），交给客户端
* 客户端拿到前端静态页面，以文件形式存储在app
* 客户端在一个webview中用file协议加载静态页面

更新静态文件:  app去server下载zip文件,然后到app中解压 覆盖原来的html css js文件

hybird 
优点： 体验好,和原生类似. 加载快.
缺点:  开发成本高,debug.  运维成本高,版本号-文件仓库.

适用场景
hybird: 产品的稳定功能,体验要求高,迭代频繁。  产品型
h5: 单次的运营活动(如 xx红包)或不常用功能。   运营型

问题: 固定的js文件如何渲染出不同的页面内容 --- 由客户端获取新闻内容,然后js通讯拿到内容,再进行渲染

js和客户端通讯: 基本形式 调用能力，传递参数，监听回调

15. 热爱编程吗
* 看书 看懂总结，看不懂列出
* 写博客
* 做开源