# [Promises/A+](https://promisesaplus.com/)
> An open standard for sound, interoperable JavaScript promises—by implementers, for implementers.  
> 一个可靠的,可互操作的JavaScript promises的开放的标准.

A promise represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its `then` method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.

Promise 代表一个异步操作的最终结果。和 Promise 最主要的交互方式就是通过 `then` 方法,该方法注册一个回调函数来接受一个 promise 的最终结果或为什么没有被履行的原因。

This specification details the behavior of the then method, providing an interoperable base which all Promises/A+ conformant promise implementations can be depended on to provide. As such, the specification should be considered very stable. Although the Promises/A+ organization may occasionally revise this specification with minor backward-compatible changes to address newly-discovered corner cases, we will integrate large or backward-incompatible changes only after careful consideration, discussion, and testing.

该规范描述了 `then` 方法的行为,提供了一种可互操作的基础, 所有 Promises/A+ 一致的 promise 实现都依赖它提供.因此,该规范应当被认为很稳定.虽然 Promises/A+ 组织可能会为了照顾到一些小问题偶尔对该规范做一些向后兼容的改变,但是我们将会在深思熟虑和反复测试以后才会整合大的或者不向后兼容的改变.

Historically, Promises/A+ clarifies the behavioral clauses of the earlier Promises/A proposal, extending it to cover de facto behaviors and omitting parts that are underspecified or problematic.

历史上, Promises/A+ 对早期的Promise/A提议的行为条款进行了阐明,将其扩展到覆盖到事实上的行为并且省略未制定或者产生问题的部分.

Finally, the core Promises/A+ specification does not deal with how to create, fulfill, or reject promises, choosing instead to focus on providing an interoperable then method. Future work in companion specifications may touch on these subjects.

最后, Promises/A+ 规范的核心不是解决怎么创建、达到或者reject promise,而是选择专注于提供一个可互操作的 `then` 方法.后续在规范配套中可能会涉及到上述那些事.

# Terminology 术语

1. `promise` 是一个行为符合该规范的拥有 `then` 方法的对象或函数,
2. `thenable` 是一个定义 `then` 方法的对象或函数.
3. `value` 是任何合法的JavaScript类型(包括 `undefined`, `thenable` 或 `promise`对象).
4. `exception` 是一个使用 `throw` 语法抛出的值.
5. `reason` 是一个表明为什么`promise`被`rejected`的原因.

# Requirements 要求
## Promise States 状态
Promise 必须是以下三种状态之一: `pending`, `fulfilled`, or `rejected`.

1. 当状态为`pending`时, 状态可以转为 `fulfilled` 或 `rejected`
2. 当状态为`fulfilled`时, 状态无法改变,且必须有一个不能改变的`value`.
3. 当状态为`rejected`时, 状态无法改变,且必须有一个不能改变的`reason`.

这里的`不能改变`的意思是`immutable`变量(`immutable identity (i.e. ===)`),而不是 `deep immutability`. ???????????????


## `then` 方法
promise必须提供`then`方法用来接收最新的或最终的`value`或`reason`.

promise的`then`方法接收两个参数:

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
* 在执行上下文栈只包含平台代码之前,`onFulfilled`和`onRejected`不能被调用.[3.1]
* `onFulfilled` 和 `onRejected`必须被当作函数调用`(i.e. with no this value)??????`. [3.2]
* `then` 在同一个`promise`中可能会被多次调用
  * 如果或者当`promise`状态为`fulfilled`时,所有相应的`onFulfilled`必须按照传入`then`的顺序调用
  * 如果或者当`promise`状态为`rejected`时,所有相应的`onRejected`必须按照传入`then`的顺序调用[3.3]
* `then`必须返回一个`promise`  
` promise2 = promise1.then(onFulfilled, onRejected);`
  * 如果`onFulfilled`或`onRejected`返回一个`x`,就运行 promise的`[[Resolve]](promise2, x)`,可以理解成`Promise.resolve(promise2, x)`
  * 如果`onFulfilled`或`onRejected`抛出一个错误`e`,`promise2`必须`rejected` `e`作为`reason`
  * 如果`onFulfilled`不是函数,且`promise1`状态为`fulfilled`, `promise2`必须是`fulfilled`,而且和`promise1`有相同的`value`
  * 如果`onRejected`不是函数,且`promise1`状态为`rejected`, `promise2`必须是`rejected`,而且和`promise1`有相同的`reason`