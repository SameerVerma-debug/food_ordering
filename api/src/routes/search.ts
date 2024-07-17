import express from "express";
import mongoose from "mongoose";
import Restraunt from "../models/Restraunt";

const searchRouter = express.Router();

searchRouter.get("/", async (req, res) => {
  const { city, country, page, limit } = req.query;

  if (!city || !country || !page || !limit) {
    return res.json({ message: "Search Params are not provided" }).status(401);
  }

  if (limit && parseInt(limit as string) <= 0) {
    return res.json({ message: "Limit should be greater than 0" }).status(401);
  }

  if (page && parseInt(page as string) <= 0) {
    return res.json({ message: "Page should be greater than 0" }).status(401);
  }

  try {
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const searchQuery = {
      $search: {
        index: "restrauntSearchIndex",
        text: {
          query: `${city} ${country}`,
          path: ["city", "country"],
          fuzzy: {},
        },
      },
    };

    let totalPages = null;
    if(parseInt(page as string) == 1){
      const result = await Restraunt.aggregate([
        searchQuery
      ])

      totalPages = result.length / parseInt(limit as string);
    }

    const restraunts = await Restraunt.aggregate([
      searchQuery,
      {
        $skip: skip,
      },
      {
        $limit: parseInt(limit as string),
      },
    ]);
    
    return res.json({ restraunts, totalPages });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default searchRouter;
