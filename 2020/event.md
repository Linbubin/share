# event
记录一些在React开发过程中遇到的问题和解决方案

1. 鼠标事件  
`onMouseOver  onMouseEnter`  `onMouseOut onMouseLeave`
```js
<Parent>
  <Children />
</Parent>
```
当在 `Parent` 组件上添加 `onMouseOver` 时，当鼠标滑过 `Parent` 以及 `Children` 组件都会触发该方法  
可以用 `event.target` 获取当前滑过的组件，也可以用 `event.targetParent` 来始终获取Parent  
所以可以利用 `event.target === event.targetParent` 来判断是否是在Parent滑过  

如果在 `Parent` 内滑动不触发的话，可以在 `Parent` 上绑定 `onMouseEnter` 事件  
这样，只有在刚进入 `Parent` 时才会触发，后续的滑动不会触发  

同理,在 `Parent` 上绑定 `onMouseOut` 时，当鼠标离开 `Parent` 和 `Children` 组件时都会触发该方法，如果只要触发一次，可以绑定 `onMouseLeave` 方法

2. 获取鼠标当前位置  
绑定任意事件都可以,利用 `event` 自带的 `pageX` 和 `pageY` 即可获取  
`pageX` `pageY`始终都是相对整个页面的 x 和 y,包括滚动条
```js
const {pageX, pageY} = event
```

3. 获取当前元素左上角与当前可视窗的 x y
```js
const { top, left } = event.target.getBoundingClientRect();
```