var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const MongoClient = require("mongodb").MongoClient;
const { Console } = require("console");
var app = express();

MongoClient.connect(
  "mongodb+srv://Admin:admin@task-manager.k64c6.mongodb.net/Task-Manager?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
  }
)
  .then((client) => {
    console.log("Connected");
    const db = client.db("Task-Manager");
    const usersCollection = db.collection("users");

    var indexRouter = require("./routes/index");

    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));

    app.use("/", indexRouter);

    app.post("/users", (req, res) => {
      usersCollection
        .insertOne(req.body)
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((error) => console.error(error));
    });
    app.get("/users", (req, res) => {
      const users = db
        .collection("users")
        .find()
        .toArray()
        .then((results) => {
          console.log(results);
          res.json(results);
        })
        .catch((error) => console.error(error));
    });
    app.put("/users", (req, res) => {
      const newUser = req.body;
      usersCollection
        .findOneAndUpdate(
          { email: "email@email.com" },
          {
            $set: {
              email: newUser.email,
              password: newUser.password,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          console.log(result);
          res.json(result);
        });
    });
    app.delete("/users", (req, res) => {
      usersCollection
        .deleteOne({ email: req.body.email })
        .then((resp) => {
          if (resp.deletedCount === 0) {
            res.json("User not found");
          } else {
            console.log(resp);
            res.send(resp);
          }
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app;
