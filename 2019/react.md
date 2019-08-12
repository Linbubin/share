# question
## constructor中调用super(props)的目的是什么?
子类中调用 `super()` 才能使用this, 调用 `super(props)` 才能使用 this.props

## 在何处发起ajax请求
在componentDidMount处,因为如果是在willMount发起请求,dom还没加载完,ajax.then中的setState将不会更新组件.

## 事件在react中的处理方式
react使用单个事件监听器监听顶层的所有事件.这意味着更新DOM时,react不需要担心跟踪事件监听器.
为了解决跨浏览器兼容性问题，React 会将浏览器原生事件（Browser Native Event）封装为合成事件（SyntheticEvent）传入设置的事件处理器中。这里的合成事件提供了与原生事件相同的接口，不过它们屏蔽了底层浏览器的细节差异，保证了行为的一致性。另外有意思的是，React 并没有直接将事件附着到子元素上，而是以单一事件监听器的方式将所有的事件发送到顶层进行处理。这样 React 在更新 DOM 的时候就不需要考虑如何去处理附着在 DOM 上的事件监听器，最终达到优化性能的目的。

## createElement 和 cloneElement的区别
createElement三个参数: 标签名,属性,子组件
cloneElement三个参数: react元素,属性,子组件

## React三种构建组件的方式
class, createClass, 无状态函数

## redux 有什么缺点
一个组件所需要的数据，必须由父组件传过来，而不能像 flux 中直接从 store 取。
当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新 render，可能会有效率影响，或者需要写复杂的 shouldComponentUpdate 进行判断。

## 16.3版react变化
componentWillMount，componentWillReceiveProps，componentWillUpdate 将被移除
getDerivedStateFromProps，getSnapshotBeforeUpdate， context 新增

```js
// before
componentWillReceiveProps(nextProps) {  
  if (nextProps.translateX !== this.props.translateX) {
    this.setState({ 
      translateX: nextProps.translateX, 
    }); 
  } 
}

// after
static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.translateX !== prevState.translateX) {
    return {
      translateX: nextProps.translateX,
    };
  }
  return null;
}


// before
componentWillReceiveProps(nextProps) {
  if (nextProps.isLogin !== this.props.isLogin) {
    this.setState({ 
      isLogin: nextProps.isLogin,   
    });
  }
  if (nextProps.isLogin) {
    this.handleClose();
  }
}

// after
static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.isLogin !== prevState.isLogin) {
    return {
      isLogin: nextProps.isLogin,
    };
  }
  return null;
}

componentDidUpdate(prevProps, prevState) {
  if (!prevState.isLogin && this.props.isLogin) {
    this.handleClose();
  }
}
```

## setState的使用
```js
this.setState((prevState, props) => {
  // console.log('pp', prevState, props);
  return {count: prevState.count + 1}
})

// 等价
this.setState({count: this.state.count+1})
```
调用 setState 之后发生了什么？
在代码中调用setState函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个UI界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

## React 中 Element 与 Component 的区别是？
简单而言，React Element 是描述屏幕上所见内容的数据结构，是对于 UI 的对象表述。典型的 React Element 就是利用 JSX 构建的声明式代码片然后被转化为createElement的调用组合。而 React Component 则是可以接收参数输入并且返回某个 React Element 的函数或者类。更多介绍可以参考React Elements vs React Components。

## React 中 keys 的作用是什么？
Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。
在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。

## 为什么我们需要使用 React 提供的 Children API 而不是 JavaScript 的 map？
因为单个子组件时是对象,多个子组件时是数组

## 新生命周期
即将被移除的三个生命周期
* componentWillMount
* componentWillReceiveProps
* componentWillUpdate

新增的两个生命周期
* getDerivedStateFromProps
* getSnapshotBeforeUpdate

### componentWillReceiveProps移除原因
`getDerivedStateFromProps`代替`componentWillReceiveProps`
```js
// before
componentWillReceiveProps(nextProps) {
  if (nextProps.isLogin !== this.props.isLogin) {
    this.setState({ 
      isLogin: nextProps.isLogin,   
    });
  }
  if (nextProps.isLogin) {
    this.handleClose();
  }
}

// after
static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.isLogin !== prevState.isLogin) {
    return {
      isLogin: nextProps.isLogin,
    };
  }
  return null;
}

componentDidUpdate(prevProps, prevState) {
  if (!prevState.isLogin && this.props.isLogin) {
    this.handleClose();
  }
}
```
之前在`componentWillReceiveProps`中我们根据props的改变来改变state,并且执行回调函数.现在我们强制的用`nextProps`和`prevState`作比较来改变state,并将对应的回掉函数放到`componentDidUpdate`中去做,确保数据的同步.

