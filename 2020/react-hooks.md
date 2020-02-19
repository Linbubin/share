# hooks方法
## useLayoutEffect
`useLayoutEffect` 的用法跟 `useEffect` 的用法是完全一样的，都可以执行副作用和清理操作。它们之间唯一的区别就是执行的时机。

`useEffect` 不会阻塞浏览器的绘制任务，它在页面更新后才会执行。

而 `useLayoutEffect` 跟 `componentDidMount` 和 `componentDidUpdate` 的执行时机一样，会阻塞页面的渲染。如果在里面执行耗时任务的话，页面就会卡顿。

## useContext
```js
// 原来用法
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间层组件
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 通过定义静态属性 contextType 来订阅
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}

// 除了静态属性,也可以用 Function Component
function ThemedButton() {
    // 通过定义 Consumer 来订阅
    return (
        <ThemeContext.Consumer>
          {value => <Button theme={value} />}
        </ThemeContext.Consumer>
    );
}

// 使用useContext
function ThemedButton() {
  const value = useContext(NumberContext);
  return <Button theme={value} />;
}
```
原来的 Function Component 和 useContext对比
```js
function HeaderBar() {
  return (
    <CurrentUser.Consumer>
      {user =>
        <Notifications.Consumer>
          {notifications =>
            <header>
              Welcome back, {user.name}!
              You have {notifications.length} notifications.
            </header>
          }
      }
    </CurrentUser.Consumer>
  );
}

function HeaderBar() {
  const user = useContext(CurrentUser);
  const notifications = useContext(Notifications);

  return (
    <header>
      Welcome back, {user.name}!
      You have {notifications.length} notifications.
    </header>
  );
}
```

## useReducer
使用方式和redux类似
```jsx
import React, { useReducer } from "react";
function App() {
  const [count, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return state + 1;
      case "reduce":
        return state - 1;
      default:
        return state;
    }
  }, 0);

  return (
    <div>
      <h1>统计一下 {count}</h1>
      <button onClick={() => dispatch({ type: "add" })}>+++++++++++++</button>
      <button onClick={() => dispatch({ type: "reduce" })}>
        -------------
      </button>
    </div>
  );
}
export default App;
```

## useCallback useMemo 用于防止变量(值 或者 函数)重复定义
> useCallback缓存的是方法的引用，而useMemo缓存的则是方法的返回值
```js
function Foo() {
  const [count, setCount] = useState(0);

  // const memoizedHandleClick = useCallback(
  //   () => console.log(`Click happened with dependency: ${count}`), [count],
  // ); 

  // 把上面的useCallback换成useMemo
  const memoizedHandleClick = useMemo(() => () => console.log(`Click happened with dependency: ${count}`), [count],
 )
  return <Button onClick={memoizedHandleClick}>Click Me</Button>;
}
```

## useRef
```js
// 以前
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  
  componentDidMount() {
    this.myRef.current.focus();
  }  

  render() {
    return <input ref={this.myRef} type="text" />;
  }
}

// hooks
function() {
  const myRef = useRef(null);

  useEffect(() => {
    myRef.current.focus();
  }, [])
  
  return <input ref={myRef} type="text" />;
}


// demo
import React, {useState, useRef} from 'react';

function App(){
  const [text, setText] = useState('');
  const inputEl = useRef()

  return(
    <>
      <input type='text' value={text} onChange={e => setText(e.target.value)} />
      <button onClick={()=>{console.log(inputEl); inputEl.current.type = 'billy'}}>点击改变成billy</button>
      <input type='text' ref={inputEl}/>
    </>
  )
}

export default App
```

# NOTE
1. useReducer + useContext实现redux功能
```js
// 创建两个context用来传递到子组件
const TodosDispatch = React.createContext(null);
const TodosState = React.createContext(null);

function TodosApp() {
  // 获得state和dispatch方法
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    // 将state和dispatch作为value传递下去
    <TodosDispatch.Provider value={dispatch}>
      <TodosState.Provider value={todos}>
        <DeepTree todos={todos} />
      </TodosState.Provider>
    </TodosDispatch.Provider>
  );
}

function DeepChild(props) {
  // 利用useContext获得state和dispatch
  const dispatch = useContext(TodosDispatch);
  const todos = useContext(TodosState);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <>
      {todos}
      <button onClick={handleClick}>Add todo</button>
    </>
  );
}
```

2. 模拟PureComponent   用memo来包裹
3. Object.is （浅比较）
Hook 内部使用 Object.is 来比较新/旧 state 是否相等
与 class 组件中的 setState 方法不同，如果你修改状态的时候，传的状态值没有变化，则不重新渲染
与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果
```js

// export default function Counter() {
//   const [counter, setCounter] = useState({ name: "计数器", number: 0 });
//   console.log("render Counter");
//   // 如果你修改状态的时候，传的状态值没有变化，则不重新渲染
//   return (
//     <>
//       <p>
//         {counter.name}:{counter.number}
//       </p>
//       <button
//         onClick={() => setCounter({ ...counter, number: counter.number + 1 })}
//       >
//         +
//       </button>
//       <button onClick={() => setCounter(counter)}>++</button>
//     </>
//   );
// }

export default class Counter extends React.PureComponent {
  state = { name: "计数器", number: 0 };
  setCounter = v => {
    this.setState(v);
  };
  render() {
    console.log(1)
    const counter = this.state;
    return (
      <>
        <p>
          {counter.name}:{counter.number}
        </p>
        <button
          onClick={() =>
            this.setCounter({ ...counter, number: counter.number + 1 })
          }
        >
          +
        </button>
        <button onClick={() => this.setCounter(counter)}>++</button>
      </>
    );
  }
}
```

# QUESTION
1. 为什么react hooks依赖调用顺序(为什么不能在条件方法中写useXX)？  [介绍](https://mp.weixin.qq.com/s/Err3W38ZMAX9Bm__SAI1jg)
> memoizedState 数组是按hook定义的顺序来放置数据的，如果 hook 顺序变化，memoizedState 并不会感知到。

因为React根据useXXX的调用顺序来设置value,比如
```js
// ...
const [data, setData] = useState(111)
if(boolean){
  const [name, setname] = useState(222)
}
const [value, setvalue] = useState(333)
// ...
```
第一次假设boolean是true,React就把依次
```js
// 把111赋值给data,
// 把222赋值给name
// 把333赋值给value
```
第二次boolean被设置为false,React根据顺序直接去读取
```js
// 读出data的值111  赋值给data

// 因为第二句赋值语句被设置为false,所以不赋值，但是查询顺序确是固定的,所以
// 读出name的值222  赋值给value

// 读出value的值333  准备赋值 ----> error
```

其实并不是一个数组，而是一个next的对象  
所以如果把hook1放到一个if语句中，当这个没有执行时，hook2拿到的state其实是上一次hook1执行后的state（而不是上一次hook2执行后的）。这样显然会发生错误。
```js
// hook1: const [count, setCount] = useState(0) — 拿到state1
{
  memorizedState: 0
  next : {
    // hook2: const [name, setName] = useState('Star') - 拿到state2
    memorizedState: 'Star'
    next : {
      null
    }
  }
}

// hook1 => Fiber.memoizedState
// state1 === hook1.memoizedState
// hook1.next => hook2
// state2 === hook2.memoizedState
```
2. react hooks中如何对应之前的周期函数？