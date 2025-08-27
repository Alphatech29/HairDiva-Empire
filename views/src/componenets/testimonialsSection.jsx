// TestimonialSection.jsx
import React, { useRef, useEffect, useState } from "react";

const testimonials = [
  {
    name: "Ooni of Ile",
    designation: "Customer",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "Ewaileke Fusion Studio delivers the finest luxury jewelry. Truly exceptional craftsmanship!",
    rating: 5,
  },
  {
    name: "Ngozi Okonkwo",
    designation: "Client",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "I love the quality and attention to detail. Highly recommended!",
    rating: 4,
  },
  {
    name: "Chinedu Ibe",
    designation: "Client",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "The customer service is outstanding. Will definitely come back for more.",
    rating: 5,
  },
  {
    name: "Adeola Akin",
    designation: "Customer",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Amazing experience! I got exactly what I wanted.",
    rating: 5,
  },
  {
    name: "John Doe",
    designation: "Client",
    photo: "https://randomuser.me/api/portraits/men/41.jpg",
    text: "Exceptional quality and great customer care.",
    rating: 4,
  },
];

const TestimonialSection = () => {
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate number of pages based on screen size
  const getItemsPerPage = () => {
    if (window.innerWidth >= 1024) return 3; // PC
    if (window.innerWidth >= 640) return 2; // Tablet
    return 1; // Mobile
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const scrollToPage = (page) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: clientWidth * page,
        behavior: "smooth",
      });
    }
    setCurrentPage(page);
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = (currentPage + 1) % totalPages;
      scrollToPage(nextPage);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentPage, totalPages, itemsPerPage]);

  return (
    <section className="bg-primary-200 py-12 px-4 relative">
      <h2 className="text-3xl font-bold text-primary text-center mb-8">
        Testimonials
      </h2>

      <div className="relative max-w-[85rem] mx-auto">
        {/* Left Arrow */}
        <button
          onClick={() => scrollToPage(Math.max(currentPage - 1, 0))}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:scale-110 transition"
        >
          ‹
        </button>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden scroll-smooth"
        >
          {testimonials.map(({ name, designation, photo, text, rating }, index) => (
            <div
              key={index}
              className="shrink-0 gap-3 w-full mobile:w-full pc:w-1/3 bg-white rounded-2xl shadow-lg p-8 text-center pc:mx-1 "
            >
              <img
                src={photo}
                alt={name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary"
              />
              <p className="text-gray-700 mb-4 italic">"{text}"</p>

              <div className="flex justify-center mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-yellow-400 text-lg ${i < rating ? "" : "opacity-30"}`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-gray-500">{designation}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollToPage(Math.min(currentPage + 1, totalPages - 1))}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:scale-110 transition"
        >
          ›
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => scrollToPage(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentPage ? "bg-primary scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
