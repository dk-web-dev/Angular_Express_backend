const express = require("express");
const router = express.Router();

const Users = require("../model/userAuthRouter");

/**
 * @Name USER_AUTH
 * @Description all api listing below for user-auth module
 */

router.post("/registeruser", (req, res) => {
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

router.post("/login", async (req, res) => {
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

router.get("/users", async (req, res) => {
  const user = await Users.find();
  if (user) {
    res.status(200).send(user);
  } else {
    throw err;
  }
});

// pagination qurry api
router.get("/posts", async (req, res) => {
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
router.get("/xyz", async (req, res) => {
  try {
    const user = await Users.find();
    const total = await Users.count();
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
    const result = user.slice(startIndex, endIndex);
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
router.get("/mno", async (req, res) => {
  try {
    const total = await Users.count(); // total
    const limit = parseInt(req.query.limit) || 2;
    //const offset = parseInt(req.query.skip)|| 0;
    const pageCount = Math.ceil(total / limit);

    let page = parseInt(req.query.p);
    if (!page) {
      page = 1;
    }
    if (page > pageCount) {
      page = pageCount;
    }
    const skipitem = (page - 1) * limit;
    const result = await Users.find().skip(skipitem).limit(limit);

    // const currentPage = Math.ceil(total % offset)
    res.status(200).send({
      data: result,
      total: total,
      pageCount: pageCount,
      currentPage: page,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
