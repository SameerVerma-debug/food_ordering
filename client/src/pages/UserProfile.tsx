import { Button } from "@/components/ui/button";
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { FormError } from "@/components/FormError";
import { useUpdateUser } from "@/api/MyUserCreate";

interface UserFormData{
  email:String,
  name:String,
  address?:String,
  city?:String,
  country?:String
}

export function UserProfile() {
  const {updateUser} = useUpdateUser();
  const schema = yup.object().shape({
    email:yup.string().email("Email should be like: sameer@gmail.com").required("Email is required"),
    name:yup.string().required("Name is Required"),
    address:yup.string(),
    city:yup.string(),
    country:yup.string()
  })

  const onSubmit = (data:UserFormData) => {
    updateUser(data);
  }

  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver:yupResolver(schema)
  })

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
            <p>Email<span className="text-red-500"> *</span></p>
            <input aria-describedby="required-description" type="email" className="border rounded-lg p-2" {...register("email")}/>
            <FormError message={errors.email?.message}/>
          </div>
          <div className="flex flex-col gap-2">
            <p>Name<span className="text-red-500"> *</span></p>
            <input aria-describedby="required-description" type="text" className="border rounded-lg p-2" {...register("name")}/>
            <FormError message={errors.name?.message}/>
          </div>
          <div className="flex flex-col gap-2">
            <p>Address</p>
            <input type="text" className="border rounded-lg p-2" {...register("address")}/>
            <FormError message={errors.address?.message}/>
          </div>
          <div className="flex flex-col gap-2">
            <p>City</p>
            <input type="text" className="border rounded-lg p-2" {...register("city")}/>
            <FormError message={errors.city?.message}/>
          </div>
          <div className="flex flex-col gap-2">
            <p>Country</p>
            <input type="text" className="border rounded-lg p-2" {...register("country")}/>
            <FormError message={errors.country?.message}/>
          </div>
          <Button className="hover:bg-orange-500" size="lg">Save</Button>
        </div>
      </form>
    </div>
  );
}
