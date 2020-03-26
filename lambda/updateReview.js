import mongoose from "mongoose";
// Load the Product Model
import User from "../modules/User";
// load db connection
import db from "../modules/db";
// Handle request
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    // Parse the ID
    const data = JSON.parse(event.body),
      id = data.id,
      reviewId = data.reviewId,
      reviewBody = data.reviewBody,
      response = {
        msg: "User successfully updated",
        data: reviewBody
      };
    await User.updateOne(
      { _id: id, "reviews._id": reviewId },
      { $set: { "reviews.$.body": reviewBody } }
    );

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
