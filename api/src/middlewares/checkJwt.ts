import { Request,Response,NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/User";

//Adding auth0 and userId types to express Request Interface
declare global{
  namespace Express{
    interface Request{
      auth0Id:String,
      userId:String
    }
  }
}

const checkJwt = auth({
  audience: 'http://localhost:3000/api/my/user',
  issuerBaseURL: 'https://dev-nbl6ke8i55u228gb.us.auth0.com',
  tokenSigningAlg: 'RS256'
})

export const jwtParse = async(req:Request,res:Response,next:NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization as string;
  
  if(!authHeader){
    return res.sendStatus(403);
  }

  const token = authHeader.split(" ")[1];
  try{
    const decoded = jwt.decode(token);
    const auth0Id = decoded?.sub
    const user = await User.findOne({auth0Id});

    if(!user){
      return res.sendStatus(404);
    }

    const userId = user._id.toString();

    req.auth0Id = auth0Id as String; //Telling that it will always be a string
    req.userId = userId;
    next();
  } 
  catch(err){
    console.log(err);
    return res.sendStatus(500);
  }
}

export default checkJwt;