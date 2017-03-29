/**
 * child_process模块用于新建子进程或者启动新进程执行bash命令。子进程的运行结果储存在系统缓存之中（最大200KB），等到子进程运行结束以后，主进程再用回调函数读取子进程的运行结果
 */
var child_process = require('child_process');
//exec 执行bash命令 获取子进程执行结果：1 回调函数    2 事件监听
var command = child_process.exec('node -v', function (error, stdout, stderr) {
    if (error) {
        console.log('child_process测试',error.stack);
        console.log('child_process测试',  'Error code: ' + error.code);
    }
     console.log('child_process测试', 'exec [node -v] ', stdout);
});
command.stdout.on('data',function(data){
    console.log('child_process测试','exec [标准输出的data监听事件] : ' + data);
});
command.stderr.on('data', function(data) {
    console.log('child_process测试','exec [标准错误的data监听事件] : ' + data);
});
command.on('close', function(code) {
    console.log('child_process测试','exec [closing 监听事件]exit-code: ' + code);
});

//execSync 同步执行bash命令
var SEPARATOR = process.platform === 'win32' ? ';' : ':';
var env = Object.assign({}, process.env);
env.path='' + SEPARATOR + env.path; //临时添加环境变量的path  方便命令可以任意目录执行
var output = child_process.execSync('npm -v', {
    cwd: process.cwd(),
    env: env
});
console.log('child_process测试','execSync [npm -v] ',output.toString());

//execFile 命令参数以数组传入，通过回调获取结果。安全性高。类似于sql问号
child_process.execFile('node', ['-v'], function (err, stdout) {
    console.log('child_process测试','execFile [node -v] ',stdout)
});

//spawn 命令参数以数组传入，通过监听获取结果，适用执行命令时间较长的场景
var command2 = child_process.spawn('node', ['-v']);
command2.stdout.on('data', function (data) {
    console.log('child_process测试','spawn [标准输出的data监听事件] : ' + data);
});
command2.stderr.on('data', function (data) {
    console.log('child_process测试','spawn [标准错误的data监听事件] : ' + data);
});
command2.on('close', function (code) {
    console.log('child_process测试','spawn [closing 监听事件]exit-code: ' + code);
});

//fork 创建子进程,返回和子进程通信的管道
var pipe = child_process.fork(__dirname+'/child_process_fork.js');
pipe.on("message",function(m){
    console.log('child_process测试   进程通信 ',' fork [this is parent.  got message]:', m);
});
pipe.send({ msg: 'hello i am main process' });
