export const fallbackProducts = [
  {
    id: 1,
    title: "Everyday Cotton Tee",
    price: 499,
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700",
    description: "A soft, breathable cotton tee made for everyday comfort.",
    rating: { rate: 4.7, count: 124 },
  },
  {
    id: 2,
    title: "Minimal Leather Sneakers",
    price: 1899,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700",
    description: "Clean lines and a cushioned sole for all-day movement.",
    rating: { rate: 4.8, count: 86 },
  },
  {
    id: 3,
    title: "Classic Everyday Watch",
    price: 2499,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700",
    description: "A timeless dial with a versatile, comfortable strap.",
    rating: { rate: 4.6, count: 58 },
  },
  {
    id: 4,
    title: "Canvas Carryall Tote",
    price: 799,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700",
    description: "A roomy, durable carryall for work, errands and weekends.",
    rating: { rate: 4.5, count: 72 },
  },
  {
    id: 5,
    title: "Studio Wireless Headphones",
    price: 3299,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
    description: "Immersive sound, soft ear cushions and a minimal silhouette.",
    rating: { rate: 4.8, count: 203 },
  },
  {
    id: 6,
    title: "Ribbed Ceramic Mug",
    price: 399,
    category: "home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=700",
    description: "A tactile ceramic mug for your slow morning ritual.",
    rating: { rate: 4.4, count: 41 },
  },
  {
    id: 7,
    title: "Relaxed Fit Overshirt",
    price: 1299,
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=700",
    description: "An easy layering piece with a relaxed, modern fit.",
    rating: { rate: 4.6, count: 95 },
  },
  {
    id: 8,
    title: "Daily Runner Sneakers",
    price: 2199,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=700",
    description: "Lightweight everyday runners with a supportive feel.",
    rating: { rate: 4.7, count: 112 },
  },
];
export const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
export const FREE_SHIPPING_MIN = 1999;
export const getShipping = (subtotal) =>
  subtotal === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : 99;
