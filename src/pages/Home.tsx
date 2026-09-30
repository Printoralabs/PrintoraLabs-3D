import { Link } from "react-router-dom";
import { ArrowRight, Upload, ShoppingBag, Package } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { sizePricing } from "../data/pricing";
import { useCountry } from "../hooks/useCountry";
import { formatPriceRange } from "../utils/currency";

export default function Home() {
  const { country } = useCountry();
  const featured = products.slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/5" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-300">Professional 3D printing marketplace</div>
            <h1 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">Bring Your 3D Ideas <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">to Life</span></h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-400">Shop ready-to-print products, upload your own models, or request custom prints. Transparent gram-based pricing in your local currency.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/marketplace" className="btn-primary text-base"><ShoppingBag className="h-5 w-5" />Explore Marketplace</Link>
              <Link to="/order" className="btn-secondary text-base"><Upload className="h-5 w-5" />Start a Custom Print</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-400/20 to-transparent blur-2xl" />
            <div className="card relative overflow-hidden p-2">
              <div className="rounded-[1.75rem] bg-neutral-900 p-6 sm:p-8">
                <Package className="mb-6 h-16 w-16 text-cyan-400/80" />
                <h2 className="text-2xl font-bold">Gram-based pricing</h2>
                <p className="mt-2 text-sm text-neutral-400">Transparent estimates based on filament weight, material, and size.</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {Object.entries(sizePricing).map(([size, data]) => (
                    <div key={size} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="text-sm font-bold">{size}</p>
                      <p className="text-xs text-neutral-500">{data.grams}</p>
                      <p className="mt-1 font-semibold text-cyan-300">{formatPriceRange(data.priceINR[0], data.priceINR[1], country)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">Marketplace</p>
            <h2 className="mt-2 text-3xl font-black">Featured products</h2>
          </div>
          <Link to="/marketplace" className="hidden items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300 sm:flex">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="card relative overflow-hidden bg-gradient-to-br from-cyan-500/10 to-transparent p-8 md:p-12">
          <div className="relative max-w-xl">
            <h2 className="text-3xl font-black">Have your own model?</h2>
            <p className="mt-3 text-neutral-400">Upload STL, 3MF or OBJ files, pick materials and settings, and get an estimated price instantly.</p>
            <Link to="/order" className="btn-primary mt-6 inline-flex"><Upload className="h-5 w-5" />Start Custom Print</Link>
          </div>
        </div>
      </section>
    </>
  );
}
