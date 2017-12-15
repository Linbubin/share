# this

## 最外层
```
console.log(this === window);  // true
console.log(window.alert === this.alert);  // true
console.log(this.parseInt("021", 10));  // 21 
```


## 函数内部使用this, this指调用对象

```
// 定义一个全局函数
function foo() {
    console.log(this.fruit); // window
}
// 定义一个全局变量，等价于window.fruit = "apple";
var fruit = "apple";
// 此时函数foo中this指向window对象
// 这种调用方式和window.foo();是完全等价的
foo();  // "apple"

// 自定义一个对象，并将此对象的属性foo指向全局函数foo
var pack = {
    fruit: "orange",
    foo: foo
};
// 此时函数foo中this指向window.pack对象
pack.foo(); // "orange"

// 多层嵌套 this
var one = {
    fruit: "apple",
    two: {
        fruit: "banana",
        foo: foo
    }
}
one.two.foo(); // "banana"
var a = one.two.foo;
a(); // undefined

var a = one.two.foo.bind(one);
a();  //"apple"
```
### 箭头函数
>1. 箭头函数的this绑定看的是this所在的函数定义在哪个对象下，绑定到哪个对象则this就指向哪个对象
>2. 如果有对象嵌套的情况，则this绑定到最近的一层对象上

简单来说，箭头函数中的this就是在箭头函数所在函数外层的那个this,(向外查找function声明的函数，里面加一句console.log(this)就是这个！)

而function声明的函数，只是看调用对象
```
var a = {
    b: {
        c: {
            d: {
                e: ()=>{console.log(this)} // Window
            }
        }
    }
}
```
```
var obj1={  
    num:4,  
    fn:function(){  
        var f=() => {    
            console.log(this);  //object，也就是指obj1  
            setTimeout(() => {  
                console.log(this); //object，也就是指obj1  
            });  
        }  
        f();  
    }  
}  
obj1.fn();
```
改变一处
```
var obj1={  
    num:4,  
    fn:function(){  
        var f=function(){      
            console.log(this); 
			//window,因为函数f定义后并没有对象调用，this直接绑定到最外层的window对象  
            setTimeout(() => {  
                console.log(this);
				//window，外层this绑定到了window,内层也相当于定义在window层（全局环境）  
            });  
        }  
        f();  
    }  
}  
obj1.fn();  
```
改变另一处
```
var obj1={  
    num:4,  
    fn:function(){  
        var f=() => {      
            console.log(this); 
			//object,f()定义在obj1对象中，this就指向obj1,这就是箭头函数this指向的关键  
            setTimeout(function() {  
                console.log(this);
				//window，非箭头函数的情况下还是要看宿主对象是谁，如果没有被对象调用，函数体中的this就绑定的window上  
            });  
        }  
        f();  
    }  
}  
obj1.fn();
```
class中则为 class

---

## 使用apply和call来改变
> JavaScript 的一大特点是，函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念。

```
func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2])
```
### 作用
```
function中arguments为伪数组不具备array的方法，就可以用Array.prototype.join.call(arguments, ...)
```
```
function changeStyle(attr, value){
    this.style[attr] = value;
}
var box = document.getElementById('box');
window.changeStyle.call(box, "height", "200px");
或 
window.changeStyle.apply(box, ['height', '200px'])
改变this指向从而赋值
```

```
function log(msg)　{ 
  console.log(msg);
}
log(1);    //1
log(1,2);    //1
上面方法可以解决最基本的需求，但是当传入参数的个数是不确定的时候，上面的方法就失效了，这个时候就可以考虑使用 apply 或者 call，注意这里传入多少个参数是不确定的，所以使用apply是最好的，方法如下：
function log(){
  console.log.apply(console, arguments);
};
log(1);    //1
log(1,2);    //1 2
```
---
```
// 柯里化
if (!function() {}.mybind) {
    Function.prototype.mybind = function(context) {
        var self = this
            , _args = Array.prototype.slice.call(arguments,1);
        return function() {
            return self.apply(context, _args.concat(Array.prototype.slice.call(arguments)));    
        }
    };
}

var name="zxy";
function Obj(){
    this.name 

 = 'currying';
}
var obj = new Obj();
fun = function() {
    var args = Array.prototype.slice.call(arguments);
    console.log('out: ',args.slice(0).join("::"));
}.mybind(obj,"zeng","xy");
fun('hzjs'); //zeng::xy::hzjs
```

## bind
>obj.bind(thisObj, arg1, arg2, ...);
把obj绑定到thisObj，这时候thisObj具备了obj的属性和方法。与call和apply不同的是，bind绑定后不会立即执行。

示例
```
function fn(a,b){
    console.log(this);
    console.log(a);
    console.log(b);
}
// bind(this,args...)
bf = fn.bind("Bind this",10); // 没有任何输出，也就是说没有执行这个函数
bf(); // "Bind this",10,undefined
bf(20);// “Bind this”,10,20
// 原函数不受影响
fn(1,2); //window， 1，2
bf2 = fn.bind("Bind this",1,2);
bf2(); // "Bind this",1,2
```
多重bind
```
function say() {  
    alert(this.x);  
};  
var a = say.bind({x: 1});  
var b = a.bind({x: 2});  
b(); // 这里会输出1还是2呢？

var c = b.bind({x: 3});
c();
```
简化版本bind
```
Function.prototype.bind = Function.prototype.bind || function(context) {
  var that = this;
  return function() {
    return that.apply(context, arguments);
  }
} 
```
等式替换
```
var a = function() {  
    return say.apply({x: 1});  
};


var b = function() {  
    return a.apply({x: 2});  
};

var b = function() {  
    return function() {  
        return say.apply({x: 1});  
    }.apply({x: 2});  
};
多次绑定的结果
所以无论使用bind绑定多少次，最终原函数的this值是由第一次绑定传的参数决定的。
```

