import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 8;
import { useProducts } from "../hooks/useProducts";
export default function Home({ search }) {
  const { products, loading, error } = useProducts();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [page, setPage] = useState(1);
  const [dir, setDir] = useState("next");
  const firstRender = useRef(true);
  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    [products],
  );
  const filtered = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (category === "all" || p.category === category) &&
            p.price <= maxPrice &&
            p.title.toLowerCase().includes(search.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "price-low"
            ? a.price - b.price
            : sort === "price-high"
              ? b.price - a.price
              : sort === "name"
                ? a.title.localeCompare(b.title)
                : 0,
        ),
    [products, category, maxPrice, search, sort],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice(
    (current - 1) * PAGE_SIZE,
    current * PAGE_SIZE,
  );
  useEffect(() => {
    setDir("next");
    setPage(1);
  }, [category, maxPrice, search, sort]);
  function goTo(n) {
    const next = Math.min(Math.max(n, 1), totalPages);
    if (next === current) return;
    setDir(next > current ? "next" : "prev");
    setPage(next);
    document
      .getElementById("collection")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow light">THE EVERYDAY EDIT · 2026</span>
          <h1>
            Thoughtful things.
            <br />
            <em>Better</em> everyday.
          </h1>
          <p>
            Considered essentials for the way you live, work and move. Less
            noise, more of what matters.
          </p>
          <a href="#collection" className="hero-cta">
            Explore collection <ArrowDown size={16} />
          </a>
        </div>
        <div className="hero-art">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000"
            alt="Curated everyday clothing and accessories"
          />
          <div className="hero-sticker">
            <span>MADE FOR</span>
            <b>
              YOUR
              <br />
              EVERYDAY
            </b>
            <span>FORM · FUNCTION · FEEL</span>
          </div>
        </div>
        <div className="hero-index">01 — 04</div>
      </section>
      <section className="benefit-strip">
        <span>01 / Thoughtful design</span>
        <span>02 / Everyday quality</span>
        <span>03 / Easy on you</span>
        <span>04 / Made to last</span>
      </section>
      <section className="collection section-shell" id="collection">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE COLLECTION</span>
            <h2>
              Find your <em>everyday.</em>
            </h2>
            <p>Useful, beautiful pieces you'll reach for again and again.</p>
          </div>
          <span className="product-count">{products.length} PRODUCTS ↘</span>
        </div>
        <div className="filter-bar">
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={
                  category === cat ? "filter-chip active" : "filter-chip"
                }
                onClick={() => setCategory(cat)}
              >
                {cat === "all" ? "All pieces" : cat}
              </button>
            ))}
          </div>
          <div className="filter-controls">
            <label>
              <SlidersHorizontal size={15} />
              <span>Max price</span>
              <input
                aria-label="Maximum price"
                type="range"
                min="300"
                max="10000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <b>₹{maxPrice.toLocaleString("en-IN")}</b>
            </label>
            <select
              aria-label="Sort products"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
        {error && <p className="notice">{error}</p>}
        {loading ? (
          <div className="loading-grid">
            {[1, 2, 3, 4].map((n) => (
              <div className="skeleton" key={n} />
            ))}
          </div>
        ) : filtered.length ? (
          <>
            <div
              className={`product-grid page-anim ${dir}`}
              key={`${current}-${category}`}
            >
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              page={current}
              totalPages={totalPages}
              onChange={goTo}
              from={(current - 1) * PAGE_SIZE + 1}
              to={Math.min(current * PAGE_SIZE, filtered.length)}
              total={filtered.length}
            />
          </>
        ) : (
          <div className="no-results">
            <div>
              <X size={22} />
            </div>
            <h3>No pieces found</h3>
            <p>Try changing your search or filters.</p>
            <button
              className="text-button"
              onClick={() => {
                setCategory("all");
                setMaxPrice(10000);
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
      <section className="story-band" id="story">
        <div>
          <span className="eyebrow light">A LITTLE LESS, A LITTLE BETTER</span>
          <h2>
            Good design is
            <br />
            <em>in the details.</em>
          </h2>
        </div>
        <p>
          We believe everyday objects should earn their place. A thoughtful edit
          of useful essentials, selected for their form, function and the
          feeling they bring to ordinary days.
        </p>
      </section>
    </main>
  );
}
