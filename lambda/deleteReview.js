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
      response = {
        msg: "Review successfully deleted"
      };

    await User.updateOne(
      { _id: id },
      { $pull: { reviews: { _id: reviewId } } }
    );

    return {
      statusCode: 200,
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
