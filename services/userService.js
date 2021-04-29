// userDB returns Task-Manager.collection("users")
const userDB = require("../db/userDB");
var objectId = require('mongodb').ObjectId;

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

// finds the user by _id and updates email REQUIRES QUOTES AROUND "_id"
const updateOneUser = async (user) => {
  try {
    dbUser = await userDB.userDB();
    return dbUser.updateOne({ "_id": objectId(user._id) },
      { $set: { email: user.email } });
  } catch (e) {
    throw new Error(e.message);
  }
};

// finds and deletes one user
const deleteOneUser = async (user) => {
  try {
    dbUser = await userDB.userDB();
    return dbUser.deleteOne({ "_id": objectId(user._id) })
  } catch (e) {
    throw new Error(e.message);
  }
};


module.exports = {
  addUser,
  getUsers,
  updateOneUser,
  deleteOneUser
};
