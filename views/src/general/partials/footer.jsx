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
      {/* Top Section */}
      <div className="py-12 px-4 mobile:px-4 tab:px-8 pc:px-16 flex flex-col tab:flex-row justify-between gap-12">
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
          <p className="mt-4 text-primary-300 mobile:text-sm text-base leading-relaxed">
            Alphatech, established in 2010 in Lagos, is a premier web and
            software development agency. Licensed by NITDA and registered with
            CAC, we provide innovative digital solutions and expert IT
            consultancy services with unwavering commitment.
          </p>
          <div className="flex space-x-4 mt-6 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="tab:w-1/3 pc:w-1/3">
          <h3 className="text-xl font-semibold text-primary-200">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-primary-300 mobile:text-sm text-base">
            {[
              { name: "Pricing", href: "/pricing" },
              { name: "Our Services", href: "/services" },
              { name: "About", href: "/about-us" },
              { name: "Contact", href: "/contact-us" },
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
              <span>23, Wole Ariyo, Lekki Phase 1, Lagos, Nigeria.</span>
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
              <a href="https://wa.me/2349129079450" className="hover:text-primary-400" target="_blank" rel="noopener noreferrer">

                +234 912 907 9450
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-primary-300 mt-8 py-4 px-4 tab:px-16 flex flex-col justify-center items-center gap-4 text-primary-300 text-sm">
        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/privacy-policy"
            className="hover:text-primary-400 transition"
          >
            Privacy Policy
          </a>
          |
          <a
            href="/terms-of-service"
            className="hover:text-primary-400 transition"
          >
            Terms of Service
          </a>
        </div>
        <p className="text-center">
          &copy; {new Date().getFullYear()} Alphatech Multimedia Technologies - RC
          No: 3596357. All rights reserved.
        </p>


      </div>
    </footer>
  );
}
