import { Request, Response } from "express";
import Restraunt from "../models/Restraunt";

const getUserRestraunts = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.sendStatus(403);
  }

  try {
    const userRestraunts = await Restraunt.find({ owner: userId }).select(
      "name _id"
    );

    if (!userRestraunts || userRestraunts?.length == 0) {
      return res.sendStatus(404);
    }

    res.json(userRestraunts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getRestraunt = async (req: Request, res: Response) => {
  const {id} = req.params;
  const userId = req.userId;

  if(!id){
    return res.sendStatus(400);
  }

  try{
    const foundRestraunt = await Restraunt.findById(id);

    if(!foundRestraunt){
      return res.sendStatus(404);
    }

    if(foundRestraunt.owner.toString() != userId){
      return res.sendStatus(403);
    }

    return res.json(foundRestraunt);
    }
    catch(err){
      console.log(err);
      res.sendStatus(500)
    }
};

const updateRestraunt = async (req: Request, res: Response) => {
  const {id,name,city,country,deliveryPrice,estimatedDeliveryTime,cuisines,menuItems,image} = req.body;
  const userId = req.userId;
  if(!id || !name || !city || !country || !deliveryPrice 
    || !estimatedDeliveryTime || cuisines?.length <= 0 || menuItems?.length <= 0 || !image){
    return res.sendStatus(400);
  }

  try{
    const foundRestraunt = await Restraunt.findById(id);

    if(!foundRestraunt){
      return res.sendStatus(404);
    }
  
    if(foundRestraunt.owner.toString() != userId){
      return res.sendStatus(403);
    }
    
    foundRestraunt.name = name;
    foundRestraunt.city = city;
    foundRestraunt.country = country;
    foundRestraunt.deliveryPrice = deliveryPrice;
    foundRestraunt.estimatedDeliveryTime = estimatedDeliveryTime;
    foundRestraunt.cuisines = cuisines;
    foundRestraunt.menuItems = menuItems;
    foundRestraunt.image = image;
    foundRestraunt.lastUpdated = new Date();
  
    await foundRestraunt.save();
    return res.json({message:"Restraunt Updated"});
  }
  catch(err){
    console.log(err);
    return res.sendStatus(500);
  }
};

const addRestraunt = async (req: Request, res: Response) => {
  const {name,city,country,deliveryPrice,estimatedDeliveryTime,cuisines,menuItems,image} = req.body;
  const owner = req.userId;
  if(!owner || !name || !city || !country || !deliveryPrice 
    || !estimatedDeliveryTime || cuisines?.length <= 0 || menuItems?.length <= 0 || !image){
    return res.sendStatus(400);
  }

  try{  
    const restraunt = await Restraunt.create({
      owner,
      name,
      city,
      country,
      deliveryPrice,
      estimatedDeliveryTime,
      cuisines,
      menuItems,
      image,
      lastUpdated:new Date()
    });

    return res.json(restraunt);
  }
  catch(err){
    console.log(err);
    res.sendStatus(500);
  }
};

const deleteRestraunt = async (req: Request, res: Response) => {
  const {id} = req.body;

  if(!id){
    return res.sendStatus(400);
  }

  try{
    const result = await Restraunt.findByIdAndDelete(id);
    res.json(result);
  }
  catch(err){
    console.log(err);
    res.sendStatus(500);
  }
};

const restrauntController = {
  getUserRestraunts,
  getRestraunt,
  addRestraunt,
  updateRestraunt,
  deleteRestraunt,
};
export default restrauntController;
