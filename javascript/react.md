1. shouldComponentUpdate妙用
```js
shouldComponentUpdate: (nextProps = {}, nextState = {}) => {
  // 可以在里面比较 this.state和nextState this.props和nextProps
  // this.state会取原先的state, nextState则是this.setState后的值
  // 同理 this.props和nextProps也是一个道理

  // 可以根据两者的对比判断是否要重新加载 render(return true加载 false不加载)
}
```

2. this.setState
```js
this.setState({name: this.state.name+1})
// setState也可以传入一个function 参数为 this_state和this_props, return 要修改的state
this.setState((this_state,this_props) => {
  console.log('aaa::',aaa)
  return {name: this.state.name+1} 
})
```