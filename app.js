var express = require("express");
var path = require("path");
var dotenv = require("dotenv");
dotenv.config();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const MongoClient = require("mongodb").MongoClient;
const MongoURL = process.env.MONGODB_URI;
const { Console } = require("console");
const routes = require("./routes");
var app = express();
app.use(express.json());

app.use("/api", routes);
const userRouter = require("./routes/users");
const taskRouter = require("./routes/tasks");

app.post("/user", userRouter);
app.get("/user", userRouter);
app.put("/user", userRouter);
app.delete("/user", userRouter);


app.post("/task", taskRouter);
app.get("/task", taskRouter)
app.put("/task", taskRouter);
app.delete("/task", taskRouter);
module.exports = app;
