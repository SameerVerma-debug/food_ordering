import { Request, Response } from "express";
import { cuisineList } from "../../utils/cuisines";
import Restraunt from "../models/Restraunt";

const handleSearchRestraunt = async (req:Request, res:Response) => {
  try{
    const page = parseInt(req.query.page as string) - 1 || 0;
    const limit = parseInt(req.query.limit as string) || 15;
    const name = req.query.name || "";
    const city = req.query.city || "";
    const country = req.query.country || "";
    const sort = req.query.sort as string;
    const cuisines = req.query.cuisines || cuisineList;
  
    let sortBy = {};
    if(sort !== "default"){
      sortBy = {
        [sort] : "asc"
      }
    }
  
    const restraunts = await Restraunt.find({
      name: { $regex: name, $options: "i" },
      city: { $regex: city, $options: "i" },
      country: { $regex: country, $options: "i" },
    })
      .where("cuisines")
      .in(cuisines as [string])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit)
    

    let totalPages = await Restraunt.countDocuments({
      cuisines:{$in:cuisines},
      name: { $regex: name, $options: "i" },
      city: { $regex: city, $options: "i" },
      country: { $regex: country, $options: "i" },
    });

    totalPages /= limit;
    
    res.status(200).json({restraunts,totalPages});
  }
  catch(err){
    console.log(err);
    return res.sendStatus(500);
  }
}

export default handleSearchRestraunt