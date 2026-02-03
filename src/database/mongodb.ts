import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected!");
    }catch(error){
        console.error("Database error:", error);
        process.exit(1); // Exit process with failure
    }
}

// export const connectDBTest = async () => {
//     const testUri = MONGO_URI + "_test"; // Use a separate test database
//     try{
//         await mongoose.connect(testUri);
//         console.log("MongoDB Test Database connected!");
//     }catch(error){
//         console.error("Database error:", error);
//         process.exit(1); // Exit process with failure
//     }
// }