import mongoose from "mongoose";
const { Schema } = mongoose;

const restrauntSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name is required for Restraunt"],
  },
  city: {
    type: String,
    required: [true, "City is required for restraunt"],
  },
  country: {
    type: String,
    required: [true, "Country is required for restraunt"],
  },
  deliveryPrice: {
    type: Number,
    required: true,
  },
  estimatedDeliveryTime: {
    type: Number,
  },
  cuisines: [
    {
      type: String,
      required: true,
    },
  ],
  menuItems: [
    {
      itemName: { type: String, required: true },
      itemPrice: { type: Number, required: true },
      itemImage: { type: String },
    },
  ],
  image: {
    type: String,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Restraunt", restrauntSchema);
