import mongoose from "mongoose";
// Review Schema
const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorId: mongoose.Schema.Types.ObjectId,
    body: { type: String, required: true },
},{
  timestamps: { createdAt: true, updatedAt: false }
});
// User schema
const schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, "Name field is required"],
      max: 100
    },
    reviewsTodo: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    reviews: [ reviewSchema ]
  },{
  timestamps: { createdAt: true, updatedAt: false }
  }),
  User = mongoose.model("user", schema);

export default User