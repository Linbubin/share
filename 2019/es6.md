### let const
1. temporal dead zone ， TDZ
<!-- > 暂时性死区只是块级绑定的一个独特表现，而另一个独特表现则是在循环时使用它。 <br /> -->
> 在let const声明之前调用声明值

2. 全局块级绑定
```js
var a = 1;
window.a; // 1

let xx = 1;
window.xx; // undefined
```

### 字符串
1. includes startsWith endsWith 都是接受两个参数('text', startIndex), endsWith 截取[0 - startIndex)之间,再判断是否在最后
2. str.repeat(次数)  将str重复n次输出