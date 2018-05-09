# 面向对象

## 创建对象(封装)
1. new Object()
2. {}
3. 使用字面量
4. factory
5. 构造函数模式 constructor
6. 原型模式 prototype
7. 构造函数 + 原型
8. 动态原型、 寄生构造函数 、稳妥构造函数 - 不常用

## 继承
1. 原型链继承
2. 构造函数继承
3. 组合继承 = 原型链继承 + 构造函数继承
4. jquery中 继承(clone和拓展)
5. 最理想的继承 寄生组合 



// TODO: Object.create ??? 


### 代码
1.
```js
	var o = new Object();
	o.name = 'linb';

	o.sayName = function() {
		alert(this.name);
	}

	o.sayName()
```

2.
```js	
	var o = {};
	o.name = 'linb';

	o.sayName = function() {
	alert(this.name);
	}

	o.sayName()
```

3.
```js
var o1 = {};
o1.sayName = function() {
	alert(this.name);
}

var o2 = {};
o2.name = 'lisi';
o2.sayName = function(){
	alert(this.name);
}

alert(o1.sayName == 02.sayName)
```
缺点：
1-3：
1-没有特定类型 只能new Object 不能 直接new Animal, 声明的时候 需要写多遍。一一赋值， 代码会重复。
2-sayName不是两个相同的方法，不同对象调用不同的方法。

优点：
如果只new一次 就用这种方式

4. 工厂模式
```js
function createPerson(name){
	var o = new Object();
	o.name = name;
	o.sayName = function(){
		alert(this.name);
	}
	return o;
}

var person = createPerson("zhangsan");
person.sayName();

var person2 = createPerson("lisi");
person2.sayName();

alert(person.sayName == person2.sayName);

alert(person instanceof Object);
// 虽然解决了代码冗余 ， 但是没有定义具体的类型(知道是Object，但不知道是不是Person类型)。
// 本质上sayName还是重复占用空间。
// alert(person instanceof Person)
```

5. 构造函数模式
```js
// function _sayName(){
// 	alert(this.name);
// } 
function Person(name){
	this.name = name;
	this.sayName = function(){
		alert(this.name);
	}
	// this.sayName = _sayName; // 破坏封装性
}

// new 出来对象   执行出来 为函数

var p1 = new Person("zhangsan");
var p2 = new Person("lisi");

p1.sayName();
p2.sayName();

alert(p1.sayName == p2.sayName); // false
// new 出来的 constructor指向 构造方法
alert(p1.constructor == p2.constructor);
alert(p1.constructor == Person);
alert(p1.constructor);

alert(typeof(p1));// Object

alert(p1 instanceof Object);
alert(p1 instanceof Person);

// (new Person => Object) -> Person extends Object
// 明确标识类型，但是方法还是要重新封装一遍(可以用全局函数来替代。 但是如果方法比较多，就会破坏封装性， 别人想调用直接拿外部的来调用)
```

6.  原型模式
// new出来的对象 如果本身没有该属性，就去 构造函数的prototype有没有
```js
// TODO: 函数中Animal改成this，可以用吗？this.prototype.name = 'animal'; 不行，因为 this会指向 生成的对象
function Animal(){
	Animal.prototype.name = 'animal';
	Animal.prototype.sayName = function(){
		alert(this.name);
	}
}

var a1 = new Animal();
var a2 = new Animal();

alert(a1.sayName == a2.sayName);
a1.sayName();

alert(a1.constructor.prototype);
```
```js
function Animal(){
	Animal.prototype.name = 'animal';
	Animal.prototype.sayName = function(){
		alert(this.name);
	}
}

var a1 = new Animal();
var a2 = new Animal();

a1.sayName();

a2.name = 'dog';
a2.sayName();

```
```js
function Animal(name){
	Animal.prototype.name = name;
	Animal.prototype.sayName = function(){
		alert(this.name);
	}
}

var a1 = new Animal('dog');
var a2 = new Animal('cat');

a1.sayName();

a2.name = 'dog';
a2.sayName();

```
这种有一个很明显的缺点：定义属性中 存在引用类型， 会导致 共同更改
```js
function Animal(){
	Animal.prototype.name = 'animal';
	Animal.prototype.friends = ['dog', 'cat'];
	Animal.prototype.sayName = function(){
		alert(this.name);
	}
}

var a1 = new Animal();
var a2 = new Animal();

a1.sayName();

a2.name = 'dog';
a2.sayName();

a1.friends.push('snack');
alert(a2.friends);
// 如果直接设置 a1.frineds = 111; 那么 a2.friends会改变吗
// 不会，只有部分函数才会把原指向的对象进行改变,而赋值是直接将指针指向其他位置。
```
改变一种原型赋值的方式
```js
function Animal(){
	Animal.prototype = {
		// constructor: Animal,
		name: "animal",
		friends: ["dog", "cat"],
		sayName: function() {
			alert(this.name);
		}
	}
}

var a1 = new Animal();
console.log(a1.__proto__ == Animal.prototype) // false
console.log(a1.__proto__); // {constructor: ƒ}
console.log(Animal.prototype); // {constructor: ƒ, name: "animal", friends: Array(2), sayName: ƒ}

var a2 = new Animal();
console.log(a2.__proto__ == Animal.prototype) // false
```

