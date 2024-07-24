import { MdDelete } from "react-icons/md";
import { Button } from "./ui/button";
import { useContext } from "react";
import { CartContext } from "@/App";

interface Props{
  itemId:string
}

export function RemoveCartItem({itemId}:Props) {
  const {cartItems,setCartItems} = useContext(CartContext);
  const handleRemoveItem = (id: string) => {
    cartItems.delete(id);
    setCartItems(new Map(cartItems));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(Array.from(cartItems.entries()))
    );
  };
  return (
    <Button
        onClick={() => handleRemoveItem(itemId)}
        className="ml-4 mt-2"
        variant="destructive"
      >
        <MdDelete />
      </Button>
  );
}