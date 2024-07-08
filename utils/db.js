import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const uri = process.env.MONGODB_ATLAS;

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Database connection failed");
    console.log(uri);
    process.exit(0);
  }
};

export default connectDb;
