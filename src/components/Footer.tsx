import { Link } from "react-router-dom";
import { Printer, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Printer className="h-5 w-5 text-cyan-400" />
            Printora 3D
          </div>
          <p className="mt-4 text-sm leading-relaxed text-neutral-500">
            Professional 3D printing marketplace. Shop ready models or upload your own for custom prints.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Explore</h4>
          <ul className="space-y-2 text-sm text-neutral-500">
            <li><Link to="/marketplace" className="hover:text-white">Marketplace</Link></li>
            <li><Link to="/printables" className="hover:text-white">Printables</Link></li>
            <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link to="/order" className="hover:text-white">Custom Printing</Link></li>
            <li><Link to="/track" className="hover:text-white">Track Order</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Company</h4>
          <ul className="space-y-2 text-sm text-neutral-500">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            <li><a href="#terms" className="hover:text-white">Terms</a></li>
            <li><a href="#privacy" className="hover:text-white">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Contact</h4>
          <ul className="space-y-3 text-sm text-neutral-500">
            <li><a href="mailto:Varish.gss@gmail.com" className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4" />Varish.gss@gmail.com</a></li>
            <li><a href="tel:+916364910263" className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4" />+91 6364910263</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />Bengaluru, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} Printora Labs. All rights reserved.
      </div>
    </footer>
  );
}
