# 问题集合

## question

1. promise 多层 then 的使用? 回调函数参数值哪来 ---> [async await](./es6#async)
2. 订阅发布 和观察者模式的区别
## answer

1. 由上一个 then 中 return 的任意类型(可以是 promise 或者 普通类型)

如果回调函数最终是throw，该Promise是rejected状态。  
如果回调函数最终是return，该Promise是resolved状态。  
但如果回调函数最终return了一个Promise，该Promise会和回调函数return Promise状态保持一致。  

```js
function test() {
  return new Promise((resolve, reject) => {
    resolve("test");
  });
}

test()
  .then(data => {
    console.log(data);
    return data + 1;
  })
  .then(zz => {
    console.log(zz); // test1
    // 如果要拿到data,可以return的时候返回 数组或者赋值给全局变量
    console.log(data); // Error:data is undefined
  });

// 如果上一个promise中没有reject,则会走.catch,不会去 .then
test()
  .then(data => {
    return new Promise((resolve, reject) => {
      reject(data + 1);
    });
  })
  .then(_ => {
    console.log("这里不会执行");
  })
  .catch(err => {
    console.log("err::", err); // err:: test1
  });
```

2. 发布订阅模式有个集成中心来处理两端的事情, 观察者模式是直接处理