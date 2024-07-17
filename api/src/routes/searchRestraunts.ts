import express from "express";
import handleSearchRestraunt from "../controllers/searchRestraunt";

const searchRestrauntRouter = express.Router();

searchRestrauntRouter.get("/", handleSearchRestraunt);

export default searchRestrauntRouter;
