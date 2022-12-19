require("dotenv").config();
const express = require("express"); //import express package
const mongoose = require("mongoose"); // import mngoose package
var bodyParser = require("body-parser"); // import body-parser package
var cors = require("cors"); // import cors package

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT;

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/CRUD", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//check mongodb  connect or not
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//create schema
const AddSchema = new mongoose.Schema({
  title: String,
  description: String,
});
//create schema model
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

/**  Crud operation api listing here **/

//add Todo POST Method Api
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
      res.status(200).send(req.body);
    }
  });
});

//listing all todo GET Method Api
app.get("/todolist", async (req, res) => {
  const todos = await Add.find();
  if (todos) {
    res.status(200).send(todos);
  } else {
    throw err;
  }
});

//delete todo Api
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Add.deleteOne({ _id: id }, (error, data) => {
    if (error) {
      res.status(500).json({
        message: "something wrong in server",
      });
    } else {
      res.status(200).json({
        id: id,
        message: "deleted succesfully",
      });
    }
  });
});

//get single todo item by id Api
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

//edit todo Api
app.patch("/edit/:id", (req, res) => {
  const id = req.params.id;
  // res.send(req.body);
  Add.updateOne({ _id: id }, req.body, (error, data) => {
    if (error) {
      res.send("noooooooooooooooo");
    } else {
      res.send(req.body);
    }
  });
});



/**
 * @Name USER_AUTH
 * @Description all api listing below for user-auth module
 */

//create user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
//create schema model
const Users = mongoose.model("User", userSchema);

app.post("/registeruser", (req, res) => {
  console.log("user detail", req.body);
  const addUser = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  //add to database
  addUser.save(function (err) {
    if (err) {
      throw err;
    } else {
      res.status(200).json({
        data: addUser,
        message: "you have Succesfully register",
      });
    }
  });
});

app.post("/login", async (req, res) => {
  var { email, password } = req.body;
  try {
    const user = await Users.findOne({ email: email });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "user not Found !!!" });
    }
  } catch (err) {
    console.log({ err });
  }
});

app.get("/users", async (req, res) => {
  const user = await Users.find();
  if (user) {
    res.status(200).send(user);
  } else {
    throw err;
  }
});

// pagination qurry api
app.get("/posts", async (req, res) => {
  const user = await Users.find();
  const total = user.length;
  const pageCount = Math.ceil(total / 2);
  let page = parseInt(req.query.p);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }
  res.send({
    page: page,
    pageCount: pageCount,
    total: total,
    posts: user.slice(page * 2 - 2, page * 2),
  });
});

// pagination qurry api
app.get("/xyz", async (req, res) => {
  try {
    const user = await Users.find();
    const total = await Users.count()
    const limit = parseInt(req.query.limit) || 2;
    const pageCount = Math.ceil(total / limit);

    let page = parseInt(req.query.p);
    if (!page) {
      page = 1;
    }
    if (page > pageCount) {
      page = pageCount;
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result =  user.slice(startIndex, endIndex);
    res.send({
      page: page,
      pageCount: pageCount,
      total: total,
      posts: result,
    });
  } catch (e) {
    console.log(e);
  }
});
// pagination qurry api
app.get("/mno", async (req, res) => {
  try {
    const total = await Users.count() // total
    const limit = parseInt(req.query.limit)||2; 
    //const offset = parseInt(req.query.skip)|| 0;
    const pageCount = Math.ceil(total / limit);
  
    let page = parseInt(req.query.p);
    if (!page) {
      page = 1;
    }
    if (page > pageCount) {
      page = pageCount;
    }
    const skipitem = (page-1)*limit
    const result = await Users.find().skip(skipitem).limit(limit)
   
   // const currentPage = Math.ceil(total % offset)
    res.status(200).send({
      data: result,
      total: total,
      pageCount: pageCount,
      currentPage:page
    })
  } catch (e) {
    console.log(e);
  }
});




//server listen on browser for below port i.e htttp://localhost:4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
