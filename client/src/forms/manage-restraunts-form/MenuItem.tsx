import { FormError } from "@/components/FormError";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

export const MenuItem = ({ register, errors, field, index, remove }: any) => {
  const [image, setImage] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const accessToken = getAccessTokenSilently({
    authorizationParams: {
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
  });
  const handleImageUpload = async(e: Event) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;

    const formData = new FormData();
    console.log(files);
    formData.append("imageFile", files[0]);
    console.log(formData);

    const res = await axios.post(
      "/api/my/upload",
      formData ,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    setImage(res.data);
  };
  return (
    <div className="flex flex-col gap-4 w-full" key={field.id}>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <p>Item Image</p>
          <img
            className="object-cover rounded-xl"
            src={image}
            {...register(`menuItems.${index}.itemImage` as const) }
            alt=""
          />
          <input type="text" defaultValue={image} hidden {...register(`menuItems.${index}.itemImage`)}/>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <label>
            <div className="flex flex-col items-center cursor-pointer">
              <IoCloudUploadOutline size={40} />
              <p>Upload</p>
            </div>
            <input
              type="file"
              hidden
              accept="image/jpeg, image/png, image/webp, image/jpg"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-1 flex-col gap-1 mb-auto">
          <p>Item Name</p>
          <input
            className="p-2 border border-gray-300 rounded-lg"
            type="text"
            {...register(`menuItems.${index}.itemName` as const)}
          />
          {errors?.menuItems?.[index]?.itemName && (
            <FormError
              message={errors?.menuItems?.[index]?.itemName?.message}
            />
          )}
        </div>

        <div className="flex flex-col gap-1 mb-auto">
          <p>Item Price</p>
          <input
            className="p-2 flex-1 border border-gray-300 rounded-lg"
            type="number"
            {...register(`menuItems.${index}.itemPrice` as const)}
          />
          {errors?.menuItems?.[index]?.itemPrice && (
            <FormError
              message={errors?.menuItems?.[index]?.itemPrice?.message}
            />
          )}
        </div>

        <Button
          type="button"
          onClick={() => remove(index)}
          className="bg-red-500 mt-auto w-fit content-center ml-auto mr-auto"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};
