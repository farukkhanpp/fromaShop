import { ArrowLeft, ArrowRight } from "lucide-react";



function buildItems(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items = [1];
  const start = Math.max(2, Math.min(page - 1, total - 4));
  const end = Math.min(total - 1, start + 2);
  if (start > 2) items.push("dots-l");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("dots-r");
  items.push(total);
  return items;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
  from,
  to,
  total,
}) {
  if (totalPages <= 1) return null;
  const items = buildItems(page, totalPages);
  const index = items.indexOf(page);
  return (
    <nav className="pagination" aria-label="Product pages">
      <span className="page-status">
        SHOWING {from}–{to} OF {total}
      </span>
      <div className="page-controls">
        <button
          className="page-arrow prev"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="page-track">
          <span
            className="page-pill"
            style={{ transform: `translateX(${index * 100}%)` }}
          />
          {items.map((it) =>
            typeof it === "number" ? (
              <button
                key={it}
                className={it === page ? "page-num active" : "page-num"}
                onClick={() => onChange(it)}
                aria-current={it === page ? "page" : undefined}
                aria-label={`Page ${it}`}
              >
                {it}
              </button>
            ) : (
              <span key={it} className="page-dots">
                …
              </span>
            ),
          )}
        </div>
        <button
          className="page-arrow next"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </nav>
  );
}
