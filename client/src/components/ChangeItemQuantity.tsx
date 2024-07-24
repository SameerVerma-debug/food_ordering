import { useContext } from "react";
import { Button } from "./ui/button";
import { MdDelete } from "react-icons/md";
import { CartContext } from "@/App";

interface Props {
  itemId: string;
  itemName: string;
  itemPrice: number;
}

export function ChangeItemQuantity({ itemId, itemName, itemPrice }: Props) {
  const { cartItems, setCartItems } = useContext(CartContext);

  const handleQuantityChange = (num: number) => {
    let val = cartItems.get(itemId)?.quantity || 1;
    val += num;
    cartItems.set(itemId, {
      name: itemName,
      price: itemPrice,
      quantity: Math.max(1, val),
    });
    setCartItems(new Map(cartItems));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(Array.from(cartItems.entries()))
    );
  };

  return (
      <div className={`flex gap-3 items-center`}>
        <Button
          variant="ghost"
          className="rounded-2xl text-2xl"
          onClick={() => handleQuantityChange(-1)}
        >
          <p>-</p>
        </Button>
        <p>{cartItems.get(itemId as string)?.quantity}</p>
        <Button
          variant="ghost"
          className="rounded-2xl text-2xl"
          onClick={() => handleQuantityChange(1)}
        >
          <p>+</p>
        </Button>
      </div>
  );
}
