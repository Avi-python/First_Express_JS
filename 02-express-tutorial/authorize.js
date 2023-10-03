// 真時案例不會這樣做"驗證"喔喔喔喔
const authorize = (req, res, next) => {
    const { name } = req.query;
    if(name == "Dan")
    {
        req.user = { name: name, id: 14 };
        next();
    }
    else
    {
        res.status(401).send("Unauthorized");
    }
};

module.exports = { authorize };