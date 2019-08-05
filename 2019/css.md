# visibility 和 display的区别
visibility: hidden 虽然用户看不到,但是位置还是会被占用<br>
display: none 用户看不到,而且不占用位置<br>
但是不管是哪个css,react中依然会执行DidMount等生命周期函数,所以如果为了节约性能,在react中应该直接不加载组件,而不是用 display或visibility来将其隐藏.

# position
1. static    默认
2. relative  不脱离文档流的情况下， 展现位置改变
3. absolute  相对第一个有position属性的父级，如果都没有， 就相对当前窗口
4. fixed     相对当前窗口
5. inherit   继承第一个父级的position属性,没设置就继承默认的

# z-index
> 默认为0.
> 如果不设置postion(即 默认的 static), 那么设置z-index是不起作用的,虽然不起作用，但是会被默认看成0,被其他设置position的标签影响。
> 同时也会受到父元素的z-index影响. 父级没有设置z-index的情况下,子级可以通过设置高于其他标签的z-index来获得展示. 父级设置z-index的情况下,就根据父级设置的z-index和其他标签的z-index大小进行比较
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body{
            height:300px;
        }
    .a{
        width: 100px;
        height: 100px;
        background-color: red;
        z-index: 10;
        position: relative;
    }
    .b{
        width: 100px;
        height: 100px;
        background-color: green;
        margin-top: -50px;
        /* 下两句注释了试试看 */
        z-index: 9;
        position: relative;
    }
    .c{
        width: 20px;
        height: 20px;
        background-color: yellow;
        position: relative;
        z-index: 10000;
    }
    </style>
</head>
<body>
    <div class="a">
    </div>
    <div class="b">
        <div class="c"></div>
    </div>
</body>
</html>
```

# 伪类
:before :after
:before设置 position: absolute时,内容会和原文重叠, after会位移原文长度的单位

原因: 因为原来before会占掉原文的位置,导致原文向后移动,当before设置position:absolute时,脱离文档流,导致原文前移,造成重叠.

# css选择器
## :not
> 以多个以逗号分隔的选择器作为参数( `<complex-selector-list>` )
```css
/* 类名不是 `.fancy` 的 <p> 元素 */
p:not(.fancy) {
  color: green;
}

/* 非 <p> 元素 */ 
body :not(p) {
  text-decoration: underline;
}

/* 非 <div> 或 <span> 的元素 */
body :not(div):not(span) {
  font-weight: bold;
}
```

# 布局
## flex
> 子元素所处的位置
1. align-items  center 垂直居中  start end
2. justify-content center 水平居中  start end

## grid
> 子元素所占的位置
1. grid-template-columns 列宽 `1fr 2fr` 分成三等分,第一个占1/3，第二个占2/3

# background
## repeating-linear-gradient
> 重复线性渐变
```css
/* 画一个 0-7.5px 白   7.5-15px 粉色的渐变图 */
background: repeating-linear-gradient(
    white 0%,
    white 7.5px,
    hotpink 7.5px,
    hotpink 15px
);
```

# box-shadow 阴影
> 多个阴影 参数用,隔开
参数
* `inset` 不用inset就向外扩,使用则向内
* `<offset-x> <offset-y>` x y轴的偏移量
* `<blur-radius>` 值越大，模糊面积越大，阴影就越大越淡。 不能为负值。默认为0，此时阴影边缘锐利
* `<spread-radius>` 取正值时，阴影扩大；取负值时，阴影收缩。默认为0，此时阴影与元素同样大。需要考虑 inset 
* `<color>` 颜色值

# 动画
## transform 变化
对象: block系
* rotateY(xdeg)  x为角度 正顺时针,负逆时针
* translateY 竖直方向上位移距离

## transition
> 属性是 transition-property，transition-duration，transition-timing-function 和 transition-delay

一般和hover结合使用
属性名称 + 时间
```css
/* hover时  div 2s内width从100 -> 300 */
div {
    width:100px;
    transition:width 2s;
}
div:hover {
    width:300px;
}
```

## @keyframes 在动画序列中定义关键帧
```css
@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  50% { top: 10px; }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```

## animation
> 属性是 animation-name，animation-duration, animation-timing-function，animation-delay，animation-iteration-count，animation-direction，animation-fill-mode 和 animation-play-state 属性的一个简写属性形式。

### animation-duration 动画时间
值: 时间 10s, 30s, 230ms

### animation-timing-function
* linear：匀速

* ease-in：加速

* ease-out：减速

* cubic-bezier函数：自定义速度模式

### animation-iteration-count 动画在结束前运行的次数
* `<number>` 可以为0.5,即播放0.5次

* infinite 无限次