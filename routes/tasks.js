var express = require("express");
var router = express.Router();

router.post("/tasks", tasksController.createTask());

module.exports = router;
