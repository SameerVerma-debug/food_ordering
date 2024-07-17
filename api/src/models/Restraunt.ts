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
    trim:true,
    lowercase:true
  },
  city: {
    type: String,
    required: [true, "City is required for restraunt"],
    trim:true,
  },
  country: {
    type: String,
    required: [true, "Country is required for restraunt"],
    trim:true,
  },
  deliveryPrice: {
    type: Number,
    min:0,
    required: true,
  },
  estimatedDeliveryTime: {
    type: Number,
    min:0,
    required:true
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

restrauntSchema.index({name:"text"})

export default mongoose.model("Restraunt", restrauntSchema);
