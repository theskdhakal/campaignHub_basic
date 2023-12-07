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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Content", contentSchema);
