import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { AiOutlineJavaScript } from "react-icons/ai";
import Typewriter from "typewriter-effect";

export default function Hero() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
  };

  return (
    <section className="relative bg-primary-950 py-12 mobile:px-4 tab:px-8 pc:px-[5rem] min-h-screen flex items-center">
      {/* Decorations */}
      <div className="absolute top-5 left-5 text-[#d82a98] text-[15rem] sm:text-[20rem] lg:text-[30rem] blur-xl opacity-30">
        <FaCode />
      </div>
      <div className="absolute top-32 right-10 text-yellow-500 text-[10rem] sm:text-[15rem] lg:text-[20rem] blur-2xl hidden sm:flex">
        <AiOutlineJavaScript />
      </div>

      {/* Container */}
      <div className="relative z-30 w-full">
        <div className="flex flex-col-reverse tab:flex-row items-center sm:pt-14 justify-between gap-10">
          
          {/* Text Content */}
          <div className="w-full tab:w-1/2 space-y-5">
            <h1 className="text-3xl tab:text-4xl pc:text-6xl font-bold text-primary-200 leading-snug">
              Unlock your business's full potential through tailored{" "}
              <span className="text-primary-200">
                <Typewriter
                  options={{
                    strings: [
                      "web development",
                      "software solutions",
                      "digital experiences",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </h1>

            <p className="text-primary-300 mt-3 text-base tab:text-lg pc:text-xl leading-relaxed">
              At Alphatech, we transform ideas into powerful realities through
              reliable, cutting-edge software development. Our expertise lies in
              crafting tailored, high-quality solutions that align seamlessly
              with your vision and business needs.
            </p>

            {/* Newsletter Form */}
            <div className="mt-6">
              <form
                id="subscriptionForm"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 sm:gap-0"
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none placeholder:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base sm:w-20"
                  required
                />
                <button
                  id="submitButton"
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-700 to-secondary-500 text-white rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:opacity-90 transition text-sm sm:text-base"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center w-full tab:w-1/2">
            <img
              src="/image/service-feature.png"
              alt="Service Feature"
              className="w-[80%] max-w-sm sm:max-w-md pc:max-h-[450px] object-contain animate-slow-bounce"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
