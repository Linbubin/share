## html
1. h1 标题 h2 副标题 p段落 <!-- 注释 -->

## bootstrap
1. img-responsive 照片根据设备自适应
2. col-xx-x  xx为md xs等，x为1-12， 最外层需要套一个 class="row"
3. btn-primary btn-danger 前提都加btn
4. text-primary
5. <i class="fa fa-thumbs-up"></i>

## jq
1. $(document).ready(function(){})
2. $("button").addClass('animated bounce'); $(".well")   $("#target3")
3. $("button").removeClass("btn-default")
4. $("#target1").css("color", "blue");
5. $("#target1").prop("disabled", true);
6. $("#target4").text("<em>#target4</em>") 只替换文本   $("#target4").html("<em>#target4</em>") 元素就会展示为元素
7. $("#target4").remove() 移除
8. $("#target2").appendTo("#right-well") 从原位置移动到 #right-well内最下面
9. $("#target5").clone().appendTo("#left-well"); 原位置不变，且复制一遍到 指定位置
10. $("#target1").parent().css("background-color", "red") 操作对应父级
11. $("#right-well").children().css("color", "orange") 操作所有子集
12. $(".target:nth-child(2)").addClass("animated bounce") //??? 从1开始 可以选择两边的
13. $(".target:even").addClass("animated shake"); even 第1,3,5 odd 第2,4,6

## js
1. 一个字符串中 又有单又有双引号，用反斜杠来 "我是双\", 我是单'"
2. \'	单引号  \"	双引号  \\	反斜杠符  \n	换行符  \r	回车符  \t	制表符  \b	退格符  \f	换页符
3. 正则：var expression = /and/gi; var andCount = testString.match(expression); g为全局，否则默认匹配第一个， i 为 忽略大小写
4. 正则: var expression = /\d+/g; \d为 数字， +为多个数字， g为匹配多个
5. 我们也可以使用正则表达式选择器 \s 来选择一个字符串中的空白。空白字符有 " " (空格符)、\r (回车符)、\n (换行符)、\t (制表符) 和 \f (换页符)。
6. \s为 空格，包括5中所有。 \S 除了空白以外的。 \w匹配[0-9a-zA-Z], \W 匹配出\w以外所有
7. 正则表达式 不写 +，都是匹配一个！
8. 正则 /[.|,|!]/g  []中 用|隔开， 或 关系。 也可以不隔开，直接用[.,!]、
9. 正则 str.replace(/([A-Z])/g,' $1').replace(/_/g,' ').replace(/^\s/, '').replace(/\s+/g,'-')  =======> $1 指前面第一个()中取到的值,/^\s/ 指 全文最开头出现的\s, \s+ 指 1个或多个空格
10. str.substr(a,b)   a为start数，可以传入负数， 则表示为 str.length + (a).  b为截取长度. 如果 大于 str.length,则取到str最后一位
11. str.repeat(num) 返回 重复 num次的str;  'a'.repeat(3) => 'aaa'
12. /[a-z]/.test('a') -> true, 正则判断 后面是否完全符合前面,用于判断大小写之类的
13. Object.keys(obj) -> [key1, key2 ...] 获取obj中所有的key,并组装成一个arr


### 坑
1. 数组中 多数字求最小公倍数