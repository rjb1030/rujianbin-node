
//net模块基于socket通信
function startNetServer(){
    var net = require('net');
    var PORT = 3110;
    var HOST = '127.0.0.1';
    // tcp服务端
    var server = net.createServer(function(socket){
        var address = socket.remoteAddress;
        console.log('net模块-socket通信','服务端：收到来自客户端的请求 ip='+address);
        console.log('net模块-socket通信','total server connections: ' + server.connections);

        socket.on('error',function(err){
            console.log('net模块-socket通信',err);
        });

        socket.on('data', function(data){
            console.log('net模块-socket通信','服务端：收到客户端数据，内容为{'+ data +'}');

            // 给客户端返回数据
            socket.write('你好，我是服务端');

        });

        socket.on('end', function(){
            console.log('net模块-socket通信','服务端：客户端连接断开');
        });

    });
    server.listen(PORT, function(){
        console.log('net模块-socket通信','服务端：开始监听来自客户端的请求');
    });
}

module.exports = startNetServer;
