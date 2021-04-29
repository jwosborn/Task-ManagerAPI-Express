var bodyParser = require("body-parser");
const { addUser, getUsers } = require("../services/userService");

// createUser calls addUser and sends a response upon completion
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

// getUserList puts the array of users returned by getUsers onto the res object
const getUserList = async (req, res) => {
  try {
    var users = await getUsers();
    res.json(users);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  createUser,
  getUserList,
};
