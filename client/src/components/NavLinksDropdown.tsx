import LogoutButton from "@/auth/Logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export function NavLinksDropdown() {
  const { user } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1 hover:text-orange-500">
          <FaRegUserCircle size={25} />
          <p>{user?.email}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2 py-2 px-2 font-bold">
        <DropdownMenuItem asChild>
          <Link className="hover:text-orange-500" to="/user-restraunts">
            My Restraunts
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="hover:text-orange-500" to="/user-profile">
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
