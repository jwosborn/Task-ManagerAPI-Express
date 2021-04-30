var express = require("express");
const { route } = require(".");
var router = express.Router();
const tasksController = require("../controllers/tasksController");

router.post("/task", tasksController.createTask);
router.get("/task", tasksController.listTasks)
router.put("/task", tasksController.updateTask);
router.delete("/task", tasksController.deleteTask);

module.exports = router;
