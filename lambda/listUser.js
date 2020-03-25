import mongoose from "mongoose";
// Load the Product Model
import User from "../modules/User";
// load db connection
import db from "../modules/db";

// Handle request
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    // Use user.Model to find all users
    const users = await User.find(),
      response = {
        msg: "Users successfully found",
        data: users
      };

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};
