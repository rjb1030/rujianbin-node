/* 构造函数 */
var hello1 = new Buffer(5);// 参数是整数，指定分配多少个字节内存
var hello2 = new Buffer('Hello', 'utf8');// 参数是字符串（不省略编码，默认utf8,可选ascii，base64，hex）
var hello3 = new Buffer([0x48, 0x65, 0x6c, 0x6c, 0x6f]);// 参数是数组，数组成员必须是整数值
hello3.toString() // 'Hello'

/* copy (将bytes的第4到第8位置字节拷贝到more,more的起始位置为0)*/
var bytes = new Buffer(8);
for (var i = 0; i < bytes.length; i++) {
    bytes[i] = i;
}
var more = new Buffer(4);
bytes.copy(more, 0, 4, 8);
console.log("Buffer测试",more[0],more[1],more[2],more[3]);

/* write */
var buf = new Buffer(5);
buf.write('He');
buf.write('l', 2);
buf.write('lo', 3);
console.log("Buffer测试",buf.toString());  //Hello