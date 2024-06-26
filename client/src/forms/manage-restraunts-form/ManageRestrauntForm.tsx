import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import DetailsSection from "./DetailsSections";
import { MenuItem } from "./MenuItem";
import { RestrauntImage } from "./RestrauntImage";
import { LoadingButton } from "@/components/LoadingButton";
import { Cuisines } from "./Cuisines";
import { useEffect } from "react";

const schema = yup.object().shape({
  id: yup.string(),
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
  cuisines: yup
    .array(yup.string())
    .min(1, "Please Select atleast one cuisine")
    .required("Cuisines are required"),
  menuItems: yup
    .array(
      yup.object({
        itemName: yup.string().required("Enter name for item"),
        itemPrice: yup
          .number()
          .typeError("Must be a number")
          .positive("Must be positive")
          .integer("Must be an integer")
          .required("Enter price for item")
          .min(1, "Price should be positive"),
        itemImage: yup.string().required("Item Image is Required"),
      })
    )
    .min(1, "Add1")
    .required("Add ateast 1 menu item"),
  image: yup.string().required("Image is required"),
});

export type restrauntFormData = yup.InferType<typeof schema>;

interface Props {
  formData: restrauntFormData | null | undefined;
  onSave(data: restrauntFormData): void;
  isLoading: Boolean;
}

const ManageRestrauntForm = ({ formData, onSave, isLoading }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    setValue,
    reset,
  } = useForm<restrauntFormData>({
    resolver: yupResolver(schema),
    defaultValues: formData
      ? formData
      : {
          cuisines: [],
          menuItems: [{ itemImage: "", itemName: "", itemPrice: 1 }],
        },
  });

  useEffect(() => {
    if (formData) {
      reset(formData);
    }
  }, [formData, reset]);

  const { fields, append, remove } = useFieldArray({
    name: "menuItems",
    control,
  });

  const handleRestrauntSave = async (data: restrauntFormData) => {
    onSave(data);
  };
  console.log(errors.menuItems?.message);
  return (
    <div className="m-4 p-2 h-full flex-1">
      <form onSubmit={handleSubmit(handleRestrauntSave)}>
        <div className="flex flex-col gap-8">
          <DetailsSection register={register} errors={errors} />
          <Cuisines control={control} errors={errors} />

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
                    setValue={setValue}
                    itemImage={
                      formData ? formData?.menuItems[index]?.itemImage : ""
                    }
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
          <RestrauntImage
            setValue={setValue}
            errors={errors}
            restrauntImage={formData ? formData?.image : ""}
          />

          {isLoading ? (
            <LoadingButton />
          ) : formData ? (
            <>
              <Button size="lg" className="hover:bg-orange-500">
                Save
              </Button>
              <Button  type="button" variant="destructive">Delete</Button>
            </>
          ) : (
            <Button size="lg" className="hover:bg-orange-500">
              Save
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ManageRestrauntForm;
