import { Request, Response } from "express";
import User from "../models/User";

const getUser = async(req:Request,res:Response) => {
  const userId = req.userId;

  if(!userId){
    return res.sendStatus(403);
  }

  const user = await User.findById(userId);
  if(!user){
    return res.sendStatus(404);
  }

  return res.json(user);
}

export default getUser;