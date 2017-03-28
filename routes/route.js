var express = require('express');
var router = express.Router();

/* jade 请求route. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* handlebars的请求route   http://127.0.0.1:3000/rujianbin-node/hbs */
router.get('/hbs', function(req, res, next) {
  res.render('foo',{msg:"哈哈msg"});
});
router.get('/hbs-nolayout', function(req, res, next) {
  res.render('foo',{layout:null,msg:"哈哈msg"});
});
router.get('/hbs-layout1', function(req, res, next) {
  res.render('foo',{layout:"layout1",msg:"哈哈msg"});
});
router.get('/hbs-layout2', function(req, res, next) {
  res.render('foo',{layout:"layout2",msg:"哈哈msg"});
});


module.exports = router;
