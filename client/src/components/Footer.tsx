import { Link } from "react-router-dom"

export function Footer() {
  return (
    <div className="flex items-center bg-orange-500 h-[12vh] mt-4">
    <div className="container flex justify-between text-xl p-4 text-white">
      <Link to="/" className="font-bold">campusbites.com</Link>
      <div className="flex gap-4 text-[1.05rem]">
        <a target="blank" href="https://github.com/SameerVerma-debug">Github</a>
        <a target="blank" href="">Code</a>
      </div>
    </div>
    </div>
  );
}