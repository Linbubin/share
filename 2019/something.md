# 0807
## 起因
页面上一个下载按钮，调用后台download方法,下载本地保存的某个文件
```js
exports.download = (req, res) => {
    let filename = decodeURI(req.query.filename),
        filepath = req.query.filepath || "",
        downloadPath = path.join(__dirname, "../../upload/", filepath, filename),
        stats;
    try {
        stats = fs.statSync(downloadPath);
        res.set({
            'Content-type' : 'application/octet-stream',
            'Content-Disposition' : 'attachment; filename=' + encodeURI(filename),
            'Content-Length' : stats.size
        });
        return fs.createReadStream(downloadPath).pipe(res);
    } catch (e) {
        return res.status(200).json({success: false, msg: "下载失败!"});
    }
};
```

在windows本地使用没有问题,到了linux系统,总会返回以下错误
```js
events.js:183
      throw er; // Unhandled 'error' event
      ^

Error: ENOENT: no such file or directory, open '/work/test/download_file/download/我是中文.docx'
```

## 经过
我去了`/work/test/download_file/download/`目录下, ls查看
```
aaa.txt  ??.docx  gz.docx  啊.txt
```
有以上4个文件,其中`我是中文`被转成了`??`, 机灵点的应该现在就发现了,`啊`的中文是正确的,像我这么机灵的，当然看到了,所以就很开心的去搜`linux node 中文乱码`

结果,慢慢的结果就跑偏了,都是讲node读取文件时候,中文乱码的问题.我还测了一下,真的乱码了呢.然后就一直在研究乱码的问题.搞了一个上午.

后来我转念一想,不对啊,乱码的话部署在现场的服务器上理论来说也会没法下载,或者下载下来是乱码,但是为什么直到现在也没有人报这个问题呢. 就在刚才(15点左右),我才意识到，这TM不是路径的问题吗？然后我就去搜`linux node 中文路径`(是的，知道现在我还没意识到和node一毛钱关系都没有).然后又被绕到读取文件乱码的问题去了...

就在刚刚，我突然灵光一闪，就去搜了`linux 中文路径`，没错，第一个就是我要的答案。[这里](https://blog.csdn.net/waltertan1988/article/details/67633001).

于是我花了3分钟把文件用utf-8的格式上传了一次，这次`ls`能看到全部的中文都完美展示,并且执行方法也不报错. 

## 结果
至此，这个`编码`问题，折腾了一天，特此记录一下.