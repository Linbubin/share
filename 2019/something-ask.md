# 简述 `<script>` 标签中的 defer 和 async 属性
都需要有src属性才能执行

defer是先下载,dom加载完再执行,有顺序. 所以放在body中的script不如移到header中,加defer属性,可以优先下载

async是先下载,下载完后-停止dom的加载,先执行,执行完继续加载dom,先下载完先执行,没顺序

# XHTML 和 HTML有什么不同
XHTML更严格
XHTML 元素必须被关闭
XHTML 标签名必须使用小写字母
XHTML 文档必须拥有根元素
XHTML 中特殊字符必须转译

# `rel="noopener"` 应在什么场景下使用，为什么？
```html
<a target="_blank" rel="noopener" href="xxxx">新开一个页面</a>
```
如果不加`rel="noopener"`,另一个页面可以使用`window.opener.location = newURL`来操纵当前页

或者用js打开页面时,可以将其设为null
```js
var hacpaiWindow = window.open('xxxx');
hacpaiWindow.opener = null;
```

# sessionStorage
关闭标签就会丢失,但是 从历史纪录中打开,还在, 关了浏览器就没了

# MIME type
回答
MIME 是多用途 Internet 邮件扩展（Multi-purpose Internet Mail Extensions）的首字母缩写。 他使用标准化的方式来表示网络之间传输的文档类型及格式。完整格式可查看 Media Types。

加分回答
MIME type 由两部分组成：斜杠（/）分隔的类型和子类型，中间无空格。例如：Microsoft Word 文件的 MIME type 是 application/msword，即类型是 application，子类型是 msword。
浏览器通常使用 MIME type 替代文件扩展名来确定文档类型，因此服务器在响应头中设置正确的 MIME type 是非常重要的。
MIME type 对大小写不敏感，但是一般都使用小写。
对于 text 类型若没有指定其子类型就使用 text/plain；对于二进制文件没有指定其子类型就使用 application/octet-stream。
所有的 text/*script* 类型已被废弃。
当 MIME type 缺失或错误时，浏览器可能会查看资源以确定文件类型。我们可以通过设置 X-Content-Type-Options 为 nosniff 来阻止浏览器对 MIME type 的嗅探。
不同类型的文件可以通过查看二进制来判断其类型，但并非所有文件都如此。如：PNG 文件头标识 (8 bytes)   89 50 4E 47 0D 0A 1A 0A；GIF 文件头标识 (6 bytes)   47 49 46 38 39(37) 61。

