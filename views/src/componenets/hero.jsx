import { useState } from "react";
import { FaCode} from "react-icons/fa";
import { AiOutlineJavaScript } from "react-icons/ai";
import Typewriter from "typewriter-effect";

export default function Hero() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
  };

  return (
    <section className="relative bg-primary-950 py-12 mobile:px-4 pc:px-[5rem] h-screen">
      {/* Decorations */}
      <div className="absolute top-3 left-10 text-[#d82a98] text-[30rem] blur-xl">
        <FaCode />
      </div>
      <div className="absolute top-20 right-20 text-yellow-500 text-[20rem] blur-xl pc:flex tab:flex mobile:hidden">
        <AiOutlineJavaScript  />
      </div>

      {/* Container */}
      <div className="z-30 relative w-full pc:mt-40 mobile:mt-20">
        <div className="flex mobile:flex-col tab:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="pc:w-[70%] tab:w-1/2">
            <h1 className="mobile:text-3xl tab:text-4xl pc:text-6xl font-bold text-primary-200">
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

            <p className="text-primary-300 mt-4 mobile:text-base tab:text-lg pc:text-xl">
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
                className="flex"
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg placeholder:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  id="submitButton"
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary-700 to-secondary-500 text-white rounded-r-lg hover:opacity-90 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center tab:w-1/2">
            <img
              src="/image/service-feature.png"
              alt="Service Feature"
              className="w-full max-w-md pc:max-h-[400px] object-contain animate-slow-bounce"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
