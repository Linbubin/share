# [Promises/A+](https://promisesaplus.com/)
> An open standard for sound, interoperable JavaScript promises—by implementers, for implementers.  
> 一个可靠的,可互操作的JavaScript `promise`的开放的标准.

A promise represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its `then` method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.

`Promise` 代表一个异步操作的最终结果。和 `promise` 最主要的交互方式就是通过 `then` 方法,该方法注册一个回调函数来接受一个 `promise` 的最终结果或被`rejected`的`reason`。

This specification details the behavior of the then method, providing an interoperable base which all Promises/A+ conformant promise implementations can be depended on to provide. As such, the specification should be considered very stable. Although the Promises/A+ organization may occasionally revise this specification with minor backward-compatible changes to address newly-discovered corner cases, we will integrate large or backward-incompatible changes only after careful consideration, discussion, and testing.

该规范描述了 `then` 方法的行为,提供了一种可互操作的基础, 所有符合 `Promises/A+` 的 `promise` 实现都依赖它.因此,该规范可以被认为很稳定.虽然 `Promises/A+` 组织可能会为了照顾到一些小问题偶尔对该规范做一些向后兼容的改变,但是我们将会在深思熟虑和反复测试以后才会整合大的或者不向后兼容的改变.

Historically, Promises/A+ clarifies the behavioral clauses of the earlier Promises/A proposal, extending it to cover de facto behaviors and omitting parts that are underspecified or problematic.

历史上, `Promises/A+` 对早期的`Promise/A`提议的行为条款进行了阐明,将其扩展到覆盖到事实上的行为并且省略未指定或者产生问题的部分.

Finally, the core Promises/A+ specification does not deal with how to create, fulfill, or reject promises, choosing instead to focus on providing an interoperable then method. Future work in companion specifications may touch on these subjects.

最后, `Promises/A+` 规范的核心不是解决怎么创建、`resolve` 或者 `reject` `promise` ,而是选择专注于提供一个可互操作的 `then` 方法.后续在规范配套中可能会涉及到上述那些事.

# Terminology 术语

1. `promise` 是一个行为符合该规范的具有 `then` 方法的对象或函数,
2. `thenable` 是一个定义 `then` 方法的对象或函数.
3. `value` 是任何合法的JavaScript类型(包括 `undefined`, `thenable` 或 `promise`对象).
4. `exception` 是一个使用 `throw` 语法抛出的值.
5. `reason` 是一个表明为什么`promise`被`rejected`的原因.

# Requirements 要求
## Promise States 状态
Promise 必须是以下三种状态之一: 等待(`pending`), 完成(`fulfilled`), or 拒绝(`rejected`).

1. 当状态为`pending`时, 状态可以转为 `fulfilled` 或 `rejected`
2. 当状态为`fulfilled`时, 状态无法改变,且必须有一个不能改变的`value`.
3. 当状态为`rejected`时, 状态无法改变,且必须有一个不能改变的`reason`.

这里的 不能改变 的意思是不可变变量(符合`===`判断),而不是在最底层不可变.即
```js
// 可以通过改变引用地址所对应的值改变
let obj = {a:1}
let b = obj
obj.a = 333
obj === b // true
```

## `then` 方法
`Promise`必须提供`then`方法用来接收最新的或最终的`value`或`reason`.

`Promise`的`then`方法接收两个参数:

`promise.then(onFulfilled, onRejected)`

`onFulfilled` and `onRejected`都是可选参数:

* 如果`onFulfilled`不是函数, 就被忽略
* 如果`onRejected`不是函数, 就被忽略
* 如果`onFulfilled`是一个函数:
  * 它必定在`promise`状态为`fulfilled`后被调用, 第一个参数是 promise的`value`
  * 它在`promise`状态为`fulfilled`之前不能被调用
  * 它被调用次数不能超过一次
* 如果`onRejected`是一个函数:
  * 它必定在`promise`状态为`onRejected`后被调用, 第一个参数是 promise的`reason`
  * 它在`promise`状态为`fulfilled`之前不能被调用
  * 它被调用次数不能超过一次
