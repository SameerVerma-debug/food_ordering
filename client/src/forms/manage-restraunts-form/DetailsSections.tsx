import { FormError } from "@/components/FormError";

interface Props {
  register:any
  errors: any
}

const DetailsSection = ({register,errors}:Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-2xl ">Restraunt Description</h1>
        <p className="text-gray-500">
          Add Some Basic Details about your restraunt
        </p>
      </div>
      <div>
        <p>Name</p>
        <input
          className="p-2 border rounded-lg w-full border-gray-300 mt-2"
          type="text"
          placeholder="restraunt name"
          {...register("name")}
        />
        <FormError message={errors?.name?.message} />
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex-1">
          <p>City</p>
          <input
            className="p-2 border rounded-lg w-full border-gray-300 mt-2"
            type="text"
            placeholder="restraunt city"
            {...register("city")}
          />
          <FormError message={errors?.city?.message} />
        </div>

        <div className="flex-1">
          <p>Country</p>
          <input
            className="p-2 border rounded-lg w-full border-gray-300 mt-2"
            type="text"
            placeholder="restraunt country"
            {...register("country")}
          />
          <FormError message={errors?.country?.message} />
        </div>
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex-1">
          <p>Estimated Delivery time (minutes)</p>
          <input
            className="p-2 border rounded-lg w-full border-gray-300 mt-2"
            type="number"
            {...register("estimatedDeliveryTime")}
          />

          <FormError message={errors?.estimatedDeliveryTime?.message} />
        </div>

        <div className="flex-1">
          <p>Delivery Price (&#8377;)</p>
          <input
            className="p-2 border rounded-lg w-full border-gray-300 mt-2"
            type="number"
            {...register("deliveryPrice")}
          />

          <FormError message={errors?.deliveryPrice?.message} />
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;