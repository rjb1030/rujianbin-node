var express = require('express');
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

//聊天室
router.get('/hbs-chat-room',function(req, res, next){
  res.render('feature/chat-room',{layout:null});
});




module.exports = router;