* 在执行上下文栈只包含平台代码之前,`onFulfilled`和`onRejected`不能被调用.[3.1] (简单来说就是在所有代码执行完成前不能调用,也就是说包含一个setTimeOut来模拟)
* `onFulfilled` 和 `onRejected`被当作没有制定`this`的函数调用`(严格模式下this为undefined,非严格模式下指向全局). [3.2]
* `then` 在同一个`promise`中可能会被多次调用
  * 如果或者当`promise`状态为`fulfilled`时,所有相应的`onFulfilled`必须按照传入`then`的顺序调用
  * 如果或者当`promise`状态为`rejected`时,所有相应的`onRejected`必须按照传入`then`的顺序调用
* `then`必须返回一个`promise`[3.3]  
` promise2 = promise1.then(onFulfilled, onRejected);`
  * 如果`onFulfilled`或`onRejected`返回一个`x`,就运行 promise的`[[Resolve]](promise2, x)`(具体执行看下节)
  * 如果`onFulfilled`或`onRejected`抛出一个错误`e`,`promise2`必须`rejected` `e`作为`reason`
  * 如果`onFulfilled`不是函数,且`promise1`状态为`fulfilled`, `promise2`必须是`fulfilled`,而且和`promise1`有相同的`value`
  * 如果`onRejected`不是函数,且`promise1`状态为`rejected`, `promise2`必须是`rejected`,而且和`promise1`有相同的`reason`


## The Promise Resolution Procedure promise的解决方式
promise的解决方式是一个抽象的操作任务,输入一个promise或一个value,我们可以把他写作`[[Resolve]](promise, x)`.如果x是`thenable`(带then方法的对象或函数),就会把x假设成promise来读取状态.否则就以x为`value`来`fulfills`promise.[2.3.2]

只要符合`Promises/A+`公开的规定,这种对`thenable`的处理允许promise进行互操作.它还允许`Promises/A+`实现使用合理的`then`方法“同化”不一致的实现。

可以简单的把`[[Resolve]](promise, x)`理解成`promise.then(onFulfilled => {return x})`

运行`[[Resolve]](promise, x)`,执行以下步骤:
* 如果promise和x来自同一个object,就以TypeError的报错原因reject.
* 如果x是一个promise,就采用该promise的状态
  * 如果x状态是pending,promise必须保持pending状态,直到x变为`fulfilled`或`rejected`
  * 如果/当 x 的状态为 `fulfilled`时, 将promise变为fulfill,并带相同的value
  * 如果/当 x 的状态为 `rejected`时, 将promise变为rejected,并带相同的reason
* 如果x是一个object或function
  * 让`then`执行`x.then`[3.5]
  * 如果检索`x.then`的结果会抛出异常e,就将promise`reject`,并以e为`reason`
  * 如果`then`是一个function, 将x当作this来调用,第一个参数为`resolvePromise`,第二个参数为`rejectPromise`
    * 如果/当 `resolvePromise`以`y`为`value`调用时, 运行`[[Resolve]](promise, y)`
    * 如果/当 `rejectPromise`以`r`为`reason`调用时, 就将promise`reject`,并以`r`为`reason`
    * 如果 `resolvePromise` 和 `rejectPromise`都被调用,或对同一参数进行多次调用,那么只保留第一次调用,其他都会被忽略 ????
    * 如果`then`被调用后抛出异常`e`
      * 如果`resolvePromise` 或 `rejectPromise`被调用,忽略本次调用
      * 如果没有被调用,就将promise`reject`,并以`e`为`reason`
  * 如果x不是function,就用x来fulfill promise
* 如果x不是promise或function, fulfill promise with x.

如果一个promise `resolved` `thenable`,并参与链式调用,就会无数次的调用`[[Resolve]](promise, thenable)`,遵循上述算法将会导致无限递归.鼓励(但不是必须)实现检测这种递归并用包含信息的TypeError作为reason拒绝(reject).[3.6]

# Notes 备注
1. `platform code`意味引擎、环境和promise实施代码.在实践中，这一要求确保onfulled和onRejected在调用then的事件循环之后，使用一个新的堆栈异步执行.这可以通过`macro-task`机制(比如`setTimeout`或`setImmediate`)或`micro-task`机制(比如`MutationObserver`或`process.nextTick`)来实现.由于promise实现被视为`platform code`,因此它本身调用处理程序可能包含一个任务调度队列或`trampoline`.

2. 也就是说,在严格模式下,`this`在他们内部是未定义的.在非严格模式下,它将是全局对象`windows`或`Global`.

3. 当满足所有条件时,理论上允许 `promise2 === promise1`.每个实现都应该记录它是否可以生成promise2===promise1以及在什么条件下生成promise1。 ????

4. 通常来说,当x来自当前实例时,x才是真的promise.该条款允许使用特定于实现的手段来采用已知的一致承诺状态.?????

5. 这段程序首次存储对`x.then`的引用,然后测试该引用,再调用,避免对`x.then`属性的多次访问.这些注意事项对确保访问器属性的一致性非常重要,因为访问其属性值可能在两次检索之间发生变化.

6. 实现不应该对表链的深度设置任意限制，并且假设超过该任意限制递归 将是无限的。只有真正的循环才会导致TypeError;如果遇到无限长的非重复表链，则永远递归是正确的行为。