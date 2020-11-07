var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.write('hello world');
    res.end();
});

// ファイルモジュールを読み込む
var fs = require('fs');
 
// リクエストの処理
function doRequest(req, res) {
    
    // ファイルを読み込んだら、コールバック関数を実行する。
    fs.readFile('./lib/index.html', 'utf-8' , doReard );
    
    // コンテンツを表示する。
    function doReard(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }
    
}

// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(3000)