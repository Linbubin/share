# 深入浅出react和redux

## onClick的设计是否不合理
_onclick表示原生html中, onClick表示react中_

首先说明 原生html中 onclick的问题
1. onclick是在全局作用域下, 会污染全局环境
2. 给多个dom添加onclick 会影响页面性能
3. 对使用onclick的元素清除时,需要将对应的时间处理器注销掉,否则会造成内存泄漏(这点很容易忘记)

但是 在react中,上述都不会存在
1. react的onClick是根据组件一起加载的,不在全局作用域下
2. 我们在react组件中使用多个onClick,在加载后不会产生多个onclick的html,而是采用了事件委托(event delegation)的方式处理.
即所有的onClick都会加载成一个事件处理函数,挂在顶层的DOM节点上.所有点击事件都被这个事件处理函数捕获,然后再具体组件分配特定函数.
所以性能会大大的提升.
3. react有特点的生命周期,在unmount的时候会清楚该组件相关的所有事件, 所以也不存在内存泄漏

## props 和 state

### propTypes检查
_因为props是由父级传递过来的,相当于一个接口.那么自己就可以定义接口的规范_
```js
ReactName.propTypes = {
  caption: PropTypes.string.isRequired,// 具体书写方式可以去官网看
  initValue: PropTypes.number
}
```
在开发中定义propTypes即可,在生产环境时应当将这块代码注释或者删除,因为检测也会影响性能,再者warming语句用户也看不懂.
`babel-react-optimize`就有类似的功能.

### state的设置
通常写在构造函数(constructor)的结尾

如果要使用传进来的props做初始值,但是propTypes又不是必须的话,可以写成
```js
this.state = {
  value: props.initValue || 0
}
```
当然如果有大量的state需要判断,那么会影响代码观赏性,可以采用下列的例子
```js
Counter.defaultProps = {
  initValue: 0
}
```
这样如果父级没有传入,就会默认props里存在initValue为0.有传入则用传入值

## 生命周期
> Mount 装载过程 Update 更新过程 Unmount 卸载过程

### 装载过程
1. constructor
2. getInitialState  这个方法只有在React.createClass中才起作用, 用es6语法 则包含在`constructor`的`this.state = {...}`中
3. getDefaultProps  同上,es6中不使用
4. componentWillMount 这个函数通常不写,涉及到他的操作基本都可以提到constructor中,作者认为这个函数只是为了和 `componentDidMount` 对称. 但是他可以在服务端和浏览器端共同使用.其实不对，因为如果你用react-redux把请求后台的数据写在constructor里面，会导致报一下错误.所以我个人认为这个方法应该哪来在页面加载前去请求后台数据用.
```
Warning: setState(...): Cannot update during an existing state transition (such as within render or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to
```
5. render
6. componentDidMount 当render彻底!全部!都加载好后,才会执行. 比如一个父组件有3个子组件,只有当3个子组件的render都执行完毕,才会开始执行第一个子组件的`componentDidMount`方法.只能在浏览器中使用,具体查看 12章 **同构**<br/>
在执行这个函数的时候,dom已经组装好.假设,项目不得不使用jq,就能在这个函数中使用,因为此时dom已经完成,可以进行操作.<br/>
但是如果要同时考虑jq的修改和react的更新,就需要使用 `componentDidUpdate`

### 更新过程
1. componentWillReceiveProps(nextProps) 只要父级的render被调用,那么所有的子组件都会执行该函数. 子组件的this.setState方法不会触发该方法, 因为更新state的方法就是 this.setState,如果this.setState会调用该方法,那么就会造成死循环
2. shouldComponentUpdate(nextProps, nextState) 默认返回true,可以通过设置 来使其返回false,阻止渲染. 因为有些时候是没必要渲染的.
3. componentWillUpdate
4. render
5. componentDidUpdate

### 卸载过程
componentWillUnmount 这个函数没有设置好的参数,也没有对应得did函数,一般用于清除`componentDidMount`中声明的一些非react的方法,比如定时器.否则可能会造成内存泄漏.

## flux和redux

### flux
优点
1. 在使用flux后,react组件的state基本上就沦为flux上的参数,这样如果出错,方法都有对应的调用,方便调试.
2. flux的store只有get方法,没有set方法,所以所有需要改变值得方法,都需要通过action发出.

缺点
1. 难以进行服务器端渲染.
2. store混杂了逻辑和状态,替换store时,只能全局替换,不能根据某一块地方进行替换.

### redux
> flux基本原则 -> 单向数据流
> redux在此基础上加了
> 1. 唯一数据源
> 2. 保持状态只读
> 3. 数据改变只能通过纯函数实现

1. reducer(state, action)
// ............................. 先跳过不看了, 头晕

### redux拆分组件
1. 拆分成傻瓜组件(只负责接收props,然后render,不涉及自身的state)和聪明组件(有自身的state改变,并且传值到傻瓜组件中).

## react 和 redux组合使用 构建服务
首先考虑以下三点:
1. 代码文件的组织结构
2. 确定模块的边界
3. Store的状态树设计

## 小知识点
1. 当传入的props 不是 String类型时,需要用 {}包括起来
2. 如果要访问父级传来的`props`,需要在`constructor(props)`里面写`super(props)`
3. 修改需要用`this.setState`来修改,否则会报警告,而且会将对应的给修改掉,当你再次用`this.setState`修改时,会产生不可预计的后果
4. `this.forceUpdate()`是每个react组件自带的方法,可以让react组件强制刷新
5. `componentWillReceiveProps(nextProps)`传入的是 要更新成的props, 在该方法中可以用`this.props`来访问当前的props, `shouldComponentUpdate(nextProps, nextState)`同理,可以用`this.props`和`this.state`来查询当前值
6. react 所有事件
```
鼠标事件：

onClick

onContextMenu

onDoubleClick

onMouseDown

onMouseEnter

onMouseLeave

onMouseMove

onMouseOut

onMouseOver

onMouseUp

onDrop

onDrag

onDragEnd

onDragEnter

onDragExit

onDragLeave

onDragOver

onDragStart

触摸事件：

onTouchCancel

onTouchEnd

onTouchMove

onTouchStart

键盘事件：

onKeyDown

onKeyPress

onKeyUp

剪切事件：

onCopy

onCut

onPaste

表单事件：

onChange

onInput

onSubmit

焦点事件：

onFocus

onBlur

UI事件:

onScroll

滚动事件：

onWheel
```


# ask:
1. react在服务端   什么意思,多次提起
2. react和jq结合, 书中提到是 P34 <br/>这句话是什么意思
> 我们说可以利用componentDidMount函数执行其他UI库的代码,比如jQuery代码.当React组件被更新时,原有的内容被重新绘制,这时候就需要在 componentDidUpdate函数再次调用jQuery代码.
3. react怎么把mvc转换成mvvm
4. book P71 [实现](https://github.com/mocheng/react-and-redux/blob/master/chapter-03/redux_with_context/src/views/ControlPanel.js?1539941059603)

# 补充:
1. children, 在该组件中用`this.props.children`即可接收传入的children,需要注意的是 如果当前组件没有子节点,它就是 undefined ;如果有一个子节点,数据类型是 object;如果有多个子节点,数据类型就是 array .所以,处理 this.props.children 的时候要小心.<br/>
可以使用 `React.Children.map(this.props.children, item => <div>item</div>)`来将其完整输出,就不用担心传入的children是什么类型的值了。
2. 因为react是虚拟dom,如果要访问真实的dom可以给jsx添加ref,`ref='xxx'`,在别处就能用`this.refs.xxx`来访问到真实dom.