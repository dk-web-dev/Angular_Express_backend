const express = require("express");
const router = express.Router();

const Add = require('../model/crudModel') //<==========import ADD TODO model

/**  Crud operation api listing here **/

//add Todo POST Method Api
router.post("/add", (req, res) => {
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
  router.get("/todolist", async (req, res) => {
    const todos = await Add.find();
    if (todos) {
      res.status(200).send(todos);
    } else {
      throw err;
    }
  });
  
  //delete todo Api
  router.delete("/delete/:id", (req, res) => {
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
  router.get("/todolist/:id", (req, res) => {
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
  router.patch("/edit/:id", (req, res) => {
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
  


module.exports=router;