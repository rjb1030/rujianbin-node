var express = require('express');
var multiparty = require('connect-multiparty'); //接收上传文件的中间件
var fs = require('fs');
var multipartMiddleware = multiparty();
var router = express.Router();

/* jade 请求route. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* handlebars的layout测试   http://127.0.0.1:3000/rujianbin-node/hbs */
router.get('/hbs', function(req, res, next) {
  res.render('foo',{msg:"哈哈msg"});
});
router.get('/hbs-nolayout', function(req, res, next) {
  res.render('foo',{layout:null,msg:"哈哈msgxx"});
});
router.get('/hbs-layout1', function(req, res, next) {
  res.render('foo',{layout:"layout1",msg:"哈哈msg"});
});
router.get('/hbs-layout2', function(req, res, next) {
  res.render('foo',{layout:"layout2",msg:"哈哈msg"});
});

/*表单提交测试*/
router.get('/hbs-login',function(req, res, next){
  res.render('feature/login',{layout:null});
});
router.post('/hbs-home',function(req, res, next){
  res.render('feature/home',{layout:null});
});

/* 文件上传 下载   在home页上*/
router.post('/hbs-ajax-file-upload',multipartMiddleware,function(req, res, next){
  //multipartMiddleware中间件将上传的临时文件放在xx/temp目录下
  var file = req.files.myfile;   //文件myfile是前端input:file的id属性
  var params = req.body;  //除文件外的其他参数
  var ori_filename = file.originalFilename; //原始文件名
  var source = fs.createReadStream(file.path);
  var dest = fs.createWriteStream('./upload/'+ori_filename);
  source.pipe(dest); //读写流对接，实现文件拷贝。rename方法不能跨磁盘移动文件
  source.on('close',function(){//监听流结束事件，结束后删除原临时文件
    fs.unlink(file.path,function(err){
      console.log(err);
    });
  });
  res.contentType('text/html');//返回text/html格式  否则前端接收的json格式外包了一层html
  res.json({"status":'上传成功'});
});
router.get('/hbs-ajax-file-download',function(req, res, next){
  res.download('./upload/temp.txt','下载文件.txt',function(){
    console.log('文件被下载成功');
  })
});


//聊天室
router.get('/hbs-chat-room',function(req, res, next){
  res.render('feature/chat-room',{layout:null});
});




module.exports = router;
