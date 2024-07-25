import { Request, Response } from "express";
import "dotenv/config";
const stripe = require("stripe")(
  `${process.env.STRIPE_SECRET_KEY}`
);

interface MenuItem {
  0: string;
  1: {
    name: string;
    price: number;
    quantity: number;
  };
}

const handleCheckout = async (req:Request, res:Response) => {
  const { items } = req.body;
  console.log(items);

  const lineItems = items.map((item: MenuItem) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item[1].name,
      },
      unit_amount: item[1].price * 100,
    },
    quantity: item[1].quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  res.json({ id: session.id });
}

export default handleCheckout;