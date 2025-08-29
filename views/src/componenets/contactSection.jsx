// ContactSection.jsx
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const ContactSection = () => {
  return (
    <section className="bg-primary-200 py-8 pc:px-[5rem] px-4">
      <div className="flex flex-col pc:flex-row justify-between items-start w-full gap-5 max-w-7xl mx-auto">
        {/* Left Section - Contact Info */}
        <div className="bg-primary-950 text-primary-200 rounded-xl p-8 shadow-lg w-full pc:w-1/2">
          <h2 className="text-2xl font-semibold mb-6">Let's Talk</h2>

          {/* Head Office */}
          <div className="mb-6">
            <h3 className="font-bold">Head Office</h3>
            <p className="flex items-center gap-2 text-sm mt-1">
              <ReactCountryFlag
                countryCode="NG"
                svg
                style={{ width: "1.5em", height: "1.5em" }}
              />
              23 Wole Ariyo St, Lekki Phase I, Lekki 106104, Lagos State,
              Nigeria.
            </p>
          </div>

          {/* Branch Office Nigeria */}
          <div className="mb-6">
            <h3 className="font-bold">Branch Office</h3>
            <p className="flex items-center gap-2 text-sm mt-1">
              <ReactCountryFlag
                countryCode="NG"
                svg
                style={{ width: "1.5em", height: "1.5em" }}
              />
              Opp Extioc Lounge, Mayfair, Ilesa/Ibadan road, Ife 220282, Osun
            </p>
          </div>

          {/* Branch Office USA */}
          <div className="mb-6">
            <h3 className="font-bold">Branch Office</h3>
            <p className="flex items-center gap-2 text-sm mt-1">
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{ width: "1.5em", height: "1.5em" }}
              />
              17939 Kieth Harrow Blvd, Suite 106, 77084-5724, Houston, Texas
              (TX), United States
            </p>
          </div>

          {/* Chat Info */}
          <div>
            <h3 className="font-bold">Chat Us On</h3>
            <p className="mt-1 flex items-center gap-2">
              <span>
                <MdEmail />
              </span>
              alphatechmultimedia@gmail.com
            </p>
            <p className="mt-1 flex items-center gap-2">
              <span>
                <IoCall />
              </span>
              +2349129079450
            </p>
            <p className="mt-1 flex items-center gap-2">
              <span>
                <IoCall />
              </span>
              +1-832-220-3511
            </p>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="bg-primary-300 rounded-xl p-8 shadow-lg w-full pc:w-1/2">
          <form className="space-y-6">
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-transparent border-b placeholder:text-primary-800 border-primary-400 focus:outline-none focus:border-primary-900 py-2"
            />

            {/* Subject */}
            <input
              type="text"
              placeholder="Subject..."
              className="w-full bg-transparent border-b placeholder:text-primary-800 border-primary-400 focus:outline-none focus:border-primary-900 py-2"
            />

            {/* Message */}
            <textarea
              placeholder="Message..."
              rows="5"
              className="w-full bg-transparent border-b placeholder:text-primary-800 border-primary-900 focus:outline-none focus:border-primary-900 py-2"
            ></textarea>

            {/* Submit */}
            <button
              type="submit"
              className="bg-gradient-to-r from-primary-700 via-primary-500 to-secondary-400 hover:opacity-90 transition font-semibold px-6 py-3 rounded-lg hover:bg-secondary-400 text-white "
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
