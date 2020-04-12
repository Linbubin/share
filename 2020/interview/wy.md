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



# 个人信息

* 林斌/男/1995
* 2017/本科/温州医科大学计算机与科学专业
* 工作年限：2.5年
* 期望职位：前端开发工程师
* 期望薪资：税前月薪10k-15k
* 期望城市：杭州

# 联系方式

* 手机：18757781776
* Email：289873007@qq.com
* QQ/微信号：289873007(微信同号）

# 技能清单

* 熟练使用HTML+CSS+Javascript还原设计图
* 熟练使用React+React-router+Redux+antd进行日常开发
* 熟练使用Git进行代码管理
* 熟练使用Node进行后端开发
* 熟悉ES6语法
* 熟悉Typescript
* 熟悉HTTP协议

# 工作经历

## 杭州京数信息技术有限公司 （ 2017年10月 ~ 至今 ）

### 监所管理系统（2017年10月～2018年10月）

#### 开发技能:

* React全家桶+antd开发前端
* Node+express+Mongodb开发后端

由于一开始并不会使用React+Node开发，所以在该项目负责消息、人员基本信息录入等几个简单的模块。到了18年中，因为需求的变更，需要关系型数据库的支撑,所以将原来的Mongodb全部换成Postgresql，又因为我负责前端模块较少，所以将数据库重构的工作大部分都交给我来做。其中最困难的是两种数据库之间思想的转变,为了让前端开发人员能无差别的开发，需要自己做大量的数据结构处理。最终花了将近2个月的时间将数据库进行了无缝切换。

### 马鞍山市全文检索系统（2018年10月～2019年2月）
#### 开发技能:
* React全家桶+antd开发前端
* Node+express+Mongodb+esql开发后端

我在此项目负责了人员档案和车辆档案模块的开发。其中遇到的困难点还是将页面转化为图片导出时会有少许的失真，我翻看了相关的文档发现该问题基本上无解。所以我又转去和客户进行沟通，和对方说明具体的原因，客户也表示理解。学会了和产品以及客户进行需求的沟通。

### 马鞍山市众智平台（2019年3月～2019年10月）
#### 开发技能:
* React全家桶+antd开发前端
* Node+express开发中端

因为涉及到亿级的数据处理，Node没有太好的支持方案，所以该项目使用Node做中端，主要负责调用后端Java的接口，以及对接口返回的数据进行重新组装，方便前端展示。
该项目最大的难点是在3月份时，由于之前开发的同事突然离职，导致基本没怎么交接，只能自己通过阅读源码、打断点、写注释等方法进行对流程的理解。其中对canvas的操作最困难，只能自己翻资料，查文档一步一步来。最终算是完整交付给客户，并在马鞍山数据建模大赛中发挥了重大作用。

### 知识产权采集系统（2019年12月～至今）
#### 开发技能:
* React hooks + Typescript +antd开发前端

因为React hooks和Typescript的兴起，而且这个是一个小型的内部使用系统，所以我们小组内经过讨论就使用了最新的React hooks和Typescript进行开发。其中最困难的还是Eslint的检测以及对Typescript的不熟悉导致的。经过项目的开发，渐渐也熟悉了。

---      
# 致谢
感谢您花时间阅读我的简历，期待能有机会和您共事。
      


      生命周期
ts
canvas操作 canvas 基本操作
基础js篇    
css篇

portal ReactDOM.createPortal(child, container) modal


for in  对象的key  原型链上也算
for of  iterable的