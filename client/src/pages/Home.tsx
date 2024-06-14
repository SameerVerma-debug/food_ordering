import hero from "../assets/hero.png";

import { HomeSearch } from "@/components/HomeSearch";
import { MobileAppDownload } from "@/components/MobileAppDownload";

const Home = () => {
  return (
    <div className="flex items-start flex-col gap-4">
      <img className="h-[80vh] w-[100%] object-cover" src={hero} alt="" />
      <div className="flex flex-col w-full gap-4">
        <HomeSearch/>
        <MobileAppDownload/>
      </div>
    </div>
  );
};

export default Home;
