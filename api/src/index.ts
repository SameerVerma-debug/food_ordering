import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./utils/connectDB";
import userRouter from "./routes/user";
import checkJwt, { jwtParse } from "./middlewares/checkJwt";

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/health",(req:Request,res:Response) => {
  res.json({message:"Health Ok"});
})

app.use(checkJwt);
app.use(jwtParse);
app.use("/api/my/user", userRouter);



mongoose.connection.once("open", () => {
  console.log("DB CONNECTED");
  app.listen("3000", () => {
    console.log("Server started on port 3000");
  });
});
