import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-full flex flex-col">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
