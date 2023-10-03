const express = require('express');
const path = require('path'); // 我們需要絕對路徑指向我們的資源

const app = express();
// Sends a JSON response. This method sends a response 
// > (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().

const { logger } = require("./logger.js");
var { people } = require("./data.js");

//  使用兩個 built-in middleware
app.use(express.static("./methods-public"));
// parse form-data -> 在 methods-public 裡面 index.html 有一個 form 區塊
app.use(express.urlencoded({ extended: false }));
// parse json, 為了解析 post request 所傳遞的 json 資料
app.use(express.json());

app.post("/login", (req, res) => {
    console.log(req.body); // 這個是經過 form parse 後才讀得到資料的 req.body
    const { name } = req.body;
    if(name)
    {
        return res.status(200).send(`Hi ${name}`);
    }
});

app.get("/api/people", (req, res) => {
    res.status(200).json({ success: true, data: people });
    // res.status(200).json(people);
});

app.post("/api/people", (req, res) => {
    const { name } = req.body; // 這也是因為有 json parser 才讀得到資料的，不然是 undefined
    // console.log(name);
    if(!name)
    {
        return res.status(400).json({ success: false, msg: "Please provide name value" });
    }
    res.status(201).json({ success: true, person: name });
});

app.post("/api/postman/people", (req, res) => {
    const { name } = req.body;
    if(!name)
    {
        return res.status(400).json({ success: false, msg: "Please provide name value" });
    }
    res.status(201).json({success: true, people: [...people, { name: name }]});
});

app.put("/api/people/:id", (req, res) => {
    const { id } = req.params; // 從 url 裡面指定我想要修改項目
    const { name } = req.body; // 並從寄過來的 http message 中放入我想修改的資訊
    console.log(id, name);
    // res.header({"content-type": "text/plain"});
    const person = people.find((person) => person.id === Number(id));
    if(!person)
    {
        return res
            .status(404)
            .json({ success: false, msg: `No person with id:${id}`});
    }
    const newPeople = people.map((person) => {
        if(person.id === Number(id))
        {
            person.name = name; // 這樣寫仍然會更改到 people
        }
        return person;
    });
    res.status(200).json({ success: true, data: newPeople });
});

app.delete("/api/people/:id", (req, res) => {
    const { id } = req.params; 
    const { name } = req.body; 
    const person = people.find((person) => person.id === Number(id));
    if(!person)
    {
        return res
            .status(404)
            .json({ success: false, msg: `No person with id:${id}`});
    }

    // const newPeople = people.filter((person) => person.id !== Number(id)); // 但這會有一個問題就是沒有辦法刪掉之後保持刪掉的狀態 
    people = people.filter((person) =>  person.id !== Number(id)); // 這樣寫就可以，但是前提就是要把 const people 改為 var people
    res.status(200).json({ success: true, data: people });
});

app.listen(5000, () => {
    console.log("server listening to 5000...");
});