### componentWillUpdate移除原因
> 与 componentWillReceiveProps 类似，许多开发者也会在 componentWillUpdate 中根据 props 的变化去触发一些回调。但不论是 componentWillReceiveProps 还是 componentWillUpdate，都有可能在一次更新中被调用多次，也就是说写在这里的回调函数也有可能会被调用多次，这显然是不可取的。与 componentDidMount 类似，componentDidUpdate 也不存在这样的问题，一次更新中 componentDidUpdate 只会被调用一次，所以将原先写在 componentWillUpdate 中的回调迁移至 componentDidUpdate 就可以解决这个问题。

### 父组件直接写propsname,不写数值,子组件拿到为true
```js
// 父组件
render(){
  return(
    <Children a b c d e="1" f={123} />
  )
}

// 子组件
console.log(this.props); // {a: true, b: true, c: true, d: true, e: '1', f: 123 }
```

### 直接写传入html   dangerouslySetInnerHTML
`<div dangerouslySetInnerHTML={{'{{'}}__html: 'First &middot; Second'}} />`

### 事件
* React使用单个事件处理器,并且会把所有的事件委托到这个处理器上.
* Autobinding 在 React，所有方法被自动绑定到了它的组件实例上
* 事件代理 ： React 实际并没有把事件处理器绑定到节点本身。当 React 启动的时候，它在最外层使用唯一一个事件监听器处理所有事件。当组件被加载和卸载时，只是在内部映射里添加或删除事件处理器。当事件触发，React 根据映射来决定如何分发。当映射里处理器时，会当作空操作处理。
### context
> Context 设计目的是为共享那些被认为对于一个组件树而言是“全局”的数据.<br>
> 不要仅仅为了避免在几个层级下的组件传递 props 而使用 context，它是被用于在多个层级的多个组件需要访问相同数据的情景。

如果把context里的值放到外部,就需要自己强制去监听变化,手动刷新.如果放到context,React会自动刷新.
其次需要将 `Consumer`需要放在`Provider`里面,否则会一直使用默认值

```jsx
// 创建一个 theme Context,  默认 theme 的值为 light
// createContext接收一个默认参数  当外面没包裹privider时,就会使用默认参数当作value, 有包裹但是没设置 value值,就会当作value传入undefined,子组件接收到空值
const ThemeContext = React.createContext('light');

function ThemedButton(props) {
  // ThemedButton 组件从 context 接收 theme
  return (
    <ThemeContext.Consumer>
      {theme => <Button {...props} theme={theme} />}
    </ThemeContext.Consumer>
  );
}

// 中间组件
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
```

### setState的问题
> setState并列书写时会由于异步导致出问题

```js
this.state.x; // []
this.setState({x: this.state.x.concat(1)})
this.setState({x: this.state.x.concat(2)})

// .... 异步结束后
this.state.x; // [2]
```
如果要让两个都同步,可以使用回调函数或者用原子性的setState
```js
this.state.xs; // []
this.setState(state => {
  var xs = state.xs.concat(1);
  return { xs }
})
this.setState(state => {
  var xs = state.xs.concat(2);
  return { xs }
})
this.state.xs; // [1,2]
```

### hook
#### state
> useReducer
```js
function textReducer(state, action){
  switch(action.type){
    case 'UPDATE':
      return action.value
    default:
      return state
  }
}



const [ text, dispatchText ] = useReducer(textReducer, '');


dispatchText({
  type: 'UPDATE',
  value: e.target.value
})
```

上面代码换成useState
```js
const [text, setText] = useState('');

setText(e.target.value)
```


text 为 this.state.text, setText 为 this.setState({text: xxx})

如果是多个state,就多次使用 useState来声明
```js
const [text, setText] = useState('');
const [count, setCount] = useState(0);
```

#### ref
```js
const ref = useRef();

ref.current.style.color = 'red';

<input ref={ref} />
```

```js
createRef
useImperativeHandle
forwardRef
```

#### context
```js
const context = useContext(Context);

return <div>{this.context}</div>
```

#### 生命周期 useEffect
```
// count 如果和上面的count一样,则不渲染
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); 


// return 一个function,可以作为 解绑函数
useEffect(() => {
  // didmount
  window.addEventListener('keydown', handleKeydown);

  // willunmount
  return () => {
      window.removeEventListener('keydown', handleKeydown);
  }
})
```

### 编译
babel会将 jsx语法编译成 `React.createElement()`的形式，如果jsx的标签为小写,babel就会将其编译成`<h1></h1>` -> `React.createElement('h1')`,如果是大写,babel就会将其编译成`<Welcome></Welcome>` -> `React.createElement(Welcome)`,是没有引号,也就代表着是上面 import 而来的.

## restudy
### 单向数据流
React views -> user todo -> action creator -> dispatch -> store -> React views

