import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Search, Printer } from "lucide-react";
import { useCountry } from "../hooks/useCountry";

const navLinks = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/printables", label: "Printables" },
  { to: "/pricing", label: "Pricing" },
  { to: "/order", label: "Custom Print" },
  { to: "/track", label: "Track" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { country, setCountryCode, countries } = useCountry();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/marketplace?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-printora-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight">
          <Printer className="h-6 w-6 text-cyan-400" />
          <span>Printora <span className="text-cyan-400">3D</span></span>
        </Link>

        <form onSubmit={handleSearch} className="hidden flex-1 max-w-md md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products, models..." className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-cyan-400/40" />
          </div>
        </form>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "bg-white/10 text-white" : "text-neutral-400 hover:bg-white/5 hover:text-white"}`}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center sm:flex">
          <select value={country.code} onChange={(e) => setCountryCode(e.target.value)} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-neutral-300 outline-none focus:border-cyan-400/40" aria-label="Select country">
            {countries.map((c) => (<option key={c.code} value={c.code}>{c.flag} {c.currency}</option>))}
          </select>
        </div>

        <Link to="/account" className="hidden rounded-lg px-3 py-2 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white sm:block">Account</Link>

        <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="ml-auto rounded-lg border border-white/10 p-2 lg:hidden" aria-label="Toggle menu">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 px-4 py-4 lg:hidden">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-neutral-500" />
            </div>
          </form>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? "bg-white/10 text-white" : "text-neutral-300"}`}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/account" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-neutral-300">Account</Link>
            <div className="mt-2 px-3">
              <label className="mb-1 block text-xs text-neutral-500">Country / Currency</label>
              <select value={country.code} onChange={(e) => setCountryCode(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
                {countries.map((c) => (<option key={c.code} value={c.code}>{c.flag} {c.name} — {c.currency}</option>))}
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
