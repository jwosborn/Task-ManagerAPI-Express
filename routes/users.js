var express = require("express");
var router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/user", usersController.createUser);
router.get("/user", usersController.getUserList);
router.put("/user", usersController.updateUser);

module.exports = router;
