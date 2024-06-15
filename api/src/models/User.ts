import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
  auth0Id:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    trim:true,
  },
  name:{
    type:String
  },
  addressLine1:{
    type:String,
    trim:true
  },
  city:{
    type:String,
    trim:true
  },
  country:{
    type:String,
    trim:true
  }
})

const User = mongoose.model("User",userSchema);
export default User;