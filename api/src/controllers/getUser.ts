import { Request, Response } from "express";
import User from "../models/User";

const getUser = async(req:Request,res:Response) => {
  const {auth0Id} = req.params;

  if(!auth0Id){
    return res.sendStatus(403);
  }

  const user = await User.findOne({auth0Id}).select({auth0id:0,_id:0});
  if(!user){
    return res.sendStatus(404);
  }

  return res.json(user);
}

export default getUser;