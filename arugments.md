# arguments
arguments是一种类数组

存在于 函数中，或者 document.getElementById 等查询方法返回值

```js
var args = { 0:'a', 1:'b', 2:'c', length: 3 };// 大概可以模拟成这种形式

args[0] // 'a'
args.length // 3

args.push(123) // Error  因为不是真的数组
```

## 测试 形参与arguments的绑定
```js
function foo(name, age, sex, hobbit) {

    console.log(name, arguments[0]); // name name

    // 改变形参
    name = 'new name';

    console.log(name, arguments[0]); // new name new name

    // 改变arguments
    arguments[1] = 'new age';

    console.log(age, arguments[1]); // new age new age

    // 测试未传入的是否会绑定
    console.log(sex); // undefined

    sex = 'new sex';

    console.log(sex, arguments[2]); // new sex undefined

    arguments[3] = 'new hobbit';

    console.log(hobbit, arguments[3]); // undefined new hobbit

}

foo('name', 'age')
```
>传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享 <br>
>除此之外，以上是在非严格模式下，如果是在严格模式下，实参和 arguments 是不会共享的。


## 应用场景
1. 参数不定长
2. 函数柯里化
3. 递归调用
4. 函数重载