/**
 *  io.on(‘connection’,function(socket));//监听客户端连接,回调函数会传递本次连接的socket
 *  io.sockets.emit(‘String’,data);//给所有客户端广播消息
 *  io.sockets.socket(socketid).emit(‘String’, data);//给指定的客户端发送消息
 *  socket.on(‘String’,function(data));//监听客户端发送的信息
 *  socket.emit(‘String’, data);//给该socket的客户端发送消息
 *
 *  广播
 *  socket.broadcast.emit("msg",{data:"hello,everyone"}); //给除了自己以外的客户端广播消息
 *  io.sockets.emit("msg",{data:"hello,all"}); //给所有客户端广播消息
 *
 *  分组
 *  socket.join('group1');   //加入分组（房间）group1  可以emit消息后 根据消息将其加入分组
 *  socket.leave(data.room);  //提出分组（房间）
 *  io.sockets.manager.rooms   //获取所有房间（分组）信息
 *  io.sockets.manager.roomClients[socket.id]  //来获取此socketid进入的房间信息
 *  io.sockets.clients('particular room')  //获取particular room中的客户端，返回所有在此房间的socket实例
 *
 *  另一种是分组
 *  io.of('/room-rjb').on('connection',fucntion(){})
 *
 *
 *  分组广播
 *  socket.broadcast.to('group1').emit('event_name', data);  //对分组中的用户发送信息 不包括自己
 *  io.sockets.in('group1').emit('event_name', data);   //包括自己的 分组广播
 *
 *  客户端的socket.on()监听事件
 *   connect：连接成功
     connecting：正在连接
     disconnect：断开连接
     connect_failed：连接失败
     error：错误发生，并且无法被其他事件类型所处理
     message：同服务器端message事件
     anything：同服务器端anything事件
     reconnect_failed：重连失败
     reconnect：成功重连
     reconnecting：正在重连
 */

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



    var io = socketio.listen(server);

    //遍历所有socket 确定名称唯一
    var checkNickname = function(name){
        for(var k in io.sockets.sockets){
            if(io.sockets.sockets.hasOwnProperty(k)){
                if(io.sockets.sockets[k] && io.sockets.sockets[k].nickname == name){
                    return true;
                }
            }
        }
        return false;
    }

    io.on("connection",function(client){
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
                io.sockets.emit('sys-msg', '系统', msg + ' 加入了聊天室!');
            }
        });
    });

}

module.exports = startSocket;
