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

## ===
> === 会比较值和类型,必须完全相同才会返回true.