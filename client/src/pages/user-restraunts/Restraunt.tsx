import { useGetRestraunt, useUpdateRestraunt } from "@/api/MyUserRestrauntApi";
import ManageRestrauntForm, {
  restrauntFormData,
} from "@/forms/manage-restraunts-form/ManageRestrauntForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Restraunt() {
  const { id } = useParams();
  const { getRestraunt } = useGetRestraunt();
  const { updateRestraunt, isLoading } = useUpdateRestraunt();
  const [restrauntData, setRestrauntData] = useState(null);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      const fetchData = async () => {
        const data = await getRestraunt(id as string);
        setRestrauntData(data);
      };
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleUpdateRestraunt = async (data: restrauntFormData) => {
    data = { ...data };
    await updateRestraunt(data);
  };

  return (
    <>
      {restrauntData && (
        <ManageRestrauntForm
          formData={restrauntData}
          onSave={handleUpdateRestraunt}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
