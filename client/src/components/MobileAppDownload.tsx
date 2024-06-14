import landingPage from "../assets/landing.png";
import appDownload from "../assets/appDownload.png";

export function MobileAppDownload() {
  return (
    <div className="px-6 grid justify-center md:flex items-center flex-wrap">
      <img className="w-full md:w-[50vw]" src={landingPage} alt="" />
      <div className="flex-1 flex flex-col gap-2 text-justify">
        <h1 className="font-bold text-2xl">Order Take-away even faster</h1>
        <p className="text-gray-500">
          Download the app for faster ordering and personalized experience
        </p>
        <img className="md:w-[70%]" src={appDownload} alt="" />
      </div>
    </div>
  );
}
