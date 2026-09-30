import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const FAQS = [
  { q: ["price", "pricing", "cost", "how much"], a: "Pricing is based on filament weight (grams), material, and complexity. Tiny (5–15g) starts at ₹49. See the Pricing page or get an estimate when you upload a model." },
  { q: ["upload", "model", "stl", "file", "custom"], a: "Go to Custom Print, drag & drop your STL, 3MF or OBJ file, choose material/color/settings, and you’ll see an estimated price. Then place the order — no shopping cart needed." },
  { q: ["track", "order", "status", "where"], a: "Use the Track page and enter your Order ID (format PRT-######). You’ll see a progress timeline from Order Placed → Printing → Shipped → Delivered." },
  { q: ["material", "pla", "petg", "abs", "tpu"], a: "We support PLA (easy, decorative), PETG (durable), ABS (tough/heat-resistant), TPU (flexible), and Carbon Fiber PLA." },
  { q: ["shipping", "delivery", "country"], a: "Select your country in the header — prices update to your local currency. Shipping times depend on location." },
  { q: ["hello", "hi", "help", "support"], a: "Hi! I’m the Printora assistant. Ask me about pricing, uploading models, tracking orders, materials, or anything else." },
];

function getReply(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of FAQS) {
    if (faq.q.some((k) => lower.includes(k))) return faq.a;
  }
  return "I’m not sure about that yet. Try asking about pricing, custom uploads, order tracking, or materials. You can also email Varish.gss@gmail.com.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hi! I’m the Printora assistant. How can I help with your 3D print today?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { role: "bot", text: getReply(text) }]), 400);
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(!open)} className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-neutral-950 shadow-lg shadow-cyan-400/30 transition hover:scale-105 hover:bg-cyan-300" aria-label="Open support chat">
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-40 flex h-[420px] w-[340px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-neutral-950 px-4 py-3">
            <div><p className="font-semibold">Printora Support</p><p className="text-xs text-neutral-500">Usually replies instantly</p></div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-white/10"><X className="h-5 w-5" /></button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${msg.role === "user" ? "bg-cyan-400 text-neutral-950" : "bg-white/10 text-neutral-200"}`}>{msg.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="border-t border-white/10 p-3">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about pricing, orders..." className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-cyan-400/40" />
              <button type="submit" className="rounded-xl bg-cyan-400 p-2 text-neutral-950 hover:bg-cyan-300"><Send className="h-4 w-4" /></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
