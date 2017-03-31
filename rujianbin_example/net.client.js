/**
 * 客户端：连接服务端的net服务
 */
var net = require('net');

var PORT = 3110;
var HOST = '127.0.0.1';

// tcp客户端
var client = net.createConnection(PORT, HOST);

client.on('connect', function(){
    console.log('net模块-socket通信','客户端：已经与服务端建立连接');
});

client.on('data', function(data){
    console.log('net模块-socket通信','客户端：收到服务端数据，内容为{'+ data +'}');
});

client.on('end', function(data){
    console.log('net模块-socket通信','客户端：连接断开');
});

client.end('你好，我是客户端');
