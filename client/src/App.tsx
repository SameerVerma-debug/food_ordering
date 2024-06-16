import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { UserOrders } from "./pages/UserOrders";
import { UserRestraunts } from "./pages/UserRestraunts";
import { UserProfile } from "./pages/UserProfile";
import axios from "axios";
import { AuthCallback } from "./components/AuthCallback";
import { Auth0ProviderWithNavigate } from "./auth/auth0ProviderWithNavigate";

axios.defaults.baseURL = import.meta.env.VITE_API_DEFAULT_URL;

function App() {
  return (
    <div className="min-h-full flex flex-col">
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-orders" element={<UserOrders />} />
            <Route path="/user-restraunts" element={<UserRestraunts />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/auth-callback" element={<AuthCallback />} />
          </Routes>
          <Footer />
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </div>
  );
}

export default App;
