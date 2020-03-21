import mongoose from "mongoose";

// Load the server
import db from '../modules/db'
// Load the Product Model
import User from '../modules/User'

// Handle request
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    // Parse the ID
    const data = JSON.parse(event.body),
          id = data.id,
          reviewId = data.reviewId,
          response = {
            msg: "Review successfully deleted"
          }
    await User.updateOne({"_id": id}, {'$pull': {'reviews':{ '_id': reviewId }}})

    
    return {
      statusCode: 200,
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