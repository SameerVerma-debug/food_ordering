import { Request, Response } from "express";
import User from "../models/User";

const createUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id, email } = req.body;
    if (!auth0Id || !email) {
      return res.status(400).json({ message: "Email and AuthId are required" });
    }

    const existingUser = await User.findOne({ auth0Id: auth0Id }).exec();
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({
      auth0Id,
      email,
    });

    res.status(201).json(user.toObject());
  } catch (err: any) {
    console.log(err);
    res.status(500);
  }
};

export default createUser;
