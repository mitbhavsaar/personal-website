import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

// Reusable ProjectCard Component
const ProjectCard = ({ title, description, imageUrl, technology, githubUrl }) => {
  const handleClick = () => {
    if (githubUrl) {
      window.open(githubUrl, "_blank");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 border border-yellow-400 shadow-lg rounded-lg overflow-hidden w-80"
    >
      <img src={imageUrl} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-primary dark:text-yellow-400">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">{description}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{technology}</p>
        <button
          onClick={handleClick}
          className="mt-4 w-full flex items-center justify-center gap-2 border-2 border-yellow-500 py-2 rounded-lg hover:bg-yellow-400 dark:hover:bg-yellow-500 transition"
        >
          <FaGithub />
          View on GitHub
        </button>
      </div>
    </motion.div>
  );
};

// Main Projects Component
const Projects = () => {
  const projectList = [
    {
      title: "Clinic Management App (Community)",
      description:
        "Comprehensive clinic management system in Odoo 17 with patient records, appointments, billing, and streamlined healthcare workflows.",
      imageUrl: "/src/assets/Projects/project1.png",
      technology: "Odoo 17, Python, XML (QWeb), PostgreSQL, Report Customization",
      githubUrl: "https://github.com/mitbhavsaar/clinic-Management-App",
    },
    {
      title: "Smart Voice Chatter (Enterprise)",
      description:
        "Integrated voice note recording and playback in Odoo 18 Chatter, enabling seamless audio communication, collaboration, and efficient user interactions.",
      imageUrl: "/src/assets/Projects/project2.png",
      technology: "Odoo 18, Python, JavaScript, OWL, MediaRecorder API, ffmpeg, QWeb",
      githubUrl: "https://github.com/mitbhavsaar/smart-voice-chatter",
    },
    {
      title: "Real-time POS Analytics Dashboard (Enterprise)",
      description:
        "Built real-time POS analytics dashboard in Odoo 18 with live sales, KPIs, and interactive charts for smarter business insights.",
      imageUrl: "/src/assets/Projects/project3.png",
      technology: "Odoo 18, Python, JavaScript, OWL, Chart.js, XML (QWeb), PostgreSQL",
      githubUrl: "https://github.com/mitbhavsaar",
    },
    {
      title: "SmartShop Voice & Product History (Enterprise)",
      description:
        "Developed SmartShop Odoo module with voice search, add-to-cart, view history, and purchased ribbon for enhanced eCommerce experience.",
      imageUrl: "/src/assets/Projects/project3.png",
      technology:
        "Odoo 18, Python, JavaScript, OWL, SpeechRecognition API, XML (QWeb), Controllers, PostgreSQL",
      githubUrl: "https://github.com/mitbhavsaar",
    },
  ];

  return (
    <div className="container mx-auto min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary dark:text-yellow-400 underline underline-offset-8">
        My Projects
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {projectList.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
