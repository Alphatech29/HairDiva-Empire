import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-primary-50">
      <div className="py-12 px-4 mobile:px-4 tab:px-8 pc:px-16 flex flex-col tab:flex-row justify-between gap-8">
        {/* Brand & Description */}
        <div className="tab:w-[40%] pc:w-[40%]">
          <h2 className="text-2xl font-bold text-primary-200">
            <a href="/">
              <img
                src="/image/favicon.png"
                alt="footer logo"
                className="object-contain w-36"
              />
            </a>
          </h2>
          <p className="mt-4 text-primary-300 mobile:text-sm text-base">
            Alphatech, established in 2010 in Lagos, is a premier web and
            software development agency. Licensed by NITDA and registered with
            CAC, we provide innovative digital solutions and expert IT
            consultancy services with unwavering commitment.
          </p>
          <div className="flex space-x-4 mt-6 mobile:text-sm text-base">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="tab:w-1/3 pc:w-1/3 ml-4">
          <h3 className="text-xl font-semibold text-primary-200">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-primary-300 mobile:text-sm text-base">
            {[
              { name: "Home", href: "/#home" },
              { name: "Services", href: "/#services" },
              { name: "About", href: "/#about" },
              { name: "Contact", href: "/#contact" },
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="flex items-center gap-2 hover:text-primary-400 transition"
                >
                  <MdKeyboardArrowRight className="text-primary-200 text-[20px]" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="tab:w-1/3 pc:w-1/3">
          <h3 className="text-xl font-semibold text-primary-200">Contact Us</h3>
          <div className="mt-4 flex flex-col gap-3 text-primary-300 mobile:text-sm text-base">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary-400" />
              <span>23,Wole Ariyo, Lekki Phase 1, Lagos, Nigeria.</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-primary-400" />
              <a
                href="mailto:info@alphatech.ng"
                className="hover:text-primary-400"
              >
                info@alphatech.ng
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary-400" />
              <a href="tel:+2348001234567" className="hover:text-primary-400">
                +234 800 123 4567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-primary-300 mt-8 py-4 text-center text-primary-300 text-sm ">
        &copy; {new Date().getFullYear()} Alphatech Multimedia Technologies-RC
        No: 3596357. All rights reserved.
      </div>
    </footer>
  );
}
