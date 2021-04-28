var dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;
const MongoURL = process.env.MONGODB_URI;

const userDB = () => {
  return MongoClient.connect(MongoURL, {
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log("Connected through service");
      const db = client.db("Task-Manager");
      return db.collection("users");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  userDB,
};
