import { useUpdateUser } from "@/api/MyUserApi";
import { UserDetailForm } from "@/forms/user-detail/UserDetail";

export interface UserFormData {
  email: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

export function UserProfile() {
  const { updateUser, isLoading } = useUpdateUser();

  const onSubmit = async (data: UserFormData) => {
    await updateUser(data);
  };

  return (
    <div className="flex gap-4 flex-1 m-4 p-4 flex-col min-h-[100%]">
      <div>
        <h1 className="text-2xl font-bold">User Profile</h1>
        <p className="text-gray-500">
          View and change your profile information here
        </p>
      </div>
      <UserDetailForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        submitButtonText="Save"
      />
    </div>
  );
}