7. 构造函数 + 原型
```js
// 综上：有两个问题
// 1. 私有属性会因为原型而同时发生改变
// 2. 共有的方法或属性会因为 构造函数 重复写，占用空间
// 就采用 私有用构造函数 + 共有用原型

// 私有--构造函数
function Animal(name){
	this.name = name;
	this.friends = ['dog','cat'];
}

// 共有--原型
Animal.prototype.sayName = function() {
	alert(this.name);
}

var a1 = new Animal("a1");
var a2 = new Animal("a2");

alert(a1.sayName == a2.sayName);

a1.friends.push('snake');
alert(a2.friends);
```

## 继承
1. 原型链继承
new 出来的实例 如果没有 自身的属性或者对象，可以通过 构造函数的 原型（prototype）来访问，
如果一层没有就往上找， 最上面是 Object.prototype    
```js
function Animal(){
	this.name = 'animal';
}

Animal.prototype.getName = function() {
	alert(this.name);
}
// 上面是标准的构造函数+原型

function Dog() {
	this.age = 8
}

// 为了让new出来的dog可以访问到 Animal的方法和属性
Dog.prototype = new Animal();
// 这里能明显的看到一个问题，构造函数.prototype.constructor被Animal给覆盖掉了(原来应该是Dog自身，现在成 Animal了).
// 这个问题后面解决，先假装不知道。 继续 标记一下 PROBLEM
Dog.prototype.getAge = function() {
	alert(this.age);
}

var d = new Dog();

d.getName();
// 提供2个方法检验属性or方法是否是属于该对象
// 1. in  -> 'getName' in d => true 是否可以访问到
// 2. hasOwnProperty -> d.hasOwnProperty('getName') => false 是否属于对象本身
//d.getName ->d.__proto__.getName -> Dog.prototype.getName -> Dog.prototype.__proto__.getName -> Animal.prototype.getName

//还有个问题 getName中的this指的是谁
// console.log(this == ???)
d.getAge();
```
弊端: 和原型模式的缺点一样，定义的对象会被其他子类改写。
```js
function Animal(){
	this.name = 'animal';
	this.friends = ['a1', 'a2'];
}

Animal.prototype.getName = function() {
	alert(this.name)
}

function Dog(){
	this.age = 8;
}

Dog.prototype = new Animal();
Dog.prototype.getAge = function() {
	alert(this.age);
}

var d1 = new Dog();
var d2 = new Dog();
d1.friends.push('a3');
// d1.friends -> d1.__proto__.friends -> Dog.prototype.friends -> ['a1', 'a2']的位置

alert(d2.friends)// a1 a2 a3  
// 引用会被改变 -> ask: 改变d1.name = 'dog1', 是否会改变 d2.name
```

