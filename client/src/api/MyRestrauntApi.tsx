import axios from "axios";
import { useMutation } from "react-query";

export function useGetRestraunt() {
  const handleGetRestraunt = async(id : string) => {
    try{
      const res = await axios.get(`/api/my/restraunt/${id}`);
      return res.data;
    }
    catch(err){
      throw new Error(err as any);
    }
  }

  const {mutateAsync:getRestraunt,isLoading,isError} = useMutation(handleGetRestraunt);

  return {getRestraunt,isLoading,isError};
}