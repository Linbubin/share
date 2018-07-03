#记录一些 echarts中遇到的坑

1. 折线图上拐点设置背景颜色

起因是因为项目换了背景色，不是echarts默认的白色,这就导致拐点处颜色（约等于白色）显得很奇怪.<br>
所以要改变拐点背景颜色.

解决： 在 series 中添加 `symbol: "circle"`,就能将拐点的颜色跟随`itemStyle: {normal: {color: 'someColor'}}`的someColor改变。

但是，在这个情况下又出现了问题，因为我的echarts有两条折线，
```
legend: {
  data:['xxx', 'yyyy']// 和 data_name对应
},
```
而legend的颜色会跟随`itemStyle: {normal: {color: 'someColor'}}`的someColor改变，所以将someColor设置成背景色，可以让拐点颜色看起来像透明，但是会导致legend颜色也都变成背景色， 无法根据颜色区分多个折线的区别

但是如果只有一条折线的话， 就没问题了。

Q: legend设置样式  
A: 官网看了一下， 没有单独设置legend的color，他只能跟随下面对应的颜色， 不过这也有道理，因为颜色需要一致，才能看的出 哪条折现对应。<br>
决定背景不透明了。 直接改成和线的颜色相同，先用着。