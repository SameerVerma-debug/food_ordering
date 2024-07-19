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

axios.defaults.baseURL = import.meta.env.VITE_API_DEFAULT_URL;

function App() {
  return (
    <div className="min-h-full flex flex-col">
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
                <Route path="user-restraunts/:id" element={<Restraunt/>}/>
                <Route path="user-restraunts/new" element={<AddRestraunt/>}/>
              </Route>
              <Route path="auth-callback" element={<AuthCallback />} />
              <Route path="search" element={<RestrauntsSearch/>}/>
              <Route path="restraunt/:id" element={<DetailRestraunt/>}/>
              <Route path="checkout/restraunt/:id" element={<CheckoutPage/>}/>
            </Route>
          </Routes>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </div>
  );
}

export default App;
