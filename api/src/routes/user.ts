import express from "express";
import User from "../models/User";
import createUser from "../controllers/createUser";

const userRouter = express.Router();

userRouter.post("/", createUser);

export default userRouter;