import { Trash2 } from "lucide-react";
import { formatPrice } from "../data/products";
import QuantityControl from "./QuantityControl";
export default function CartItem({ item, increase, decrease, remove }) {
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="cart-item-main">
        <div className="cart-item-heading">
          <div>
            <span className="eyebrow">{item.category}</span>
            <h3>{item.title}</h3>
            <p>{formatPrice(item.price)} each</p>
          </div>
          <strong>{formatPrice(item.price * item.quantity)}</strong>
        </div>
        <div className="cart-item-actions">
          <QuantityControl
            quantity={item.quantity}
            onIncrease={increase}
            onDecrease={decrease}
          />
          <button className="remove-button" onClick={remove}>
            <Trash2 size={15} /> Remove
          </button>
        </div>
      </div>
    </article>
  );
}
