import React from "react";

const projects = [
  {
    id: 1,
    title: "Corporate Website",
    description:
      "A modern and responsive corporate website tailored to brand identity.",
    image: "https://via.placeholder.com/400x250",
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
    <section className=" pc:px-20 px-5 py-12 grid gap-5 tab:grid-cols-2 pc:grid-cols-3 relative z-30 bg-primary-200">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-primary-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h2 className="text-xl font-semibold text-primary-100 mb-2">
              {project.title}
            </h2>
            <p className="text-primary-300 text-sm">{project.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
