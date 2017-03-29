process.on('message', function(m) {
    console.log('child_process测试   进程通信 ',' fork [this is child.  got message]:', m);
});
process.send({ msg: 'hello i am child process' });