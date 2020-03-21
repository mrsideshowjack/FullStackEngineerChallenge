import mongoose from "mongoose";
// Initialize connection to database
// const dbUrl = process.env.MONGODB_URI,
const  dbOptions = {
    useNewUrlParser: true,
    useFindAndModify: false
  };
// Set DB from mongoose connection
mongoose.connect('mongodb://root:UquLi2_6mAbTW8%40@ds261136.mlab.com:61136/paypay', dbOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default db