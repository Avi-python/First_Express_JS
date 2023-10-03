const http = require('http');
const { readFileSync } = require('fs');

const homePage = readFileSync('./navbar-app/index.html', 'utf-8'); // 我只在每次開啟 server 的時候載入 homePage
const homeStyles = readFileSync('./navbar-app/styles.css', 'utf-8'); 
const homeImage = readFileSync('./navbar-app/logo.svg', 'utf-8'); 
const homeLogic = readFileSync('./navbar-app/browser-app.js', 'utf-8');

const server = http.createServer((req, res) => {

    // console.log("user hit the server"); // this will be printed twice, one for favicon.ico and one for localhost:5000; -> 瀏覽器繪製自動要求的網站圖標，在 http:// your domain /favicon.ico。
    const url = req.url;
    console.log(url);
    if(req.url == "/")
    {
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(homePage);
        res.end();
        // return;
    }
    else if(req.url == "/styles.css")
    {
        res.writeHead(200, {'content-type': 'text/css'});
        res.write(homeStyles);
        res.end();
    }
    else if(req.url == "/logo.svg")
    {
        res.writeHead(200, {'content-type': 'image/svg+xml'});
        res.write(homeImage);
        res.end();
    }
    else if(req.url == "/browser-app.js")
    {
        res.writeHead(200, {'content-type': 'text/javascript'});
        res.write(homeLogic);
        res.end();
    }
    else if(req.url == "/about")
    {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end("<h1>about</h1>");
        // return;
    }
    else
    {
        // text/plain for plain text, the browser will treat is as text.
        // 200 狀態碼，也可以硬寫 404。
        res.writeHead(404, {'content-type': 'text/html'});
        res.end("<h1>Page Not Found</h1>");
    }

});

server.listen(5000);