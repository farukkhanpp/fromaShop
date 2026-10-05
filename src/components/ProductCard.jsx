import { ArrowUpRight, Star, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import { useState } from "react";


export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);

  const quantity = cart.find((item) => item.id === product.id)?.quantity || 0;
  
  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  }
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
        <span className="product-category">{product.category}</span>
        <button
          className="quick-add"
          onClick={handleAdd}
          aria-label={`Add ${product.title} to cart`}
        >
          {added ? <Check size={18} /> : <ArrowUpRight size={18} />}
        </button>
      </div>
      <div className="product-info">
        <div>
          <h3>{product.title}</h3>
          <p className="rating">
            <Star size={13} fill="currentColor" />{" "}
            {Number(product.rating?.rate || 4.5).toFixed(1)}{" "}
            <span>({product.rating?.count || 24})</span>
          </p>
        </div>
        <strong>{formatPrice(product.price)}</strong>
      </div>
      <button
        className={quantity ? "add-button added" : "add-button"}
        onClick={handleAdd}
      >
        {added
          ? "Added to bag"
          : quantity
            ? `Add another · ${quantity} in bag`
            : "Add to bag"}{" "}
        <span>+</span>
      </button>
    </article>
  );
}
