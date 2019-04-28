```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>canvas</title>
</head>
<body>
  <canvas id='drawing' width="200" height="200">a drawing of something</canvas>
  <script>
    var drawing = document.getElementById('drawing');

    // 确定浏览器支持canvas
    if(drawing.getContext){
      console.log('123')
      var context = drawing.getContext('2d');
      // 在rect方法之前设置属性,则会被调用.
      // 可以通过覆盖,再rect方法来生成多个图形

      // fillStyle 或 strokeStyle 来填充颜色
      // fillRect 或 strokeRect 来画图 4个参数(x,y, xLen, yLen)

      // 矩形
      // context.fillStyle = '#ff0000';
      // context.fillRect(10,10,50,50);
      
      // context.fillStyle = 'rgba(0,0,255,0.5)';
      // context.fillRect(30,30,50,50);

      // 边框
      // context.lineWidth = 3; // 线宽
      // context.lineCap = 'round'; // 边框圆角
      // context.strokeStyle = '#ff0000';
      // context.strokeRect(10,10,50,50);

      // context.strokeStyle = 'rgba(0,0,255,0.5)';
      // context.strokeRect(30,30,50,50);
      
      // 清除一部分canvas
      // context.clearRect(40,40,10,10);


      // 绘制路径
      // 用beginPath开始绘画,
      // arc来画圆 五个参数 圆心x,y, 半径,初始角度,最终角度, 是否逆时针
      // stroke确认绘画
      // 开始路径
      context.beginPath();

      // 绘制外圈
      context.arc(100, 100, 99, 0, 2 * Math.PI, false);

      // 绘制内圈
      context.moveTo(194, 100);
      context.arc(100, 100, 94, 0, 2 * Math.PI, false);

      // 绘制分针
      context.moveTo(100, 100);
      context.lineTo(100, 15);

      context.moveTo(100, 100);
      context.lineTo(35, 120);

      // 描边路径
      context.stroke();

      // 创建一个和canvas一样的img
      // 取出图像的数据URI
      // var imgURI = drawing.toDataURL("image/png");
      // // 显示图像
      // var img = document.createElement('img');;
      // img.src = imgURI;
      // document.body.appendChild(img);
      

      // copy 页面上的image到画布上
      var image = document.images[0];
      // drawImage 3个参数 imageNode, 画布x, 画布y
      // drawImage 5个参数 imageNode, 画布x, 画布y, Width, Height
      // drawImage 9个参数 imageNode, 原图x, 原图y, 原图Width, 原图Height, 目标x, 目标y, 目标Width, 目标Height
      context.drawImage(image, 10, 10);
      // 模式
      // 第二个参数为 是否重复
      var pattern = context.createPattern(image, 'repeat');
      context.fillStyle = pattern;
      context.fillRect(10, 10, 150, 150)

      // 阴影
      context.shadowOffsetX = 5; // x偏移
      context.shadowOffsetY = 5; // y偏移
      context.shadowBlur = 4;    // 模糊度
      context.shadowColor = 'rgba(0,0,0, 0.5)'; // 颜色

      // 渐变色
      // createLinearGradient矩形 xBegin,yBegin, xEnd, yEnd
      // var gradient = context.createLinearGradient(30, 30, 70, 70);
      // 圆形 beginX,beginY, beginR, endX,endY, endR
      var gradient = context.createLinearGradient(55, 55, 10, 55, 55, 30);
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(1, 'black');
      context.fillStyle = gradient;
      context.fillRect(30,30,50,50); // 位置会取 gradient里面的部分位置


      // 模式
      var
    }
  </script>
</body>
</html>
```

## api
fill()
fillRect()

## 伪缩放
固定canvas的style里面的width和height,通过改变 canvas自身的width和height来实现看起来缩放的效果.

因为style的width和height为真实展示的宽高,而自身的width和height为绘画时候的宽高,如果自身width为style-width的2倍,则画出来的图形为原来的1/2.从而实现缩放.

## 说明
canvas是基于状态进行绘制的.