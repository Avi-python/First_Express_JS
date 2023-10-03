// 將函式內容打包

var { people } = require("../data.js");

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people });
    // res.status(200).json(people);
};

const createPerson = (req, res) => {
    const { name } = req.body; // 這也是因為有 json parser 才讀得到資料的，不然是 undefined
    // console.log(name);
    if(!name)
    {
        return res.status(400).json({ success: false, msg: "Please provide name value" });
    }
    res.status(201).json({ success: true, person: name });
};

const createPersonPostman = (req, res) => {
    const { name } = req.body;
    if(!name)
    {
        return res.status(400).json({ success: false, msg: "Please provide name value" });
    }
    res.status(201).json({success: true, people: [...people, { name: name }]});
};

const updatePeople = (req, res) => {
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
};

const deletePeople = (req, res) => {
    const { id } = req.params; 
    const { name } = req.body; 
    console.log(req.body); // 還是可以有 body 喔
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
}

module.exports = {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePeople,
    deletePeople
};
    