var express = require("express");
var router = express.Router();
var currentUser = { user: "user" };
var tasks = [];

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { tasks: tasks });
});

module.exports = router;