2.  构造函数继承
```js
function Animal(name){
	this.name = name ;
	this.friends = ['a1', 'a2'];
}

function Dog(){
	Animal.call(this, 'dog');
	this.age = 8;
}

var d1 = new Dog();
var d2 = new Dog();
d1.friends.push('a3');
alert(d2.friends);
alert(d1.friends === d2.friends);
// new 一个新的时候，会重新写一遍 Animal,所以 friends不会被覆盖
```
构造方法里面增加方法
```js
function Animal(name){
	this.name = name ;
	this.friends = ['a1', 'a2'];
	this.getName = function() {
		alert(this.name)
	}
}

function Dog(){
	Animal.call(this, 'dog');
	this.age = 8;
}

var d1 = new Dog();
var d2 = new Dog();
d1.friends.push('a3');
alert(d2.friends)

d1.getName();
```
缺点： 和构造时候的缺点一样，getName这种共用方法会写多次，占用空间.所以需要使用原型链+构造函数继承的组合。

3. 组合继承 = 原型链继承 + 构造函数继承
```js
function Animal(name) {
	this.name = name;
	this.friends = ['a1', 'a2'];
}

Animal.prototype.getName = function() {
	alert(this.name);
}

function Dog() {
	Animal.call(this, 'dog');
	this.age = 8;
}

Dog.prototype = new Animal();

Dog.prototype.getAge = function(){
	alert(this.age);
}

var d1 = new Dog();
var d2 = new Dog();
d1.friends.push('a3');
alert(a2.friends);

d1.getName();
```
弊端： 多次执行父类对象 N+1
‘子类中name和friends都重新覆盖Animal中的。’ // ？？？？？？？？？？ 回去看看
 多次重写。 浪费资源
不过就多写一次，不是不能接受。 大部分都利用这种方式

4. jquery中 继承(clone和拓展)
```js
var animal = {
	name: 'animal',
	friends: ['a1', 'a2'],
	sayName: function(){
		alert(this.name);
	}
}

// clone
var dog = Object.create(animal); // dog的原型指向animal  TODO：测试！
//https://blog.csdn.net/blueblueskyhua/article/details/73135938
// 扩展
dog.age = '8';

var cat = Object.create(animal);
cat.age = '18';

dog.friends.push('a3');
alert(cat.friends);

alert(dog.__proto__ == animal);

dog.sayName();
cat.sayName();
alert(dog.sayName == cat.sayName);
```
弊端: class中有引用类型，会导致数据异常

5. 最理想的继承 寄生组合 // TODO: Object.create ??? 
```js
function Animal(name){
	this.name = name;
	this.friends = ['a1', 'a2'];
}

Animal.prototype.getName = function() {
	alert(this.name);
}

function Dog(){
	Animal.apply(this.arguments);
	this.age = 8;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // 解决之前的 PROBLEM

Dog.prototype.getAge = function(){
	alert(this.age);
}

var d1 = new Dog('d1');
var d2 = new Dog('d2');
d1.friends.push('a3');
alert(d2.friends);

d1.getName();
```

