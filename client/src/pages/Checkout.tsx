import { useContext } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { UserDetailForm } from "@/forms/user-detail/UserDetail";
import { useAuth0 } from "@auth0/auth0-react";
import { ChangeItemQuantity } from "@/components/ChangeItemQuantity";
import { UserFormData } from "./UserProfile";
import { useUpdateUser } from "@/api/MyUserApi";
import toast from "react-hot-toast";
import { CartContext } from "@/App";
import { RemoveCartItem } from "@/components/RemoveCartItem";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function CheckoutPage() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { updateUser } = useUpdateUser();
  const { cartItems} =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = async (data: UserFormData) => {
    if (!cartItems?.size) {
      toast.error("No items in cart");
      return;
    }
    await updateUser(data);
  };

  const handleAddMoreItems = () => {
    navigate(-1);
  };

  if(!isAuthenticated){
    loginWithRedirect();
    return;
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-6">
      <div>
        <p className="text-2xl font-bold">Cart Items</p>
        <div className="flex flex-col gap-6 mt-6">
          {cartItems.size > 0 ? (
            [...cartItems.entries()].map(([id, { name, price, quantity }]) => {
              return (
                <div
                  key={id}
                  className="flex gap-4 p-2 items-center border rounded-lg justify-between"
                >
                  <p className="font-medium">
                    {name} (<span>&#8377; {price}</span>)
                  </p>

                  <div className="flex gap-2 items-center">
                    <div className="flex gap-1 items-center">
                      <ChangeItemQuantity
                        itemName={name}
                        itemPrice={price}
                        itemId={id}
                      />
                    </div>
                    <p> = </p>
                    <div className="flex items-center">
                      <FaRupeeSign /> <p>{quantity * price}</p>
                    </div>
                    <RemoveCartItem itemId={id} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full flex flex-col gap-4 items-center justify-center">
              <p className="font-bold text-xl">No Items in the cart</p>
            </div>
          )}
          <Button className="w-fit mx-auto" onClick={handleAddMoreItems}>
            Add Items
          </Button>
        </div>
      </div>
      <div>
        <p className="text-2xl mb-4 font-bold">Verify Details</p>
        <UserDetailForm
          onSubmit={handleCheckout}
          isLoading={false}
          submitButtonText="Checkout"
        />
      </div>
    </div>
  );
}
