import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { LoginButton } from "@/auth/Login";
import { useAuth0 } from "@auth0/auth0-react";
import { MobileNavLinks } from "./MobileNavLinks";

export function Sidebar() {
  const { isAuthenticated } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu size={25} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center pb-4">
            <Link
              to="/"
              className="text-2xl font-bold p-2 px-4 bg-gray-100 rounded-xl"
            >
              Sameer Eats
            </Link>
          </SheetTitle>
          <Separator />
          <SheetDescription className="text-xl text-black text-left">
            <div className="mt-6">
              {!isAuthenticated ? <LoginButton /> : <MobileNavLinks />}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
