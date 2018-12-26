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
git diff  // 查看所有文件的差异
git diff filename // 查看指定文件的差异
```

3. log
```
git log // 查看所有正常的提交 reflog
git log filename // 查看该文件涉及哪几次提交
git log -p filename // 查看涉及的提交以及具体的修改情况
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
2. 创建分支 `git branch feature-A`
3. 切换分支 `git checkout feature-A`
4. 2+3 => `git checkout -b feature-A`
5. 切换到上一分支 `git checkout -`
6. 合并 `merge` 合并所有的信息 --squash 将分支所有信息合成一个commit

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
git rebase -i HEAD~2 // 合并log最上面的2个
```

4. reset 版本回退(当前为 HEAD,上一次为HEAD^,上两次HEAD^^或HEAD~2)
```
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
git push origin master --force
```

7. 通过commit提交的信息来查找某次提交的hash
```
比如要查找带有 iconfont提交信息的某次提交
git log --grep=iconfont
```

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


 -p 啥意思



git commit 的 message 编写

 Change the message displayed by hello.py

- Update the sayHello() function to output the user's name
- Change the sayGoodbye() function to a friendlier message


git log --oneline

git checkout commit_id filename 将commit_id的filename文件add到暂存区

git revert 最优解
> revert 不冲突的话可以回退,否则改起来太麻烦了

确保 reset只在本地使用,远程出bug要回退,尽可能用revert,因为revert会新建一个提交来回退制定commit_id的提交

git clean 删除从来没有add的文件
```js
# 编辑了一些文件
# 新增了一些文件
# 『糟糕』

# 将跟踪的文件回滚回去
git reset --hard

# 移除未跟踪的文件
git clean -df
```

[这里-看](https://github.com/geeeeeeeeek/git-recipes/blob/master/sources/5.2-%E5%9B%9E%E6%BB%9A%E5%91%BD%E4%BB%A4Reset%E3%80%81Checkout%E3%80%81Revert%E8%BE%A8%E6%9E%90.md?1545815476605)

git init --bare

git commit --amend --no-edit     代替 git rebase -i HEAD~2

git rebase 分支  只有不想增加额外的git log时才使用
git reflog --relative-date 增加相对现在的日期显示

git remote -v
git remote add <name> <url>
git remote rm <name>
git remote rename <old-name> <new-name>
git fetch <remote> 拉取远程分支到本地 用git branch -r查看
fetch + merge = pull

git push --force ！！！慎重


git merge --no-ff 分支  只生成一条记录-可以提供给懒得管理分支上提交信息的家伙使用,但是要确保一次大改动就要提交一次

中心化的工作流 - 唯一master分支push pull
feature分支的工作流 - 新建 feature分支进行功能，然后对master分支进行 push pull
gitflow 工作流 - 略复杂
fork工作流 - 先fork,后面参照gitflow

git push -u origin marys-feature // 给添加一个标记对应远程，下次直接git push 即可