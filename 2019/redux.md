# 使用原因
不用redux,组件直接通信变得非常复杂。放到redux以后，所有数据都是由store向下流（单向数据流）。

# 特性
* Single Source of Truth 所有状态都在一个store中

和传统MVC框架不同,store改变必由一个action导致,所以方便debug.

* 可预测性(不可变数据)   state + action = new state

* 纯函数更新Store

#流程
## Store
1. getState()
2. dispatch(action)
3. subscribe(listener)

## Aciton
```js
{
  type: ADD_TODO,
  value: 'xxxx'
}
```

## State
state影响UI展示

## 整体
UI点击 触发-> action 被-> dispatch(action) 到-> reducer 处理action 形成新的-> store 更新-> UI

# 第三方库-其他工具
## combineReducers
将多个Reducer组合一起
```js
const count = (state = initState, action) => {
  switch (action.type) {
    case "add":
      return { count: state.count + 1 }
    case "reduce":
      return { count: state.count - 1 }
    default:
      console.log('sorry::', action.type)
      return state
  }
}

const todos = (state={},action) => {
  console.log("todos::", action.type)
  return state
}

// Create store
const store = createStore(combineReducers({
  todosssss: todos, count
}))
```
输出的store是
```js
{
  count: {count: 1},
  todosssss: {}
}
```
## bindActionCreators
会将action生成一个自动执行的函数来执行  dispatch(action)

```js
// Action creator
function add() {
  return { type: "add" }
}

add = bindActionCreators(add, store.dispatch) // 返回一个可以自动执行dispatch的函数,这样就可以脱离dispath,直接使用add来进行action触发,从而影响store

// store.subscribe(() => { console.log('store::', store.getState()) })
// store.dispatch(add())
add();
```

## react-redux
原理: 高阶组件
react和redux的集成使用
```js
import { connect } from 'react-redux'

class App extends Component {
  // ...
}

function mapStateToProps(state){
  return{
    xx: state.xx
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators({...actions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
```

## redux-chunk
异步的action不是特殊类型的action,而是多个action的组合使用(发送，成功，失败)

判断action是不是promise,是的话,就截获,等待结果返回

中间件在idspatcher中截获action做特殊处理

# 优化
1. 将数据扁平化
```js
// data 
const initialState = {
  items: [], // [id1]
  page: 1,
  pageSize: 3,
  total: 0,
  byId: {}, // {id1: {name: 'billy'}}
  fetchListPending: false,
  fetchLitError: null,
  listNeedReload: false
}

// SUCCESS
switch(action.type){
  case 'FETCH_LIST_SUCCESS': {
    let byId = {};
    let items = [];
    action.data.items.forEach(item => {
      items.push(item.id)
      byId[item.id] = item
    })
    return {
      ...state,
      byId,
      items,
      page: action.data.page,
      pageSize: action.data.pageSize,
      total: action.data.total,
      fetchListPending: false,
      fetchLitError: null
    }
  }
}

```

# ask and question
## ask
1. combineReducers后,一个dispatch会触发两个reducer,如何单独触发

## question
1. 所有的reducer都会被响应,然后根据action.type不同响应不同的的return
