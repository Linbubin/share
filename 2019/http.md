# [code](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
> [测试用例](https://gitee.com/self-practice/http-study)
* 2XX
  * 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
  * 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
  * 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
  * 204 NO CONTENT - 当网站测试时,favicon.ico未设置时可以返回(如果是已经设置了favicon.ico则需要返回200), 可以在restfulApi的DELETE请求中表示用户删除数据成功。
  * 206 Partial Content 部分资源请求 - 可以用`curl`来模拟`curl -Ir 0-110 http://localhost:9527/README.md`
* 3XX
  * 301 Moved Permanently 永久重定向  服务器设置301以后,浏览器直接去读Location的值,并直接重定向,下次访问时就直接从缓存中读出需要重定向的页面,不走服务器过.
  * 302 Found 临时重定向  临时重定向到Location的页面,在下次访问时会再次访问服务器,根据服务器的指示进行下一步操作.
  * 303 See Other 和 `302`类似.但是明确了用get方法去请求重定向的页面. 一般用于post提交表单,返回303浏览器自动用get重定向到新的页面
  * 304 Not Modified 资源未更新 和其他30X不同，这个代表的是服务器根据header中的`If-Match If-Modified-Since` `Etag If-None-Match`(这两组信息中任意一组即可,前提都需要设置Cache-Control)等信息,判断出文件并未修改,所以返回给浏览器,让浏览器直接去缓存中找。
* 4XX
  * 400 Bad Request - http报文中存在服务端不懂的地方,所以返回200, restfulApi的POST/PUT/PATCH方法,用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
  * 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
  * 403 Forbidden - 虽然已经绕过401的授权问题,但是我就不想给你这个资源，一般会带上不给的原因,如果不带原因,就用404.[*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
  * 404 NOT FOUND - 确实没有找到相应资源,或者我不给你 但是我不想说明原因时使用.[*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
  * 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。 类似永久重定向.
* 5XX
  * 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

# http-headers
* Content-Type    MIME type
```
text/plain
text/html
text/css
image/jpeg
image/png
image/svg+xml
audio/mp4
video/mp4
application/javascript
application/pdf
application/zip
application/atom+xml
```

* Content-Encoding   Accept-Encoding
```
gzip
```

* Connection
```
keep-alive
close
```

* 

* Content-Length  内容长度  `Content-Range: bytes 0-110/970` 206code码可以查看
```
# 因此，1.1版规定可以不使用Content-Length字段，而使用"分块传输编码"（chunked transfer encoding）。只要请求或回应的头信息有Transfer-Encoding字段，就表明回应将由数量未定的数据块组成。

Transfer-Encoding: chunked
```

# 发送方式
GET
POST
PUT
DELETE
OPTIONS
HEAD

# 优化
虽然1.1版允许复用TCP连接，但是同一个TCP连接里面，所有的数据通信是按次序进行的。服务器只有处理完一个回应，才会进行下一个回应。要是前面的回应特别慢，后面就会有许多请求排队等着。这称为"队头堵塞"（Head-of-line blocking）。  
为了避免这个问题，只有两种方法：一是减少请求数，二是同时多开持久连接。这导致了很多的网页优化技巧，比如合并脚本和样式表、将图片嵌入CSS代码、域名分片（domain sharding）等等。如果HTTP协议设计得更好一些，这些额外的工作是可以避免的。

# 三次握手

# NOTE
1. 服务器推送
```
HTTP/2 允许服务器未经请求，主动向客户端发送资源，这叫做服务器推送（server push）。

常见场景是客户端请求一个网页，这个网页里面包含很多静态资源。正常情况下，客户端必须收到网页后，解析HTML源码，发现有静态资源，再发出静态资源请求。其实，服务器可以预期到客户端请求网页后，很可能会再请求静态资源，所以就主动把这些静态资源随着网页一起发给客户端了。
```

2. 浏览器url到加载
  * 判断缓存
    * 是否有301的跳转,有的话就直接跳转
    * 是否有缓存的文件数据
  * DNS查找
  * TCP连接
  * Request发送请求
  * 接收响应

3. 三次握手

三次握手是为了规避由于网络延迟等 带来的性能浪费的问题:  
客户端先发送`SYN=1, Seq=x`给服务端  `SYN=1说明SYN占第一个标志位[SYN]`
服务端发送`SYN=1,ACK=X+1,Seq=Y`给客户端 `[SYN, ACK]`  说明双方是可以通信的，并不存在网络断开的问题  
客户端带`ACK=Y+1，Seq=Z(上一次的ACK值)`给服务端 `[ACK]` 说明自己准备发送了

4. 跨域
当请求不同URI时,浏览器由于安全机制,会将结果给屏蔽,并增加跨域的错误提示.
解决方案:
* nginx 跨域代理
* JsonP 简单请求
* 服务端增加 `Access-Control-Allow`开头的http头,比如`Access-Control-Allow-Origin` `Access-Control-Allow-Headers` `Access-Control-Allow-Max-Age`

# HTTPS   strict http 严格的http
HTTP耗时 = TCP握手

HTTPs耗时 = TCP握手 + SSL握手

# 状态码解析

## 204
不进行页面跳转时可以使用这个code
> 假设页面上有个form，提交的url为http-204.htm，提交form，正常情况下，页面会跳转到http-204.htm，但是如果http-204.htm的相应的状态码是204，此时页面就不会发生转跳，还是停留在当前页面。另外对于a标签，如果链接的页面响应码为204，页面也不会发生跳转。

可以对一些特殊数据 比如 `/favicon.ico`请求设置,或者对不需要跳转的form提交设置返回码为204