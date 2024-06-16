import express from "express";
import createUser from "../controllers/createUser";
import updateUser from "../controllers/updateUser";
import getUser from "../controllers/getUser";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.patch("/", updateUser)
userRouter.get("/:auth0Id", getUser);

export default userRouter;