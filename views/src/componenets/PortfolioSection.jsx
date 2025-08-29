import React from "react";

const projects = [
  {
    id: 1,
    title: "Corporate Website",
    description:
      "A modern and responsive corporate website tailored to brand identity.",
    image: "/image/bitpluse.jpeg",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description:
      "A scalable online store with seamless checkout experience.",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 3,
    title: "Educational Portal",
    description: "An interactive platform for schools and online learning.",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 4,
    title: "Portfolio Showcase",
    description: "A personal portfolio site with elegant UI/UX design.",
    image: "https://via.placeholder.com/400x250",
  },
];

export default function PortfolioSection() {
  return (
    <section className="pc:px-20 px-5 py-6 grid gap-5 tab:grid-cols-2 pc:grid-cols-3 relative z-30 bg-primary-200">
      {projects.map((project) => (
        <div
          key={project.id}
          className="relative bg-primary-900 rounded-2xl shadow-lg overflow-hidden group"
        >
          {/* Project Image */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-80 object-fill"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
            <h2 className="text-xl font-semibold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-gray-200 text-sm">{project.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
