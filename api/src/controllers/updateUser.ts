import { Request, Response } from "express";
import User from "../models/User";

const updateUser = async(req:Request,res:Response) => {
  const {auth0Id,email,name,address,city,country} = req.body;
  if(!auth0Id || !email || !name){
    return res.sendStatus(400);
  }

  const filter = {auth0Id};
  const update = {email,name,address,city,country};

  await User.findOneAndUpdate(filter,update);
  return res.status(200).json({message:"Profile Successfully Updated"});
}

export default updateUser