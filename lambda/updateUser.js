import mongoose from "mongoose";
// load db connection
import db from "../modules/db";
// Load the Product Model
import User from "../modules/User";

// Handle request
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    let data = JSON.parse(event.body);
    let user = {};

    if (data.data.user.name) user.name = data.data.user.name;
    if (data.data.user.reviewsTodo)
      user.reviewsTodo = data.data.user.reviewsTodo;
    // Parse the ID
    const id = data.data.id;

    const response = {
      msg: "User successfully updated",
      data: user
    };

    // Use User.Model and id to update
    await User.findOneAndUpdate({ _id: id }, user);

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(response)
    };
  } catch (err) {
    console.log("user.update", err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};
