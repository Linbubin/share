
`promise.then(onFulfilled, onRejected)`

* 如果`onFulfilled`不是函数, 就被忽略
* 如果`onRejected`不是函数, 就被忽略

如果`onFulfilled`不是函数,且`promise1`状态为`fulfilled`, `promise2`必须是`fulfilled`,而且和`promise1`有相同的`value`
如果`onRejected`不是函数,且`promise1`状态为`rejected`, `promise2`必须是`rejected`,而且和`promise1`有相同的`reason`

要考虑到 `promise.then(onFulfilled => {return x})` x是promise时,会存在多层promise嵌套,递归的问题

thenable 判断是否为object或function,然后再判断是否有then方法

被`lock in`也不会立即执行
```js
a = new Promise((res,rej)=>setTimeout(()=>res(1),5000));
b = new Promise((res,rej)=>res(a));

// 5s后 a变成resolved,才会继续执行下面的console
b.then(v=>console.log(v));
```


react 丢失this的原因:
会把所有onClick的方法都放到一个地方,调用时拿过来的时候就是 this.handleXXX 相当于window.handleXXX了，所以this丢失

setState,而不是直接this.state.xx的原因,因为vue会监听this.state的变化,从而直接更新dom,而react不会，需要调用this.setState来， 而且还涉及到 shouldComponentUpdate的判断逻辑。


