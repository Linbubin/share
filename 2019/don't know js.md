# 闭包
> 当函数可以记住并访问所在的词法作用域，即使函数是在当前`词法作用域`之外执行，这时 就产生了闭包。

> 尽管 IIFE 本身并不是观察闭包的恰当例子，但它的确创建了闭包，并且也是最常用来创建 可以被封闭起来的闭包的工具。

因为闭包是 函数在执行时访问另一个函数内部的变量, 
IIFE执行时访问到了其他函数内部的变量，所以是闭包


# this
this 在任何情况下都不指向函数的词法作用域

如果使用严格模式(strict mode)，则不能将全局对象用于默认绑定，因此 this 会绑定到 undefined

把函数传入语言内置的函数而不是传入你自己声明的函数，会发生什么呢?结果是一样的，没有区别,都会被指向Window


如果你传入了一个原始值(字符串类型、布尔类型或者数字类型)来当作 this 的绑定对 象，这个原始值会被转换成它的对象形式(也就是new String(..)、new Boolean(..)或者 new Number(..))。这通常被称为“装箱”。

判断this 现在我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则。可以按照下面的
顺序来进行判断:
1. 函数是否在new中调用(new绑定)?如果是的话this绑定的是新创建的对象。
    `var bar = new foo()`
2. 函数是否通过call、apply(显式绑定)或者硬绑定调用?如果是的话，this绑定的是 指定的对象。
    `var bar = foo.call(obj2)`
3. 函数是否在某个上下文对象中调用(隐式绑定)?如果是的话，this 绑定的是那个上 下文对象。
    `var bar = obj1.foo()`
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定 到全局对象。
    `var bar = foo()`


间接引用是使用=赋值返回 window.xx的特性,所以this会指向window,而不是本身
```js
function a(){console.log(this)}
var z = {a:a}
function x(fn){fn()}

x(a)// Window
x(z.a)// Window

```

# new
使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1. 创建(或者说构造)一个全新的对象。
2. 这个新对象会被执行[[Prototype]]连接。
3. 这个新对象会绑定到函数调用的this。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。


# Object
```js
Object.getOwnPropertyDescriptor( myObject, "a" );
// {
// value: 2,
// writable: true,
// enumerable: true,
// configurable: true
// }

Object.defineProperty( myObject, "a", {
    value: 6, 
    writable: true, // 是否可以被修改
    configurable: true, // 是否被重新配置
    enumerable: true // 是否可以被枚举
} ); // TypeError
```
要注意有一个小小的例外:即便属性是 configurable:false，我们还是可以 把 writable 的状态由 true 改为 false，但是无法由 false 改为 true。

## 不变性
### 常量
configurable:false  wirtable: false
### 禁止扩展
如果你想禁止一个对象添加新属性并且保留已有属性，可以使用 Object.prevent Extensions(..):
```js
var myObject = { a:2 };
Object.preventExtensions( myObject );
myObject.b = 3;
myObject.b; // undefined
```
在非严格模式下，创建属性 b 会静默失败。在严格模式下，将会抛出 TypeError 错误。
### 密封
Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用 Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false。
所以，密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性(虽然可以 修改属性的值)。
### 冻结
Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 Object.seal(..) 并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们 的值。

## 设置属性

如果已经存在这个属性，`[[Put]]` 算法大致会检查下面这些内容。
1. 属性是否是访问描述符?如果是并且存在setter就调用setter。
2. 属性的数据描述符中writable是否是false?如果是，在非严格模式下静默失败，在
严格模式下抛出 TypeError 异常。
3. 如果都不是，将该值设置为属性的值。

## 判断属性
### 枚举
1. 用for...in 看是否有输出
2. obj.propertyIsEnumerable('xxx')  会先检查obj中是否有'xxx'对象(不会在原型链上找),并且要满足enumerable:true
3. Object.keys(obj) 会返回一个数组,包含左右可枚举的属性,与之对应的是Object.getOwnPropertyNames(..) 返回所有属性不管是否枚举(两个方法都不会从原型链上捞)

```js
function A(){
    this.name = 1
}
A.prototype.say = ()=>{}
a = new A()
'say' in A // false
'say' in a // true
Object.keys(a) // ['name']
Object.getOwnPropertyNames(a) ['name']

```








# ask
1. 其次，IIFE 和 try/catch 并不是完全等价的，因为如果将一段代码中的任意一部分拿出来 用函数进行包裹，会改变这段代码的含义，其中的 this、return、break 和 contine 都会 发生变化。IIFE 并不是一个普适的解决方案，它只适合在某些情况下进行手动操作

