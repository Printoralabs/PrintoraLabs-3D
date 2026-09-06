import React, { useMemo, useState } from "react";

const BUSINESS_EMAIL = "Varish.gss@gmail.com";

const sizePrices = {
  Tiny: { grams: "5–15g", price: "₹49–₹149", example: "Small charms, tags, mini parts" },
  Small: { grams: "16–40g", price: "₹150–₹349", example: "Keychains, phone stands, small tools" },
  Big: { grams: "41–120g", price: "₹350–₹899", example: "Desk items, medium models, brackets" },
  Massive: { grams: "121g+", price: "₹900+", example: "Large models, helmets, props, bulk parts" },
};

const sizeOptions = ["Tiny", "Small", "Big", "Massive"];

function Icon({ name, className = "h-6 w-6" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    upload: <svg {...common}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></svg>,
    printer: <svg {...common}><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/><path d="M18 12h.01"/></svg>,
    package: <svg {...common}><path d="m16.5 9.4-9-5.2"/><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/></svg>,
    sparkles: <svg {...common}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="M19 15l.9 2.6L22 18.5l-2.1.9L19 22l-.9-2.6-2.1-.9 2.1-.9L19 15Z"/><path d="M4 3l.7 2L7 5.7l-2.3.8L4 9l-.7-2.5L1 5.7 3.3 5 4 3Z"/></svg>,
    cart: <svg {...common}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>,
    mail: <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>,
    phone: <svg {...common}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z"/></svg>,
    mapPin: <svg {...common}><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  };

  return icons[name] || null;
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-white/10 bg-white/5 ${className}`}>{children}</div>;
}

function Button({ children, href, type = "button", variant = "solid", className = "", onClick }) {
  const styles = variant === "outline"
    ? "border border-white/20 bg-transparent text-white hover:bg-white hover:text-black"
    : "bg-white text-black hover:bg-neutral-200";
  const base = `inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold transition ${styles} ${className}`;
  if (href) return <a href={href} className={base}>{children}</a>;
  return <button type={type} className={base} onClick={onClick}>{children}</button>;
}

function buildOrderEmailBody(form) {
  const sizeInfo = sizePrices[form.size];
  return [
    "Hi, I want to order a 3D printed item.", "",
    `Name: ${form.name}`, `Email: ${form.email}`, `Item: ${form.item}`,
    `Size: ${form.size}`, `Estimated grams: ${sizeInfo.grams}`, `Estimated price: ${sizeInfo.price}`,
    `Material: ${form.material}`, `Color: ${form.color}`, `Quantity: ${form.quantity}`,
    `Details: ${form.details}`, "",
    "Note: Final price may change depending on exact grams, print time, supports, infill, and model difficulty.",
  ].join("\n");
}

function createMailtoLink(form) {
  return `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent("3D Printing Order Request")}&body=${encodeURIComponent(buildOrderEmailBody(form))}`;
}

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", item: "", size: "Small", material: "PLA", color: "Black", quantity: "1", details: "" });
  const [mobileMenu, setMobileMenu] = useState(false);

  const products = useMemo(() => [
    { name: "Custom Keychains", grams: "8–20g", price: "₹79–₹199", desc: "Names, logos, gamer tags, and brand designs.", icon: "package" },
    { name: "Desk Accessories", grams: "30–90g", price: "₹299–₹749", desc: "Phone stands, cable holders, pen cups, and organizers.", icon: "printer" },
    { name: "Miniatures & Models", grams: "20–120g", price: "₹249–₹999", desc: "Figures, vehicles, buildings, props, and collectibles.", icon: "sparkles" },
    { name: "Replacement Parts", grams: "10–80g", price: "₹149–₹699", desc: "Small broken parts, clips, brackets, and custom fittings.", icon: "package" },
  ], []);

  const steps = useMemo(() => [
    { icon: "upload", title: "Send Your Idea", text: "Upload or describe your model, sketch, or reference image." },
    { icon: "printer", title: "We Estimate the Price", text: "We estimate the price using filament grams, material, supports, and print time." },
    { icon: "package", title: "Pickup or Delivery", text: "Collect your order or arrange delivery after the print is finished." },
  ], []);

  const selectedSize = sizePrices[form.size];
  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = createMailtoLink(form);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 text-xl font-bold"><Icon name="printer" className="h-7 w-7" />Printora 3D</a>
          <div className="hidden gap-7 text-sm text-neutral-300 md:flex">
            <a href="#products" className="hover:text-white">Products</a><a href="#pricing" className="hover:text-white">Pricing</a><a href="#order" className="hover:text-white">Order</a><a href="#contact" className="hover:text-white">Contact</a>
          </div>
          <div className="flex items-center gap-3"><Button href="#order" className="hidden sm:inline-flex">Order Now</Button><button type="button" onClick={() => setMobileMenu(!mobileMenu)} className="rounded-xl border border-white/10 px-3 py-2 md:hidden">☰</button></div>
        </div>
        {mobileMenu && <div className="border-t border-white/10 px-6 py-4 md:hidden"><div className="flex flex-col gap-4 text-neutral-300"><a href="#products" onClick={() => setMobileMenu(false)}>Products</a><a href="#pricing" onClick={() => setMobileMenu(false)}>Pricing</a><a href="#order" onClick={() => setMobileMenu(false)}>Order</a><a href="#contact" onClick={() => setMobileMenu(false)}>Contact</a></div></div>}
      </nav>

      <main id="top">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300"><Icon name="sparkles" className="h-4 w-4" />Custom 3D printing made simple</div>
            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">Turn your ideas into<span className="block text-neutral-400">real objects.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-300">Printora 3D creates custom 3D printed products, replacement parts, models, prototypes, gifts, and more.</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row"><Button href="#order" className="text-base"><Icon name="cart" className="mr-2 h-5 w-5" />Start an Order</Button><Button href="#pricing" variant="outline" className="text-base">View Pricing</Button></div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4"><div><p className="text-2xl font-black">PLA</p><p className="text-sm text-neutral-500">Material</p></div><div><p className="text-2xl font-black">4+</p><p className="text-sm text-neutral-500">Size ranges</p></div><div><p className="text-2xl font-black">₹49+</p><p className="text-sm text-neutral-500">Starting price</p></div></div>
          </div>
          <div className="relative"><div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/20 to-transparent blur-3xl"/><Card className="relative overflow-hidden rounded-[3rem] bg-white/10 p-2 shadow-2xl"><div className="rounded-[2.5rem] bg-neutral-900 p-8 md:p-10"><div className="flex h-56 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-950"><Icon name="printer" className="h-32 w-32 text-white/80"/></div><h2 className="mt-8 text-3xl font-bold">Estimated pricing</h2><p className="mt-4 text-neutral-400">Pricing is based on approximate filament usage. Final prices are confirmed after checking the model.</p><div className="mt-8 grid grid-cols-2 gap-3">{sizeOptions.map((size) => <div key={size} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="font-bold">{size}</p><p className="mt-1 text-sm text-neutral-400">{sizePrices[size].grams}</p><p className="mt-2 font-bold">{sizePrices[size].price}</p></div>)}</div></div></Card></div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16"><div className="mb-10"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">How it works</p><h2 className="mt-3 text-4xl font-black">From idea to finished print.</h2></div><div className="grid gap-6 md:grid-cols-3">{steps.map((step, index) => <Card key={step.title} className="transition hover:bg-white/10"><div className="p-8"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black"><Icon name={step.icon} className="h-6 w-6"/></div><p className="text-sm text-neutral-500">STEP {index + 1}</p><h3 className="mt-2 text-xl font-bold">{step.title}</h3><p className="mt-3 leading-7 text-neutral-400">{step.text}</p></div></Card>)}</div></section>

        <section id="products" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">What we print</p><h2 className="mt-3 text-4xl font-black">Popular items</h2><p className="mt-3 max-w-2xl text-neutral-400">From simple accessories to custom replacement parts, we can produce a wide range of 3D printed objects.</p><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{products.map((product) => <Card key={product.name} className="overflow-hidden transition hover:-translate-y-1 hover:bg-white/10"><div className="flex h-40 items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950"><Icon name={product.icon} className="h-16 w-16 text-white/70"/></div><div className="p-6"><h3 className="text-xl font-bold">{product.name}</h3><p className="mt-3 text-sm leading-6 text-neutral-400">{product.desc}</p><div className="mt-6 border-t border-white/10 pt-4"><p className="text-sm text-neutral-500">Estimated grams</p><p className="font-semibold">{product.grams}</p><p className="mt-2 text-lg font-bold">{product.price}</p></div></div></Card>)}</div></section>

        <section id="pricing" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Simple pricing</p><h2 className="mt-3 text-4xl font-black">Size and gram pricing</h2><p className="mt-3 max-w-2xl text-neutral-400">These are estimated ranges. The exact price depends on the model, material, infill, supports, print time, and final weight.</p><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{sizeOptions.map((size) => <Card key={size} className="p-8"><p className="text-sm text-neutral-500">SIZE</p><h3 className="mt-2 text-2xl font-bold">{size}</h3><p className="mt-6 text-4xl font-black">{sizePrices[size].price}</p><p className="mt-4 text-neutral-300">{sizePrices[size].grams} estimated filament</p><p className="mt-4 text-sm leading-6 text-neutral-500">Examples: {sizePrices[size].example}</p></Card>)}</div></section>

        <section id="order" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-20"><Card className="overflow-hidden rounded-[2rem] bg-white/10 shadow-2xl"><div className="p-8 md:p-10"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black"><Icon name="cart" className="h-6 w-6"/></div><div><p className="text-sm text-neutral-500">PRINTORA 3D</p><h2 className="text-3xl font-black">Place an order</h2></div></div><p className="mt-5 text-neutral-400">Tell us what you want printed. When you submit the form, your email app will open with the order information ready to send.</p><form onSubmit={handleSubmit} className="mt-8 grid gap-5"><div className="grid gap-5 md:grid-cols-2"><input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none placeholder:text-neutral-600 focus:border-white/40"/><input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email address" className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none placeholder:text-neutral-600 focus:border-white/40"/></div><input name="item" value={form.item} onChange={handleChange} required placeholder="What do you want printed?" className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none placeholder:text-neutral-600 focus:border-white/40"/><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><select name="size" value={form.size} onChange={handleChange} className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none">{sizeOptions.map((size) => <option key={size} value={size}>{size}</option>)}</select><select name="material" value={form.material} onChange={handleChange} className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none"><option>PLA</option><option>PETG</option><option>TPU</option><option>ABS</option></select><select name="color" value={form.color} onChange={handleChange} className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none"><option>Black</option><option>White</option><option>Red</option><option>Blue</option><option>Green</option><option>Custom</option></select><input name="quantity" value={form.quantity} onChange={handleChange} type="number" min="1" placeholder="Quantity" className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none placeholder:text-neutral-600"/></div><div className="rounded-2xl border border-white/10 bg-neutral-950 p-6"><p className="text-sm text-neutral-500">SELECTED SIZE ESTIMATE</p><p className="mt-2 text-2xl font-black">{form.size}: {selectedSize.price}</p><p className="mt-2 text-neutral-300">Estimated filament: {selectedSize.grams}</p><p className="mt-3 text-sm leading-6 text-neutral-500">Final price may change after checking the exact model grams, supports, infill, material, and print time.</p></div><textarea name="details" value={form.details} onChange={handleChange} rows={5} placeholder="Extra details, size in cm, file link, deadline, delivery information, etc." className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-white outline-none placeholder:text-neutral-600 focus:border-white/40"/><Button type="submit" className="w-full text-base">Send Order Request</Button></form></div></Card></section>
      </main>

      <footer id="contact" className="border-t border-white/10"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3"><div><div className="flex items-center gap-2 text-xl font-bold"><Icon name="printer" className="h-6 w-6"/>Printora 3D</div><p className="mt-4 max-w-md leading-7 text-neutral-500">Custom 3D printing for gifts, parts, school projects, businesses, prototypes, models, and more.</p></div><div className="space-y-4 text-neutral-400"><a href={`mailto:${BUSINESS_EMAIL}`} className="flex items-center gap-3 hover:text-white"><Icon name="mail" className="h-5 w-5"/>{BUSINESS_EMAIL}</a><a href="tel:+916364910263" className="flex items-center gap-3 hover:text-white"><Icon name="phone" className="h-5 w-5"/>+91 6364910263</a><p className="flex items-center gap-3"><Icon name="mapPin" className="h-5 w-5"/>Bengaluru, India</p></div><div className="md:text-right"><p className="text-neutral-500">© 2026 Printora 3D. All rights reserved.</p><a href="#top" className="mt-4 inline-block text-sm text-neutral-400 hover:text-white">Back to top ↑</a></div></div></footer>
    </div>
  );
}
