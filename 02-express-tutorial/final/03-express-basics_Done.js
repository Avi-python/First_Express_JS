const express = require('express');
const app = express();

// app.get
app.get('/', (req, res) => {
    console.log("user hit the home");
    res.status(200).send("<h1>homepage</h1>");
});

app.get('/about', (req, res) => {
    console.log("user hit about");
    res.status(200).send("<h1>About </h1>");
});

// app.all
app.all('*', (req, res) => { // '*' 就是指所有的意思，所以我應該也可以寫 /about/* 等等，只要符合且沒有任何其他已設定的方法去捕捉，就會到 all 那邊。
    console.log("user way to \"all\"");
    res.status(404).send("resource not found"); 
});

// app.listen
app.listen(5000, () => {
    console.log("server 5000");
}); 

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use