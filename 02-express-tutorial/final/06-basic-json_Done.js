const express = require('express');
const path = require('path'); // 我們需要絕對路徑指向我們的資源

const app = express();
// Sends a JSON response. This method sends a response 
// > (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().

const { products } = require("./data");

app.listen(5000, () => {
    console.log("server listening to 5000...");
});

app.get('/', (req, res) => {
    res.json(products);
});

app.all('*', (req, res) => {
    res.status(404).send("resource not found");
});

