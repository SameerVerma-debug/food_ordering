import { Request, Response } from "express";
import User from "../models/User";

const updateUser = async (req: Request, res: Response) => {
  const { name, address, city, country } = req.body;
  const userId = req.userId;
  if (!userId || !address || !city || !country || !name) {
    return res.sendStatus(400);
  }

  const update = { name, address, city, country };

  await User.findByIdAndUpdate(userId, update);
  return res.status(200).json({ message: "Profile Successfully Updated" });
};

export default updateUser;
