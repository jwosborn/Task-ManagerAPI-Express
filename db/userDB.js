var dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;
const MongoURL = process.env.MONGODB_URI;

// userDB returns db.collection("users")
const userDB = async () => {
  try {
    return await MongoClient.connect(MongoURL, {
      useUnifiedTopology: true,
    })
      .then((client) => {
        const db = client.db("Task-Manager");
        return db.collection("users");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = {
  userDB,
};
