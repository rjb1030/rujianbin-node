var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var route = require('./routes/route');
var users = require('./routes/users');

var app = express();

// view engine setup
require('./app-view-engine')(app,path);

/* 中间件：打印log */
app.use(logger('dev'));
/* 中间件：获取客户端IP */
app.use(function(req, res, next){
  var ip = require('./rujianbin_example/util/IpUtils').getClientIP(req);
  console.log("客户端请求IP---->"+ip);
  next();
})
/*中间件：解析post请求的参数到request.body 包括files */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/* 中间件：解析cookie参数到request.cookie */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/rujianbin-node', route);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  var status = err.status || 500;
  res.status(status);
  res.render(status.toString(),{layout:null});
});

module.exports = app;
