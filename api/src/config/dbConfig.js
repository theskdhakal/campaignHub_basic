import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(process.env.MONGO_CLIENT);
    const conn = await mongoose.connect(process.env.MONGO_CLIENT);

    if (conn) {
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.log(error);
  }
};
