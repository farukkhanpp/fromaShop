import { Minus, Plus } from "lucide-react";
export default function QuantityControl({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="quantity-control">
      <button onClick={onDecrease} aria-label="Decrease quantity">
        <Minus size={14} />
      </button>
      <span>{quantity}</span>
      <button onClick={onIncrease} aria-label="Increase quantity">
        <Plus size={14} />
      </button>
    </div>
  );
}
