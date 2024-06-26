import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation } from "react-query";

export function useUploadImage() {
  const { getAccessTokenSilently } = useAuth0();
  const handleUploadImage = async (files: FileList) => {
    const formData = new FormData();
    formData.append("imageFile", files[0]);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const res = await axios.post("/api/my/upload", formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return res.data;
    } catch (err) {
      throw new Error(err as any);
    }
  };

  const {
    mutateAsync: uploadImage,
    isLoading,
    isError,
    isIdle,
    isSuccess,
  } = useMutation(handleUploadImage);

  return {uploadImage,isLoading,isError,isIdle,isSuccess}
}
