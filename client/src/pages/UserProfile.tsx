import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormError } from "@/components/FormError";
import { useGetUser, useUpdateUser } from "@/api/MyUserApi";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingButton } from "@/components/LoadingButton";
import { useNavigate } from "react-router-dom";

interface UserFormData {
  email: String;
  name: String;
  address: String;
  city: String;
  country: String;
}

export function UserProfile() {
  const { user } = useAuth0();
  const { updateUser, isLoading } = useUpdateUser();
  const { getUser } = useGetUser();
  const [formInputs, setFormInputs] = useState<UserFormData | null>(null);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email should be like: sameer@gmail.com")
      .required("Email is required"),
    name: yup.string().required("Name is Required"),
    address: yup.string().required("Address is Required"),
    city: yup.string().required("City is Required"),
    country: yup.string().required("Country is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: formInputs,
  });

  useEffect(() => {
    let ignore = false;
    const fetchUserDetails = async () => {
      if (user) {
        const data = await getUser();
        setFormInputs(data);
        reset(data);
      }
    };
    if (!ignore) {
      fetchUserDetails();
    }

    return () => {
      ignore = true;
    };
  }, [reset, user]);

  const onSubmit = async (data: UserFormData) => {
    updateUser(data);
  };

  return (
    <div className="flex gap-4 flex-1 m-4 p-4 flex-col min-h-[100%]">
      <div>
        <h1 className="text-2xl font-bold">User Profile</h1>
        <p className="text-gray-500">
          View and change your profile information here
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>Email</p>
            <input
              type="email"
              className="border rounded-lg p-2"
              disabled
              {...register("email")}
            />
            <FormError message={errors.email?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Name<span className="text-red-500"> *</span>
            </p>
            <input
              aria-describedby="required-description"
              type="text"
              className="border rounded-lg p-2"
              {...register("name")}
            />
            <FormError message={errors.name?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Address<span className="text-red-500"> *</span>
            </p>
            <input
              type="text"
              aria-describedby="required-description"
              className="border rounded-lg p-2"
              {...register("address")}
            />
            <FormError message={errors.address?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <p>
              City<span className="text-red-500"> *</span>
            </p>
            <input
              type="text"
              aria-describedby="required-description"
              className="border rounded-lg p-2"
              {...register("city")}
            />
            <FormError message={errors.city?.message} />
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Country<span className="text-red-500"> *</span>
            </p>
            <input
              type="text"
              aria-describedby="required-description"
              className="border rounded-lg p-2"
              {...register("country")}
            />
            <FormError message={errors.country?.message} />
          </div>
          {isLoading ? (
            <LoadingButton/>
          ) : (
            <Button className="hover:bg-orange-500" size="lg">
              Save
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
