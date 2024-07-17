import { IoSearchSharp } from "react-icons/io5";

interface Props{
  setValue:React.Dispatch<React.SetStateAction<string>>;
}

export function RestrauntSearchBar({setValue}:Props) {
  return (
    <div className="flex justify-between mb-4 gap-4 relative">
      <IoSearchSharp className="absolute top-3 left-2" size={20} fill="rgb(249,115,22)"/>
      <input
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 flex-1 rounded-xl pl-10 outline-none"
        type="text"
        placeholder="Search By Restraunt Name"
      />
    </div>
  );
}
