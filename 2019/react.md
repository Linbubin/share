# react
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