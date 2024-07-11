import express from "express";
import mongoose from "mongoose";
import Restraunt from "../models/Restraunt";

const searchRouter = express.Router();

searchRouter.get("/", async (req, res) => {
  const { city, country, page, limit } = req.query;

  if (!city || !country || !page || !limit) {
    return res.json({ message: "Search Params are not provided" }).status(401);
  }

  if (limit && Number(limit) <= 0) {
    return res.json({ message: "Limit should be greater than 0" }).status(401);
  }

  if (page && Number(page) <= 0) {
    return res.json({ message: "Page should be greater than 0" }).status(401);
  }

  try {
    const skip = (Number(page) - 1) * Number(limit);
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
    if(Number(page) == 1){
      const result = await Restraunt.aggregate([
        searchQuery
      ])

      totalPages = result.length;
    }

    const restraunts = await Restraunt.aggregate([
      searchQuery,
      {
        $skip: skip,
      },
      {
        $limit: Number(limit),
      },
    ]);
    
    return res.json({ restraunts, totalPages });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default searchRouter;
