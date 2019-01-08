# 记录下今天在云主机安装postgres和react项目跑成功的思路

_因为在现在公司做的是内部管理系统，到时候无法呈现给外面看，所以就想着把他搬到云主机上。 当然代码什么的 都build过了。所以问题不大。_

## 安装postgresql 并配置
> 主要是讲下如何在linux下安装postgresql和将本地的sql文件执行，并js连接上
### 安装
1. 先到[官网](https://www.postgresql.org/download/linux/redhat/)选择对应的版本,他会提供对应的下载url
2. 将1中的url复制，然后跟着官网，把下面的命令都输一次(有些估计是不用输的，但是没那么多讲究，复制就完了)
```
yum install https://download.postgresql.org/pub/repos/yum/9.6/redhat/rhel-7-x86_64/pgdg-centos96-9.6-3.noarch.rpm

yum install postgresql96

yum install postgresql96-server

/usr/pgsql-9.6/bin/postgresql96-setup initdb

systemctl enable postgresql-9.6

systemctl start postgresql-9.6
```
3. 好了，将2中命令都完美执行，就算安装完成了

### 配置postgresql
> 因为默认给的postgres 用代码就是连接不上，所以自己配置一个root用户(名字叫什么都ok)
执行命令
```
su - postgres
```
--- 这里会切换到另个用户
提示如下`-bash-4.2$ `,输入 `psql`,就进入了postgresql数据库中提示如下`postgres=#`, 输入以下命令
```
\du
```
查看当前有什么用户,按理来说第一次只有一个postgres,我们来创建一个root用户
```
create user root with superuser;
```
`superuser`就是说有 增删改查 权限的用户<br>
然后创建一个数据库用来存放我的sql数据
```
CREATE DATABASE kss;
```
下面导入我们的sql, 先执行 `\q`退出数据库
然后输入 `pwd`看下当前的位置(因为切换了用户，他去了postgres相关的位置)<br>
我这里输出了`/var/lib/pgsql`, 我们用scp把本地的sql语句拷到远程(如果是当前机子的话 可以跳过)
```
scp -r xxx.sql user_name@ip_name:/var/lib/pgsql
```
这样，远程的当前目录就有了一个叫做`xxx.sql`的文件,我们执行
```
psql kss < xxx.sql
```
这样我们的sql就完全导入了

### 测试连接
> 我使用的node-postgresql， 即  `npm install pg`
```js
const { Client, Pool } = require('pg')

const pool = new Client({
  user: 'root',
  password: '1234',
  host: '/var/run/postgresql',
  database: 'ui001',
  port: 5432,
})

pool.connect((a,b) => {
  console.log(a,b)
})

console.log('aaaaaaaaaaaaaa');
pool.query('select * from table_name', (err, results)=>{
	console.log(err, results);
})
// 测试下是不是 console出了数据，如果有，那就完成了
```

## react项目打包
> 基本就是 本地build，然后用scp移到服务器上。 最后使用 `./cmd.sh start`就起来了  没什么黑科技，这里就不展开介绍了。



项目地址: http://118.24.153.145:8999/  