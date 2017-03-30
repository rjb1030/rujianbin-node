/**
 * 聊天室
 **/
var my_nick_name="";

//连接socket
var ws = io.connect('http://127.0.0.1:3100');

//监听连接信息
ws.on('connecting',function(){
    console.log("聊天室  连接中...");
});
ws.on('connect_failed',function(){
    console.log("聊天室  连接失败...");
});
ws.on('connect', function(){
    var nickname = window.prompt('输入你的昵称!');
    while(!nickname){
        nickname = window.prompt('昵称不能为空，请重新输入!')
    }
    my_nick_name = nickname;
    ws.emit('join', nickname);
});
ws.on('reconnecting',function(){
    console.log("聊天室  重新连接...");
});
ws.on('reconnect_failed',function(){
    console.log("聊天室  重新连接失败...");
});
ws.on('reconnect',function(){
    console.log("聊天室  重新连接成功...");
});
ws.on('error',function(err){
    console.log("聊天室  有未知异常...",err);
});

/**
 * 自定义事件监听  客户端和服务端要保持事件一致（emit和on）
 */
// 昵称有重复
ws.on('nickname-repeat', function(){
    var nickname = window.prompt('昵称有重复，请重新输入!');
    while(!nickname){
        nickname = window.prompt('昵称不能为空，请重新输入!')
    }
    my_nick_name = nickname;
    ws.emit('join', nickname);
});
//聊天消息监听
ws.on('send.message', function(from, msg){
    addMessage(from, msg);
});
//发送聊天消息
var sendMsg = function(msg){
    ws.emit('send.message', msg);
}
//监听系统消息
ws.on('sys-msg', function(from, msg){
    addMessage(from, msg);
});

var addMessage = function(from, msg){
    var li = document.createElement('li');
    li.innerHTML = '<span>' + from + '</span>' + ' : ' + msg;
    document.querySelector('#chat_conatiner').appendChild(li);

    // 设置内容区的滚动条到底部
    document.querySelector('#chat').scrollTop = document.querySelector('#chat').scrollHeight;

    // 并设置焦点
    document.querySelector('textarea').focus();

}

var send = function(){
    var ele_msg = document.querySelector('textarea');
    var msg = ele_msg.value.replace('\r\n', '').trim();
    console.log(msg);
    if(!msg) return;
    sendMsg(msg);
    // 添加消息到自己的内容区
    addMessage('你（'+my_nick_name+"）", msg);
    ele_msg.value = '';
}

document.querySelector('textarea').addEventListener('keypress', function(event){
    if(event.which == 13){
        send();
    }
});
// document.querySelector('textarea').addEventListener('keydown', function(event){
//     if(event.which == 13){
//         send();
//     }
// });
document.querySelector('#send').addEventListener('click', function(){
    send();
});

document.querySelector('#clear').addEventListener('click', function(){
    document.querySelector('#chat_conatiner').innerHTML = '';
});