const { userDB } = require("../db/userDB");

const addUser = async (user) => {
  try {
    userDB().then((response) => {
      response.insertOne(user);
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  addUser,
};
