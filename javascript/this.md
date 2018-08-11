# this的指向

> 2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)

> 2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)

> 2.3 如果 ref 不是 Reference，那么 this 的值为 undefined

> ```
> var foo = 1;
>var fooReference = {
>    base: EnvironmentRecord,
>    name: 'foo',
>    strict: false
> };
> GetValue(fooReference) // 1; GetValue是直接获得属性真正的值，不是reference
>```

> MemberExpression是()左边的部分

```js
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
console.log(foo.bar());
//示例2
console.log((foo.bar)());
//示例3
console.log((foo.bar = foo.bar)());
//示例4
console.log((false || foo.bar)());
//示例5
console.log((foo.bar, foo.bar)());
```

## 分析
1. 示例1：
```js
var Reference = {
  base: foo,
  name: 'bar',
  strict: false
};

base value -> foo =>  IsPropertyReference(ref) -> true
this = GetBase(ref) // foo
```

2. 示例2

虽然foo.bar被()包住，但是在内部并未进行任何计算，所以和示例1相同
`this -> foo`

3. 示例3

使用`=`
>3.Let rval be GetValue(rref).

因为使用了 GetValue，所以返回的值不是 Reference 类型

根据上面`2.3`，this为undefined
> this 为 undefined，非严格模式下，this 的值为 undefined 的时候，其值会被隐式转换为全局对象。

4. 示例4

使用 `逻辑或`
>2.Let lval be GetValue(lref).
同`示例3`,this为undefined

5. 示例5

使用`逗号操作符`
>2.Call GetValue(lref).
同 `4和5`,this为undefined.

## 最平常的例子
抛开复杂的，看日常的一个例子
```js
function foo() {
    console.log(this)
}

foo(); 
```
MemberExpression 是 foo，解析标识符，查看规范 10.3.1 Identifier Resolution，会返回一个 Reference 类型的值：
```js
var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};
```
接下来进行判断：

> 2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)

因为 base value 是 EnvironmentRecord，并不是一个 Object 类型，还记得前面讲过的 base value 的取值可能吗？ 只可能是 undefined, an Object, a Boolean, a String, a Number, 和 an environment record 中的一种。

IsPropertyReference(ref) 的结果为 false，进入下个判断：

2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)

base value 正是 Environment Record，所以会调用 ImplicitThisValue(ref)

查看规范 10.2.1.1.6，ImplicitThisValue 方法的介绍：该函数始终返回 undefined。

所以最后 this 的值就是 undefined。

## 练习题
```js
function Foo(){
	getName = function(){
		console.log(1);					
        };
	return this
}
			
function getName(){
	console.log(5);
}

Foo().getName(); // 1 因为当Foo()执行时，里面会覆盖全局的getName()
```
改变一下
```js
function Foo(){
	var getName = function(){
		console.log(1);					
        };
	return this
}
			
function getName(){
	console.log(5);
}

Foo().getName();// 这回就不会改变了，5
```
