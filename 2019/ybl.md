null
undefined
object
string
boolean
symbol

[] == 0 // [].toString(); -> '' -> 0

let const不提升导致的问题
> 如果在块中 在let或const声明调用变量，则提示undefined的警告
```js
const A = 1;
function a(){
  console.log(A);
}
a() // 1
function b(){
  console.log(A);
  const A = 2;
}
b() // ReferenceError: A is not defined
function c(){
  const A = 3;
  console.log(A);
}
c() // 3
```


new
```js
function myNew(constructor) {
  var obj = {}
  Object.setPrototypeOf(obj, constructor.prototype);
  return constructor.apply(obj, [...arguments].slice(1)) || obj
}
```

settimeout的第二个参数不是执行等待时间,是事件管理器将函数移入调用栈的等待时间[这里](https://yubolun.com/javascript-interview-handbook/)
[这里](https://medium.freecodecamp.org/the-definitive-javascript-handbook-for-a-developer-interview-44ffc6aeb54e?gi=7cdc8a29149)


==
> 布尔类型除非和布尔类型比较,否则都会优先转为number类型

```js
[[[[[]]]]].toString() // ''
[[[[[1]],2]],3].toString() // '1,2,3'
```


Number(null) // 0
Number(undefined) // NaN
Number(obj) // 先调用 obj.valueOf() 原始则Number(原始), else obj.toString() 原始则Number(原始) 否则报错
String(obj) // 先调用 obj.toString() 原始则String原始), else obj.valueOf() 原始则String原始) 否则报错
Boolean // 6个转成false undefined null -0或+0 NaN ''（空字符串）

switch-case 转换成 obj-key-function的形式,最后return funcName()的执行结果

Object.getPrototypeOf(person) === Person.prototype
Object.setPrototypeOf(person, Person.prototype)

每个函数都有prototype属性，除了被bind方法返回的函数、箭头函数、Function.prototype。

instanceof  `[1,2] instanceof Array === true`, 如果Array 不为函数,则会报错. 如果左侧为基本类型,则直接返回false. 判断原型链上是否相关

```js
// 区别:
Student.prototype = new Person()
Student.prototype = Object.create(Person.prototype)

// 如果Person构造函数中 有 this.name this.age  那么直接赋值成 new Person()就会很奇怪. 传其他值也不对,因为还没有实例化

// Object.create是es5的方法,如果没有,就自己重写
if(!Object.create){
  Object.create = function(proto){
    function F(){}
    F.prototype = proto;
    return new F
  }
}

// 问题: 如果man里面想要有Person的内置属性,该怎么在new的时候传入
function Student(name, age){
  this.name = name;
  // 把父类的内置属性拿来赋值
  Person.call(this, age);
}
```

