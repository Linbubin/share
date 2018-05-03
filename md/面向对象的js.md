1. new Object()
2. {}
3. 使用字面量
4. factory
5. 构造函数模式 constructor
6. 原型模式 prototype
7. 构造函数 + 原型
8. 动态原型、 寄生构造函数 、稳妥构造函数 - 不常用

1.
```
	var o = new Object();
	// 等同于 var o = {};
	o.n ame = 'linb';

	o.sayName = function() {
	alert(this.name);
	}

	o.sayName()
```

2.
```
	
	var o = {};
	o.n ame = 'linb';

	o.sayName = function() {
	alert(this.name);
	}

	o.sayName()
```

4. 
```
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
// 虽然解决了冗余 ， 但是不知道是谁new出来的。
// alert(person instanceof Person)
```

5. 
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
alert(p1.constructor == p2.constructor); 
alert(p1.constructor == Person); 
alert(p1.constructor); 

alert(typeof(p1));

alert(p1 instanceof Object);
alert(p1 instanceof Person);

// new Person Object -> Person extends Object
```

6. 
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
var a2 = new Animal();

alert(a1.sayName == a2.sayName);
a1.sayName();

alert(Animal.prototype.constructor);

a1.friends.push('snack');
alert(a2.friends);
```

7.
```js
function Animal(name){
	this.name = name;
	this.friends = ['dog','cat'];
}

Animal.prototype.sayName = function() {
	alert(this.name);
}

var a1 = new Animal("a1");
var a1 = new Animal("a2");

alert(a1.sayName == a2.sayName);

a1.friends.push('snake');
alert('a2.friends');
```

## 继承

1. 原型链继承
```js
function Animal(){
	this.name = 'animal';
}

Animal.prototype.getName = function() {
	alert(this.name);
}

function Dog() {
	this.age = 8
}

Dog.prototype = new Animal();
Dog.prototype.getAge = function() {
	alert(this.age);
}

var d = new Dog();

d.getName();
d.getAge();
```

弊端
```js
function Animal(){
	this.name = 'animal';
	this.friends = ['a1', 'a2'];
}

Animal.prototype.getName = function() {
	alert(this.name)
}

var a1 = new Animal();

a1.getName();

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
alert(d2.friends)// a1 a2 a3  引用会被改变   // TODO: 改变name 是否会改变
```

2.  构造函数继承
```js
function Animal(name){
	this.name = name ;
	this.friends = ['a1', 'a2'];
}

// Animal.prototype.getName = function() {
// 	alert(this.name)
// }

function Dog(){
	Animal.call(this, 'dog');
	this.age = 8;
}

var d1 = new Dog();
var d2 = new Dog();
d1.friends.push('a3');
alert(d2.friends)

// d1.getName();
```
弊端
```js
function Animal(name){
	this.name = name ;
	this.friends = ['a1', 'a2'];
}

Animal.prototype.getName = function() {
	alert(this.name)
}

function Dog(){
	Animal.call(this, 'dog');
	this.age = 8;
}

var d1 = new Dog();
var d2 = new Dog();
d1.friends.push('a3');
alert(d2.friends)

d1.getName(); //dog的原型对象没有指向 animal， 所以 dog的方法不会指向animal的getName
```

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
子类中name和friends都重新覆盖Animal中的。 多次重写。 浪费资源

4. jquery中 继承(clone和拓展)
```js
var animal = {
	name: 'animal',
	friends: ['a1', 'a2'],
	sayName: function(){
		alert(this.name);
	}
}

var dog = Object.create(animal); // dog的原型指向animal
dog.name = 'dog';

var cat = Object.create(animal);
cat.name = 'cat';

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
Dog.prototype.constructor = Dog;

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

var a = {};
var b = { friends: ['a1', 'a2'] };
jQuery.extend(a,b);
console.log(a);
a.friends.push('a3');
console.log(b);// ['a1','a2','a3']

var a = {};
var b = { friends: ['a1', 'a2'] };
jQuery.extend(true, a, b);
console.log(a);
a.friends.push('a3');
console.log(b);// ['a1','a2']
```