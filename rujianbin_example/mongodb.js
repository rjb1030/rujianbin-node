var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://192.168.91.228:27015/testdb';
MongoClient.connect(url, function(err, db) {
    if(err!=null){
        console.log('mongodb原生测试',' Connection error');
        return;
    }
    console.log('mongodb原生测试','Connected correctly to mongodb.');
    var cursor =db.collection('xinyunlian_product').find( { "name": /葡萄酒/ } );
    cursor.each(function(error, doc) {
        assert.equal(error, null);
        if (doc != null) {
            console.log('mongodb原生查询结果 ',doc.name);
        }
    });
    db.close();
});