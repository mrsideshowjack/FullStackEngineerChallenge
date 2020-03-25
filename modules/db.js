import mongoose from "mongoose";
require("dotenv").config();
// Initialize connection to database
const dbUrl = process.env.MONGODB_URI,
  dbOptions = {
    useNewUrlParser: true,
    useFindAndModify: false
  };

console.log(dbUrl);

mongoose.set("debug", true);
// Set DB from mongoose connection
mongoose.connect(dbUrl, dbOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default db;
