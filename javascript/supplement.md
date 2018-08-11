# 补充说明
1. 函数中如何跳过前面几个参数，直接定位到后面的参数

ask:
```
function getInfo(name='雾秋'){
	//..........
	return info
}
getInfo('xxx')

现在想扩展一下这个function, 多加一个参数 age
function getInfo(name="雾秋",age){}

怎么跳过name 直接传入age
```
```js
getInfo(undefined, 22); //用undefined来跳过前面的参数即可， 默认值还是会使用
```

2. 阻止冒泡事件 -- [捕获和冒泡等事件说明](https://blog.csdn.net/qianqianstd/article/details/74941875)
```html
<div id='div' onclick='alert("div");'>
　　<ul onclick='alert("ul");'>
　　　　<li onclick='stopHandler(this)'>test</li>
　　</ul>
</div>
<script>
	function stopHandler(event)  {
		alert(event);
    window.event?window.event.cancelBubble=true:event.stopPropagation(); // 这句是重点
}  
</script>
```