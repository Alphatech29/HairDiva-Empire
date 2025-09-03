import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#FCEDD4] relative overflow-hidden">
      {/* Luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#451805]/60 via-transparent to-[#F66B04]/40 opacity-80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-12">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#F66B04] tracking-wide">
            HairDiva Empire
          </h2>
          <p className="mt-2 text-sm italic text-[#FCEDD4]/80">
            Beauty in Every Strand
          </p>
          <p className="mt-4 text-sm leading-relaxed max-w-xs text-[#FCEDD4]/70">
            We redefine luxury hair care with timeless beauty and elegance.
            Discover the finest wigs, extensions, and hair styling services.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-[#F66B04] mb-3 text-lg">Explore</h3>
            <ul className="space-y-2 text-sm text-[#FCEDD4]/80">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "text-[#F66B04]" : "hover:text-[#F66B04] transition"}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => isActive ? "text-[#F66B04]" : "hover:text-[#F66B04] transition"}>About Us</NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={({ isActive }) => isActive ? "text-[#F66B04]" : "hover:text-[#F66B04] transition"}>Shop</NavLink>
              </li>
              <li>
                <NavLink to="/services" className={({ isActive }) => isActive ? "text-[#F66B04]" : "hover:text-[#F66B04] transition"}>Services</NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#F66B04] mb-3 text-lg">Support</h3>
            <ul className="space-y-2 text-sm text-[#FCEDD4]/80">
              <li>
                <NavLink to="/faqs" className={({ isActive }) => isActive ? "text-[#F66B04]" : "hover:text-[#F66B04] transition"}>FAQs</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "text-[#F66B04]" : "hover:text-[#F66B04] transition"}>Contact</NavLink>
              </li>
              <li>
                <NavLink to="/privacy" className={({ isActive }) => isActive ? "text-[#F66B04]" : "hover:text-[#F66B04] transition"}>Privacy Policy</NavLink>
              </li>
              <li>
                <NavLink to="/terms" className={({ isActive }) => isActive ? "text-[#F66B04]" : "hover:text-[#F66B04] transition"}>Terms</NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="font-semibold text-[#F66B04] mb-3 text-lg">Get in Touch</h3>
          <ul className="space-y-3 text-sm text-[#FCEDD4]/80">
            <li className="flex items-center gap-2">
              <Phone size={16} /> <span>+234 800 123 4567</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> <span>support@hairdivaempire.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> <span>Lagos, Nigeria</span>
            </li>
          </ul>

          {/* Social icons */}
          <div className="flex gap-4 mt-5">
            <a href="#" className="p-2 bg-[#F66B04]/10 rounded-full hover:bg-[#F66B04]/30 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-[#F66B04]/10 rounded-full hover:bg-[#F66B04]/30 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-[#F66B04]/10 rounded-full hover:bg-[#F66B04]/30 transition">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 border-t border-[#F66B04]/30 py-4 text-center text-xs text-[#FCEDD4]/60">
        © {new Date().getFullYear()} HairDiva Empire. All rights reserved.
      </div>
    </footer>
  );
}
