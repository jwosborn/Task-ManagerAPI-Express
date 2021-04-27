var express = require("express");
var router = express.Router();
var user = { email: "user", password: "password" };

router.get("/", (req, res) => {
  res.json(user);
});

module.exports = router;
