const http = require('http');

const server = http.createServer((req, res) => {

    console.log("user hit the server"); // this will be printed twice, one for favicon.ico and one for localhost:5000; -> 瀏覽器繪製自動要求的網站圖標，在 http:// your domain /favicon.ico。
    res.writeHead(200, {'content-type': 'text/html'}); 
    // text/plain for plain text, the browser will treat is as text.
    // 200 狀態碼，也可以硬寫 404。
    res.write('<h1>Home Page</h1>');
    res.end();
});

server.listen(5000);