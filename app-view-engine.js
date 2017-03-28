//根据环境参数选择handlebars还是jade模板引擎
function chooseviewEngine(app,path){
    if(process.env.viewEngine=="handlebars"){
        var handlebars = require('handlebars');
        var ex3_hbs = require('express3-handlebars')({
            defaultLayout: 'layout1', // 设置默认布局为main
            extname: '.hbs', // 设置模板引擎文件后缀为.hbs
            layoutsDir:'views/handlebars/layouts/',   //设置layout的路径
            partialsDir:'views/handlebars/partials/',   //设置可复用组件的路径
            handlebars:handlebars
        });
        app.engine('hbs', ex3_hbs);
        app.set('view cache', false);
        app.set('views', path.join(__dirname, 'views/handlebars'));
        app.set('view engine', 'hbs');

        var hbs = require('hbs').create(handlebars);
        hbs.registerPartials(__dirname + '/views/handlebars/partials');
    }else{
        app.set('view cache', false);
        app.set('views', path.join(__dirname, 'views/jade/'));
        app.set('view engine', 'jade');    //默认是jade模板引擎
    }
}

module.exports = chooseviewEngine;
