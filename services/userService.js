// userDB returns Task-Manager.collection("users")
const userDB = require("../db/userDB");

const getUsers = async () => {
  try {
    var dbUser = await userDB.userDB();
    return dbUser
      .find()
      .toArray()
      .then((data) => {
        return data;
      });
  } catch (e) {
    throw new Error(e.message);
  }
};

const addUser = async (user) => {
  try {
    userDB.userDB().then((response) => {
      response.insertOne(user);
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  addUser,
  getUsers,
};
