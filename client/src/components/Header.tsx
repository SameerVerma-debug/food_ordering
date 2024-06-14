import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Links } from "./Links";

export function Header() {
  return (
    <div className="border-b border-b-black py-6 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          className="text-3xl font-bold tracking-tight text-orange-500"
          to="/"
        >
          Sameer Eats
        </Link>
        <div className="hidden md:flex gap-4">
          <Links flexDirection="flex"/>
        </div>
        <div className="md:hidden">
        <Sidebar/>
        </div>
      </div>
    </div>
  );
}
