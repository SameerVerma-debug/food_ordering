import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation } from "react-query";

interface CreateUserRequest {
  auth0Id: String;
  email: String;
}

interface UpdateUserProfile {
  email: String;
  name: String;
  address?: String;
  city?: String;
  country?: String;
}

export function useCreateMyUser() {
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserRequest = async (user: CreateUserRequest) => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${import.meta.env.VITE_AUTH0_AUDIENCE}`,
        },
      });
      const res = await axios.post(
        "/api/my/user",
        {
          auth0Id: user?.auth0Id,
          email: user?.email,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return res.data;
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

export function useUpdateUser() {
  const { user, getAccessTokenSilently } = useAuth0();
  const updateUserRequest = async (userFormDetails: UpdateUserProfile) => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${import.meta.env.VITE_AUTH0_AUDIENCE}`,
        },
      });

      await axios.patch(
        "/api/my/user",
        {
          auth0Id: user?.sub,
          email: userFormDetails?.email,
          name: userFormDetails?.name,
          address: userFormDetails?.address,
          city: userFormDetails?.city,
          country: userFormDetails?.country,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (err: any) {
      throw new Error(err);
    }
  };
  const {
    mutateAsync: updateUser,
    isError,
    isSuccess,
    isLoading,
  } = useMutation(updateUserRequest);

  return {
    updateUser,
    isError,
    isSuccess,
    isLoading,
  };
}

export function useGetUser() {
  const { user,getAccessTokenSilently } = useAuth0();
  const getUserRequest = async () => {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `${import.meta.env.VITE_AUTH0_AUDIENCE}`,
      },
    });
    const res = await axios.get(`/api/my/user/${user?.sub}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = res.data;
    return {
      email: userData?.email,
      name: userData?.name,
      address: userData?.address,
      city: userData?.city,
      country: userData?.country,
    };
  };

  const {
    mutateAsync: getUser,
    isError,
    isLoading,
  } = useMutation(getUserRequest);

  return { getUser, isError, isLoading };
}
