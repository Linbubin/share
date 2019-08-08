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
## linear-gradient
> 线性渐变
```css
/* 从左往右 透明-白-透明 */
background: linear-gradient(to right, transparent, white, transparent); 
```
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

# text-shadow 文字阴影
参数
* `<color>`
* `<offset-x> <offset-y>`
* `<blur-radius>` 如果没有指定，则默认为0。值越大，模糊半径越大，阴影也就越大越淡（wider and lighter）。

# 动画
## transform 变化
对象: block系
* perspective 镜头离元素的距离   一般与rotate一起使用,需要写在rotate前面 
* rotateY(xdeg)  x为角度 正顺时针,负逆时针
* translateY 竖直方向上位移距离
* perspective 镜头离Z轴的距离, 和 rotate结合,展示3D效果,一定要写在rotate前面

### transform-origin 旋转中心点
* 一个值：
必须是`<length>`，`<percentage>`，或 left, center, right, top, bottom关键字中的一个。

* 两个值：
其中一个必须是`<length>`，`<percentage>`，或left, center, right关键字中的一个。
另一个必须是`<length>`，`<percentage>`，或top, center, bottom关键字中的一个。

* 三个值：
前两个值和只有两个值时的用法相同。
第三个值必须是`<length>`。它始终代表Z轴偏移量。

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

* steps: steps(8) 将状态分成8步,断续加载

### animation-iteration-count 动画在结束前运行的次数
* `<number>` 可以为0.5,即播放0.5次

* infinite 无限次

### animation-delay
> 动画延时xx时间开始
```css
/* 2s后开始 */
animation-delay: 2s
```

### animation-fill-mode
> 设置CSS动画在执行之前和之后如何将样式应用于其目标。

一般拿来和 `animation-delay`联合使用.

取值:
* none 当动画未执行时，动画将不会将任何样式应用于目标
* forwards 目标将保留由执行期间遇到的最后一个关键帧计算值
* backwards 动画将在应用于目标时立即应用第一个关键帧中定义的值，并在`animation-delay`期间保留此值。 

### animation-direction
> CSS 属性指示动画是否反向播放
* normal 默认值, 从 0% -> 50% -> 100%,重新 0% -> 50% -> 100%
* alternate 交替反向运行, 从 0% -> 50% -> 100% -> 50% -> 0% -> 50% -> 100% -> 50% -> 0%
* reverse 反向运动动画  normal取反
* alternate-reverse 反向交替 alternate取反

# NOTE
## border来画三角形
1. 不设置width height时,会自动利用border-width画出四个等分三角形将正方形撑大
2. 不设置一边时,那一边的内容就会被裁掉不展示,其余展示参考四边都有的时候
3. 画一个对话框. 原理: 利用befor和after width-1px的差距,来进行覆盖形成一个小三角形
```html
<style>
  #demo {
    width: 200px;
    line-height: 100px;
    background-color: #fff;
    position: relative;
    border: 1px solid #5BBF5A;
    text-align: center;
    font-size: 25px;
  }

  #demo:after, #demo:before {
    border: solid transparent;
    content: ' ';
    width: 0;
    height:  0;
    position: absolute;
  }

  #demo:after {
    border-width: 10px;
    border-top-color: #fff;
    top: 100px;
    left: 150px;
  }

  #demo:before {
    border-width: 11px;
    border-top-color: #5BBF5A;
    top: 100px;
    left: 149px;
  }
</style>
<div id="demo">123</div>
```

## 相对大小
1. em
  * 和字体大小相同,默认为16px,可以设置不同的字体大小来展示不同的em
  * 给font-size设置em时,会根据它继承的font-size大小来按比例展示
# CSS变量
> 变量，就是拥有合法标识符和合法的值。可以被使用在任意的地方。可以使用var()函数使用变量。例如：var(--example-variable)会返回--example-variable所对应的值

> 自定义属性。这些属性使用--*where*的特殊格式作为名字。例如--example-variable: 20px;即使一个css声明语句。意思是将20px赋值给--example-varibale变量。

> 自定义属性和常规属性一样，作用在当前的层级，若没有定义，则从其父元素继承其值。

```css
/* 可以放在:root里给其他css使用 */
:root{
    --width: 100px;
    --height: 100px;
}
.a{
    /* 也可以放在单个css之中, 类似于私有变量 */
    --width: 50px;
    width: var(--width);
    height: var(--height);
    background: gray
}
.b{
    --width: 60px;
    width: var(--width);
    height: var(--height);
    background: gray
}
```


# 文字

## letter-spacing 间距
normal | <length> 默认为0

# action + 动画
css写法和hover类似
```css
.content .text::before{
    content: "no";
    width: 100%;
    height: 10px;
    font-size: 15px;
    color: blue;
    position: relative;
    display: inline-block;
    left: -10%;
}

.content.active .text::before{
    content: "yes";
    left: 10%;
}

.content .text::before{
    transition: 0.5s;
}
```

# filter 滤镜
* blur 以多少像素融合在一起,值为px
* contrast 黑白度 默认为1, 0则为全黑白,超过1 就为曝光的样式