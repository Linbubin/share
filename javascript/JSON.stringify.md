# 真实的JSON.stringify

_这个契机来自于，项目用antd，其中table最常用的就是 自定义render，要传入一个function， 一般都是改写一次，采用 `JSON.parse(JSON.stringify(columns))`来拷贝`columns`,
但是今天改写了2次， 就发现第一次的render没了！！！！_

所以说，就是这么的真实，下面开始讲为何没了,以及还有哪些情况会消失。

## 为什么没了
因为JSON.stringify会将js的数据结构转换成json结构，json是可以在任何语言中重新转回语言特定的结构的， 而json中是不存在function的，所以 在转化过程中，function就会默认的消失。

## 还有哪些会消失

1. 循环引用（自己引用自己）
```js
var bar = {
 a: {
  c: foo
 }
};
var foo = {
 b: bar
};

JSON.stringify(foo); // {"b":{"a":{}}}
```

2. Symbol和undefined
```js
let foo = { b: undefined };
JSON.stringify(foo); // {}

// Symbols
foo.b = Symbol();
JSON.stringify(foo); // {}

// 也有例外，在数组中不可被stringify的元素用null填充
let foo = [Symbol(), undefined, function() {}, 'works']
JSON.stringify(foo); // "[null,null,null,'works']"
```

## 可选参数
> JSON.stringify(value, replacer?, space?)

replacer 为 数组， 传入为 需要JSON.stringify 的key
```js
let bar = {
 a : 1,
 b : { c : 2 }
};
JSON.stringify(bar, ['a', 'b']);
//"{"a":1,"b":{}}"
  
JSON.stringify(bar, ['a', 'b', 'c']);
//"{"a":1,"b":{"c":2}}"
```

如果有 toJSON方法，就会覆盖原来的返回值
```js
var obj = {
  foo: 'foo',
  toJSON: function () {
    return 'bar';
  }
};
JSON.stringify(obj);      // '"bar"'
JSON.stringify({x: obj}); // '{"x":"bar"}'
```