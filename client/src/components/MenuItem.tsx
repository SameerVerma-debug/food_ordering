import { FaRupeeSign } from "react-icons/fa";
import { Button } from "./ui/button";
import { AdvanceImage } from "./AdvanceImage";
import { useState } from "react";

interface Props {
  menuItem: {
    itemPrice: number;
    itemName: string;
    itemImage: string;
  };
}

export function MenuItem({ menuItem }: Props) {
  const [quantity, setQuantity] = useState(0);
  return (
    <></>
  );
}
