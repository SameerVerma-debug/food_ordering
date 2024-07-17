import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cuisineList } from "@/config/restraunt-cuisine-options";
import { DialogClose } from "@radix-ui/react-dialog";
import { FilterOption } from "./FilterOption";
import { Button } from "./ui/button";

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCuisines: [string | null];
  setSelectedCuisines: React.Dispatch<React.SetStateAction<[string | null]>>;
}

export function CuisinesFilter({
  modalOpen,
  setModalOpen,
  selectedCuisines,
  setSelectedCuisines,
}: Props) {
  return (
    <Dialog onOpenChange={() => setModalOpen(!modalOpen)}>
      <DialogTrigger>
        <div className="border p-2 rounded-lg bg-gray-100">
          Filter By Cuisines
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Cuisines</DialogTitle>
          <DialogDescription className="text-center">
            <div>
              {cuisineList.map((cuisine) => {
                return (
                  <FilterOption
                    key={cuisine}
                    selected={selectedCuisines}
                    setSelected={setSelectedCuisines}
                    value={cuisine}
                  />
                );
              })}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogClose>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
