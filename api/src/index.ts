import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./utils/connectDB";
import userRouter from "./routes/user";
import restrauntRouter from "./routes/restraunt";
import checkJwt, { jwtParse } from "./middlewares/checkJwt";
import {v2 as cloudinary} from "cloudinary";
import "dotenv/config";

const app = express();
connectDB();

cloudinary.config({
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/health",(req:Request,res:Response) => {
  res.json({message:"Health Ok"});
})

app.use("/api/my/restraunt", restrauntRouter);

app.use(checkJwt);
app.use(jwtParse);
app.use("/api/my/user", userRouter);

mongoose.connection.once("open", () => {
  console.log("DB CONNECTED");
  app.listen("3000", () => {
    console.log("Server started on port 3000");
  });
});
