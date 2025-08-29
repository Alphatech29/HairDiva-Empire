import { useState } from "react";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Your website timeline depends on complexity. Simple sites take 1–3 weeks, advanced platforms 6–12 weeks, while complex projects may span months. As Nigeria’s leading agency, we deliver quality without delays.",
  },
  {
    question: "What factors affect the timeline of my website?",
    answer:
      "Key factors include the number of pages, custom features, eCommerce functionality, integrations with third-party tools, and the overall design complexity.",
  },
  {
    question: "Can my website be delivered faster if needed?",
    answer:
      "Yes. We offer expedited services for clients with tight deadlines, while still maintaining quality standards.",
  },
  {
    question: "Do advanced websites always take longer?",
    answer:
      "Not always. Our experienced team optimizes the process to avoid unnecessary delays. However, complex sites like eCommerce stores or custom-built platforms generally require more time.",
  },
   {
    question: "Why should I choose your agency for my website project?",
    answer:
      "As one of Nigeria’s leading web design agencies, we balance speed and quality, ensuring your website is delivered on time, built to perfection, and tailored to your business goals.",
  },
   {
    question: "How much does a website cost?",
    answer:
      "Pricing varies depending on features, size, and functionality. We provide tailored quotes after understanding your specific needs to ensure transparency and value for your investment.",
  },
   {
    question: "Do you also build software and applications?",
    answer:
      "Yes. Beyond websites, we create custom software, mobile applications, and web apps, tailored to your business operations and goals.",
  },
    {
    question: "What types of websites do you create?",
    answer:
      "We design and develop: Business & corporate websites, E-commerce platforms, Portfolio sites, Blogs & content sites, Custom web applications, Landing pages for marketing campaigns.",
  },
   {
    question: "What other services do you offer besides web design?",
    answer:
      "Our services include: Branding & logo design, SEO & digital marketing, Content creation, Website maintenance & support, UX/UI design, Hosting & domain setup/management, Security Management.",
  },
   {
    question: "Can you redesign my existing website?",
    answer:
      "Of course! We can revamp your current website with a modern design, better performance, and improved functionality.",
  },
   {
    question: "Do you provide ongoing support after the website is launched?",
    answer:
      "Yes. We offer maintenance packages to keep your site secure, updated, and optimized long after launch.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-4 lg:px-40">
      <div >
        <h2 className="text-3xl font-bold text-center text-primary-200 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-primary-100 rounded-xl shadow-sm shadow-primary-500 hover:border-l-4 hover:border-secondary-500 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg font-medium text-primary-800">
                  {faq.question}
                </span>
                <span className="transform transition-transform duration-300">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-primary-600 text-sm border-t border-primary-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
