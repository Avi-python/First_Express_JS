const express = require('express');
const router = express.Router();


// 除了將路徑用檔案分開，再將 function 實現細節放在另一個檔案裏面
const { 
    getPeople,
    createPerson,
    createPersonPostman,
    updatePeople,
    deletePeople
} = require('../controllers/people.js');

// 在 app.js 裡面有列，在我們使用 app.use("/api/people", <our-routes>) 下面的路徑都是以 /api/people 為 base

// router.get("/", getPeople);
// router.post("/", createPerson);
// router.post("/postman", createPersonPostman);
// router.put("/:id", updatePeople);
// router.delete("/:id", deletePeople);

// 另一種寫法，使用路徑寫成一串
router.route("/")
    .get(getPeople)
    .post(createPerson);

router.route("/postman")
    .post(createPersonPostman);

router.route("/:id")
    .put(updatePeople)
    .delete(deletePeople);

module.exports = router;