import express from "express";
import restrauntController from "../controllers/restrauntController";
const restrauntRouter = express.Router();

restrauntRouter.get("/:id",restrauntController.getRestraunt);

export default restrauntRouter;