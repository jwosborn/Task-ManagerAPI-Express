var bodyParser = require("body-parser");
const { addUser } = require("../services/userService");

const createUser = async (req, res) => {
  const { user } = req.body;
  try {
    await addUser(user);
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = {
  createUser,
};
