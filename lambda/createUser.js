import mongoose from "mongoose";
// load db connection
import db from "../modules/db";
// Load the Product Model
import User from "../modules/User";

// Handle request
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const data = JSON.parse(event.body),
      name = data.data.name,
      reviews = new Array(),
      reviewsTodo = new Array(),
      id = mongoose.Types.ObjectId(),
      user = {
        _id: id,
        name: name,
        reviews: reviews,
        reviewsTodo: reviewsTodo,
        __v: 0
      },
      response = {
        msg: "User successfully created",
        data: user
      };

    // Use user.Model to create a new user
    await User.create(user);
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(response)
    };
  } catch (err) {
    console.log("user.create", err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};
