import mongoose from "mongoose";
import { env } from "./env.config";

export const connectDB = async() =>{
    try{
        const connect = await mongoose.connect(env.MONGO_URI, {
            dbName: "FixMate",
        });
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch(error) {
        console.log("Something Went Wrong While Connecting to DB", error);
        proccess.exit(1);
    }
}