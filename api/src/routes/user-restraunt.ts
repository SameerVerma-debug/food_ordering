import express from "express";
import restrauntController from "../controllers/restrauntController";
const userRestrauntRouter = express.Router();

userRestrauntRouter.get("/", restrauntController.getUserRestraunts);
userRestrauntRouter.get("/:id", restrauntController.getUserRestraunt);
userRestrauntRouter.post("/", restrauntController.addRestraunt);
userRestrauntRouter.put("/", restrauntController.updateRestraunt);
userRestrauntRouter.delete("/:id", restrauntController.deleteRestraunt);

export default userRestrauntRouter;
