import React, { useMemo, useState } from "react";

type IconName =
  | "upload"
  | "printer"
  | "packageCheck"
  | "sparkles"
  | "cart"
  | "mail"
  | "phone"
  | "mapPin";

type IconProps = {
  name: IconName;
  className?: string;
};

function Icon({ name, className = "h-6 w-6" }: IconProps) {
  const common: React.SVGProps<SVGSVGElement> = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const icons: Record<IconName, JSX.Element> = {
    upload: (
      <svg {...common}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M17 8l-5-5-5 5" />
        <path d="M12 3v12" />
      </svg>
    ),
    printer: (
      <svg {...common}>
        <path d="M6 9V2h12v7" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <path d="M6 14h12v8H6z" />
        <path d="M18 12h.01" />
      </svg>
    ),
    packageCheck: (
      <svg {...common}>
        <path d="M16.5 9.4 7.5 4.2" />
        <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l2-1.1" />
        <path d="M3.3 7 12 12l8.7-5" />
        <path d="M12 22V12" />
        <path d="m16 19 2 2 4-4" />
      </svg>
    ),
    sparkles: (
      <svg {...common}>
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
        <path d="M19 15l.9 2.6L22 18.5l-2.1.9L19 22l-.9-2.6-2.1-.9 2.1-.9L19 15z" />
        <path d="M4 3l.7 2L7 5.7l-2.3.8L4 9l-.7-2.5L1 5.7 3.3 5 4 3z" />
      </svg>
    ),
    cart: (
      <svg {...common}>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
      </svg>
    ),
    mail: (
      <svg {...common}>
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
    phone: (
      <svg {...common}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9z" />
      </svg>
    ),
    mapPin: (
      <svg {...common}>
        <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  };

  return icons[name];
}

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/5 ${className}`}
    >
      {children}
    </div>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "solid" | "outline";
  className?: string;
};

function Button({
  children,
  href,
  type = "button",
  variant = "solid",
  className = "",
}: ButtonProps) {
  const styles =
    variant === "outline"
      ? "border border-white/20 bg-transparent text-white hover:bg-white hover:text-black"
      : "bg-white text-black hover:bg-neutral-200";

  const base = `inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold transition ${styles} ${className}`;

  if (href) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={base}>
      {children}
    </button>
  );
}

type SizeName = "Tiny" | "Small" | "Big" | "Massive";

type SizePrice = {
  grams: string;
  price: string;
  example: string;
};

const sizePrices: Record<SizeName, SizePrice> = {
  Tiny: {
    grams: "5–15g",
    price: "₹49–₹149",
    example: "Small charms, tags, mini parts",
  },
  Small: {
    grams: "16–40g",
    price: "₹150–₹349",
    example: "Keychains, phone stands, small tools",
  },
  Big: {
    grams: "41–120g",
    price: "₹350–₹899",
    example: "Desk items, medium models, brackets",
  },
  Massive: {
    grams: "121g+",
    price: "₹900+",
    example: "Large models, helmets, props, bulk parts",
  },
};

const sizeOptions: SizeName[] = ["Tiny", "Small", "Big", "Massive"];

type OrderForm = {
  name: string;
  email: string;
  item: string;
  size: SizeName;
  material: string;
  color: string;
  quantity: string;
  details: string;
};

function buildOrderEmailBody(form: OrderForm) {
  const sizeInfo = sizePrices[form.size];
  return [
    "Hi, I want to order a 3D printed item.",
    "",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Item: ${form.item}`,
    `Size: ${form.size}`,
    `Estimated grams: ${sizeInfo.grams}`,
    `Estimated price: ${sizeInfo.price}`,
    `Material: ${form.material}`,
    `Color: ${form.color}`,
    `Quantity: ${form.quantity}`,
    `Details: ${form.details}`,
    "",
    "Note: Final price may change depending on exact grams, print time, supports, infill, and model difficulty.",
  ].join("\n");
}

function createMailtoLink(form: OrderForm) {
  const subject = encodeURIComponent("3D Printing Order Request");
  const body = encodeURIComponent(buildOrderEmailBody(form));
  return `mailto:Varish.gss@gmail.com?subject=${subject}&body=${body}`;
}

