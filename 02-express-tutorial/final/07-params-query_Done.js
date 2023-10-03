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
    res.send(`<h1>Home Page</h1><a href="/api/products">products</a>`);
});

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const {id, name, image} = product;
        return {id, name, image};
    });
    res.json(newProducts);
});

app.get('/api/products/:productID', (req, res) => {
    // console.log(req);
    // console.log(req.params);
    // console.log(req.params.productID);
    const { productID } = req.params; // productID 是 string 喔喔
    const singleProduct = products.find((product) => product.id === Number(productID));
    if(!singleProduct) // check undefine
    {
        return res.status(404).send("Product DNE");
    }
    res.json(singleProduct);
});

app.get('/api/v1/query', (req, res) => {
    console.log(req.query);

    const {search, limit} = req.query;
    let sortedProducts = [...products]; // copy，應該說創一個新的空間，實際上只有 [] 是新的，裡面都是淺拷貝，但因為我們不會修改數據，所以沒關係。

    if(search) // check search exist
    {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search); // 只把符合的項目加進新建的 array，再回傳 array。與 find 的差在，find 只會回傳一個符合的項目。
        });
    }

    if(limit) // check limit exist
    {
        sortedProducts = sortedProducts.slice(0, Number(limit)); // (start, length)
    }

    if(sortedProducts.length < 1) 
    {
        // res.status(200).send("no product found"); // 看起來是不會像之前一樣有 重疊 打結的情況
        return res.status(200).json([{success: true, data:[]}]);

        // res.status(200).json([{success: true, data:[]}]); // 這樣也可以
        // return;

        // res.status(200).json([{success: true, data:[]}]);
        // 不 return 會抱錯，因為下面我又會再傳一個 response，不能同時塞兩個 response。
        // 但是這樣的寫法很特別，不知道這個回傳值有沒有作用。
    }

    res.status(200).json(sortedProducts);
});
 
app.all('*', (req, res) => {
    res.status(404).send("resource not found");
});
