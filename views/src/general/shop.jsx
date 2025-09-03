import React, { useEffect, useMemo, useState } from "react";

// HairDiva Empire – Luxury Shop Page
// Unique, dynamic, and self-contained (no extra UI libraries required)
// TailwindCSS classes are used for styling; replace image URLs as desired

export default function Shop() {
  // ---- DATA ---------------------------------------------------------------
  const products = [
    {
      id: 1,
      name: "Luxury Brazilian Wig",
      price: 350,
      image:
        "https://images.pexels.com/photos/3765115/pexels-photo-3765115.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description:
        "100% Remy human hair. Silky-smooth, tangle‑free. Pre-plucked hairline for a seamless melt.",
      category: "Wigs",
      popularity: 98,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Peruvian Straight Bundle",
      price: 220,
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description:
        "Natural luster with full ends. Heat‑style friendly and built for longevity.",
      category: "Bundles",
      popularity: 87,
      rating: 4.6,
    },
    {
      id: 3,
      name: "HD Lace Frontal Closure",
      price: 180,
      image:
        "https://images.pexels.com/photos/3993448/pexels-photo-3993448.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description:
        "Ultra‑thin HD lace for invisible parting. Breathable and comfortable all‑day wear.",
      category: "Closures",
      popularity: 81,
      rating: 4.5,
    },
    {
      id: 4,
      name: "Body Wave Wig",
      price: 400,
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description:
        "Voluminous waves with salon‑grade bounce. Ready to wear with adjustable straps.",
      category: "Wigs",
      popularity: 94,
      rating: 4.8,
    },
    {
      id: 5,
      name: "Deep Curly Bundle",
      price: 260,
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description:
        "Defined curls that hold shape after wash. Minimal shedding technology.",
      category: "Bundles",
      popularity: 83,
      rating: 4.6,
    },
    {
      id: 6,
      name: "13x4 Transparent Lace",
      price: 210,
      image:
        "https://images.pexels.com/photos/3993448/pexels-photo-3993448.jpeg?auto=compress&cs=tinysrgb&w=1200",
      description:
        "Crystal‑clear lace that blends to multiple skin tones for flawless installs.",
      category: "Closures",
      popularity: 76,
      rating: 4.4,
    },
  ];

  const categories = ["All", "Wigs", "Bundles", "Closures"];
  const priceBands = [
    { label: "All", test: () => true },
    { label: "Under $200", test: (p) => p.price < 200 },
    { label: "$200–$300", test: (p) => p.price >= 200 && p.price <= 300 },
    { label: "Over $300", test: (p) => p.price > 300 },
  ];
  const sortOptions = [
    "Default",
    "Price: Low → High",
    "Price: High → Low",
    "Name: A → Z",
    "Popularity",
  ];

  // ---- STATE --------------------------------------------------------------
  const [category, setCategory] = useState("All");
  const [priceBand, setPriceBand] = useState("All");
  const [sort, setSort] = useState("Default");
  const [query, setQuery] = useState("");

  const [quickView, setQuickView] = useState(null); // product or null
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("hairdiva_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("hairdiva_cart", JSON.stringify(cart));
  }, [cart]);

  // ---- DERIVED DATA -------------------------------------------------------
  const filtered = useMemo(() => {
    const band = priceBands.find((b) => b.label === priceBand) || priceBands[0];
    return products
      .filter((p) => (category === "All" ? true : p.category === category))
      .filter((p) => band.test(p))
      .filter((p) =>
        query.trim() ? p.name.toLowerCase().includes(query.toLowerCase()) : true
      );
  }, [category, priceBand, query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "Price: Low → High") arr.sort((a, b) => a.price - b.price);
    if (sort === "Price: High → Low") arr.sort((a, b) => b.price - a.price);
    if (sort === "Name: A → Z") arr.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "Popularity") arr.sort((a, b) => b.popularity - a.popularity);
    return arr;
  }, [filtered, sort]);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  // ---- HELPERS ------------------------------------------------------------
  const format = (n) => `$${n.toFixed(2)}`;

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
  };

  const updateQty = (id, nextQty) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, nextQty) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  // ---- UI -----------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FCF7F2] to-white text-[#2b1a12]">


      {/* Controls */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="col-span-1 md:col-span-2 px-4 py-3 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-[#F66B04] bg-white"
          />
          <select
            className="px-4 py-3 rounded-xl border border-amber-200 bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3 md:col-span-1 md:grid-cols-2">
            <select
              className="px-4 py-3 rounded-xl border border-amber-200 bg-white"
              value={priceBand}
              onChange={(e) => setPriceBand(e.target.value)}
            >
              {priceBands.map((b) => (
                <option key={b.label}>{b.label}</option>
              ))}
            </select>
            <select
              className="px-4 py-3 rounded-xl border border-amber-200 bg-white"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {sortOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sorted.map((p, idx) => (
          <article
            key={p.id}
            className="opacity-0 animate-slideUp"
            style={{ animationDelay: `${idx * 120}ms`, animationFillMode: "forwards" }}
          >
            <div className="group bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_-12px_rgba(69,24,5,0.25)] hover:shadow-[0_18px_50px_-12px_rgba(69,24,5,0.35)] transition">
              <div className="relative h-64 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <button
                  onClick={() => setQuickView(p)}
                  className="absolute bottom-4 right-4 text-xs md:text-sm px-4 py-2 rounded-full bg-[#451805] text-white hover:bg-[#F66B04] transition opacity-0 group-hover:opacity-100"
                >
                  Quick View
                </button>
                <div className="absolute top-4 left-4 text-xs bg-white/80 backdrop-blur px-2 py-1 rounded-full">
                  {p.category}
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-[#451805] line-clamp-1">{p.name}</h3>
                <p className="text-sm text-[#6F4E37] line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <PriceTag />
                    <span className="text-lg font-bold text-[#F66B04]">{format(p.price)}</span>
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="px-4 py-2 rounded-full bg-[#451805] text-white hover:bg-[#F66B04] transition font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-6 mt-20 mb-16">
        <div className="rounded-3xl bg-[#451805] text-white p-8 md:p-12 text-center shadow-[0_10px_40px_-12px_rgba(69,24,5,0.4)]">
          <h2 className="text-2xl md:text-3xl font-bold">Stay Luxe with HairDiva</h2>
          <p className="mt-2 text-white/90">Join our list for exclusive drops, VIP offers, and beauty tips.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <input type="email" placeholder="Enter your email" className="w-full sm:w-96 px-4 py-3 rounded-xl text-[#2b1a12]" />
            <button className="px-6 py-3 rounded-xl bg-[#F66B04] hover:bg-white hover:text-[#451805] transition font-semibold">Subscribe</button>
          </div>
        </div>
      </section>



      {/* Quick View Modal */}
      {quickView && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setQuickView(null)} />
          <div className="absolute inset-x-0 top-10 mx-auto max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-modalIn">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-72 md:h-full bg-black/5">
                <img src={quickView.image} alt={quickView.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#451805]">{quickView.name}</h3>
                    <p className="text-sm text-[#6F4E37] mt-1">{quickView.category} • {quickView.rating}★</p>
                  </div>
                  <button onClick={() => setQuickView(null)} className="rounded-full p-2 hover:bg-amber-50">
                    <CloseIcon />
                  </button>
                </div>
                <p className="text-sm text-[#4b3a2f]">{quickView.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold text-[#F66B04]">{format(quickView.price)}</span>
                  <button
                    onClick={() => {
                      addToCart(quickView);
                      setQuickView(null);
                      setCartOpen(true);
                    }}
                    className="px-5 py-3 rounded-full bg-[#451805] text-white hover:bg-[#F66B04] transition font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Slide-over */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-2"><CartIcon /><span className="font-semibold">Your Cart</span></div>
            <button onClick={() => setCartOpen(false)} className="rounded-full p-2 hover:bg-amber-50"><CloseIcon /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center text-[#6F4E37]">Your cart is empty.</div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center border rounded-2xl p-3">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium line-clamp-1">{item.name}</div>
                    <div className="text-sm text-[#6F4E37] mt-0.5">{format(item.price)}</div>
                    <div className="mt-2 inline-flex items-center rounded-full border">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-1">−</button>
                      <span className="px-3 py-1 border-l border-r">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-1">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{format(item.qty * item.price)}</div>
                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-600 mt-1 hover:underline">Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="border-t p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6F4E37]">Subtotal</span>
              <span className="text-lg font-semibold">{format(cartTotal)}</span>
            </div>
            <button className="w-full py-3 rounded-xl bg-[#451805] text-white hover:bg-[#F66B04] transition font-semibold" disabled={cart.length === 0}>
              Checkout
            </button>
            <button className="w-full py-2 rounded-xl border hover:bg-amber-50 transition text-sm" onClick={clearCart} disabled={cart.length === 0}>
              Clear Cart
            </button>
          </div>
        </div>
      </aside>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn { animation: fadeIn 0.8s ease forwards; }
        .animate-slideUp { animation: slideUp 0.7s ease forwards; }
        .animate-modalIn { animation: modalIn 0.25s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes slideUp { from { opacity:0; transform: translateY(24px);} to { opacity:1; transform: translateY(0);} }
        @keyframes modalIn { from { opacity:0; transform: translateY(12px) scale(0.98);} to { opacity:1; transform: translateY(0) scale(1);} }
      `}</style>
    </div>
  );
}

// ---- ICONS ---------------------------------------------------------------
function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M2 3h2l2.4 12.1A2 2 0 0 0 8.35 17h8.8a2 2 0 0 0 1.97-1.64L21 7H6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
    </svg>
  );
}
function PriceTag() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#6F4E37]">
      <path d="M20 10V7a2 2 0 0 0-2-2h-3M4 14v3a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
