import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaRocket, FaUsers, FaLock, FaCode, FaCloud, FaComments, FaPencilRuler, FaServer, FaShoppingCart, FaEnvelope, FaGlobe, FaTools } from "react-icons/fa";
const packages = [
  {
    name: "Starter",
    price: "From $5,000",
    desc: "Perfect for startups and small businesses launching their first software product.",
    features: [
      { text: "Domain & Hosting (1 Year)", icon: <FaGlobe /> },
      { text: "Mobile-Friendly Design", icon: <FaPencilRuler /> },
      { text: "Business Email", icon: <FaEnvelope /> },
      { text: "Up to 5 Pages", icon: <FaCode /> },
      { text: "Basic SEO Optimization", icon: <FaRocket /> },
      { text: "Logo Design", icon: <FaPencilRuler /> },
    ],
    popular: false,
  },
  {
    name: "Business",
    price: "From $12,000",
    desc: "Ideal for growing businesses that need scalability and advanced features.",
    features: [
      { text: "All Starter Features", icon: <FaCheckCircle /> },
      { text: "Advanced SEO Optimization", icon: <FaRocket /> },
      { text: "Advanced UI/UX Design", icon: <FaPencilRuler /> },
      { text: "Payment Gateway Integration", icon: <FaShoppingCart /> },
      { text: "Basic E-commerce", icon: <FaShoppingCart /> },
      { text: "Cross-Browser Compatibility", icon: <FaGlobe /> },
      { text: "Security Optimization", icon: <FaLock /> },
      { text: "1 Month Free Support", icon: <FaTools /> },
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom Quote",
    desc: "Tailored software solutions for large-scale enterprises with complex needs.",
    features: [
       { text: "Fully Customized Solutions", icon: <FaCode /> },
      { text: "Authenticated System", icon: <FaLock /> },
      { text: "Admin and Users Management", icon: <FaUsers /> },
      { text: "Database & API Development", icon: <FaServer /> },
      { text: "All Business Features", icon: <FaCheckCircle /> },
      { text: "Dedicated Development Team", icon: <FaUsers /> },
      { text: "Scalable Cloud Infrastructure", icon: <FaCloud /> },
      { text: "Multi-Language Support", icon: <FaGlobe /> },
      { text: "Enterprise E-commerce", icon: <FaShoppingCart /> },
      { text: "Advanced Analytics & Reporting", icon: <FaRocket /> },
      { text: "Custom Integrations & APIs", icon: <FaCode /> },
      { text: "Priority Security & Compliance", icon: <FaLock /> },
      { text: "Dedicated Account Manager", icon: <FaUsers /> },
      { text: "24/7 Monitoring & Alerts", icon: <FaTools /> },
      { text: "High Traffic & Load Optimization", icon: <FaRocket /> },
       { text: "Enterprise-Level SEO Strategy", icon: <FaRocket /> },
      { text: "1 Month Free Support", icon: <FaTools /> },
    ],
    popular: false,
  },
];

const process = [
  { title: "Consultation", icon: <FaComments />, desc: "We discuss your goals and requirements." },
  { title: "Design", icon: <FaPencilRuler />, desc: "We create intuitive UI/UX and architecture." },
  { title: "Development", icon: <FaCode />, desc: "Agile development with regular updates." },
  { title: "Delivery", icon: <FaRocket />, desc: "On-time deployment and ongoing support." },
];

export default function Pricing() {
  return (
    <div className="relative py-20 sm:pt-32 lg:pt-44 px-6 lg:px-16 bg-gradient-to-b from-primary-950 via-primary-50 to-primary-200 overflow-hidden">

      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-primary-800 mb-4 text-gradient">
          Our Pricing Packages
        </h2>
        <p className="text-primary-200 max-w-2xl mx-auto text-lg">
          Choose the right package for your project. We deliver world-class software tailored to your needs.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto relative z-10">
        {packages.map((pkg, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.06, y: -5 }}
            className={`relative rounded-3xl p-8 border border-primary-200 shadow-xl transition-transform duration-300`}
            style={{
              background: "linear-gradient(135deg, #ffffff30, #ffffff10)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              backgroundSize: "400% 400%",
              animation: "gradientShift 20s ease infinite",
            }}
          >
            {pkg.popular && (
              <span className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-primary-900 text-sm font-bold px-4 py-1 rounded-full shadow-lg animate-pulse">
                Most Popular
              </span>
            )}
            <h3 className="text-2xl font-bold text-primary-700 mb-2">{pkg.name}</h3>
            <p className="text-gray-700 mb-4">{pkg.desc}</p>
            <p className="text-3xl font-extrabold text-primary-800 mb-6">{pkg.price}</p>
            <ul className="space-y-3">
              {pkg.features.map((f, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.1, color: "#FCD34D" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <span className="text-yellow-500">{f.icon}</span>
                  {f.text}
                </motion.li>
              ))}
            </ul>
            <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-primary-900 font-semibold rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all">
              Request a Quote
            </button>
          </motion.div>
        ))}
      </div>

      {/* Process Section */}
      <div className="mt-24 text-center relative z-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary-700 mb-10 text-gradient">How We Work</h2>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-primary-700 animate-pulse opacity-30"></div>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10">
            {process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 }}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-primary-200 hover:scale-105 transition-transform"
              >
                <div className="text-4xl text-yellow-500 mb-4 flex justify-center animate-bounce">{step.icon}</div>
                <h4 className="text-xl font-semibold text-primary-700 mb-2">{step.title}</h4>
                <p className="text-primary-950 text-gradient text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mt-24 text-center max-w-3xl mx-auto relative z-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-r from-primary-700 via-primary-600 to-yellow-500 text-white p-10 rounded-3xl shadow-2xl transition-transform"
        >
          <h3 className="text-3xl font-bold mb-4">Let’s Build Your Dream Software</h3>
          <p className="mb-6 text-lg">Partner with Alphatech to turn your vision into reality.</p>
          <button className="px-8 py-3 bg-white text-primary-700 font-bold rounded-xl shadow-md hover:bg-yellow-100 transition-colors">
            Contact Us Today
          </button>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .text-gradient {
          background: linear-gradient(90deg, #FCD34D, #8B5CF6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
