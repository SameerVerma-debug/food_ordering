import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./utils/connectDB";
import userRouter from "./routes/user";
import userRestrauntRouter from "./routes/user-restraunt";
import searchRouter from "./routes/search";
import checkJwt, { jwtParse } from "./middlewares/checkJwt";
import {v2 as cloudinary} from "cloudinary";
import "dotenv/config";
import uploadRouter from "./routes/upload";
import bodyParser from "body-parser";
import searchRestrauntRouter from "./routes/searchRestraunts";
import restrauntRouter from "./routes/restraunt";
import checkoutRouter from "./routes/checkout";
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})

const app = express();
connectDB();

cloudinary.config({
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME
})

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.static(''));
app.use(cors());
app.use(limiter)

app.get("/health",(req:Request,res:Response) => {
  res.json({message:"Health Ok"});
})

app.use("/api/my/upload",uploadRouter);
app.use("/api/my/search",searchRouter);
app.use("/api/my/search/restraunt",searchRestrauntRouter);
app.use("/api/my/restraunt",restrauntRouter);

app.use(checkJwt);
app.use(jwtParse);
app.use("/api/my/user", userRouter);
app.use("/api/my/user-restraunt", userRestrauntRouter);
app.use("/api/my/create-checkout-session",checkoutRouter);

mongoose.connection.once("open", () => {
  console.log("DB CONNECTED");
  app.listen("3000", () => {
    console.log("Server started on port 3000");
  });
});
