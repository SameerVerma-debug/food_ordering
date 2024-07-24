import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { UserOrders } from "./pages/UserOrders";
import { UserRestraunts } from "./pages/user-restraunts/UserRestraunts";
import { UserProfile } from "./pages/UserProfile";
import axios from "axios";
import { AuthCallback } from "./components/AuthCallback";
import { Auth0ProviderWithNavigate } from "./auth/auth0ProviderWithNavigate";
import { Layout } from "./layouts/Layout";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Restraunt } from "./pages/user-restraunts/Restraunt";
import { AddRestraunt } from "./pages/user-restraunts/AddRestraunt";
import { RestrauntsSearch } from "./pages/RestrauntsSearch";
import { DetailRestraunt } from "./pages/DetailRestraunt";
import { CheckoutPage } from "./pages/Checkout";
import { createContext, useEffect, useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_API_DEFAULT_URL;

interface CartItems {
  cartItems: Map<string, { name: string; price: number; quantity: number }>;
  selectedRestraunt: string | null | undefined;
  setCartItems: React.Dispatch<
    React.SetStateAction<Map<
      string,
      { name: string; price: number; quantity: number }
    > | null>
  >;
  setSelectedRestraunt: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
}

export const CartContext = createContext<CartItems>({
  cartItems: new Map(),
  selectedRestraunt: null,
  setCartItems: () => {},
  setSelectedRestraunt: () => {},
});

function App() {
  const [cartItems, setCartItems] = useState<Map<
    string,
    { name: string; quantity: number; price: number }
  > | null>(new Map());
  const [selectedRestraunt, setSelectedRestraunt] = useState<string | null>();

  useEffect(() => {
    setCartItems(
      new Map(
        JSON.parse(localStorage.getItem("cartItems") as string) as Map<
          string,
          { price: number; name: string; quantity: number }
        >
      )
    );

    setSelectedRestraunt(
      JSON.parse(localStorage.getItem("selectedRestraunt") as string)
    );
  }, []);

  return (
    <div className="min-h-full flex flex-col">
      <CartContext.Provider
        value={{
          cartItems,
          setCartItems,
          selectedRestraunt,
          setSelectedRestraunt,
        }}
      >
        <BrowserRouter>
          <Auth0ProviderWithNavigate>
            <Toaster />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="user-orders" element={<UserOrders />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="user-profile" element={<UserProfile />} />
                  <Route path="user-restraunts" element={<UserRestraunts />} />
                  <Route path="user-restraunts/:id" element={<Restraunt />} />
                  <Route
                    path="user-restraunts/new"
                    element={<AddRestraunt />}
                  />
                </Route>
                <Route path="auth-callback" element={<AuthCallback />} />
                <Route path="search" element={<RestrauntsSearch />} />
                <Route path="restraunt/:id" element={<DetailRestraunt />} />
                <Route path="checkout" element={<CheckoutPage />} />
              </Route>
            </Routes>
          </Auth0ProviderWithNavigate>
        </BrowserRouter>
      </CartContext.Provider>
    </div>
  );
}

export default App;
