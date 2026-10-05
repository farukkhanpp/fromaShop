import { ShoppingBag, Search, Menu, X, Sun, Moon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";



export default function Navbar({ search, setSearch }) {
  const { totalItems } = useCart();
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="header">
      <div className="nav-wrap">
        <Link to="/" className="brand">
          <span className="brand-mark">f.</span> forma
          <span className="brand-dot">.</span>
        </Link>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Shop
          </NavLink>
          <a href="/#story" onClick={() => setMenuOpen(false)}>
            Our story
          </a>
          <a href="/#footer" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
        <div className="nav-actions">
          <label className="nav-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
            />
          </label>
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/cart" className="bag-link" aria-label="Shopping cart">
            <ShoppingBag size={20} />
            <span>Bag</span>
            <b>{totalItems}</b>
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
