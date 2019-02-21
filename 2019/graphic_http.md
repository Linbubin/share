# 图解http读书记录

## 客户端
> 通过发送请求获取服务器资源的web浏览器等,称为客户端(client).

## TCP/IP
> 把互联网相关联的协议集合起来总称为TPC/IP.(比如电缆规格、IP地址的选定、寻找异地用户的方法、双方建立通信的顺序)<br>
> TCP/IP协议族按层次分别分为以下4层:
> * 应用层(HTTP, FTP, DNS)
> * 传输层(TPC)
> * 网络层(IP)
> * 数据链路层(处理网卡、光纤等硬件范畴)

TPC/IP协议族进行网络通信时,发送端从应用层往下走,接收端从链路层往上走.
> 拿HTTP举例说明,首先作为发送端的客户端在应用层(HTTP协议)发出一个想看某个Web页面的HTTP请求.<br>
> 为了传输方便,在传输层(TCP协议)会将应用层接收到的数据(HTTP请求报文)进行分割,并在各个报文上打上标记序号及端口号后转发给网络层.<br>
> 在网络层(IP协议),增加作为通信目的地的MAC地址后转发给链路层.<br>
> 接收端在链路层收到数据,按序往上层发送,一直到应用层.当传送到应用层,才能算真正接收到由客户端发送过来的HTTP请求.

封装过程
* 应用层 HTTP报文拿到HTTP数据
* 传输层 TCP报文段给HTTP数据套上 TCP首部
* 网络层 IP数据包给传输层的数据套上 IP首部
* 链路层 网络架构给网络层数据套上 以太网首部
* 反过来,从下到上,会依次拿掉首部,从而得到HTTP数据

### TCP
> TCP位于传输层,将大块数据分割以报文段为单位的数据包进行管理.<br>
> TCP协议为了更容易传送大数据才把数据分割,而且TCP协议能够确认数据最终是否送达到对方.
#### 三次握手
> TCP为了准确将数据送达目标处,采用`三次握手`策略
> 1. 发送端 SYN标记数据包 -> 接收端
> 2. 接收端 SYN/ACK数据包 -> 发送端
> 3. 发送端 ACK标记数据包 -> 接收端

### 各协议和HTTP协议的关系
客户端访问wuqiu.xyz服务器
1. 向DNS拿到IP地址
2. HTTP协议生成针对目标Web服务器的HTTP请求报文
3. TCP协议将HTTP请求报文分割成报文段
4. IP协议将报文段送到指定IP地址的位置
5. TCP将报文段按序号重组请求报文
6. HTTP协议对Web服务器请求的内容进行处理
7. 请求结果按TCP/IP通信协议向用户进行回传

## URI和URL
> URI就是由某个协议方案(HTTP,FTP,FILE)表示的定位标识符.
> URI用字符串标识某一互联网资源,而URL表示资源的地点.可见URL是URI的子集

个人认为是URI有很多协议,而URL只是HTTP协议.

绝对URI格式

http://user:pass@www.wuqiu.xyz:80/index.html?uid=1#ch1
* http:// 为协议方案名
* user:pass 登录信息
* www.wuqiu.xyz 服务器地址
* 80 服务器端口号
* index.html 带层次的文件路径
* uid=1 查询字符串
* ch1片段标识符

# 名词
* FTP File Transfer Protocol 文件传输协议
* DNS Domain Name System 域名系统
* TPC Transmission Control Protocol 传输控制协议
* IP Internet Protocol 网络协议
* UDP User Data Protocol 用户数据报协议
* ARP Address Resolution Protocol 根据IP地址反查MAC地址的协议
* URI Uniform Resource Identifier 统一资源标识符