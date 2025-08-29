import { useState } from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. If you're not satisfied with your purchase, you can return it within 30 days for a full refund.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes! We ship to over 50 countries worldwide. Shipping fees may vary based on location.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After placing your order, you'll receive a tracking number via email. Use it to track your package on our carrier's website.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "You can change or cancel your order within 24 hours of purchase. Contact our support team for assistance.",
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
