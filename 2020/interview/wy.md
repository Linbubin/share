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
* 一个无序数组 去掉其中一个数，怎么判断去掉了哪个数
* 链表判断是否有环

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



父元素和子元素都绑定了点击事件,点击时 e.target和e.currentTarget区别 
e.target是当前元素， e.currentTarget是绑定的元素



* react-router history和带`#`区别
* React数据绑定, 数据改变时怎么改变视图
* React ref作用， 父组件操作子组件的方法， 父组件能不能用ref拿到子组件中的自定义方法  
可以将ref传给子组件，从而获得子组件内置的函数
* 事件:冒泡 捕获在浏览器中的差异， 事件委托            
* e.target e.currenttarget 区别
* React事件和原生事件 区别
* 防抖 节流
* js里判断array里面的最大值
* call apply区别
* 闭包 概念, 经典for闭包问题

* 标准盒子模型 width 表示 
标准盒子模型 为 content， ie盒子模型为 content + padding + border  
css3提供 box-sizing content-box border-box
* 以下`100%`的含义
```css
.content {
    width: 100%;
    height: 100%;
    padding-top: 100%;
    margin-top: 100%;
}
```
width 是父级width， height 是父级height, padding margin 都是父级width
* 三列自适应高度的实现
    * 父级 position: relative  子级 position: absolute; top:0; bottom: 0
    *  
* 垂直水平居中
* transform position 区别
* 三角形实现
* 鼠标移动到 button 显示提示框，移动提示框也不消失，移动到其他地方，提示框消失
* 把hover换成点击 怎么实现    --- 事件委托


node 分布式


