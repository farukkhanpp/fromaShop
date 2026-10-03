import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function EmptyCart() {
  return (
    <div className="empty-cart">
      <div className="empty-icon">
        <ShoppingBag size={30} />
      </div>
      <span className="eyebrow">Nothing here yet</span>
      <h2>Your bag is taking a break.</h2>
      <p>
        Looks like you haven't added anything to your bag. Find something you'll
        love.
      </p>
      <Link to="/" className="primary-link">
        Explore the collection <ArrowRight size={17} />
      </Link>
    </div>
  );
}
