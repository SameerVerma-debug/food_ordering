import express from "express";
import restrauntController from "../controllers/restrauntController";
const restrauntRouter = express.Router();

restrauntRouter.get("/", restrauntController.getUserRestraunts);
restrauntRouter.get("/:id", restrauntController.getRestraunt);
restrauntRouter.post("/", restrauntController.addRestraunt);
restrauntRouter.put("/", restrauntController.updateRestraunt);
restrauntRouter.delete("/", restrauntController.deleteRestraunt);

export default restrauntRouter;
