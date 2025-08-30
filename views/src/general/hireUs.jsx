import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";

export default function HireUs({ theme = "from-primary-950 to-secondary-500", text = "text-primary-200" }) {
   useEffect(() => {
    document.title = "Hire Us | We create digital solutions that enhance communication and growth.";
  }, []);
  return (
    <>

    <div className={`bg-gradient-to-br ${theme} ${text} min-h-screen flex flex-col`}>
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-40">
        <h1 className="text-5xl font-bold mb-4">Work With Us</h1>
        <p className="max-w-2xl text-lg opacity-80">
          We are a trusted software development company helping startups and enterprises
          build scalable, secure, and innovative digital solutions. From idea to launch,
          we deliver technology that drives growth and efficiency.
        </p>
        <NavLink className="mt-6 bg-primary-200 text-black px-6 py-3 rounded-2xl shadow-lg font-semibold hover:scale-105 transition">
          Get Started
        </NavLink>
      </section>

      {/* Services Section */}
      <section className="grid md:grid-cols-3 gap-8 px-8 lg:px-[5rem] py-16">
        {[
          { title: "Web Development", desc: "Responsive, scalable, and modern websites powered by the latest technologies." },
          { title: "Mobile Apps", desc: "Cross-platform and native mobile apps that deliver seamless user experiences." },
          { title: "UI/UX Design", desc: "Intuitive, user-centered designs that enhance engagement and usability." },
          { title: "Cloud Solutions", desc: "Robust cloud infrastructure to ensure security, flexibility, and scalability." },
          { title: "Custom Software", desc: "Tailored solutions that fit your business needs and accelerate growth." },
          { title: "Brand Strategy", desc: "Crafting digital strategies to strengthen your brand and presence in the market." }
        ].map((item, i) => (
          <div 
            key={i} 
            className="bg-primary-200/10 backdrop-blur-lg rounded-2xl p-8 hover:translate-y-[-5px] transition transform shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
            <p className="opacity-80">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="px-8 py-20 text-center bg-primary-200/5">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <p className="max-w-3xl mx-auto text-lg opacity-80 mb-10">
          With a team of experienced engineers, designers, and strategists, 
          we deliver solutions that combine technical excellence with creative vision.
          Our agile process ensures transparency, on-time delivery, and results that 
          align with your business goals.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { stat: "50+", label: "Projects Delivered" },
            { stat: "10+", label: "Industries Served" },
            { stat: "100%", label: "Client Satisfaction" }
          ].map((item, i) => (
            <div 
              key={i} 
              className="bg-primary-200/10 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-4xl font-bold mb-2">{item.stat}</h3>
              <p className="opacity-80">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-8 py-16">
        <div className="bg-primary-100 text-black rounded-2xl shadow-lg max-w-3xl mx-auto p-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Let’s Talk</h2>
          <p className="text-center text-gray-700 mb-8">
            Ready to start your project? Fill out the form below and our team will 
            get back to you within 24 hours.
          </p>
          <form className="grid gap-6">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea 
              rows="4" 
              placeholder="Tell us about your project..." 
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              type="submit" 
              className="bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-rose-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

    </div>
    </>
  );
}