function runSelfTests() {
  const testForm: OrderForm = {
    name: "Test User",
    email: "test@example.com",
    item: "Phone stand",
    size: "Small",
    material: "PLA",
    color: "Black",
    quantity: "2",
    details: "Need it by Friday",
  };

  const body = buildOrderEmailBody(testForm);
  console.assert(
    body.includes("Name: Test User"),
    "Email body should include customer name"
  );
  console.assert(
    body.includes("Size: Small"),
    "Email body should include size"
  );
  console.assert(
    body.includes("Estimated grams: 16–40g"),
    "Email body should include estimated grams"
  );
  console.assert(
    body.includes("Estimated price: ₹150–₹349"),
    "Email body should include rupee price"
  );
  console.assert(
    body.includes("Quantity: 2"),
    "Email body should include quantity"
  );

  const massiveForm: OrderForm = { ...testForm, size: "Massive" };
  console.assert(
    buildOrderEmailBody(massiveForm).includes("₹900+"),
    "Massive size should show ₹900+"
  );

  const link = createMailtoLink(testForm);
  console.assert(
    link.startsWith("mailto:Varish.gss@gmail.com"),
    "Mailto link should use business email"
  );
  console.assert(
    link.includes("subject=3D%20Printing%20Order%20Request"),
    "Mailto link should encode subject"
  );
  console.assert(
    link.includes("Phone%20stand"),
    "Mailto link should encode body text"
  );
}

if (typeof window !== "undefined") runSelfTests();