前端实习面经： JD金融   京东毕竟是大厂，问的内容相对基础，但是覆盖面广，问的也比较细致，大家如果准备大厂面试的话最好准备充分一点，不然像我一样死的很惨   1.说下你做过的你比较熟悉的项目，中间他会给你指出其中的问题，你最好都记下来   2.说一下http协议（详细）、前后端联合开发流程，get和post的区别   3.说一下什么是cookie，有没有什么新的存储手段   4.说一下响应式布局和流式布局   5.说一下vue的生命周期，vue父子组件传值   6.说一下webpack的作用   7.如何获取手机屏幕的变化（横屏还是竖屏）   8.给你一个搜索框和一个导航栏，两个都不定宽，布局实现一下  字节跳动   字节跳动要求很高，问的内容多又深，毕竟一天400不是白给你的，主要问了4个方面的知识---------css,js,vue,算法。   1.一个div里面包含着另一个div，里面的div外边距是15%，问两个div的排列情况   2.body元素里面有一个div，求实现div元素水平和垂直都居中的方法(面试官要求最优)   3.用css实现一个三角形   4.说一下闭包及其用途和不好的地方   5.说一下js中this指向有几种，并且如何解决this指向混乱问题(答案是箭头函数)   6.你vue学的怎么样，给你一个单选框，一个按钮，用vue实现点击单选框切换按钮的颜色(不要操作dom)   7.给你一个排好序的数组，如何打乱？你有几种方法，还有没有最优的解法？   8.给你一个长度为N的排好序的数组，要求给出数组元素之和为M的情况，例如长度为10的数组，数组元素为[1,2,3,4,5,6,7,8,9,10],要求给出数组元素之和为11的情况，如[1,10],[1,2,9],[1,3,4,6]   最后跟面试官交流，面试官说公司大部分都是全栈工程师，并且只要你面技术岗(包括前端，后端，大数据等)，第一面都是算法。所以想进头条的童鞋们，加油吧！ 闪银奇异   公司看起来很小，但是问的问题内容很多，基础上偏难(主要要求你说的详细)，主要包括js(es5和es6)，http协议，算法，vue，感觉是个大公司，现在找个实习好难啊！   1.说一下js面向对象和原型，我说完以后，他继续问我为什么构造函数种存储属性，原型对象中存储方法   2.了解闭包吗？说一下闭包  3.了解es6吗？说一下es6新增的字符串方法   4.说一下es6中promise及其实现原理（我说用我会，原理不懂）   5.说一下vue里面双向数据绑定的实现原理（回答一样，我说只会用，不懂原理）   6.给我在笔记本上出了几个题，让我说结果，问的是this指向问题，这种题目建议大家不要按正常套路走，一般都不会让你输出正常结果   7.说一下输入url地址到回来的过程(要求你说的超级详细)   8.http缓存   9.cookie，session，localSorage,sessionStorage   10.说一下数组是如何在内存中存储的   11.说一下链表如何定义的   12.给你一个只有左右括号字符串，判断它是不是正常的括号匹配机制，如'(()())'是正常，‘())(()’是不正常   13.说一下你简历上的一个项目   最后问面试官怎么才能通过，面试官说回答上来100%，不然就跟其他面试者比较，择优录取，所以现在的形势是在回答上来的基础上要超越其他人！所以童鞋们加油吧！ 好未来   一面:   1.说一下你知道的html   2.说一下你学过的css(我说伸缩盒子，面试官就对伸缩盒子问的特别详细,包括怎么用，纵向布局怎么用，都有哪些属性和注意事项)   3.闭包   4.面向对象和继承   5.vue中的父子组件传值(详细,包括子组件如何向父组件传值,手撕代码实现)   6.vue中methods和computed的区别   7.filter,watch,directives都是干嘛用的   8.双向数据绑定(手撕代码实现)   二面:   1.有没有用过可视化工具?(我说没有)   2.说一下http协议(问的特别详细那种)   3.get和post的区别(我说get只能发送ASII字符，他就问我get如何发送非ASII字符，我说get不如post安全，他就问我为什么post更安全)   4.知道CSRF吗?怎么解决?   5.跨域   后面的忘了,反正问的都是我不会的，说自己会的就会问你其他问题(比如算法优化),然后就会被卡死,找个实习真的难啊！ 阿凡题   笔试题(要求写出尽可能多的解决方案):   1.移动端适配:设计一个页面使页面宽度等于浏览器宽度,缩放比例和PC端保持一致,不允许用户自行缩放页面   2.写出你知道的所有样式优先级   3.你知道的跨域   4.如何更新缓存(js,css)   5.移动端调试页面的方法   6.Vue或React如何实现父子组件通信   7.setData函数如何使用?   8.数组去重的方法(ES5,ES6)   面试:   1.讨论数组去重的细节(比如空对象和空数组不相等,不能去除)   2.跳台阶和变态跳台阶（一共N阶台阶,每次只能跳1阶或2阶,问一共有多少种跳法）   3.问我博客中括号匹配符的正确性的解题思路   4.var arr=[1,2,3]  arr1=arr arr1.push[4]  问arr是多少   5.排序算法的稳定性   6.深拷贝和浅拷贝的区别 搜狗   笔试题   第一部分是思维题目就是找规律那种   第二部分是技术题目   1.闭包   2.this指向   3.找出字符串中出现次数最多的字母,返回次数   4.N的阶乘   5.一个比赛的题目比较开放,没有思路   6.两个||与一个|的区别   7.跨域   8.canvas   9.实现in_array   面试   第一面   1.vue双向绑定原理   2.webpack以及你用过的插件   3.es6新特性以及相关应用   4.http状态码   5.vue生命周期   6.vue路由   7.你的项目   8.手写基本Promise及ajax请求   第二面   1.浏览器缓存及其优缺点   2.是否对php有了解,会不会php语法   3.双向数据绑定原理   4.webpack




现代浏览器在与服务器建立了一个 TCP 连接后是否会在一个 HTTP 请求完成后断开？什么情况下会断开？
默认情况下建立 TCP 连接不会断开，只有在请求报头中声明 Connection: close 才会在请求完成后关闭连接。


一个 TCP 连接可以对应几个 HTTP 请求？
了解了第一个问题之后，其实这个问题已经有了答案，如果维持连接，一个 TCP 连接是可以发送多个 HTTP 请求的。


一个 TCP 连接中 HTTP 请求发送可以一起发送么（比如一起发三个请求，再三个响应一起接收）？
不能，因为HTTP是无状态的，没法一一对应起来

为什么有的时候刷新页面不需要重新建立 SSL 连接？
在第一个问题的讨论中已经有答案了，TCP 连接有的时候会被浏览器和服务端维持一段时间。TCP 不需要重新建立，SSL 自然也会用之前的。

浏览器对同一 Host 建立 TCP 连接到数量有没有限制？
所以答案是：有。Chrome 最多允许对同一个 Host 建立六个 TCP 连接。不同的浏览器有一些区别。

收到的 HTML 如果包含几十个图片标签，这些图片是以什么方式、什么顺序、建立了多少连接、使用什么协议被下载下来的呢？
那浏览器就会在一个 HOST 上建立多个 TCP 连接，连接数量的最大限制取决于浏览器设置，这些连接会在空闲的时候被浏览器用来发送新的请求，如果所有的连接都正在发送请求呢？那其他的请求就只能等等了。



constructor
componentWillMount -> static getDerivedStateFromProps()
render
componentDidMount


// setState
componentWillReceiveProps()
shouldComponentUpdate()  -> false的话就over    -> true
componentWillUpdate()
render()
componentDidUpdate()
--------------------------------------------> 
static getDerivedStateFromProps()
shouldComponentUpdate
render
getSnapshotBeforeUpdate()
componentDidUpdate



react-redux 怎么解决全部渲染的问题

例如上几节提到的性能问题，现在不相关的数据变化的时候其实所有组件都会重新渲染的，这个性能优化留给读者做练习。


yarn add redux react-redux



const appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}
function renderApp (newAppState, oldAppState = {}) { // 防止 oldAppState 没有传入，所以加了默认参数 oldAppState = {}
  if (newAppState === oldAppState) return // 数据没有变化就不渲染了
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle (newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return // 数据没有变化就不渲染了
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
  if (newContent === oldContent) return // 数据没有变化就不渲染了
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

function reducer (state, action) {
  if (!state) {
    return appState
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state
  }
}

function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({})
  return { getState, dispatch, subscribe }
}

const store = createStore(reducer)
let oldState = store.getState() // 缓存旧的 state
store.subscribe(() => {
  const newState = store.getState() // 数据可能变化，获取新的 state
  renderApp(newState, oldState) // 把新旧的 state 传进去渲染
  oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
})
renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js2233332 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
// renderApp(store.getState()) // 把新的数据渲染到页面上




/**
 * 用户的数据包括三部分，姓名（username）、年龄（age）、性别（gender）
 */

/* 增加用户操作 */
dispatch({
  type: 'ADD_USER',
  user: {
    username: 'Lucy',
    age: 12,
    gender: 'female'
  }
})

/* 通过 id 删除用户操作 */
dispatch({
  type: 'DELETE_USER',
  index: 0 // 删除特定下标用户
})

/* 修改用户操作 */
dispatch({
  type: 'UPDATE_USER',
  index: 0,
  user: {
    username: 'Tomy',
    age: 12,
    gender: 'male'
  }
})


this

class 里面的function被外部引用时,this会指向undefined
```js
class A{
	say(){console.log(this)}
}
a = new A()
zz = a.say
zz() // undefined
```

this.setState()如果之前整体赋值,则不会生效
```
// this.state.isLiked -> true
this.state = {
  isLiked: !this.state.isLiked
}
this.setState({})


// console.log(prevState, this.state) -> true  true
```

React的state不可直接修改的原则是为了shouldComponentUpdate对比服务的

如果是改变obj的引用地址里的数值,那么DidUpdate里面是可以看到的,但是prevState和this.state将会相同,同时 PureComponent将不会自动更新
```js
// this.state.isLiked -> true
this.state.isLiked = !this.state.isLiked
this.setState({})


// console.log(prevState, this.state) -> false  false
```

正确操作
```js
// this.state.isLiked -> true
this.setState({
  isLiked: !this.state.isLiked
})


// console.log(prevState, this.state) -> true  false
```



```js
// 连续调用
this.setState(prevState => ({count: prevState.count + 1}))
this.setState(prevState => ({count: prevState.count + 1}))
this.setState(prevState => ({count: prevState.count + 1}))
this.setState(prevState => ({count: prevState.count + 1}))
```


static defaultProps = {
    likedText: '取消',
    unlikedText: '点赞'
  }



ref 两种用法
1. 
```js
ref={xx => this.xRef=xx}
// -----
console.log(this.xRef.clientHeight)
```
2. 
```js
this.pRef = createRef()
// ------
console.log(this.pRef.current.clientHeight)
// ------
ref={this.pRef}
```


redux的作用
1. 集中管理状态
2. 增加一个store.dispatch 方便数据改变时 其他页面调用改变