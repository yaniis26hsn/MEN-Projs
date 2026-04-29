import mongoose from "mongoose";

const connectDB = async (url) => {
  if (!url) {
    throw new Error("MONGO_URI is missing");
  }

  await mongoose.connect(url);
  console.log("MongoDB connected");
};

export default connectDB;
