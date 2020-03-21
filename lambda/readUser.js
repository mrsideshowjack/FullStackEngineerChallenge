import mongoose from "mongoose";

// Load the server
import db from "../modules/db";
// Load the Product Model
import User from "../modules/User";

// Handle request
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event.queryStringParameters);

  let filter = null;
  try {
    const data = event.queryStringParameters;
    console.log(data);

    // find usedr based on id or name
    if (data.id) filter = { _id: data.id };
    if (data.name) filter = { name: data.name };

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