> 处理块级作用域时，try/catch和IIFE是不一样的

哪里不一样?


2. 当`obj.x`返回`undefined`时,如何判断是有key,但是value为`undefined`,还是由于key不存在返回undefined

3. 当把get-set写成this.xx = xxx时,会`Uncaught RangeError: Maximum call stack size exceeded`,那么如果要设置到自己身上,该如何写?

4. mixin是什么

5. > Bar.prototype = new Foo() 的确会创建一个关联到 Bar.prototype 的新对象。但是它使用 了 Foo(..) 的“构造函数调用”，如果函数 Foo 有一些副作用(比如写日志、修改状态、注 册到其他对象、给 this 添加数据属性，等等)的话，就会影响到 Bar() 的“后代”，后果 不堪设想。

为什么用`Object.create`就不会影响
```js
// ES6 之前需要抛弃默认的 Bar.prototype
Bar.ptototype = Object.create( Foo.prototype );
// ES6 开始可以直接修改现有的
Bar.prototype Object.setPrototypeOf( Bar.prototype, Foo.prototype );
```

6. 作用域除了词法作用域还有啥?

7. getter setter只能对一个key起作用？还是可以对所有的key都设置?

# answer
2. 用`in` 或 `hasOwnProperty` 或 `Object.getOwnPropertyDescriptor`
```js
const z = {a:1, b:undefined}
'b' in z // true
'c' in z // false

// 和in的区别是 in会去原型链上查询, hasOwnProperty只会查询对象本身
// 但是要注意array的区分,他的key会拿index来判断,而不是肉眼看到的arr = ['a']  arr.hasOwnProperty('a') false   arr.hasOwnProperty(0) true
z.hasOwnProperty('b') // true
z.hasOwnProperty('c') // false

Object.getOwnPropertyDescriptor(z, 'c') // undefined
Object.getOwnPropertyDescriptor(z, 'b') // {value: undefined, writable: true, enumerable: true, configurable: true}
```

4. mixin就是
```js
function mixin( sourceObj, targetObj ) {
    for (var key in sourceObj) {
    // 只会在不存在的情况下复制 
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
    }
    return targetObj; 
}
```


# TODO
1. 手写bind
2. 手写apply call
3. 手写promise
4. 手动遍历 Symbol.iterator函数(arr[Symbol.iterator])
5. 实现一个深拷贝函数
6. 手写Object.create
```js
Object.create = function (o) {
    function F() { }
    F.prototype = o;
    return new F();
};
// 其实Object.create还存在第二个参数,和Object.defineProperty类似{key: {...config}}
```
7. 手写__proto__(`.__proto__ 的实现`)
8. 手写防抖节流函数

# NOTE
1. 向obj添加属性时，key如果时number,则会转化为string
向arr添加属性时， key如果是可以转为number, 则会转为number赋值
```js
var a = []
a[[1]] = 2
a // [empty, 2]

```

2. 数据描述符 和 存取描述符
[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
共同点: 都是属性描述符的一种. 都有 configurable enumerable的key
不同点: 存取描述符有 set get,数据描述符有 value writable的key

3. 对Array进行for...in,不仅会循环出数值索引,还会包含可枚举属性,所以最好只对Object使用

4. for...in只会循环出属性,要取值还得`obj[key]`, 可以直接用for...of循环出值

5. 在于原型链上层时 myObject.foo = "bar" 会出现的三种情况。, 用Object.defineProperty
    * 如果在`[[Prototype]]`链上层存在名为foo的普通数据访问属性并且没有被标记为只读(writable:false)，那就会直接在 myObject 中添加一个名为 foo 的新属性，它是屏蔽属性。
    * 如果在`[[Prototype]]`链上层存在foo，但是它被标记为只读(writable:false)，那么无法修改已有属性或者在 myObject 上创建屏蔽属性。如果运行在严格模式下，代码会抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。
    * 如果在`[[Prototype]]`链上层存在foo并且它是一个setter，那就一定会调用这个 setter。foo 不会被添加到(或者说屏蔽于)myObject，也不会重新定义 foo 这个 setter。
    * 需要注意,如果setter是`this.xx=val`,那么xx会定义在myObject上,而不是Object这个父级上。

6. __proto__是chrome特定给予的，通用应该用Object.getPrototypeof来获取

7. `constructor`是不可枚举的,所以需要用Object.defineProperty 而不是简单的=赋值
```js
Object.defineProperty(Foo.prototype, "constructor", {
    enumerable: false, // 特殊的地方
    writable: true,
    configurable: true,
    value: Foo // 让 .constructor 指向 Foo
});
```