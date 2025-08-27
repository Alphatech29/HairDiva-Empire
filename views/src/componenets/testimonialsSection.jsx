// TestimonialSection.jsx
import React, { useState, useEffect } from 'react';

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
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const { name, designation, photo, text, rating } = testimonials[currentIndex];

  return (
    <section className="bg-paysparq py-12 px-4 text-center">
      <h2 className="text-3xl font-bold text-primary mb-8">Testimonials</h2>

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 relative transition-all duration-500">
        <img
          src={photo}
          alt={name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary"
        />
        <p className="text-gray-700 mb-4 italic">"{text}"</p>

        <div className="flex justify-center mb-2">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-yellow-400 text-lg ${i < rating ? "" : "opacity-30"}`}>
              ★
            </span>
          ))}
        </div>

        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500">{designation}</p>

        {/* Navigation buttons */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            onClick={prevTestimonial}
            className="p-2 text-primary font-bold text-2xl hover:scale-110 transition"
          >
            ‹
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            onClick={nextTestimonial}
            className="p-2 text-primary font-bold text-2xl hover:scale-110 transition"
          >
            ›
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex ? "bg-primary scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
