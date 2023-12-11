import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    image: { type: String },
    isApproved: { type: Boolean, default: false, required: true },
    reactions: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        reaction: {
          type: Number,
          default: 0,
        },
      },
    ],
    comments: [
      {
        comments: {
          type: String,
        },
        userName: {
          type: String,
        },
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Content", contentSchema);
