import mongoose from "mongoose";
// Load the Product Model
import User from "../modules/User";
// load db connection
import db from "../modules/db";
// Handle request
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let filter = null;
  try {
    // find usedr based on id or name
    if (event.queryStringParameters.id)
      filter = { _id: event.queryStringParameters.id };
    if (event.queryStringParameters.name)
      filter = { name: event.queryStringParameters.name };

    // Use user.Model to find all users
    const user = await User.findOne(filter),
      response = {
        msg: "User successfully found",
        data: user
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
