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
    var usersRouter = require("./routes/users");
    var loginRouter = require("./routes/login");

    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));
    app.use(bodyParser.json());

    app.use("/", indexRouter);
    app.use("/login", loginRouter);
    // app.use("/users", usersRouter);

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
          res.send(results);
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
          res.send(JSON.stringify(result));
        });
    });
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app;
