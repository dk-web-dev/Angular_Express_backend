require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT;

mongoose.connect("mongodb://localhost:27017/CRUD", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const AddSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Add = mongoose.model("Add", AddSchema);

app.get("/", (req, res) => {
  res.send("Hello World from backend server!");
});

// post method form TDF form approach
app.post("/user", (req, res) => {
  console.log("server", req.body);
  res.status(200).send({
    data: req.body,
    message: "data recieved",
  });
});

app.post("/customer", (req, res) => {
  console.log("server", req.body);
  res.status(200).send({
    data: req.body,
    message: "customer data recieved",
  });
});

//psot method for Reactive form approach
app.post("/register", (req, res) => {
  console.log("server", req.body);
  res.status(200).send({
    data: req.body,
    message: "data recieved",
  });
});

// POST method form client form
app.post("/client", (req, res) => {
  console.log("server", req.body);
  res.status(200).send({
    data: req.body,
    message: " client data recieved",
  });
});

// Crud operation api listing here
app.post("/add", (req, res) => {
  console.log("server", req.body);
  const add = new Add({
    title: req.body.title,
    description: req.body.description,
  });
  add.save(function (err) {
    if (err) {
      throw err;
    } else {
      res.status(200).send({
        data: req.body,
        message: "new todo added succesfully",
      });
    }
  });
});

//list todo api
app.get("/todolist", async (req, res) => {
  const todos = await Add.find();
  if (todos) {
    res.status(200).send(todos);
  } else {
    throw err;
  }
});

//delete todo api
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Add.deleteOne({ _id: id }, (error, data) => {
    if (error) {
      res.status(500).json({
        message: "something wrong in server",
      });
    } else {
      res.status(200).json({
        data: data,
        message: "deleted succesfully",
      });
    }
  });
});

//get single todo by id api
app.get("/todolist/:id", (req, res) => {
  const id = req.params.id;
  Add.findOne({ _id: id }, (error, data) => {
    if (error) {
      res.status(500).json({
        message: "something wrong in server",
      });
    } else {
      res.status(200).json(data);
    }
  });
});

//edit todo api
app.patch("/edit/:id", (req, res) => {
  const id = req.params.id;
  // res.send(req.body);
  Add.updateOne({ _id: id }, req.body, (error, data) => {
    if (error) {
      res.send("noooooooooooooooo");
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
