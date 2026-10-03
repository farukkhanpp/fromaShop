import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import { Instagram, Facebook, ArrowUpRight } from "lucide-react";



export default function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Home search={search} />} />
      </Routes>
      <footer className="footer" id="footer">
        <div className="footer-main">
          <div>
            <a href="/" className="brand footer-brand">
              <span className="brand-mark">f.</span> forma
              <span className="brand-dot">.</span>
            </a>
            <p>Thoughtful things for everyday living.</p>
          </div>
          <div className="footer-links">
            <span className="eyebrow light">STAY IN THE LOOP</span>
            <a href="mailto:hello@forma.example">
              f1999khan@gmail.com <ArrowUpRight size={14} />
            </a>
            <div className="socials">
              <a href="https://instagram.com" aria-label="Instagram">
                <Instagram size={17} />
              </a>
              <a href="https://facebook.com" aria-label="Facebook">
                <Facebook size={17} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2027 FORMA STUDIO</span>
          <span>FRONTEND · MADE WITH REACT</span>
          <span>DESIGNED BY FARUK↗</span>
        </div>
      </footer>
    </>
  );
}
