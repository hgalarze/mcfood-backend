import mongoose from "mongoose";
import { MONGODB_CONNECTION_STRING } from "./../../config.js";

export const connectDB = async () => {

    try {
        console.info(`Connecting to database...`);
        await mongoose.connect(`${MONGODB_CONNECTION_STRING}`);
        console.info(`Connected to database: ${MONGODB_CONNECTION_STRING}`);
    } catch(error) {
        console.error("Error connecting to database", error);
        process.exit(1);
    }
}