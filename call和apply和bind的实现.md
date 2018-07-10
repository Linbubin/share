# call
> call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

## 初探
先讨论call只带一个改变this的参数情况
```js
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```
实现:
```js
var foo = {
    value: 1,
    bar: function() {
        console.log(this.value)
    }
};

foo.bar(); // 1
```
具体实现为:
1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数
```js
foo.fn = bar

foo.fn()

delete foo.fn// 因为foo.fn是新添加的，避免造成bug，需要将其删除
```
我们自己写一个call2
```js
Function.prototype.call2 = function (content) {
  content.fn = this;
  content.fn();
  delete content.fn;
}

function b(){
  console.log(this.value);
}

var a = {
  value: 1
}

b.call2(a)

```

## 提高
讨论call带不止一个参数的情况
```js
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call(foo, 'kevin', 18);
```
自己写一个call3
```js
Function.prototype.call3 = function (content) {
  content.fn = this;
  var args = [];
  for(var i=1; i<arguments.length; i++){
    args.push('arguments['+ i +']');
  }
  eval('content.fn('+ args +')'); // content.fn(arguments[1], arguments[2]....);
  delete content.fn;
}

var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call3(foo, 'kevin', 18);
```

### 最终
还有2点我们没有考虑
1. foo为null时，this指向Window
2. call是有返回值的（也可以说是因为执行了bar，才导致call有返回值）

```js
Function.prototype.call4 = function(content) {
  content = content || window;
  content.fn = this;
  var args = [];
  for(var i=1; i<arguments.length; i++){
    args.push('arguments['+ i +']');
  }
  
  var results = eval('content.fn('+ args +')'); // content.fn(arguments[1], arguments[2]....);
  delete content.fn; 
  return results;
}
var foo = {
    value: 1
};

var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
```

# apply

直接给代码
```js
Function.prototype.apply = function (context, arr) {
    context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```

# bind
> bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

所以可以得出
1. bind返回一个函数
2. 第二个参数开始，都是传入函数的参数

## 利用apply实现bind


## bind可以在后续传入参数

## 

## 最终
```js
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```