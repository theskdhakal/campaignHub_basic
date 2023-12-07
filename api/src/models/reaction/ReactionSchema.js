import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    contentId: {
      type: mongoose.Types.ObjectId,
      ref: "Content",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactions: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Reaction", reactionSchema);
