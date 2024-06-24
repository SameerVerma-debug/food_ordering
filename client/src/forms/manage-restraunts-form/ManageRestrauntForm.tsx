import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/FormError";
import { devNull } from "os";
import { IoCloudUploadOutline } from "react-icons/io5";
import DetailsSection from "./DetailsSections";
import { MenuItem } from "./MenuItem";

const schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  city: yup.string().required("City is Required"),
  country: yup.string().required("Country is Required"),
  deliveryPrice: yup
    .number()
    .typeError("Delivery Price must be a number")
    .positive("Must be a positive number")
    .integer("Must be a integer")
    .required("Delivery Price is required"),
  estimatedDeliveryTime: yup
    .number()
    .typeError("Delivery Time must be a number")
    .positive("Must be a positive value")
    .integer("Must be a integer")
    .required("Delivery Time is Required"),
  // cuisines: yup
  //   .array(yup.string())
  //   .min(1, "Please Select atleast one cuisine")
  //   .required("Cuisines are required"),
  menuItems: yup.array(
    yup.object({
      itemName: yup.string().required("Enter name for item"),
      itemPrice: yup
        .number()
        .typeError("Must be a number")
        .positive("Must be positive")
        .integer("Must be an integer")
        .required("Enter price for item")
        .min(1, "Price should be positive"),
      itemImage: yup.string(),
    })
  ),
  //image: yup.mixed().required("Image is required"),
});

type restrauntFormData = yup.InferType<typeof schema>;

const ManageRestrauntForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm<restrauntFormData>({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "menuItems",
    control,
  });

  const handleRestrauntSave = (data: restrauntFormData) => {
    console.log("hi");
    console.log(data);
  };

  return (
    <div className="m-4 p-2">
      <form onSubmit={handleSubmit(handleRestrauntSave)}>
        <div className="flex flex-col gap-8">
          <DetailsSection register={register} errors={errors} />

          <div className="flex flex-col gap-4">
            <div>
              <h1 className="font-bold text-2xl">Menu Items</h1>
              <p className="text-gray-500">
                Add Items which are available on your menu
              </p>
            </div>
            <div className="flex flex-col gap-8 lg:w-[50%]">
              {fields.map((field, index) => {
                return (
                  <MenuItem
                    register={register}
                    errors={errors}
                    field={field}
                    index={index}
                    remove={remove}
                  />
                );
              })}
              <Button
                className="bg-orange-500 w-fit"
                type="button"
                onClick={() =>
                  append({ itemName: "", itemPrice: 1, itemImage: "" })
                }
              >
                Add New Item
              </Button>
            </div>
          </div>

          <Button size="lg" className="hover:bg-orange-500">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManageRestrauntForm;
