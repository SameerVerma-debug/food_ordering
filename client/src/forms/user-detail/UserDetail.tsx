import { useGetUser } from "@/api/MyUserApi";
import { FormError } from "@/components/FormError";
import { LoadingButton } from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { UserFormData } from "@/pages/UserProfile";
import { useAuth0 } from "@auth0/auth0-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface Props {
  onSubmit(data: UserFormData): void;
  isLoading: boolean;
  submitButtonText: string;
}

export function UserDetailForm({
  onSubmit,
  isLoading,
  submitButtonText,
}: Props) {
  const { getUser } = useGetUser();
  const [formInputs, setFormInputs] = useState<UserFormData | null>(null);
  const { user } = useAuth0();

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

  return (
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
          <FormError message={errors?.name?.message} />
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
          <LoadingButton />
        ) : (
          <Button className="hover:bg-orange-500" size="lg">
            {submitButtonText}
          </Button>
        )}
      </div>
    </form>
  );
}
