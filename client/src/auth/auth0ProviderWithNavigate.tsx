import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import axios from 'axios';

type Props = {
  children: React.ReactNode;
};

export function Auth0ProviderWithNavigate({ children }: Props) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const callbackUri = import.meta.env.VITE_AUTH0_CALLBACK_URI;

  if(!domain || !clientId || !callbackUri){
    throw new Error("Auth not initialized");
  }

  const onRedirectCallback = async(appState?:AppState , user?:User) => {
    try{
      const res = await axios.post("/api/my/user",{
        auth0Id:user?.sub,
        email:user?.email
      })
    }
    catch(err : any){
      throw new Error(err);
    }
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: callbackUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
