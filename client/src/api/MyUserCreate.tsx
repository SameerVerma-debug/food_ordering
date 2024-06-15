import axios from "axios";
import { useMutation } from "react-query";

interface CreateUserRequest {
  auth0Id: String;
  email: String;
}

export function useCreateMyUser() {
  const createMyUserRequest = async (user: CreateUserRequest) => {
    try {
      const res = await axios.post("/api/my/user", {
        auth0Id: user?.auth0Id,
        email: user?.email,
      });
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
