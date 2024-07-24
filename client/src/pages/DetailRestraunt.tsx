import { useGetRestraunt } from "@/api/MyRestrauntApi";
import { CartContext } from "@/App";
import { AdvanceImage } from "@/components/AdvanceImage";
import { ChangeItemQuantity } from "@/components/ChangeItemQuantity";
import { Loading } from "@/components/Loading";
import { RemoveCartItem } from "@/components/RemoveCartItem";
import { Button } from "@/components/ui/button";
import { restrauntFormData } from "@/forms/manage-restraunts-form/ManageRestrauntForm";
import { useContext, useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";

export function DetailRestraunt() {
  const [restraunt, setRestraunt] = useState<restrauntFormData | null>(null);
  const { getRestraunt } = useGetRestraunt();
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, setCartItems, selectedRestraunt, setSelectedRestraunt } =
    useContext(CartContext);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await getRestraunt(id as string);
        setRestraunt(res);
      } catch (err) {
        throw new Error(err as any);
      }
    };

    if (!ignore) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleCheckout = async () => {
    navigate(`/checkout`);
  };

  const handleAddItem = (itemId: string, name: string, price: number) => {
    if (selectedRestraunt !== id) {
      localStorage.setItem("selectedRestraunt", JSON.stringify(id));
      setSelectedRestraunt(id);
      localStorage.removeItem("cartItems");
      cartItems.clear();
    }
    cartItems?.set(itemId, { name, price, quantity: 1 });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(Array.from(cartItems.entries()))
    );
    setCartItems(new Map(cartItems));
  };

  return (
    <>
      {restraunt ? (
        <div className="flex flex-col items-center flex-1 p-4 gap-4">
          <div className="restraunt-image w-full md:w-[90vw] lg:w-[80vw] xl:w-[70vw] h-[30vh]">
            <AdvanceImage photo={restraunt?.image} />
          </div>
          <div className="flex flex-col gap-4 items-center justify-center md:w-[90vw] lg:w-[80vw] xl:w-[70vw]">
            <div className="flex w-full flex-col mt-4 p-2 rounded-xl">
              <p className="text-2xl font-bold">
                {restraunt?.name.toUpperCase()}
              </p>
              <div className="text-gray-500 flex gap-2">
                <p>{restraunt.city}</p>
                <p>{restraunt.country}</p>
              </div>

              <div>
                <p className="font-medium text-lg mt-2">Cuisines</p>
                <div className="flex flex-wrap">
                  {restraunt?.cuisines.map((cuisine) => {
                    return (
                      <div key={cuisine} className="flex items-center gap-1">
                        <GoDotFill size={12} />
                        <p className="mb-1 mr-2">{cuisine}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-6">
              <p className="text-2xl font-bold mb-2">Menu</p>
              {restraunt?.menuItems.map((menuItem) => {
                return (
                  <div
                    key={menuItem._id}
                    className="flex justify-between gap-2 text-md
                  w-full h-fit hover:border-orange-400 border 
                  transition-all duration-300 cursor-pointer rounded-xl overflow-hidden"
                  >
                    <div className="restraunt-image h-[25vh] w-full max-w-[400px] rounded-xl">
                      <AdvanceImage photo={menuItem.itemImage} />
                    </div>
                    <div className="w-full flex flex-col p-4 gap-2">
                      <div className="gap-2">
                        <p>{menuItem.itemName}</p>
                      </div>
                      <div>
                        <p className="flex items-center gap-1">
                          <span>
                            <FaRupeeSign />
                          </span>
                          {menuItem.itemPrice}
                        </p>
                      </div>
                      {cartItems?.has(menuItem._id as string) ? (
                        <div className="flex">
                          <ChangeItemQuantity
                            itemId={menuItem._id as string}
                            itemName={menuItem.itemName}
                            itemPrice={menuItem.itemPrice}
                          />
                          <RemoveCartItem itemId={menuItem._id as string} />
                        </div>
                      ) : (
                        <Button
                          onClick={() =>
                            handleAddItem(
                              menuItem._id as string,
                              menuItem.itemName,
                              menuItem.itemPrice
                            )
                          }
                          className={`w-fit`}
                        >
                          Add Item
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {cartItems && cartItems?.size > 0 && (
              <Button
                onClick={handleCheckout}
                className="mt-6 w-full bg-red-500 sticky bottom-2 h-[8vh] text-lg"
              >
                <span className="font-bold mr-2 bg-orange-500 rounded-2xl p-1 px-3">
                  {cartItems.size}
                </span>
                Added | Checkout
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center w-full">
          <Loading />
        </div>
      )}
    </>
  );
}
