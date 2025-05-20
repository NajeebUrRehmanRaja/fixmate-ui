import mongoose from "mongoose";
import { env } from "./env.config.js"; // make sure the path is correct

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
