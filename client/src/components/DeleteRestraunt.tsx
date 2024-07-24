import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useDeleteRestraunt } from "@/api/MyUserRestrauntApi";
import { LoadingButton } from "./LoadingButton";

interface Props {
  id: String;
}

export function DeleteRestraunt({ id }: Props) {
  const { deleteRestraunt, isLoading } = useDeleteRestraunt();

  const handleDeleteRestraunt = () => {
    deleteRestraunt(id);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button type="button" className="w-full" variant="destructive">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            Restraunt and remove your data from our servers.
          </DialogDescription>
          <DialogClose>
            {isLoading ? (
              <LoadingButton />
            ) : (
              <Button
                variant="destructive"
                type="button"
                onClick={handleDeleteRestraunt}
              >
                Confirm
              </Button>
            )}
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
