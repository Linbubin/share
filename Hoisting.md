# 变量提升
mdn的解释
> 变量提升（Hoisting）被认为是， Javascript中执行上下文 （特别是创建和执行阶段）工作方式的一种认识。您在 ECMAScript® 2015 Language Specification 之前的JavaScript文档中找不到变量提升（Hoisting）这个词。

> 不过，需要注意的是，这个概念可能产生一点点误解 。

> 例如，从概念的字面意义上说，“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，但这么说并不准确。实际上变量和函数声明在代码里的位置是不会动的，而是在编译阶段被放入内存中。




__函数声明和变量声明总是会被解释器悄悄地被"提升"到方法体的最顶部。__

## 变量提升
```js
var foo = 3;

function hoistVariable() {

    var foo = foo || 5;

    console.log(foo); // 5
}

hoistVariable();
```
是5 不是3的原因是
```js
var foo = 3;

function hoistVariable() {
    var foo;
    foo = foo || 5;

    console.log(foo); // 5
}

hoistVariable();
```
## 函数提升
### 函数声明
```js
function hoistFunction() {
    foo(); // output: I am hoisted

    function foo() {
        console.log('I am hoisted');
    }
}

hoistFunction();
```
--->
```js
function hoistFunction() {
    function foo() {
        console.log('I am hoisted');
    }
    foo();
}

hoistFunction();
```
__如果同一函数名称多次声明__
```js
function hoistFunction() {
    function foo() {
        console.log(1);
    }

    foo(); // output: 2

    function foo() {
        console.log(2);
    }
}

hoistFunction();
```
会先根据代码书写顺序依次将函数进行提升--->
```js
function hoistFunction() {
    function foo() {
        console.log(1);
    }
    function foo() {
        console.log(2);
    }

    foo(); // output: 2
}

hoistFunction();
```
### 函数表达式(类似变量提升)
```js
function hoistFunction() {

    foo(); // 2

    var foo = function() {
        console.log(1);
    };

    foo(); // 1

    function foo() {
        console.log(2);
    }

    foo(); // 1
}

hoistFunction();
```

为什么执行结果为 2 1 1呢

因为函数是一等公民，函数声明的优先级最高，所以编译后代码为
```js
//预编译之后
function hoistFunction() {

    var foo;

    foo = function foo() {
        console.log(2);
    }

    foo(); // 2

    foo = function() {
        console.log(1);
    };

    foo(); // 1

    foo(); // 1
}

hoistFunction();
```

再来一个例子
```js
var foo = 3;
​
function hoistFunction() {
​
    console.log(foo);
​
    foo = 5;
    
    console.log(foo);
​
    function foo() {}
}
​
hoistFunction();
console.log(foo);
```
---->
```js
var foo = 3;
function hoistFunction(){
  var foo;
  foo = function foo(){};
  console.log(foo); //function foo(){}

  foo=5; // 因为不是用var声明的，所以不会变量提升
  console.log(foo) // 5
}
hoistFunction();
console.log(foo);// 3, 因为函数内是var声明，不会直接改变外部的结果
```

# 总结
所以，函数声明(function x(){})的优先权是最高的，它永远被提升至作用域最顶部，然后才是函数表达式(a=function(){})和变量(var a;a=1;)提升，剩余部分按顺序执行，这一点要牢记。

自己的项目中，尽量避免变量提升的问题。做到 __先声明后使用__。