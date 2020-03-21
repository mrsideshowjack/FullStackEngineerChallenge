import mongoose from "mongoose";

// Load the server
import db from '../modules/db'
// Load the Product Model
import User from '../modules/User'

// Handle request
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  console.log(event.body);
  
  try {
    // Parse the ID
    const data = JSON.parse(event.body),
          id = data.id,
          authorId = data.authorId,
          reviewBody = data.reviewBody,
          review = {
            _id: mongoose.Types.ObjectId(),
            authorId,
            body: reviewBody
          },
          response = {
            msg: "User successfully updated",
            data: review
          }
    console.log(data);
    
    // Use User.Model and id to update 
    await User.findOneAndUpdate({"_id": id}, { $push: { reviews: review } })
    
    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch(err) {
    console.log('user.update', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}