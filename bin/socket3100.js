function startSocket(){
    var debug = require('debug')('rujianbin-node:server');
    var express = require('express');
    var http = require('http');
    var socketio = require('socket.io');

    var server = http.createServer(function(req, res){
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end("Welcome to 3100!");
    }).listen(3100, function() {
        debug('socket Listening on ' + 3100);
    });



    var ws = socketio.listen(server);

    //遍历所有socket 确定名称唯一
    var checkNickname = function(name){
        for(var k in ws.sockets.sockets){
            if(ws.sockets.sockets.hasOwnProperty(k)){
                if(ws.sockets.sockets[k] && ws.sockets.sockets[k].nickname == name){
                    return true;
                }
            }
        }
        return false;
    }

    ws.on("connection",function(client){
        console.log('socket.io 聊天室','有客户端连接 client.id=',client.id);
        // 监听发送消息
        client.on('send.message', function(msg){
            client.broadcast.emit('send.message',client.nickname,  msg);
        });
        // 断开连接时，通知其它用户
        client.on('disconnect', function(){
            if(client.nickname){
                client.broadcast.emit('send.message','系统',  client.nickname + '离开聊天室!');
            }
        })
        client.on('join', function(msg){
            // 检查是否有重复
            if(checkNickname(msg)){
                client.emit('nickname-repeat', '昵称有重复!');
            }else{
                client.nickname = msg;
                ws.sockets.emit('sys-msg', '系统', msg + ' 加入了聊天室!');
            }
        });
    });

}

module.exports = startSocket;
