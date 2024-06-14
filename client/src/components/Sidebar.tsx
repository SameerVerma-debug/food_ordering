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
import { Links } from "./Links";
import { Separator } from "./ui/separator";

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu size={25} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center pb-4">
            <Link to="/" className="text-2xl font-bold p-2 px-4 bg-gray-100 rounded-xl">
              Sameer Eats
            </Link>
          </SheetTitle>
          <Separator/>
          <SheetDescription className="text-xl text-black text-left">
            <div className="mt-6">
            <Links flexDirection={"flex-col"}/>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
