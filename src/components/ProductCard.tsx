import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Product } from "../types";
import { useCountry } from "../hooks/useCountry";
import { formatPrice } from "../utils/currency";

export default function ProductCard({ product }: { product: Product }) {
  const { country } = useCountry();
  return (
    <article className="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-glow">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="#1e293b" width="400" height="300"/><text x="200" y="150" text-anchor="middle" fill="#64748b" font-size="14">No image</text></svg>`); }} />
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium backdrop-blur">{product.sizeCategory}</span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center gap-1 text-sm text-amber-400">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="font-medium text-white">{product.rating}</span>
          <span className="text-neutral-500">({product.reviewCount})</span>
        </div>
        <Link to={`/product/${product.id}`}><h3 className="text-lg font-bold leading-snug group-hover:text-cyan-300">{product.name}</h3></Link>
        <p className="mt-1.5 line-clamp-2 text-sm text-neutral-400">{product.shortDescription}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-white">{formatPrice(product.basePriceINR, country)}</p>
            <p className="text-xs text-neutral-500">~{product.weightGrams}g · {product.category}</p>
          </div>
          <Link to={`/product/${product.id}`} className="btn-primary shrink-0 px-4 py-2 text-sm">View</Link>
        </div>
      </div>
    </article>
  );
}
