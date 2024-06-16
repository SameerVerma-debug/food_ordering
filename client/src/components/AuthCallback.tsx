import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

export function AuthCallback () {
  const navigate = useNavigate();
  const {user} = useAuth0();
  const {createUser} = useCreateMyUser();

  const hasCreatedUser = useRef(false);
  useEffect(() => { 
    if(!hasCreatedUser.current){
      try{
        if (user?.sub && user?.email) {
          createUser({ auth0Id: user.sub, email: user.email });
        }
        hasCreatedUser.current = true;
       navigate("/");
      }
      catch(err:any){
        throw new Error(err);
      }
    }
  },[]);

  return(
    <></>
  )
}