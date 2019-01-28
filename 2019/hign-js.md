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