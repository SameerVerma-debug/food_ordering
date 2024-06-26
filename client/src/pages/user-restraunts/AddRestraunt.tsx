import { useAddRestraunt } from "@/api/MyRestrauntApi";
import ManageRestrauntForm from "@/forms/manage-restraunts-form/ManageRestrauntForm";

export function AddRestraunt() {
  const {addRestraunt,isLoading} = useAddRestraunt();
  return (
    <ManageRestrauntForm isLoading={isLoading} onSave={addRestraunt} formData={null}/>
  );
}