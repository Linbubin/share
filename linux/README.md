# 查看文件
1. 查看全文 cat filename
2. 查看头10行  head -10 filename
3. 查看尾10行  tail -10 filename
4. 查看第3-10行 sed -n '3,10p' filename
5. 倒序输出 tac filename
6. 一页一页的查看 less filename
7. 查看实时刷新的log文件 tail -f filename
8. 查看进程序列号 ps axu|grep node
9. 免密登录 ssh-copy-id -i ~/.ssh/id_rsa.pub user@ip    下次直接 ssh user@ip 即可
10. 输出带xx字符的一行 grep 'xx' xx.js
11. 查看进程 ps -ef | grep node
12. 查看进程占有的端口 netstat -nap | grep 进程id
13. 查看进程 ps -ef | grep port  显示该port下启动文件位置

# 免密登录
> 本机A 免密登录 远程机子 IP：11.0.11.222 B

A执行
```
1. 创建密钥`ssh-keygen -t rsa -C "your_eamil@example.com"`
2. 路径为
```
widows C:\Users\Administrator\.ssh
linux  ~/.ssh/id_rea.pub
```
```
将id_rea.pub写到`B`机子的`~/.ssh/authorized_keys`里面
然后 `ssh root@11.0.11.222` 即可

# 命名快捷命令 alias
alias untar='tar -zxvf ' 将 tar -zcvf 变成快捷 untar

alias -p 查看所有

永久化: 修改 ~/.bashrc, 保存后运行 source ~/.bashrc