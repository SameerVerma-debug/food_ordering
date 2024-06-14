import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.DATABASE_URI as string);
  }
  catch(err){
    throw new Error(err as any);
  }
}

export default connectDB;