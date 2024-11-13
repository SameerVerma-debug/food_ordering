import hero from "../assets/main.jpg";

import { HomeSearch } from "@/components/HomeSearch";
import { MobileAppDownload } from "@/components/MobileAppDownload";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-start flex-col gap-4">
      <img className="h-[75vh] w-[100%] object-cover" src={hero} alt="" />
      <div className="flex flex-col w-full gap-4">
        {/* <HomeSearch/> */}
        <div className="flex justify-center align-center">
          <Link to="/search">
            <Button className="bg-orange-500 bold text-xl w-[20vw] h-12">
              See Restraunts
            </Button>
          </Link>
        </div>
        <MobileAppDownload />
      </div>
    </div>
  );
};

export default Home;
