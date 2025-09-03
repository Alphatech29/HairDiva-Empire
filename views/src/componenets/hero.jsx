import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NavLink } from "react-router-dom";

const slides = [
  {
    title: "Beauty in Every Strand",
    description:
      "Luxury human hair, wigs, installations, and customization for flawless beauty. Transform your look with elegance and confidence.",
    modelImage:
      "/image/hair-2.jpg",
  },
  {
    title: "Luxury Wigs for Every Style",
    description:
      "Upgrade your hairstyle with premium wigs that redefine elegance. Bring your dream look to life.",
    modelImage:
      "/image/hair-1.jpg",
  },
  {
    title: "Custom Hair Installations",
    description:
      "Tailored hair solutions to match your personality and style. Ensuring flawless results for every client.",
    modelImage:
      "/image/hair-3.jpg",
  },

];

export default function CarouselHero() {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-purple-700 to-purple-950">
      {/* Floating particles & sparkles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-yellow-400/30 animate-[float_10s_linear_infinite]"
          style={{
            width: `${2 + Math.random() * 8}px`,
            height: `${2 + Math.random() * 8}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      {/* Golden light streaks */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
        >
          <div
            className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent animate-light-streak"
            style={{
              left: `${20 + i * 15}%`,
              animationDuration: `${8 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        </div>
      ))}

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between max-w-6xl w-full mx-auto h-full px-6">
              {/* Small screen background image */}
              <div
                className="absolute inset-0 lg:hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.modelImage})` }}
              >
                <div className="absolute inset-0 bg-purple-900/60 " />
              </div>

              {/* Text content */}
              <div className="relative lg:mt-20 sm:mb-40 z-10 text-center lg:text-left max-w-lg lg:max-w-xl px-6 py-10 lg:p-0">
                <h1
                  className="text-5xl lg:text-6xl font-serif font-bold mb-4 
                             bg-gradient-to-r from-yellow-300 via-white to-yellow-400
                             bg-clip-text text-transparent drop-shadow-2xl animate-text-shimmer"
                >
                  {slide.title}
                </h1>
                <p className="text-lg lg:text-xl mb-6 text-white/90 drop-shadow-md">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <NavLink
                    to="/shop"
                    className="px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold rounded-md transition transform hover:scale-105 shadow-xl text-base"
                  >
                    Shop Now
                  </NavLink>
                  <NavLink
                    to="#about"
                    className="px-6 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-md hover:bg-yellow-400 hover:text-purple-900 transition transform hover:scale-105 text-base"
                  >
                    Learn More
                  </NavLink>
                </div>
              </div>

              {/* Large screen image with dynamic bottom mask */}
              <div className="hidden lg:block relative mb-6 lg:mb-0 w-full lg:w-auto">
                <div className="relative">
                  <img
                    src={slide.modelImage}
                    alt="Hair Diva Model"
                    className="rounded-3xl shadow-2xl max-w-sm object-cover transform hover:scale-105 transition duration-700 animate-glow"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to top, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskSize: "100% 100%",
                      maskImage:
                        "linear-gradient(to top, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                      maskRepeat: "no-repeat",
                      maskSize: "100% 100%",
                    }}
                  />
                  {/* Glow overlays */}
                  <div className="absolute -inset-4 bg-yellow-400/15 rounded-3xl blur-3xl pointer-events-none animate-pulse" />
                  <div className="absolute -inset-6 border-2 border-yellow-400/20 rounded-3xl pointer-events-none" />
                  <div className="absolute -inset-10 bg-gradient-to-tr from-yellow-300/10 via-purple-800/20 to-purple-900/0 rounded-3xl pointer-events-none" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Keyframe animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0.7; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
          100% { transform: translateY(0) translateX(0); opacity: 0.7; }
        }
        @keyframes text-shimmer {
          0% { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        @keyframes light-streak {
          0% { transform: translateY(-100%) rotate(10deg); opacity: 0; }
          50% { transform: translateY(50%) rotate(10deg); opacity: 0.5; }
          100% { transform: translateY(100%) rotate(10deg); opacity: 0; }
        }
        .animate-text-shimmer {
          background-size: 1000px 100%;
          animation: text-shimmer 3s linear infinite;
        }
        .animate-glow {
          box-shadow: 0 0 30px rgba(255, 223, 0, 0.4), 0 0 60px rgba(255, 223, 0, 0.2);
          transition: box-shadow 0.5s ease-in-out;
        }
        .animate-light-streak {
          animation: light-streak linear infinite;
        }
      `}</style>
    </section>
  );
}
