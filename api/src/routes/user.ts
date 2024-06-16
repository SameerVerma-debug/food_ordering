import express from "express";
import createUser from "../controllers/createUser";
import updateUser from "../controllers/updateUser";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.patch("/", updateUser)

export default userRouter;