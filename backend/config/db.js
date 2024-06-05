import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/myStore");
        console.log(`Successfully connected to MongoDB`);
    }
    catch(error){
        console.error(`ERROR:${error.message}`)
        process.exit(1);
    }
}

export default connectDB;
