import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation } from "react-query";

interface CreateUserRequest {
  auth0Id: String;
  email: String;
}

export function useCreateMyUser() {
  const {getAccessTokenSilently} = useAuth0();
  const createMyUserRequest = async (user: CreateUserRequest) => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${import.meta.env.VITE_API_DEFAULT_URL}/api/my/user`,
        },
      });
      console.log(accessToken);
      const res = await axios.post("/api/my/user", {
        auth0Id: user?.auth0Id,
        email: user?.email,
      },{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      }
    );
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isPaused,
  } = useMutation(createMyUserRequest);

  return { createUser, isLoading, isError, isSuccess, isIdle, isPaused };
}
