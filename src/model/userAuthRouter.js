var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//create user schema
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
  });
  
  //create schema model
  const Users = mongoose.model("User", userSchema);

module.exports = Users;