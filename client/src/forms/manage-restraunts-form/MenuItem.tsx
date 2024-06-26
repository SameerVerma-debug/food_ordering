import { useUploadImage } from "@/api/MyUploadApi";
import { AdvanceImage } from "@/components/AdvanceImage";
import { FormError } from "@/components/FormError";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

export const MenuItem = ({
  register,
  errors,
  field,
  index,
  remove,
  setValue,
  itemImage,
}: any) => {
  const [image, setImage] = useState("");
  const { uploadImage, isLoading } = useUploadImage();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    const data = await uploadImage(files);
    setImage(data);
    setValue(`menuItems.${[index]}.itemImage`, data);
  };

  return (
    <div className="flex flex-col gap-4 w-full" key={field.id}>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <p>Item Image</p>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <AdvanceImage photo={!image ? itemImage : image} />

              {errors.menuItems?.[index]?.itemImage && (
                <FormError
                  message={errors?.menuItems?.[index]?.itemImage?.message}
                />
              )}
            </>
          )}
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

        {index >= 1 && (
          <Button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-500 mt-auto w-fit content-center ml-auto mr-auto"
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};
