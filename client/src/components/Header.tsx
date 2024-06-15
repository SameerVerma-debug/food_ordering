import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { LoginButton } from "@/auth/Login";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLinks } from "./NavLinks";

export function Header() {
  const { isAuthenticated } = useAuth0();
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
          {isAuthenticated ? <NavLinks /> : <LoginButton />}
        </div>
        <div className="md:hidden">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
