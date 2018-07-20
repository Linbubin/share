# typeof和instanceof的区别
## typeof
> typeof用以获取一个变量的类型，typeof一般只能返回如下几个结果：number,boolean,string,function,object,undefined。我们可以使用typeof来获取一个变量是否存在，如if(typeof a!="undefined"){}，而不要去使用if(a)因为如果a不存在（未声明）则会出错，对于Array,Null等特殊对象使用typeof一律返回object，这正是typeof的局限性。

typeof 返回 Number Object String undefined boolean symbol(es6) 中的一个
`typeof xxx !== 'undefined'` 应该是他唯一的用处,其他时候尽可能地避免使用

如果想用理想中typeof的方法,可以使用`Object.prototype.toString.call([1,2,3])  -> '[object Array]'`

## instanceof
只会返回 true 和 false
*`'abc' instanceof String`或 `'abc' instanceof Object`*
> 用来测试一个对象是否在其原型链原型构造函数的属性

> instanceof 左操作数是一个类，右操作数是标识对象的类。如果左侧的对象是右侧类的实例，则返回true.

> 而js中对象的类是通过初始化它们的构造函数来定义的。即instanceof的右操作数应当是一个函数。所有的对象都是object的实例。如果左操作数不是对象，则返回false,如果右操作数不是函数，则抛出typeError。

由上可见，`'abc' instanceof String`或 `'abc' instanceof Object`都为false

> “尽管instanceof 运算符的右操作数是构造函数，但计算过程实际上是检测了对象的继承关系，而不是检测创建对象的构造函数 ”（摘自《JavaScript权威指南》）

也就是说 
```js
new Number('1') instanceof Number // true, 由 Number 构造
new Number('1') instanceof Object // true, Number 由 Object 构造
```

即使是内置函数，实例的原型也不会由自身构造
```js
Function.prototype // ƒ () { [native code] }
Function.prototype instanceof Function // false

Object.prototype // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
Object.prototype instanceof Object // false
```