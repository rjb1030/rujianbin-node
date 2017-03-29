var mongoose = require('mongoose');

// 连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://192.168.91.228:27015/testdb');
var db = mongoose.connection;

db.on('error', function callback () {
    console.log('mongoose中间件测试',"  Connection error");
});

db.once('open', function callback () {
    console.log('mongoose中间件测试',"  Mongo working!");
});
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    _id:Schema.Types.ObjectId,
    id : Number,
    name : String,
    categoryId : Number,
    categoryName : String,
    attrList : []
});
var Product = mongoose.model('xyl_product', ProductSchema,"xinyunlian_product");
Product.find({ "name": /葡萄酒/ },function(err,docs){
    for(var index in docs){
        console.log('mongoose中间件查询结果 ',docs[index].name);
    }
});