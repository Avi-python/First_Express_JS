const express = require('express');
const router = express.Router();

router.post("/login", (req, res) => {
    console.log(req.body); // 這個是經過 form parse 後才讀得到資料的 req.body
    const { name } = req.body;
    if(name)
    {
        return res
            .status(200)
            .send(`Hi ${name}`);
    }
});

module.exports = router;