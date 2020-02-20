# 面试题
* React-hooks有哪些方法
* useReduce有什么作用
* hooks下模拟componentDidMount和componentWillUnmount
* js基本类型
* 为什么typeof null 是 object
* 阐述下原型和原型链
* 继承: 组合继承和寄生组合继承区别
* 数组去重， 如果纯数字的数组有什么好的办法
* Array.from 有什么取代方法, 这个方法增加的初衷是什么  规避构造函数弊端
* es5去重

## 大题
* 一个数组，每项都是标准结构,想要把它变成一棵树，有什么好的办法。
```js
[
    {id: 1, name: 'a', parentId: 0},
    {id: 2, name: 'b', parentId: 1},
    {id: 3, name: 'c', parentId: 2},
    {id: 4, name: 'd', parentId: 5},
    {id: 5, name: 'e', parentId: 0},
]

// ==>
// 以parentId = id 插入到id对应的children里面
[
    {id: 1, name: 'a', parentId: 0, children: [
        {id: 2, name: 'b', parentId: 1, children: [
            {id: 3, name: 'c', parentId: 2},
        ]},
    ]},
    {id: 5, name: 'e', parentId: 0, children: [
        {id: 4, name: 'd', parentId: 5},
    ]}
]
```
* reduce怎么反序输出
```js
const arr = [1,2,3,4,5]
arr.reduce(...)
// ...怎么写, 让他反序输出
arr.reduce((i, j) => {
    // 第一次
    // i -> 5
    // j -> 4
})
```

## 算法
* `[0,1,1,0,....,1,0,0,1....]` -> `[0,0,0...1,1,1...]`怎么能够少开辟空间又快速的排序
* 快速排序的实现
* 双指针

## 网络安全
* xss, csrf 产生和防范

## 页面优化
* 自行描述工作中用到的优化方式

## HTTP
* code码的含义 301 302区别  304

# Webpack
* 其中各种含义 entry output loader plugin
* 阐述loader原理
* 按需加载实现  以及 babel-plugin-import
* 为什么用babel