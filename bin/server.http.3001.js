function startServer(){

    /**
     * 原生http模块启动server
     * http://127.0.0.1:3001/
     */
    var http = require('http');
    var debug = require('debug')('rujianbin-node:server');

    function onRequest(req, res) {
        var content_type={ "Content-Type": "text/html; charset=UTF-8" };
        var url = require('url').parse(req.url);

        console.log("本次请求URL");console.log(url);
        // 主页
        if (url.pathname == "/") {
            res.writeHead(200, content_type);
            res.write("请求路径"+req.url);
            res.end("Welcome to the homepage!");
        }

        // About页面
        else if (url.pathname == "/about") {
            res.writeHead(200, content_type);
            res.write("请求路径"+req.url);
            res.end("Welcome to the about page!");
        }

        // 404错误
        else {
            res.writeHead(404, content_type);
            res.write("请求路径"+req.url);
            res.end("404 error! File not found.");
        }
    }

    /**
     * Normalize a port into a number, string, or false.
     */

    function normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }


    var port = normalizePort(process.env.PORT || '3000');
    http.createServer(onRequest).listen(++port);
    debug('Listening on ' + port);
}

module.exports = startServer;