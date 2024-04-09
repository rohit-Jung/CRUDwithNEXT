import mongoose from "mongoose";
import { DB_NAME } from "@/Constants";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`Connected to MongoDB:  ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to Mongo DB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
