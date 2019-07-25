# == 和 === 的区别

## ==
> == 会进行类型强制转换(type coercion).

其中需要讲下6个伪值(Falsy Values)
* 0
* ''
* false
* null
* undefined
* NaN

其中 0 '' false 用 == 时,会返回true.
null 和 undefined互相用 == 时会返回true.
NaN无论和谁比较,包括NaN都会返回false.
```js
const a = NaN;
a == a;// false
```
其他情况下,都是返回false.

特殊题目:
```js
> !+[]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]
// +[] 为 0   !+[] 为 true
// !![] 为 true
// 最终是9个1相加
9
> {} + []
// {}和非{}相加时,会将{}当作一个空代码块, 所以只会计算后面的 +[]
0
> [] + {}
// [].toString() -> ''   ({}).toString() -> '[object Object]'
// '' + '[object Object]'
"[object Object]"
> [] + []
// [].toString() -> ''
// '' + ''
""
> {} + {}
// chrome会将其转为 ({} + {}),这时 第一个{} 就不会被当成空代码块,而是一个空对象{}
// firefox 依然会当成空代码块, +{} -> +'[object Object]'   结果为NaN
// ({}).toString() -> '[object Object]'
// '[object Object]' + '[object Object]'
"[object Object][object Object]"
> {} + [] == [] + {}
// chrome会将两侧都加上(),即  ({} + []) == ([] + {})
// firefox 会把它看成 [] == [] + {}, [] == '[object Object]', '' == '[object Object]', false
// 所以结果为 '[object Object]' == '[object Object]'
true
```


## ===
> === 会比较值和类型,必须完全相同才会返回true.