Symbols 是 实现了的反射（Reflection within implementation）—— 你将 Symbols 应用到你已有的类和对象上去改变它们的行为。
Reflect 是 通过自省（introspection）实现反射（Reflection through introspection） —— 通常用来探索非常底层的代码信息。
Proxy 是 通过调解（intercession）实现反射（Reflection through intercession） —— 包裹对象并通过自陷（trap）来拦截对象行为。


# Symbol
```js
const s = Symbol('name')
const obj = {
  [s]: 'billy',
  age: 18,
  sex: 'man'
}
// 无法获得Symbol的key
console.log(Object.keys(obj))
console.log(Object.getOwnPropertyNames(obj))
console.log(JSON.stringify(obj))
// 只返回Symbol
console.log(Object.getOwnPropertySymbols(obj))
// 返回所有
console.log(Object.ownKeys(obj))
```

## Symbol.for
> 可以返回相等的symbol类型
```js
const a = Symbol('name')
const b = Symbol('name')
a === b // false

const c = Symbol.for('name') // 先从全局找是否有Symbol.for声明的同参数值
const d = Symbol.for('name')
c === d // true
```

## Symbol.keyFor
> 返回用Symbol.for创建值的参数
```js
const a = Symbol('name')
const b = Symbol.for('xxx')

Symbol.keyFor(a) // undefined
Symbol.keyFor(b) // xxx
```

## 内置Symbol值
### Symbol.hasInstance
> 可以自定义 instanceof 返回条件
```js
const obj = {
  [Symbol.hasInstance]: (val) => {
    console.log(val)
    // return true // 可以自定义返回条件
  }
}
({aaa: 1}) instanceof obj
```
### Symbol.isConcatSpreadable
> 改变concat扁平化的规则 默认undefined,  true 时会扁平,false时不会扁平
```js
const arr =[1,2]
console.log(arr[Symbol.isConcatSpreadable]) // undefined
console.log([].concat(arr, [3,4])) // [1,2,3,4]
arr[Symbol.isConcatSpreadable] = false
console.log([].concat(arr, [3,4])) // [[1,2], 3,4]
arr[Symbol.isConcatSpreadable] = true
console.log([].concat(arr, [3,4])) // [1,2, 3,4]
```

### Symbol.iterator
### Symbol.species