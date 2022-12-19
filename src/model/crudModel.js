var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const AddSchema = new Schema({
  title: String,
  description: String,
});

const Add = new mongoose.model("Add", AddSchema);

module.exports = Add;