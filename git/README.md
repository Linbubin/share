# git与github的使用



## git (分布式版本控制系统)
>Git是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理. Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件.
>三个区域：工作区，暂存区，本地仓库(当前分支)。
> git 命令 --help 直接跳转页面，有详细介绍。

### git下载
[点击下载](https://git-scm.com/downloads)

### 配置本机git
```
git config --global user.name "Firstname Lastname"
git config --global user.email "your_email@example.com"

// 删除配置
git config --global --unset user.name
```
### 创建一个仓库
执行`git init` ,就会生成一个.git的隐藏文件夹

### git基础使用
1. status add commit
```
echo "look me" > README.md
git status
git add README.md
git commit -m "add README.md"
```

2. diff
```
git diff                                // 查看暂存区和工作区的差异
git diff filename                       // 查看指定文件的差异
git diff HEAD                           // 当前文件和最近一次提交的差异
git diff --cached                       // 暂存区和HEAD的比较
git diff commit_id1 commit_id2 filename // 比较 id1提交和id2提交中 filename的差异
```

3. log
```
git log // 查看所有正常的提交
git log filename // 查看该文件涉及哪几次提交
git log -p filename // 查看涉及的提交以及具体的修改情况
git shortlog // 查看短消息
git reflog // 查看所有提交,可以增加--relative-date参数来查看相对现在日期显示
```

4. show
```
git show commit_id 查看某次提交的详细信息
git show --stat commit_id 查看某次提交修改文件的列表
```

5. checkout
```
git checkout -- filename // 回到上次commit或回到add之前
git checkout 分支 // 切换分支
```

### 分支
> 类似于平行宇宙，互不干扰，但是可以通过某种力量(git)，让他们互相影响。
1. 查看分支 `git branch`
2. 创建分支 `git branch feature-A  xxx(commit_id 或 branch ,不填就是 当前branch)`
3. 切换分支 `git checkout feature-A`
4. 2+3 => `git checkout -b feature-A`
5. 切换到上一分支 `git checkout -`
6. 合并 `merge` 合并所有的信息 --squash 将分支所有信息合成一个commit(也可以用 --no-ff 只生成一条记录-可以提供给懒得管理分支上提交信息的家伙使用,但是要确保一次大改动就要提交一次)

### 稍微深入
1. commit log
```
git commit  // 1简写,2空,3详
git log --pretty=short // --pretty后面参数很多
git log --pretty=format:"%cn committed %h on %cd" // 将输出转成 名字 + hash + 时间,也可以自定义

git log
--author=linbin
--pretty=format:"%cn committed %h on %cd" 
--after="2018-5-1"
--before="2018-6-1" // 还可以根据时间、姓名来进行筛选

git commit --amend // 修改提交资料

git commit --amend --no-edit     // 代替 git rebase -i HEAD~2

git commit -am "xxx" //git add + commit 但是只会add 工作区的，新增的不会影响
```
2. diff 差异比较

```
分支比较：如果不填写分支，则默认为 当前分支的最新一次提交
git diff 分支A 分支B // 查看两个分支的差异
git diff 分支A 分支B filename // 查看两个分支 文件的差异
```

```
同一分支不同提交比较： 如果不填写哈希值，则默认为最新一次提交
git diff commit_id //查看某次提交 与本次的差异 HEAD为本次提交 -> git diff commit_id HEAD
```

3. rebase 合并提交
```
git rebase -i HEAD~2 // 合并log最上面的2个  rebase要选择待变更的父亲commit_id
```

4. reset 版本回退(当前为 HEAD)
* soft 这个只是把 HEAD 指向的 commit 恢复到你指定的 commit，暂存区 工作区不变
* hard 这个是 把 HEAD，暂存区，工作区 都修改为 你指定的 commit 的时候的文件状态
* mixed 这个是不加时候的默认参数，把 HEAD，暂存区 修改为 你指定的 commit 的时候的文件状态，工作区保持不变

```
git reset HEAD                    // 丢弃暂存区中所有文件, 看起来像是把文件从暂存区移动到了工作区
git reset commit_id               //可以回退到commit前，修改后    
git reset HEAD~                   //回退到commit之前  修改之后
git reset --hard commit_id        //退到上次提交后的状态
git reset commit_id filename      //将文件回退到commit_id, 如果commit_id为HEAD将文件从暂存区返回到工作区
```
5. filter-branch 修改筛选匹配修改
之前由于提交的时候，用户名和邮箱忘记修改，导致显示的问题。如下
![名称和邮箱写错](https://github.com/Linbubin/share/blob/master/git/email&name-problem.png)
```
git filter-branch -f --env-filter \
"GIT_AUTHOR_NAME='Newname'; GIT_AUTHOR_EMAIL='newemail'; \
GIT_COMMITTER_NAME='committed-name'; GIT_COMMITTER_EMAIL='committed-email';" HEAD
```
HEAD可以替换成 HEAD~3...HEAD 这样就可以指定哪几次提交替换。 否则默认为从头到HEAD,即全部提交。

6. push覆盖远程分支
```
git push origin master --force    ！！！慎重
```

7. 通过commit提交的信息来查找某次提交的hash
```
比如要查找带有 iconfont提交信息的某次提交
git log --grep=iconfont
```

8. clean 来删除从来没有add的文件
```js
# 编辑了一些文件
# 新增了一些文件
# 『糟糕』

# 将跟踪的文件回滚回去
git reset --hard

# 移除未跟踪的文件
git clean -df
```

9. git log 额外参数
```
// 展示内容
oneline  展示单行信息
p        文件具体改动
stat     文件行数差异
graph    绘制的分支结构图
pretty=format:"%cn committed %h on %cd" 自定义展示结构

// 筛选
-n                    n为数量,展示最近n条
--after="yesterday"   yesterday可以改为具体日期
--before="yesterday"
--author="John"       作者信息
--grep="JRA-224:"     提交信息
-S "Hello, World!"    按代码内容
master..feature       在feature分支,而不在master分支
--no-merges           合并信息排除
--merges              只看合并信息
```

10. 生成远程仓库

git init --bare

11. 回退某次修改 -- revert
> git 会新增一次提交记录来表示回退以后的结果

git revert commit_id // 不冲突的话可以回退,否则改起来太麻烦了

12. 指向远程url -- remote
```
git remote -v  // 查看所有远程url
git remote add <name> <url>
git remote rm <name>
git remote rename <old-name> <new-name>
```

13. 拉取远程代码 -- fetch
```
git fetch <remote> // 拉取远程分支到本地 用git branch -r查看
// fetch + merge = pull
```

14. 临时储存 -- stash
```
git stash                  // 将当前工作区的状态 存到 临时区(暂存区会被丢弃)
git stash list             // 查看临时储存列表
git stash pop   stash@{xx} // 将临时储存里面的数据拿出来,并删除对应序号
git stash apply stash@{xx} // 将临时储存里面的数据拿出来
```

15. 查看某个文件的具体某行代码更改历史
```
查看src/apps/new.determine/util.js文件 195-213行的更改历史
git blame -L 195,213 src/apps/new.determine/util.js
```

16. 其他

还有涉及到git钩子以及提交引用等内容不好描述,就没做整理,具体可以自行查看[这里](https://github.com/geeeeeeeeek/git-recipes/blob/master/sources/5.4-Git%E9%92%A9%E5%AD%90.md?1545892075837)


### 建议
1. 每次提交前,diff自己的代码，以免提交错误代码
2. 下班前整理好自己的工作区(git commit)
3. 并行项目使用分支开发
4. 遇到冲突时，搞明白冲突的原因，不要随意丢弃别人的代码

## 工作流程 gitflow
![gitflow](https://github.com/Linbubin/share/blob/master/git/gitflow.png)
1. master 分支
也就是我们经常使用的Master分支，这个分支最近发布到生产环境的代码，最近发布的Release， 这个分支只能从其他分支合并，不能在这个分支直接修改

2. Develop 分支
这个分支是我们是我们的主开发分支，包含所有要发布到下一个Release的代码，这个主要合并与其他分支，比如Feature分支

3. Feature 分支
这个分支主要是用来开发一个新的功能，一旦开发完成，我们合并回Develop分支进入下一个Release

4. Release分支
当你需要一个发布一个新Release的时候，我们基于Develop分支创建一个Release分支，完成Release后，我们合并到Master和Develop分支

5. Hotfix分支
当我们在master发现新的Bug时候，我们需要创建一个Hotfix, 完成Hotfix后，我们合并回Master和Develop分支，所以Hotfix的改动会进入下一个Release

> [阿里的代码分支管理](http://mp.weixin.qq.com/s?__biz=MjM5MDE0Mjc4MA==&mid=2651006565&idx=1&sn=9a1e9bc53def6eeb9637d79719628d3b&chksm=bdbede368ac95720cec02ced13525c75c335b49b3e9a96c0f3233194734b4ff8b5b88e36933e&mpshare=1&scene=23&srcid=033075AAhgIuHBxF3wgEmic6#rd)

## github
### 连接github
1. 创建密钥`ssh-keygen -t rsa -C "your_eamil@example.com"`
2. 将`id_rsa.pub` 填入 github中, 路径为
```
widows C:\Users\Administrator\.ssh
linux  ~/.ssh/id_rea.pub
```
3. 测试能否连接github `ssh -T git@github.com`


4. 图解
首页：
![首页](https://github.com/Linbubin/share/blob/master/git/home.png)

个人页：
![个人页](https://github.com/Linbubin/share/blob/master/git/self.png)

5. 比较差异
[1.11.5-2.2.1](https://github.com/ant-design/ant-design/compare/1.11.5...2.2.1)
`https://github.com/ant-design/ant-design/compare/1.11.5...2.2.1`

查看日期也可以`https://github.com/ant-design/ant-design/compare/master@{7.day.ago}...master`

### 推荐star
1. [冴羽博客](https://github.com/mqyqingfeng/Blog)
2. [微醺岁月博客](https://github.com/jawil/blog)
3. [宋邵茵 Cam Song](https://github.com/camsong)
4. [张云龙 前端农民工](https://github.com/fouber)
5. [技术面试需要掌握的基础知识整理](https://github.com/CyC2018/Interview-Notebook)
6. [前端面试及答案](https://github.com/qiu-deqing/FE-interview)

### 补充
1. git commit 的 message 编写

应当在每次提交时,一句简写 + 完成的功能详细描述
```
 Change the message displayed by hello.py

- Update the sayHello() function to output the user's name
- Change the sayGoodbye() function to a friendlier message
```

2. reset 和 checkout 在文件层面的改变

reset  缓存区 -> 工作区
checkout 工作区 -> head
git checkout commit_id filename // 将commit_id的filename文件add到暂存区

3. git status时中文乱码问题
> core.quotepath设为false的话，就不会对0x80以上的字符进行quote。中文显示正常。

`git config --global core.quotepath false`

4. git 三个作用域
```
git config --list --local
git config --list --global
git config --list --system
```

5. git add -u  将更新的文件 添加到暂存区

6. 重命名文件
`git mv filename filerename`

7. git 三大类型
> 使用 git cat-file 来查看, -p 查看详情  -t 查看类型
* 对象
* tree
* blob

对象里包含了tree, tree类似文件夹,blob就是文件.
```
$ git cat-file -p 76fc6
tree 87bca14aabfd74423701d9c93a80eb5ef29db3ca
parent 1be81461c00388e167154f4b8d99b080ddda41fd
author wuqiu <289873007@qq.com> 1566203085 +0800
committer wuqiu <289873007@qq.com> 1566203085 +0800

add a.txt

$ git cat-file -p 87bca14aabfd74423701d9c93a80eb5ef29db3ca
040000 tree 4b078ee5433833a3b75f2dc6a9f2dd8ee52acf5f    style
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391    xx.html

$ git cat-file -p 4b078ee5433833a3b75f2dc6a9f2dd8ee52acf5f
100644 blob d65efe90283f1acc4916c889b65514fbd54b89a1    a.txt
```

8. 分离头指针
> git checkout commit_id

由于在切换回分支的时候会被删除,所以要注意保存.
可以用来做测试的时候，如果不好就直接切换回分支,丢弃修改.

9. rebase
```
* p, pick <commit> = use commit
* r, reword <commit> = use commit, but edit the commit message
* e, edit <commit> = use commit, but stop for amending
* s, squash <commit> = use commit, but meld into previous commit
* f, fixup <commit> = like "squash", but discard this commit's log message
* x, exec <command> = run command (the rest of the line) using shell
* b, break = stop here (continue rebase later with 'git rebase --continue')
* d, drop <commit> = remove commit
* l, label <label> = label current HEAD with a name
* t, reset <label> = reset HEAD to a label
* m, merge [-C <commit> | -c <commit>] <label> [* <oneline>]
* .       create a merge commit using the original merge commit's
* .       message (or the oneline, if no original merge commit was
* .       specified). Use -c <commit> to reword the commit message.
```

修改以前的commit,`git rebase -i commit_pre_id`,其他都选择`pick`,要改的使用 `r`

10. 删除文件
git rm filename

11. git忽略文件
* doc/ 忽略名为doc文件夹
* doc  忽略名为doc文件和文件夹
* 忽略doc文件但不忽略doc文件夹(由于doc文件和doc文件夹不可能存在同一目录，假设doc文件在xx目录下)
```
doc
!xx/doc
```

12. ^ ~的区别
* ^ 是 父级  ^2 第二个父级
* ~ 是 父级的次方  ~2 第一个父级的父级 === ^^

13. 出现冲突时，如果想放弃修改,怎么回退到冲突发生之前的状态
* `git merge --abort` 恢复到合并之前状态

14. 禁止向远程 `push -f` 以及修改历史commit操作

15. github 搜索
* xxx xx in:filename(`git study in:readme`) 在filename文件里面搜索xxx xx关键字
* stars:>1000 大于1000星

16. 删除git中的大文件
* 先找到那个大文件的路径(曾经存在的路径)  `xxxxx.zip`
* 利用filter-branch重写提交记录,和git rm删除git中的文件 `git filter-branch --force --index-filter 'git rm -rf --cached --ignore-unmatch xxxxx.zip' --prune-empty --tag-name-filter cat -- --all`
* 清除缓存
```
rm -rf .git/refs/original/

git reflog expire --expire=now --all

git gc --prune=now
```