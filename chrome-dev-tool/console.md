# console界面

## console的方法
由图可以看到 console有好多好多的方法，在这里简单介绍一下， 然后挑几个重点讲解

1、console.log 用于输出普通信息

2、console.info 用于输出提示性信息

3、console.error用于输出错误信息

4、console.warn用于输出警示信息

5、console.group输出一组信息的开头

6、console.groupEnd结束一组输出信息
看你需求选择不同的输出方法来使用，如果上述四个方法再配合group和groupEnd方法来一起使用就可以输入各种各样的不同形式的输出信息。

7、console.assert对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台

8、console.count（这个方法非常实用哦）当你想统计代码被执行的次数

9、console.dir(这个方法是我经常使用的 可不知道比for in方便了多少) 直接将该DOM结点以DOM树的结构进行输出，可以详细查对象的方法发展等等

10、console.time 计时开始

11、console.timeEnd  计时结束

12、console.profile和console.profileEnd配合一起使用来查看CPU使用相关信息
可以在Profiles中查看具体信息

13、console.timeLine和console.timeLineEnd配合一起记录一段时间轴

14、console.trace  堆栈跟踪相关的调试

15、console.table 以table形式打印对象的key和value

上述方法只是我个人理解罢了。如果想查看具体API，可以上官方看看，具体地址为：https://developer.chrome.com/devtools/docs/console-api

## 快捷键
1、方向键盘的上下键，大家一用就知晓。比如用上键就相当于使用上次在控制台的输入符号

2、$_命令返回最近一次表达式_执行的结果_，功能跟按向上的方向键再回车是一样的

3. $0 - $4表示 审查元素后最近点击的5个元素，不够5个就返回undefined

3、Chrome 控制台中原生支持类jQuery的选择器，也就是说你可以用$加上熟悉的css选择器来选择DOM节点

4、copy通过此命令可以将在控制台获取到的内容复制到剪贴板。 这个方法很恐怖，可以把该网页的console出来的代码，右键储存，然后copy 就能够粘贴到别的网站了

5、keys和values 前者返回传入对象所有属性名组成的数据，后者返回所有属性值组成的数组. 和console.table有异曲同工的感觉
```js
const obj = {a:1,b:2,c:3,d:'zzz'}
keys(obj); // ["a", "b", "c", "d"]
values(obj); // [1, 2, 3, "zzz"]
```

6、monitor & unmonitor 监控function传入的参数
```js
function test(xxx){}
monitor(test);
test(123)// function test called with arguments: 123
test(222)// function test called with arguments: 222
test(2)// function test called with arguments: 2
unmonitor(test);
test(4321)
```