require("dotenv").config();
const express = require("express"); //import express package
var bodyParser = require("body-parser"); // import body-parser package
var cors = require("cors"); // import cors package

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(express.json());

const port = process.env.PORT;

//connect to mongodb
const db = require("./src/config/db.config");

//access the router
const formRouter = require("./src/router/formRouter");
app.use(formRouter);

const crudRouter = require("./src/router/crudRouter");
app.use(crudRouter);

const userAuthRouter = require("./src/router/userAuthRouter");
app.use(userAuthRouter);

app.get("/", (req, res) => {
  res.send("Hello World from Angular backend server!");
});

//server listen on browser for below port i.e htttp://localhost:4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
