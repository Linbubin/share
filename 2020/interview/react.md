# setState是同步还是异步?
其实底层都是同步操作。  
但是由于React将dom事件做了统一的管理,所以如果是在React中的dom事件中使用 `setState`,那么就会先将所有的事件收集起来，执行类似`Object.assign`的方法,将所有的设置都合并以后再执行。setState 可能会导致 DOM 的重绘，如果调用一次就马上去进行重绘，那么调用多次就会造成不必要的性能损失。设计成异步的话，就可以将多次调用放入一个队列中，在恰当的时候统一进行更新过程。
但是,如果是非dom事件,比如包在setTimeout里面,就是同步操作.

# React 中 keys 的作用是什么？
同级组件的唯一标识符.涉及到[diff算法](#阐述下diff算法)

# 阐述下[diff算法](https://zh-hans.reactjs.org/docs/reconciliation.html#the-diffing-algorithm)
主要是用来比对前后两次生成的react.element树的差异,由于要一个一个的比较时间复杂度太高,所以根据实际情况以及性能的要求规定了以下两条规则来将时间复杂度降为O(n)
1. 两个不同类型的元素会产生出不同的树；
2. 开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定；  

这样每次在比对的时候只需要同级比较,确定元素的删减即可.

# 生命周期
挂载 constructor -> getDerivedStateFromProps -> render -> componentDidMount  
更新 new Props(setState) -> getDerivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate  
forceUpdate(强制刷新,所以就不判断shouldComponentUpdate) -> getDerivedStateFromProps -> render -> getSnapshotBeforeUpdate -> componentDidUpdate  
卸载 componentWillUnMount

# onClick为什么获取不到this
因为React将dom事件收集起来统一管理,传入的函数就类似于一个callback,this自然会丢失.

# 为什么虚拟 dom 会提高性能
首先,因为js操作会比dom操作来的快。其次React会先将jsx转换成一种特定的数据结构,进行diff算法操作,最终再用dom-api进行dom操作,所以如果只是简单的改几个元素,并不会比直接dom操作快。 如果是大量的dom操作,经过diff算法后，可以进行最小的dom操作，所以会提高性能。







# React如何提高性能
shouldComponentUpdate 


# function 嵌套function 怎么同步查询