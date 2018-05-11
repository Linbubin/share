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
4. Obejct.create继承(clone和拓展)
5. 最理想的继承 寄生组合 

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
//将要生成的对象，放到一个函数中，根据传入的参数值不同，生成不同的对象。

var person = createPerson("zhangsan");
person.sayName();

var person2 = createPerson("lisi");
person2.sayName();

alert(person.sayName == person2.sayName);

alert(person instanceof Object);
//由于所有的object都继承自Object，所以person instanceof Object为true

// 虽然解决了代码冗余 ， 但是没有定义具体的类型(知道是Object，但不知道是不是Person类型)。
// 本质上sayName还是重复占用空间。
// alert(person instanceof Person)
```

5. 构造函数模式
> new , js执行如下
> ```
> var o1 = new Object();
> o1.__proto__ = Base.prototype;
> Base.call(o1);
> ```
> 构造函数为大写开头的方法
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
// 优点： 明确标识类型
// 缺点： 方法还是要重新封装一遍(可以用全局函数来替代。 但是如果方法比较多，就会破坏封装性， 别人想调用直接拿外部的来调用)
```

6.  原型模式
// new出来的对象 如果本身没有该属性，就去 构造函数的prototype有没有
```js
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
// ask: 函数中Animal改成this，可以用吗?
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
缺点：定义属性中 存在引用类型， 会导致 共同更改
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
// ask: 如果直接设置 a1.frineds = 111; 那么 a2.friends会改变吗
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
> new 出来的实例 如果没有 自身的属性或者对象，可以通过 构造函数的 原型（prototype）来访问，如果这层没有就往上找， 最上面是 Object.prototype
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
弊端： 多次执行父类对象 N+1. 子类中name和friends都重新覆盖Animal中的。大部分都利用这种方式

4. Object.create继承(clone和拓展)
>先插一段小知识
> ```
> Object.create =  function (o) {
>    var F = function () {};
>    F.prototype = o;
>    return new F();
>};
> ```

```js
var animal = {
	name: 'animal',
	friends: ['a1', 'a2'],
	sayName: function(){
		alert(this.name);
	}
}

// clone
var dog = Object.create(animal); // dog的原型指向animal

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

5. 最理想的继承 寄生组合 //
```js
function Animal(name){
	this.name = name;
	this.friends = ['a1', 'a2'];
}

Animal.prototype.getName = function() {
	alert(this.name);
}

function Dog(){
	Animal.apply(this,arguments);
	this.age = 8;
}

Dog.prototype = Object.create(Animal.prototype); // Dog.prototype = ??
Dog.prototype.constructor = Dog; // 解决之前的 PROBLEM

// function inherit(subType,superType){  
//     var prototype=Object.create(superType.prototype);    
      
//     prototype.constructor=subType;  
  
//     subType.prototype=prototype;  
// }  
  
// inherit(Dog,Animal);

Dog.prototype.getAge = function(){
	alert(this.age);
}

var d1 = new Dog('d1');
var d2 = new Dog('d2');
d1.friends.push('a3');
alert(d2.friends); // ?? 什么值

d1.getName(); // ??
// d1.getname -> d1.__proto__.getName -> Dog.prototype.getName ->
// Dog.prototype.__proto__.getName -> Animal{}.prototype.getName ->
// Animal.prototype.getName

// 优点：1.只调用一次父类的构造函数,避免了在子类原型上创建不必要的，多余的属性 2.原型链保持不变 
```