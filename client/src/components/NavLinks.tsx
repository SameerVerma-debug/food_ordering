import { NavLink } from "react-router-dom";
import { NavLinksDropdown } from "./NavLinksDropdown";

export function NavLinks() {
  return (
    <div className="flex items-center gap-4 font-bold">
      <NavLink className="hover:text-orange-500" to="/user-orders">Order Status</NavLink>
      <NavLinksDropdown />
    </div>
  );
}
