import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection SUCCESS");
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};
