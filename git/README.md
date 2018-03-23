# git与github的使用

## git (分布式版本控制系统)
>Git是一个开源的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理. Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件.
>三个区域：工作区，暂存区，本地仓库。

### git下载
[点击下载](https://git-scm.com/downloads)

### 配置本机git
git config --global user.name "Firstname Lastname"
git config --global user.email "your_email@example.com"

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
`git show commit_id 查看某次提交的详细信息`

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
git log --pretty=short

git commit --amend // 修改提交资料

git commit -am "xxx" //git add + commit 但是只会add 工作区的，新增的不会影响
```
2. diff
```
git diff 分支A 分支B // 查看两个分支的差异
git diff 分支A 分支B filename // 查看两个分支 文件的差异
git diff commit_id //查看某次提交 与本次的差异 HEAD为本次提交 -> git diff commit_id HEAD
```

3. rebase
```
git rebase -i HEAD~2 // 合并log最上面的2个
```

4. reset
```
git reset commit_id               //可以回退到commit前，修改后    
git reset HEAD~                   //回退到commit之前  修改之后
git reset --hard commit_id        //退到上次提交后的状态
git reset HEAD filename           //将文件从暂存区返回到工作区
```

## github
### 连接github
1. 创建密钥`ssh -keygen -t rsa -C "your_eamil@example.com"`
2. 将`id_rsa.pub` 填入 github中, 路径为
```
widows C:\Users\Administrator\.ssh
linux  ~/.ssh/id_rea.pub
```
3. 测试能否连接github `ssh -T git@github.com`

4. 图解

5. 比较差异
[1.11.5-2.2.1](https://github.com/ant-design/ant-design/compare/1.11.5...2.2.1)
`https://github.com/ant-design/ant-design/compare/1.11.5...2.2.1`

查看日期也可以`https://github.com/ant-design/ant-design/compare/master@{7.day.ago}...master`


