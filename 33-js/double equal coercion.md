# 一篇文章让你彻底明白js中==的强制转换

> 在javascript中,如果比较两个数时使用`==`,且比较双方类型不一致时,就会进行类型转换.

比较时遵循以下规则: 

![这张图](https://cdn.filestackcontent.com/eTIpVrOQcqBNTN6Ma8i4)

或者是我个人改版后的:
1. 双方类型是否不同,如果相同,就调用===进行比较,否则继续:
2. 双方是否为undefined和null,如果是,就返回 true,否则继续:
3. 是否有一方为number,如果是,跳到7.否则继续:
4. 是否有一方为boolean,如果是,跳到8.否则继续:
5. 是否有一方为string,如果是,跳到9.否则继续:
6. 到了这一步,不用继续了,直接返回 false吧.

7. 当有一方为number类型时,先将另一方转化为number类型,再用===进行比较.具体转换形式看[强制转化成number](#强制转化成number).
8. 当一方为boolean时,将boolean转化为number类型,再从头开始比较.
9. 当有一方为string类型时,先将另一方转化为string类型,再用===进行比较.具体转换形式看[强制转化成string](#强制转化成string).

## 强制转化成number

* undefined → NaN
* null → 0
* boolean → false => 0, true => 1
* string → Number(string)

比如: "5" → 5, "" → 0, "27xY" → NaN

* object: 先调用valueOf方法,如果返回值为原始类型,就用返回值,否则就再调用toString,如果返回为原始类型就采用,否则就丢出错误!

* Date → 调用toString方法

## 强制转化成string
* undefined → "undefined"
* null → "null"
* number → “number”
* boolean → “true”, “false”
* object: 先调用toString方法,如果返回值为原始类型,就用返回值,否则就再调用valueOf,如果返回为原始类型就采用,否则就丢出错误!
* Date → 调用toString方法


例子:
```js
"" == 0 // 3 -> 7
0 === 0 // true
```
```js
[] == "0" // 5 -> 9
"" === "0" // false
```
```js
[] == 0 // 3 -> 7
'' == 0 // 3 -> 7
0 === 0 // true
```
```js
false == 1 // 3 -> 7
0 === 1 // false
```
```js
{} == false // 6
{} == 0 // 3 -> 7
"[object Object]" == 0 // 3 -> 7
NaN === 0 // false
```
```js
undefined == false // 6
undefined == 0 // 3 -> 7
NaN === 0 // false
```
```js
[1,2,3] == 123 // 3 -> 7
"1,2,3" == 123 // 3 -> 7
NaN === 123 // false
```
```js
[123] == 123 // 3 -> 7
"123" == 123 // 3 -> 7
123 === 123 // true
```
```js
[123] == "123" // 5 -> 9
"123" === "123" // true
```

```
var x = {
  a: '...',
  toString: function () {
    return false;
  },
  valueOf: function () {
    return new Boolean(true);
  }
};
```
```js
x == "0" // 5 -> 9
false == "0" // 4 -> 8
0 == "0" // 3 -> 7
0 === 0 // true
```
```js
x == 5 // 3 -> 7
false == 5 // 3 -> 7
0 === 5 // false
```
```js
x == [1,2,3] // false
```