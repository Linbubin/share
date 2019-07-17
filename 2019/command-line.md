# node调用命令行
文件名为hello
```js
#!/usr/bin/env node

// process.argv 实际参数为
/*[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\hzjs\\AppData\\Roaming\\npm\\node_modules\\hello\\hello',
  '1' ]

[node位置,文件位置,参数]
  */

var name = process.argv[2];
var exec = require('child_process').exec;

//  var child = exec(`tar -zxvf `, function(err, stdout, stderr) {
//    if (err) throw err;
//    console.log(err, stdout, stderr);
//  });


exec(`tar -zxvf ${name}.tar.gz`, (err) => {
  if (err) {
    console.log('出错了::', err);
  } else {
    console.log('解压完成')
  }
})

exec('pm2 start index.js', (err) => {
  if (err) {
    console.log('出错了::', err);
  } else {
    console.log('启动完毕')
  }
})
```

## 执行命令
chmod 755 hello // 给予权限
./hello         // 执行hello脚本