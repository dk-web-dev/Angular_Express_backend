require("dotenv").config();
const mongoose = require("mongoose"); // import mongoose package


//connect to mongodb
mongoose.connect( process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//check mongodb  connect or not
const db = mongoose.connection;
db.on("error", (err) => {
    console.log("database is not connected");
  });
  
  db.on("connected", (err, res) => {
    console.log("database is connected");
  });
