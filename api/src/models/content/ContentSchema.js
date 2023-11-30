import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },

  userName: { type: String, require: true },
});
