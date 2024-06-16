import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
