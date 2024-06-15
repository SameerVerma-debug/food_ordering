import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { UserOrders } from "./pages/UserOrders";
import { UserRestraunts } from "./pages/UserRestraunts";
import { UserProfile } from "./pages/UserProfile";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
//axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="min-h-full flex flex-col">
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-orders" element={<UserOrders/>}/>
            <Route path="/user-restraunts" element={<UserRestraunts/>}/>
            <Route path="/user-profile" element={<UserProfile/>}/>
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
