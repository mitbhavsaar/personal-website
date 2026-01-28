import React from "react";
import { motion } from "framer-motion";

function Skills() {
  const skills = [
    { title: "JavaScript", image: "/assets/Skills/javascript.png" },
    { title: "React", image: "/assets/Skills/react.png" },
    { title: "HTML", image: "/assets/Skills/HTML.png" },
    { title: "CSS", image: "/assets/Skills/CSS.png" },
    { title: "Bootstrap", image: "/assets/Skills/bootstrap.png" },
    { title: "Python", image: "/assets/Skills/python.png" },
    { title: "TailwindCSS", image: "/assets/Skills/tailwindcss.png" },
    { title: "Odoo", image: "/assets/Skills/odoo.png" },
  ];

  return (
    <div className="container mx-auto min-h-screen px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-10 text-primary dark:text-yellow-400 underline underline-offset-8"
      >
        My Skills
      </motion.h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center bg-white dark:bg-gray-800 border border-yellow-400 shadow-lg p-4 rounded-lg w-32"
          >
            <img
              src={skill.image}
              alt={skill.title}
              className="w-16 h-16 mb-2"
            />
            <h3 className="text-lg font-medium text-center">{skill.title}</h3>
          </motion.div>
        ))}

        {/* More Skills Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 border-2 border-dashed border-yellow-400 shadow-inner p-4 rounded-lg w-32 h-36 cursor-pointer"
        >
          <span className="text-2xl font-bold text-yellow-500">+</span>
          <p className="text-sm mt-2 text-center text-gray-700 dark:text-gray-300">
            More Skills...
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Skills;
