import React from "react";

export default function Service() {
  const servicesData = [
    {
      id: 1,
      title: "Premium UI/UX",
      desc: "User-centered interfaces with measurable conversion lift.",
      tags: ["Design", "Research"],
      accent: "from-[#F66B04] to-[#FCEDD4]",
    },
    {
      id: 2,
      title: "Frontend Engineering",
      desc: "Scalable React apps, accessible and fast.",
      tags: ["React", "Performance"],
      accent: "from-[#451805] to-[#F66B04]",
    },
    {
      id: 3,
      title: "Mobile Apps",
      desc: "Cross-platform apps using modern stacks.",
      tags: ["React Native", "Expo"],
      accent: "from-[#FCEDD4] to-[#451805]",
    },
    {
      id: 4,
      title: "Brand & Visuals",
      desc: "Logos, identity systems and brand strategy.",
      tags: ["Brand", "Strategy"],
      accent: "from-[#F66B04] to-[#451805]",
    },
  ];

  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState("All");
  const [selected, setSelected] = React.useState(null);
  const [shuffleSeed, setShuffleSeed] = React.useState(0);

  const allTags = ["All", ...new Set(servicesData.flatMap((s) => s.tags))];

  const filtered = servicesData
    .filter((s) => activeTag === "All" || s.tags.includes(activeTag))
    .filter(
      (s) =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.desc.toLowerCase().includes(query.toLowerCase())
    )
    .map((s, i) => ({ ...s, _rand: (Math.sin(i + shuffleSeed) + 1) / 2 }))
    .sort((a, b) => b._rand - a._rand);

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-white to-[#FFFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a]">
              Our services — crafted for impact
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-600 max-w-xl">
              Hand-tailored solutions combining design, engineering and
              strategy. Explore, filter, and pick what fits your ambition.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                aria-label="Search services"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full sm:w-72 rounded-full py-2 px-4 shadow-sm text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#F66B04]"
                placeholder="Search services, e.g. 'React'"
              />
              <button
                onClick={() => setShuffleSeed((s) => s + 1)}
                title="Shuffle results"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow text-xs ring-1 ring-slate-200"
              >
                ⟳
              </button>
            </div>

            {/* Scrollable tags */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide sm:overflow-visible">
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`px-3 py-1 whitespace-nowrap rounded-full text-sm font-medium transition ${
                    activeTag === t
                      ? "bg-[#F66B04] text-white shadow"
                      : "ring-1 ring-slate-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Service cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((s) => (
            <article
              key={s.id}
              className={`relative p-5 rounded-2xl bg-white/60 backdrop-blur-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100`}
            >
              <div
                className={`absolute inset-0 -z-10 bg-gradient-to-r ${s.accent} opacity-10`}
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#0f172a]">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-600">{s.desc}</p>
                </div>
                <button
                  onClick={() => setSelected(s)}
                  className="self-start mt-1 inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-semibold ring-1 ring-[#F66B04] hover:bg-[#F66B04] hover:text-white transition"
                >
                  View
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-white/60 ring-1 ring-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600">
                No services match your search. Try a different keyword or click
                the shuffle button.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveTag("All");
                  setShuffleSeed((s) => s + 1);
                }}
                className="mt-4 rounded-lg px-4 py-2 ring-1 ring-slate-200"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelected(null)}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">{selected.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{selected.desc}</p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {selected.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 ring-1 ring-slate-200 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="mt-1 self-start rounded-lg px-3 py-1 ring-1 ring-slate-200"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button className="rounded-lg px-4 py-2 bg-[#451805] text-white font-semibold">
                Request proposal
              </button>
              <button className="rounded-lg px-4 py-2 ring-1 ring-slate-200">
                Schedule call
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