多次绑定参数的顺序
```
function say() {  
    console.log(this.x);  
};  
var a = say.bind({x: 1},1,2,3);
var b = a.bind({x: 2},4,5,6);
a(7,8,9);
b(7,8,9);
// 此时原函数say参数的顺序的怎样的呢?
// 是[4,5,6,1,2,3,7,8,9]还是[1,2,3,4,5,6,7,8,9]  

首先对say使用bind方法，会改变函数say的this值，和“内置”参数。所以
a(7,8,9) 的参数组成是：
内置的参数 + 调用时传入的参数 = 最终函数，
即[1,2,3]+ [7,8,9] = [1,2,3,7,8,9]

而对函数a使用bind方法，只会改变函数a的this值，和往函数a里“内置”参数。所以

b(7,8,9)的参数组成是：
[1,2,3](在函数say内置的参数) + [4,5,6](在函数a内置的参数) + [7,8,9]
= [1,2,3,4,5,6,7,8,9]
```


> ### 总结一下 apply, call, bind的异同点：
>1. apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
>2. apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
>3. apply 、 call 、bind 三者都可以利用后续参数传参；
>4. bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。

---
# 原型链
>无论什么时候，只要创建了一个函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。在默认情况下，所有对象原型都会自动获得一个constructor属性，这个属性包含一个指向prototype属性所在函数的指针。 --Javascript高级程序设计

例子
```
function fruits() {}

fruits.prototype = {
    color: "red",
    say: function() {
        console.log("My color is " + this.color);
    }
}

var apple = new fruits;
apple.say();    //My color is red
```
```
function a(c){
    this.b = c;
    this.d =function(){
        console.log(this.b);
    }
}

var obj = new a('test');
console.log(typeof obj.prototype);//undefine
console.log(typeof a.prototype);//object {constructor: ƒ}

a.prototype.constructor;//↓↓↓↓↓↓↓↓↓↓↓↓

ƒ a(c){
    this.b = c;
    this.d =function(){
        console.log(this.b);
    }
}

同时 a.prototype.constructor = a = obj.constructor
new以后会自动添加一个constructor属性
```

new 对象 出来的值是没有prototype的,
当对象生成时，它的`__proto__`会被设置为构造函数的prototype,

`obj.__proto__ === a.prototype // true`

> 注意，__proto__是实例的一个属性，而原型prototype是其构造函数函数的一个性质。

所以 `var obj = new a('test');`可以理解为
```
var obj={};
obj.__proto__=a.prototype;
a.call(obj, 'test');
```
level up
```
function a(c){
    this.b = c;
    this.d =function(){
        console.log(this.b);
    }
}
a.prototype.test = function(){
    console.log(this.b);
}
var obj = function (){}
obj.prototype = new a('a');
// obj.prototype.__proto__ = a.prototype
obj.prototype.test1 =function(){
    console.log(22222);
}

var t = new obj('obj'); 
// t.__proto__ = obj.prototype

t.test();
//t.__proto__.__proto__
```
again
```
function a(c){
    this.b = c;
    this.d =function(){
        console.log(this.b);
    }
}
var obj  = new a('test');
obj.constructor === a.prototype.constructor // true

a.prototype = 1;
var obj1 = new a('test');
obj1.constructor === a.prototype.constructor // false
// 因为当a.prototype.constructor改变，则new的新对象的constructor就会直接等于最顶层的object对象的constructor
```
constructor妙用
```
function MyClass(a, b) {
    this.a = a;
    this.b = b;
}

MyClass.prototype.sum = function () {
    return this.a + this.b;
};

MyClass.prototype.diff = function () {
    return this.a - this.b;
};

function defclass(prototype) {
    var constructor = prototype.constructor;
    constructor.prototype = prototype;
    return constructor;
}

var MyClass = defclass({
    constructor: function (a, b) {
        this.a = a;
        this.b = b;
    },
    sum: function () {
        return this.a + this.b;
    },
    diff: function () {
        return this.a - this.b;
    }
});
```

--- 







### 穿插一下 mongo  按字段的值优先排序

In your specific example you can write this:
```
db.color.aggregate([{
    $addFields : {
        "rank" : { // add a field called rank to all our documents
            $cond: {
                if: { $eq: [ "$color", "blue" ] }, // if the color value matches "blue"
                then: 0, // then we want items to be on the top
                else: 1 // else we want them to be in the second part
            }
        }
    }
}, {
    $sort : {"rank" : 1} // sort ascending by our newly created "rank" field
}])

If you are using an older version of MongoDB (<3.4) that does not support $addFields yet you can instead resort to using $project instead like so:

db.color.aggregate([{
    $project : {
        "color": 1, // we want to retain the value of the color field
        "name": 1, // the same goes for the name field
        "rank" : { // add a field called rank to all our documents
            $cond: {
                if: { $eq: [ "$color", "blue" ] }, // if the color value matches "blue"
                then: 0, // then we want items to be on the top
                else: 1 // else we want them to be in the second part
            }
        }
    }
}, {
    $sort : {"rank" : 1} // sort ascending by our newly created "rank" field
}])
```