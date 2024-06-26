import { useGetUserRestraunts } from "@/api/MyRestrauntApi";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdvanceImage } from "@/components/AdvanceImage";
import { Loading } from "@/components/Loading";

interface UserRestraunt {
  _id: string;
  name: string;
  city: string;
  country: string;
  image: string;
}

export function UserRestraunts() {
  const [restraunts, setRestraunts] = useState([]);
  const { getUserRestraunts,isLoading } = useGetUserRestraunts();
  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const data = await getUserRestraunts();
      setRestraunts(data);
    };
    if (!ignore) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, []);

  if(isLoading){
    return(
      <div className="flex-1 flex justify-center items-center w-full">
        <Loading/>
      </div>
    )
  }

  return (
    <div className="flex-1 m-10 flex flex-col gap-8">
      <div className="flex">
        <Link
          to="/user-restraunts/new"
          className="flex mx-auto w-[40vw] md:w-[20vw]"
        >
          <Button
            size="lg"
            className="flex mx-auto w-[40vw] bg-orange-500 md:w-[20vw]"
          >
            Add Restraunt
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {restraunts &&
          restraunts.length > 0 &&
          restraunts.map((restraunt: UserRestraunt) => {
            return (
              <Card className="overflow-hidden" key={restraunt._id}>
                <CardHeader className="p-0">
                  <div className="user-restraunt-card">
                    <AdvanceImage photo={restraunt.image} />
                  </div>
                </CardHeader>
                <CardContent className="mt-4">
                  <CardTitle className="mb-2">{restraunt.name}</CardTitle>
                  <CardDescription>{restraunt.city}</CardDescription>
                  <CardDescription>{restraunt.country}</CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                  <Link
                    className="max-auto"
                    to={`/user-restraunts/${restraunt._id}`}
                  >
                    <Button>Edit Restraunt</Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
