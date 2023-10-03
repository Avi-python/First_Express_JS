const express = require('express');
const path = require('path'); // 我們需要絕對路徑指向我們的資源

const app = express();

// 直接一行完成，我們只要把相關"不需要更改"的資源 css, js, image 丟到資料夾 public 裡面就可以了，我覺得主要是圖片、文檔之類的，數量多了一樣好解決。
app.use(express.static('./public'));

// 其實也可以將 index.html 丟到 static 資源裡面。
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
// });

app.all('*', (req, res) => {
    res.status(404).send("resourse not fount");
}); 

app.listen(5000, () => {
    console.log('server is listening on port 5000...');
});