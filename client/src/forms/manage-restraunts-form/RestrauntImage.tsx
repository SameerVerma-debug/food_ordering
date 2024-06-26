import { useUploadImage } from "@/api/MyUploadApi";
import { AdvanceImage } from "@/components/AdvanceImage";
import { FormError } from "@/components/FormError";
import { Loading } from "@/components/Loading";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

export function RestrauntImage({ setValue,errors, restrauntImage }: any) {
  const { uploadImage, isLoading } = useUploadImage();
  const [image, setImage] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.target as HTMLInputElement;
      const files = target.files as FileList;
      const data = await uploadImage(files);
      setImage(data);
      setValue("image", data);
    } catch (err) {
      throw new Error(err as any);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-2xl ">Restraunt Image</h1>
        <p className="text-gray-500">Upload image for your restraunt</p>
        {errors?.image && <FormError message={errors.image?.message}/>}
      </div>

      <div className="flex items-center justify-center form-image">
        {isLoading ? <Loading /> : <AdvanceImage photo={!image ? restrauntImage : image}/>}
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
  );
}
