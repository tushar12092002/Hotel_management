const mongoose = require("mongoose");

// Define connection URL
const mongoURL = "mongodb://localhost:27017/my_databse"; //my_databse is name of databse

// Set up Mongodb connection
mongoose.connect(mongoURL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

// get default connection
// Mongoose maintains a default connection object representing mongodb connection
const db = mongoose.connection;

// define event Listeners for databse connection
db.on("connected", () => {
  console.log("connected to databse");
});

db.on("error", () => {
  console.log("error");
});

db.on("disconnected", () => {
  console.log(" disconnected....");
});

// export databse connection
