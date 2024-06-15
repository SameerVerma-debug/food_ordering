import LogoutButton from "@/auth/Logout";
import { NavLink } from "react-router-dom";

export function MobileNavLinks() {
  return (
    <div className="flex flex-col items-center gap-4 font-bold">
      <NavLink className="hover:text-orange-500" to="/user-orders">
        Order Status
      </NavLink>
      <NavLink className="hover:text-orange-500" to="/user-restraunts">
        My Restraunts
      </NavLink>
      <NavLink className="hover:text-orange-500" to="/user-profile">
        My Profile
      </NavLink>
      <LogoutButton />
    </div>
  );
}
