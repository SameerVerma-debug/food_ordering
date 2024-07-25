import { useAuth0 } from "@auth0/auth0-react";
import { useUpdateUser } from "./MyUserApi";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "@/App";
import { UserFormData } from "@/pages/UserProfile";
import { useMutation } from "react-query";

export function useCheckout() {
  const {updateUser} = useUpdateUser();
  const {getAccessTokenSilently} = useAuth0();
  const {cartItems} = useContext(CartContext);

  const handleCheckout = async(data:UserFormData) => {
    try {
      await updateUser(data);

      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${import.meta.env.VITE_AUTH0_AUDIENCE}`,
        },
      });

      const stripe = await loadStripe(
        `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`
      );

      const res = await axios.post(
        "/api/my/create-checkout-session",
        {
          items: [...cartItems],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const session = res.data;

      console.log(session);

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });
      
      console.log(result);
      if (result?.error) {
        throw new Error(result.error as any);
      }
    } catch (err) {
      throw new Error(err as any);
    }
  }

  const {mutateAsync:checkout,isLoading,isError} = useMutation(handleCheckout);

  return {checkout,isLoading,isError};
}