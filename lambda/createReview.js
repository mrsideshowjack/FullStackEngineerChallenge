import mongoose from "mongoose";
// load db connection
import db from "../modules/db";
// Load the Product Model
import User from "../modules/User";

// Handle request
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event.body);

  try {
    // Parse the ID
    const data = JSON.parse(event.body),
      user = data.data.user,
      authorId = data.data.authorId,
      reviewBody = data.data.reviewBody,
      review = {
        _id: mongoose.Types.ObjectId(),
        authorId: authorId,
        body: reviewBody
      },
      response = {
        msg: "User successfully updated",
        data: review
      };

    // Use User.Model and id to update
    await User.findOneAndUpdate({ name: user }, { $push: { reviews: review } });

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
