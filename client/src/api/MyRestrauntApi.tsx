import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

interface RestrauntData {
  _id?: string | null | undefined;
  menuItems:
    | {
        itemName: string;
        itemPrice: number;
        itemImage: string;
      }[]
    | undefined;
  image: string;
  name: string;
  city: string;
  country: string;
  estimatedDeliveryTime: number;
  deliveryPrice: number;
  cuisines: (string | undefined)[];
}

export function useAddRestraunt() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const handleAddRestraunt = async (data: RestrauntData) => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });
      await axios.post("/api/my/restraunt", data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toast.success("Restraunt Successfully Added");
      navigate("/user-restraunts");
    } catch (err) {
      throw new Error(err as any);
    }
  };

  const {
    mutateAsync: addRestraunt,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(handleAddRestraunt);

  return {
    addRestraunt,
    isLoading,
    isError,
    isSuccess,
  };
}

export function useGetUserRestraunts() {
  const { getAccessTokenSilently } = useAuth0();
  const handleGetUserRestraunts = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });

      const res = await axios.get("/api/my/restraunt", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return res.data;
    } catch (err) {
      throw new Error(err as any);
    }
  };

  const {
    mutateAsync: getUserRestraunts,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(handleGetUserRestraunts);

  return {
    getUserRestraunts,
    isLoading,
    isError,
    isSuccess,
  };
}

export function useGetRestraunt() {
  const { getAccessTokenSilently } = useAuth0();
  const handleGetRestraunt = async (id: string) => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });

      const res = await axios.get(`/api/my/restraunt/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return res.data;
    } catch (err) {
      throw new Error(err as any);
    }
  };

  const {
    mutateAsync: getRestraunt,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(handleGetRestraunt);

  return { getRestraunt, isLoading, isError, isSuccess };
}

export function useUpdateRestraunt() {
  const { getAccessTokenSilently } = useAuth0();
  const handleUpdateRestraunt = async (data: RestrauntData) => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
      });

      await axios.put("/api/my/restraunt", data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toast.success("Restraunt Details Updated");
    } catch (err) {
      throw new Error(err as any);
    }
  };

  const {
    mutateAsync: updateRestraunt,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(handleUpdateRestraunt);
  return { updateRestraunt, isLoading, isError, isSuccess };
}

export function useDeleteRestraunt() {
  const {getAccessTokenSilently} = useAuth0();
  const navigate = useNavigate();
  const handleDeleteRestraunt = async(id:String) =>{
    try{
      const accessToken = await getAccessTokenSilently({
        authorizationParams:{
          audience:import.meta.env.VITE_AUTH0_AUDIENCE
        }
      });
      const res = await axios.delete(`/api/my/restraunt/${id}`,{
          headers:{
            Authorization:`Bearer ${accessToken}`
          }
      })

      console.log(res);
      navigate("/user-restraunts");
    }
    catch(err){
      throw new Error(err as any);
    }
  }

  const{
    mutateAsync:deleteRestraunt,
    isLoading,
    isError,
    isSuccess
  } = useMutation(handleDeleteRestraunt);

  return {deleteRestraunt,isLoading,isSuccess,isError}
}