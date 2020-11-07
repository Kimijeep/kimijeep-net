var express = require('express');
var http = require('http');

var app = express();
app.set('x-powered-by', false);
app.set('case sensitive routing', true);
app.set('strict routing', true);
app.use(function (req, res, next) {
    res.status(200);
    res.type('text/plain; charset=utf-8');
    next();
});
app.get('/', function (req, res, next) {
    res.send('welcome to pizyumi\'s website. this is home page.\r\n');
});
app.get('/author', function (req, res, next) {
    res.send('author is pizyumi.\r\n');
});
app.get('/hello', function (req, res, next) {
    res.send('this is hello page.\r\n');
});
app.get('/hello/*', function (req, res, next) {
    res.send('hello, ' + req.path.split('/')[2] + '.\r\n');
});
app.get('*', function (req, res, next) {
    res.status(404);
    res.send(http.STATUS_CODES[404] + '\r\n');
});
app.all('*', function (req, res, next) {
    res.status(501);
    res.send(http.STATUS_CODES[501] + '\r\n');
});
var server = app.listen(process.env.PORT, function () {
    console.log('http server is running...');

    var f = false;
    process.on('SIGTERM', () => {
        if (f) {
            return;
        }
        f = true;

        console.log('http server is closing...');

        server.close(function () {
            console.log('http server closed.');
            process.exit(0);
        });
    });
});