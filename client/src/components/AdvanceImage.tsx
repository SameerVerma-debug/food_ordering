import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  lazyload,
  responsive,
} from "@cloudinary/react";

export const AdvanceImage = ({ photo } : any) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "do1i24kpl",
    },
  });

  const myImage = cld.image(photo);
  return (
    <AdvancedImage cldImg={myImage} plugins={[responsive(), lazyload()]} />
  );
};
