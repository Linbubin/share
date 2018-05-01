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