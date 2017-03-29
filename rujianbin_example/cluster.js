/**
 * cluster模块是对child_process模块的进一步封装
 * 注意：cluster.fork 创建的子进程  上下文都是复制主进程的。而child_process.fork创建子进程是要指定子进程JS文件的
 * 方法isMaster,isWorker,fork,kill
 * 属性workers
 **/
var cluster = require('cluster');
var os = require('os');

if(cluster.isMaster){

    //监听子进程的启动和退出
    cluster.on('online', function(worker) {
        console.log('cluster测试',' cluster online监听  worker.process.pid ' + worker.process.pid + ' is online');
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('cluster测试',' cluster exit监听  worker.process.pid ' + worker.process.pid + ' exit！！！   code: ' + code + ', and signal: ' + signal);
        // console.log('cluster测试',' restart a new worker');
        // cluster.fork();
    });

    //还不知道怎么触发
    cluster.on('listening', function (worker, address) {
        console.log('cluster测试', " A worker is now connected to " + address.address + ":" + address.port);
    });

    //启动worker子进程
    var numWorkers = os.cpus().length;
    console.log('cluster测试',' Master cluster setting up ' + numWorkers + ' workers...');
    for(var i = 0; i < numWorkers; i++) {
        var workHandle = cluster.fork();//fork返回worker进程对象:worker.id,worker.process,worker.send()
        //向子进程发送消息和监听子进程消息
        workHandle.process.send({ msg: 'hello i am main process (pid='+process.pid+')' });
        workHandle.process.on("message",function(m){
            console.log('cluster测试  进程通信 ',' [this is a main process (pid='+process.pid+').  got message]:', m);
        });
    }

    //5秒后杀掉所有worker进程
    setTimeout(function() {
        var wid, workerIds = [];
        for(wid in cluster.workers) {
            workerIds.push(wid);
        }
        workerIds.forEach(function(workerId){
            if(cluster.workers[workerId]) {
                // process.kill(cluster.workers[workerId].process.pid, 'SIGTERM');
                cluster.workers[workerId].kill('SIGTERM');
            }
        });
    }, 5000);

}



