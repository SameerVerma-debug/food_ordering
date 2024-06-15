import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./utils/connectDB";
import userRouter from "./routes/user";

const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/my/user", userRouter);

app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Working!!" });
});

mongoose.connection.once("open", () => {
  console.log("DB CONNECTED");
  app.listen("3000", () => {
    console.log("Server started on port 3000");
  });
});
