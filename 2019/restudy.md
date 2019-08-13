# 重学前端
> 查漏补缺

1. `undefined`不是保留字, `null`是保留字,所以才要使用`void 0`来代替`undefined`
```js
function a(){
	console.log(undefined);
	var undefined = 123;
	console.log(undefined)
}
a() // undefined 123

function a(){
	console.log(null);
	var null = 123;
	console.log(null)
}// Error     Uncaught SyntaxError: Unexpected token null
```

2. 常见 `0.1+0.2 == 0.3` 问题的解决
> Number.EPSILON 属性表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值。
```js
console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON); // true
```

3. object

数据属性
  * value：就是属性的值。
  * writable：决定属性能否被赋值。
  * enumerable：决定 for in 能否枚举该属性。
  * configurable：决定该属性能否被删除或者改变特征值。

访问器（getter/setter）
  * getter：函数或 undefined，在取属性值时被调用。
  * setter：函数或 undefined，在设置属性值时被调用。
  * enumerable：决定 for in 能否枚举该属性。
  * configurable：决定该属性能否被删除或者改变特征值。

4. 原型
  * Object.create 根据指定的原型创建新对象，原型可以是 null；
  * Object.getPrototypeOf 获得一个对象的原型；
  * Object.setPrototypeOf 设置一个对象的原型。

## Symbol 特点
1. Symbol.toPrimitive
```js
var o = {
  valueOf : () => {console.log("valueOf"); return {}},
  toString : () => {console.log("toString"); return {}}
}

o[Symbol.toPrimitive] = () => {console.log("toPrimitive"); return "hello"}

console.log(o + "")
// toPrimitive
// hello
```

2. Symbol.toStringTag
> 类似重写toString方法

```js
var o = { [Symbol.toStringTag]: "MyObject" }
console.log(o + "");// [object MyObject]
```

# note
## 前端项目的理想架构
1. 可维护
  * 代码是否容易理解(利用[prettier](https://prettier.io) eslint来进行代码规范和格式化)
  * 文档是否健全
2. 可扩展
  * 增加新功能是否容易
  * 新功能是否会增加系统复杂度
3. 可测试
  * 副作用少, 尽量使用纯函数
  * 功能分层是否清晰
4. 易开发
  * 社区活跃
  * 工具完善
5. 易构建
  * 构建工具选择(是否有脚手架)
  * 使用通用技术和架构(是否是大众的技术)

## 拆分复杂度
按领域模型(feature)组织代码

首先按照功能把他分成一个个文件，每个文件里面有自己的 action reducer(html css)