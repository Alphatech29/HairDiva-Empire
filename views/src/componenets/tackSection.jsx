// TechSection.jsx
import React, { useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";


const techCategories = {
  "Front-End Technologies": [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "React.js",
    "Angular.js",
    "Vue.js",
    "Bootstrap",
    "Tailwind CSS",
    "Webpack",
  ],
  "Back-End Technologies": ["JavaScript", "Python", "PHP", "Java", "Node.js", "Express.js", "Django", "Laravel"],
  "Mobile App Technologies": ["React Native", "Flutter", "Swift", "Java",  "Kotlin"],
  "Database Technologies": ["MySQL", "PostgreSQL", "MongoDB", "Supabase", "Amazon DynamoDB", "Redis", "Oracle Database", "Microsoft SQL Server", "Firebase"],
  "Operating System": ["Linux", "Windows", "macOS", "Ubuntu", "CentOS", "Windows Server", "Debian"],
};

const TechSection = () => {
  const [activeCategory, setActiveCategory] = useState("Front-End Technologies");

  return (
    <section className="bg-primary-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Text Section */}
          <div>
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Tech-stack for Our Website Development Firm
            </h2>
            <p className="text-primary-800">
              As an experienced website development firm, we understand the significance of the latest technologies to give a competitive edge to clients in the market. We deploy evolving technologies to build innovative web solutions ensuring rich feature-based functionalities.
            </p>
          </div>

          {/* Tech Tabs */}
          <div>
            <div className="flex flex-wrap border-b border-primary-800 mb-4">
              {Object.keys(techCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`mr-6 pb-2 ${
                    activeCategory === category
                      ? "text-yellow-500 border-b-2 border-yellow-500"
                      : "text-primary-800 hover:text-yellow-500"
                  } font-semibold`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Tech List */}
            <ul className="flex flex-wrap gap-4">
              {techCategories[activeCategory].map((tech) => (
                <li
                  key={tech}
                  className="flex items-center gap-2 text-primary-800  px-3 py-1 rounded-md shadow-primary-800 shadow-sm"
                >
                  <span className="text-green-500"><IoMdCheckmarkCircle /></span> {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
