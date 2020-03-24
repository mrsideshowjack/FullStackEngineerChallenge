import mongoose from "mongoose";
// Review Schema
const reviewSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    authorId: { type: String, required: true },
    body: { type: String, required: true }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);
// User schema
const schema = new mongoose.Schema(
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: {
        type: String,
        required: [true, "Name field is required"],
        max: 100
      },
      reviewsTodo: [String],
      reviews: [reviewSchema]
    },
    {
      timestamps: { createdAt: true, updatedAt: false }
    }
  ),
  User = mongoose.model("user", schema);

export default User;
