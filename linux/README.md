查看文件
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