// userDB returns Task-Manager.collection("users")
const userDB = require("../db/userDB");

// getUsers returns all users in the db.collection("users")
const getUsers = async () => {
  try {
    dbUser = await userDB.userDB();
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

// addUser inserts a single user into db.collection("users")
const addUser = async (user) => {
  try {
    await userDB.userDB().then((response) => {
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
