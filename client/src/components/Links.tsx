import { NavLink } from "react-router-dom";

const links = [
  {
    path: "/login",
    name: "Log In",
  },
];

interface Props {
  flexDirection:String
}

export function Links({flexDirection} : Props) {
  return (
    <div className={`flex gap-4 ${flexDirection}`}>
      {links.map((link) => {
        return (
          <NavLink className="hover:text-orange-500 text-xl" to={link.path}>
            {link.name}
          </NavLink>
        );
      })}
    </div>
  );
}
