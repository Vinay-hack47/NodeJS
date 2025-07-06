import mongoose from "mongoose";

export const connectDB = async (req, res) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/assignment5");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
