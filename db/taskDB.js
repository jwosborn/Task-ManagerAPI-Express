var dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;
const MongoURL = process.env.MONGODB_URI;

const taskDB = () => {
  return MongoClient.connect(MongoURL, {
    useUnifiedTopology: true,
  })
    .then((client) => {
      const db = client.db("Task-Manager");
      return db.collection("tasks");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  taskDB,
};