export default function App() {
  const [form, setForm] = useState<OrderForm>({
    name: "",
    email: "",
    item: "",
    size: "Small",
    material: "PLA",
    color: "Black",
    quantity: "1",
    details: "",
  });

  const products = useMemo(
    () => [
      {
        name: "Custom Keychains",
        grams: "8–20g",
        price: "₹79–₹199",
        desc: "Names, logos, gamer tags, and brand designs.",
      },
      {
        name: "Desk Accessories",
        grams: "30–90g",
        price: "₹299–₹749",
        desc: "Phone stands, cable holders, pen cups, and organizers.",
      },
      {
        name: "Miniatures & Models",
        grams: "20–120g",
        price: "₹249–₹999",
        desc: "Figures, vehicles, buildings, props, and collectibles.",
      },
      {
        name: "Replacement Parts",
        grams: "10–80g",
        price: "₹149–₹699",
        desc: "Small broken parts, clips, brackets, and custom fittings.",
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        icon: "upload" as IconName,
        title: "Send Your Idea",
        text: "Upload or describe your model, sketch, or reference image.",
      },
      {
        icon: "printer" as IconName,
        title: "We Estimate by Grams",
        text: "Price is estimated using filament grams, size, material, supports, and print time.",
      },
      {
        icon: "packageCheck" as IconName,
        title: "Pickup or Delivery",
        text: "Collect your order or get it delivered after the print is finished.",
      },
    ],
    []
  );

  const selectedSize = sizePrices[form.size];

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = createMailtoLink(form);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Icon name="printer" className="h-7 w-7" />
            Printora 3D
          </div>
          <div className="hidden gap-6 text-sm text-neutral-300 md:flex">
            <a href="#products" className="hover:text-white">
              Products
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="#order" className="hover:text-white">
              Order
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>
          <Button href="#order">Order Now</Button>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
            <Icon name="sparkles" className="h-4 w-4" /> Prices estimated by
            print grams
          </div>
          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            Order custom 3D printed items online.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-300">
            Choose your size, material, color, and quantity. Prices are shown in
            Indian rupees and estimated by the amount of grams used in each
            print.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="#order" className="text-base">
              <Icon name="cart" className="mr-2 h-5 w-5" /> Start an Order
            </Button>
            <Button href="#pricing" variant="outline" className="text-base">
              View Gram Pricing
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/20 to-white/0 blur-3xl" />
          <Card className="relative overflow-hidden rounded-[3rem] bg-white/10 shadow-2xl backdrop-blur-xl">
            <div className="p-8">
              <div className="rounded-[2rem] bg-neutral-900 p-8">
                <Icon name="printer" className="mb-8 h-24 w-24 text-white" />
                <h2 className="text-3xl font-bold text-white">
                  Estimated pricing
                </h2>
                <p className="mt-4 text-neutral-300">
                  Final price may vary depending on grams, supports, infill,
                  print time, and model difficulty.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                  {sizeOptions.map((size) => {
                    const data = sizePrices[size];
                    return (
                      <div key={size} className="rounded-2xl bg-white/10 p-4">
                        <p className="font-bold">{size}</p>
                        <p className="text-neutral-300">{data.grams}</p>
                        <p className="mt-1 font-bold">{data.price}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title} className="text-white">
              <div className="p-8">
                <Icon name={step.icon} className="mb-5 h-10 w-10" />
                <h3 className="text-xl font-bold">
                  {index + 1}. {step.title}
                </h3>
                <p className="mt-3 text-neutral-300">{step.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-4xl font-black">Popular items</h2>
        <p className="mt-3 text-neutral-300">
          Estimated rupee prices based on average grams for each item type.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.name}
              className="text-white transition hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="p-6">
                <div className="mb-5 h-32 rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-900" />
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="mt-2 text-sm text-neutral-300">{product.desc}</p>
                <p className="mt-5 text-sm text-neutral-400">
                  Estimated grams: {product.grams}
                </p>
                <p className="mt-1 text-lg font-bold">{product.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-4xl font-black">Size and gram pricing</h2>
        <p className="mt-3 text-neutral-300">
          These are estimated prices. Final price depends on the exact print
          grams and print difficulty.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {sizeOptions.map((size) => {
            const data = sizePrices[size];
            return (
              <Card key={size} className="text-white">
                <div className="p-8">
                  <h3 className="text-2xl font-bold">{size}</h3>
                  <p className="mt-4 text-4xl font-black">{data.price}</p>
                  <p className="mt-4 text-neutral-300">
                    Estimated filament: {data.grams}
                  </p>
                  <p className="mt-3 text-sm text-neutral-400">
                    Examples: {data.example}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="order" className="mx-auto max-w-4xl px-6 py-16">
        <Card className="rounded-[2rem] bg-white/10 text-white shadow-2xl">
          <div className="p-8 md:p-10">
            <h2 className="text-4xl font-black">Place an order</h2>
            <p className="mt-3 text-neutral-300">
              Pick a size to see the estimated grams and price range before
              sending your order request.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/40"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  type="email"
                  placeholder="Email address"
                  className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/40"
                />
              </div>
              <input
                name="item"
                value={form.item}
                onChange={handleChange}
                required
                placeholder="What do you want printed?"
                className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/40"
              />
              <div className="grid gap-5 md:grid-cols-4">
                <select
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/40"
                >
                  <option>Tiny</option>
                  <option>Small</option>
                  <option>Big</option>
                  <option>Massive</option>
                </select>
                <select
                  name="material"
                  value={form.material}
                  onChange={handleChange}
                  className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/40"
                >
                  <option>PLA</option>
                  <option>PETG</option>
                  <option>TPU</option>
                  <option>ABS</option>
                </select>
                <select
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/40"
                >
                  <option>Black</option>
                  <option>White</option>
                  <option>Red</option>
                  <option>Blue</option>
                  <option>Green</option>
                  <option>Custom</option>
                </select>
                <input
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/40"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-neutral-950 p-5">
                <p className="text-sm text-neutral-400">
                  Selected size estimate
                </p>
                <p className="mt-1 text-2xl font-black">
                  {form.size}: {selectedSize.price}
                </p>
                <p className="mt-1 text-neutral-300">
                  Estimated filament used: {selectedSize.grams}
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  Final price may change after checking the exact model grams,
                  supports, infill, material, and print time.
                </p>
              </div>

              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                rows={5}
                placeholder="Extra details, size in cm, file link, delivery address, deadline, etc."
                className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 outline-none focus:border-white/40"
              />
              <Button type="submit" className="text-base">
                Send Order Request
              </Button>
            </form>
          </div>
        </Card>
      </section>

      <footer id="contact" className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold">
              <Icon name="printer" className="h-6 w-6" /> Printora 3D
            </div>
            <p className="mt-3 text-neutral-400">
              Custom 3D printing for gifts, parts, school projects, business,
              and prototypes.
            </p>
          </div>
          <div className="space-y-3 text-neutral-300">
            <p className="flex items-center gap-2">
              <Icon name="mail" className="h-4 w-4" /> Varish.gss@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <Icon name="phone" className="h-4 w-4" /> +91 6364910263
            </p>
            <p className="flex items-center gap-2">
              <Icon name="mapPin" className="h-4 w-4" /> Bengaluru, India
            </p>
          </div>
          <div className="text-neutral-400 md:text-right">
            © 2026 Printora 3D. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
