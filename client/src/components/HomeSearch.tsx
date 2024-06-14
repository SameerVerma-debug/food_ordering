import { Button } from "./ui/button";

export function HomeSearch() {
  return (
    <div className="shadow-2xl z-50 rounded-xl p-8 mx-6 flex flex-col items-center gap-2">
      <h1 className="text-orange-500 font-bold text-3xl">
        Tuck into a takeaway today
      </h1>
      <p>Food is just a click away!</p>
      <div className="gap-2 border p-1 rounded-xl border-gray-300 flex flex-1 w-full">
        <input
          type="text"
          className="w-full outline-none bg-inherit p-2"
          placeholder="Search by City or Town"
        />
        <Button
          className="bg-orange-500 hidden md:block"
          variant="default"
          size="default"
        >
          Search
        </Button>
      </div>
      {/*For Mobile Search Button*/}
      <Button
        className="bg-orange-500 w-full rounded-xl md:hidden"
        variant="default"
        size="default"
      >
        Search
      </Button>
    </div>
  );
}
