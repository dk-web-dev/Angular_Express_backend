const express = require("express");
const router = express.Router();

// post method form TDF form approach
router.post("/user", (req, res) => {
    console.log("server", req.body);
    res.status(200).send({
      data: req.body,
      message: "data recieved",
    });
  });
  
  router.post("/customer", (req, res) => {
    console.log("server", req.body);
    res.status(200).send({
      data: req.body,
      message: "customer data recieved",
    });
  });
  
  //psot method for Reactive form approach
  router.post("/register", (req, res) => {
    console.log("server", req.body);
    res.status(200).send({
      data: req.body,
      message: "data recieved",
    });
  });
  
  // POST method form client form
  router.post("/client", (req, res) => {
    console.log("server", req.body);
    res.status(200).send({
      data: req.body,
      message: " client data recieved",
    });
  });


  module.exports = router;