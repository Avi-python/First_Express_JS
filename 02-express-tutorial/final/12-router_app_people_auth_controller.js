const express = require('express');
const path = require('path'); // 我們需要絕對路徑指向我們的資源

const app = express();
const people = require('./routes/people.js');
const login = require('./routes/auth.js');
//  使用兩個 built-in middleware
app.use(express.static("./methods-public"));
// parse form-data -> 在 methods-public 裡面 index.html 有一個 form 區塊
app.use(express.urlencoded({ extended: false }));
// parse json, 為了解析 post request 所傳遞的 json 資料
app.use(express.json());
// use my router
app.use('/api/people', people); // 而所有 people 裡面的各樣指定路徑都會以 /api/people 為"基底" !!!
                                // 同樣有先後順序關係，如果我把這個放在最上面，什麼資訊都獲得不了，也沒有 middleware
app.use('/login', login);

app.listen(5000, () => {
    console.log("server listening to 5000...");
});