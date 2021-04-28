var express = require("express");
var router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/user", usersController.createUser);

module.exports = router;