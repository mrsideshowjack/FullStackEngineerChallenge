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
    const id = event.body,
          response = {
            msg: "User successfully deleted"
          }
    
    // Use User.Model to delete 
    await User.findOneAndDelete({"_id": id })
    
    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch(err) {
    console.log('user.delete', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}