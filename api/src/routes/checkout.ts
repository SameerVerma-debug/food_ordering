import express from "express";
import handleCheckout from "../controllers/checkout";

const checkoutRouter = express.Router();

checkoutRouter.post("/", handleCheckout);

export default checkoutRouter;