### virtual DOM
二叉树比较的时间复杂度是 O(n的三次方)
虚拟DOM采用 广度优先分层比较, 一层一层来对比
如果相同,就到下一层
位置不同,就根据关键值(key)来交换位置,如果没key,会直接进行增删来操作
属性不同,根据key直接改变之前的属性
类型不同,就之间删除`之前的`,增加新的(即使其他地方也用到 `之前的`节点)

其他情况:
节点跨层移动(极少发生), 比如B节点在他的父节点D之间增加了一个C, 那么Diff算法看到这一层的D不见了,就直接删除,然后增加一个C, 到下一层时,如果看到D,就会增加一个D(这个D对他来说是全新的,而不是刚才备份的)

换言之：
diff算法会先创建一个由React元素组成的树,同级进行比较
如果是不同类型,就直接销毁 自身及其自组建 再重新生成,不再比对 子组件
如果是同类型,就比对属性, 改变对应修改值, 再继续对比子组件

如果不加key, 那么如果是发生了位移,而不是发生变化, diff算法也会将其属性依次更新,
加了key, diff 算法就会将对应的元素进行位移,而不是更新操作

### 函数复用
#### 高阶组件(HOC)
> 接受组件作为参数,返回新的组件
解决需要一步一步往下传的问题,类似于 context

比如一个定时器组件,如果你只是想要他的数据(当前时间),而不需要整个组件的样式等,就可以自己写一个高阶组件,然后返回一个time值,使用者可以用this.props.time来使用(类似于 antd form表单).

#### 函数作为子组件
如何render的状态由使用者来决定,而不是自己的组件来增加if语句来适应外部功能.


# note
* state中应该只保存最简单的数据,不要尝试把props复制到state中,要尽可能把props当作数据源.
* 装饰器 @xx class 等同 xx(class)
* refs无法使用时,可以使用ReactDOM.findDOMNode(this)来替代,但是最好都别用.
* 当和其他非React第三方库整合时,可以在componentDidUpdate中调用this.componentWillUnmount和this.componentDidMount来卸载/重新挂载DOM
* form表单中组件onChange可以都写在一个方法中,`(e) => this.handleChange('name',e)`
* 获取焦点`autoFocus="true" dom.focus()`
* 所有能计算得到的状态，都不应该存储
* 组件尽量没状态,所需数据通过props获取
* 不可变数据的好处
  1. 易于比较，只要比较是否同一引用就行
  2. 易于调试，每次的状态都记录下来，而且状态改变必然是由某个action触发
* this.setState是异步的,也可以是同步的
```js
// 异步
this.setState({
  counter: this.state.counter + this.props.increment,
});

// 同步
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
* 引入文件是用React.lazy确保代码在使用时才被打包进来
```js
// before
import OtherComponent from './OtherComponent';

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}

// after
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```
# 性能
1. `componentWillUpdate`中`return false`来防止不必要的更新
2. `redux`中`mapStateToProps`尽可能少的返回数据,防止由于不必要数据发生改变引起的更新

# react-router
> 在一个组建容器中根据url来判断当前应该展示哪个组件

> url参数发生变化，即使在同一页面，组件也会刷新（类似于 setState）

和后端路由的对比
1. 声明式路由定义
2. 动态路由

三种路由实现方式
1. URL路径   /home
2. hash路由 低版本浏览器不支持页面不刷新，用hash  /#/home   HashRouter
3. 内存路由 用于ssr  url不变化 但是内容发生变化

基本元素
1. Link 普通链接 点击url不会刷新 `<Link to='/home'>home</Link>`
2. NavLink Link基础上增加点击选中样式 `<NavLink to='/home' activeClass='select'>home</Link>`
3. Prompt 满足条件时提醒用户是否离开页面  一般用于填写表单时，还没确定  用户点击了 切换页面
```js
<Prompt
  when={flag}
  message="Are you sure you want to leave?"
/>
```
4. Redirect 重定向当前页，  登陆以后重定向到首页
```js
<Route exact path='/' render={() => (
  loggedIn ? (
    <Redirect to='/dashboard' />
  ) : (
    <PublicHomePage />
  )
)}
```

5. Route 路径匹配组件
```js
// /about时，两个都会匹配
<Router>
  <Route path='/' component={Home} />
  <Route path='/about' component={About} />
</Router>
```

6. Switch 只显示第一个匹配的路由
```js
// /about时，只显示 Home
<Switch>
  <Route path='/' component={Home} />
  <Route path='/about' component={About} />
</Switch>
```

## 嵌套路由
> 每个React组件都可以是路由组件<br>
> React Router的声明式语法可以方便的定义嵌套路由

```js
<Link to={`/my/sub/1`}>sub1</Link>
<Link to={`/my/sub/2`}>sub2</Link>
<Link to={`/my/sub/3`}>sub3</Link>

<Route
  path="/my/sub/:subId"
  conponent={Category}
/>
```

### ask
1. Class 组件应该始终使用 props 参数来调用父类的构造函数?
2. render为什么每次都会被调用, 原理代码.