jquery的extend方法
```js
// extend方法为jQuery对象和init对象的prototype扩展方法
// 同时具有独立的扩展普通对象的功能
jQuery.extend = jQuery.fn.extend = function() {
　　/*
　　*target被扩展的对象
　　*length参数的数量
　　*deep是否深度操作
　　*/
　　var options, name, src, copy, copyIsArray, clone,
　　　　target = arguments[0] || {},
　　　　i = 1,
　　　　length = arguments.length,
　　　　deep = false;

　　// target为第一个参数，如果第一个参数是Boolean类型的值，则把target赋值给deep
　　// deep表示是否进行深层面的复制，当为true时，进行深度复制，否则只进行第一层扩展
　　// 然后把第二个参数赋值给target
　　if ( typeof target === "boolean" ) {
　　　　deep = target;
　　　　target = arguments[1] || {};

　　　　// 将i赋值为2，跳过前两个参数
　　　　i = 2;
　　}

　　// target既不是对象也不是函数则把target设置为空对象。
　　if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
　　　　target = {};
　　}

　　// 如果只有一个参数，则把jQuery对象赋值给target，即扩展到jQuery对象上
　　if ( length === i ) {
　　　　target = this;

　　　　// i减1，指向被扩展对象
　　　　--i;
　　}

　　// 开始遍历需要被扩展到target上的参数

　　for ( ; i < length; i++ ) {
　　　　// 处理第i个被扩展的对象，即除去deep和target之外的对象
　　　　if ( (options = arguments[ i ]) != null ) {
　　　　　　// 遍历第i个对象的所有可遍历的属性
　　　　　　for ( name in options ) {
　　　　　　　　// 根据被扩展对象的键获得目标对象相应值，并赋值给src
　　　　　　　　src = target[ name ];
　　　　　　　　// 得到被扩展对象的值
　　　　　　　　copy = options[ name ];

　　　　　　　　// 这里为什么是比较target和copy？不应该是比较src和copy吗？
　　　　　　　　if ( target === copy ) {
　　　　　　　　　　continue;
　　　　　　　　}

　　　　　　　　// 当用户想要深度操作时，递归合并
　　　　　　　　// copy是纯对象或者是数组
　　　　　　　　if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
　　　　　　　　　　// 如果是数组
　　　　　　　　　　if ( copyIsArray ) {
　　　　　　　　　　　　// 将copyIsArray重新设置为false，为下次遍历做准备。
　　　　　　　　　　　　copyIsArray = false;
　　　　　　　　　　　　// 判断被扩展的对象中src是不是数组
　　　　　　　　　　　　clone = src && jQuery.isArray(src) ? src : [];
　　　　　　　　　　} else { 
　　　　　　　　　　　　// 判断被扩展的对象中src是不是纯对象
　　　　　　　　　　　　clone = src && jQuery.isPlainObject(src) ? src : {};
　　　　　　　　　　}

　　　　　　　　　　// 递归调用extend方法，继续进行深度遍历
　　　　　　　　　　target[ name ] = jQuery.extend( deep, clone, copy );

　　　　　　　　// 如果不需要深度复制，则直接把copy（第i个被扩展对象中被遍历的那个键的值）
　　　　　　　　} else if ( copy !== undefined ) {
　　　　　　　　　　target[ name ] = copy;
　　　　　　　　}
　　　　　　}
　　　　}
　　}

　　// 原对象被改变，因此如果不想改变原对象，target可传入{}
　　return target;
};

var a = {};

jQuery.extend(a, {name: 'hello'}, {age: 10});
console.log(a); // Object{name: "hello", age: 10}

// 浅拷贝
var a = {};
var b = { friends: ['a1', 'a2'] };
jQuery.extend(a,b);
console.log(a);
a.friends.push('a3');
console.log(b);// ['a1','a2','a3']


// 深拷贝
var a = {};
var b = { friends: ['a1', 'a2'] };
jQuery.extend(true, a, b);
console.log(a);
a.friends.push('a3');
console.log(b);// ['a1','a2']
```








4. 
将要生成的对象，放到一个函数中，根据传入的参数值不同，生成不同的对象。
由于所有的object都继承自Object，所以person instanceof Object为true
优点： 代码减少
缺点： 依然没有定义具体的类型， 只知道是一个createPerson函数。 sayName也是重复生成，二次占用空间。

5.
构造函数其实和上面的方法类似，但是注意，他的函数名是大写开头的,也算是一种约定。高程里面指出，变量用下划线， 方法用驼峰。大写开头的方法，自然就是构造函数。
同时,构造函数.prototype.constructor 指向它本身,
俗话说，没有对象，就自己new一个。 new方法类似于 call和apply， 将this指向改变成生成的值。
当然，不仅仅是改变指向， 同时 他会将 自己的__proto__指向 构造函数的 prototype.
所以 p1.constructor == p2.constructor 都指向 Person的prototype -> true, 也指向Person本身 -> true

6.
为什么可以直接定义未声明的变量， 因为js函数在执行之前不会编译，只是放在那里。当你准备执行的时候，其实他已经存在了。
this应该都知道的。比如`function a(){console.log(a)}`是不会报错的。 同理 Animal里可以访问关于Animal的一切(可以让你访问到的一切).
但是这种构造函数的contructor不会指向他自己,会直接定位到Function

提前讲继承的小知识。 当自己没有这个方法或者属性时，就会通过this.__proto__即 构造函数.prototype去查找有没有类似的方法和属性。

所以这里的sayName就会相等