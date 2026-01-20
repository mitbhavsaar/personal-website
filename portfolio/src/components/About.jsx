import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center min-h-screen px-6 py-12">
      {/* Left: Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:w-1/2 flex justify-center mb-8 lg:mb-0"
      >
        <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
          <img
            src="https://img.freepik.com/free-vector/it-specialists-upgrading-operating-system-illustration_1262-18941.jpg"
            alt="About"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Right: Text */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:w-1/2 text-center lg:text-left"
      >
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-primary dark:text-yellow-400">
          About Me
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Hello! I am <b>BHAVSAR MIT</b>, I’m a full-time Odoo developer with strong practical experience in ERP customization and module development. My focus is on Python, backend architecture, and delivering intuitive user experiences within Odoo. I enjoy turning business requirements into smart technical solutions and am consistently leveling up toward becoming a complete full-stack Odoo professional.
        </p>
        <button className="border-2 border-yellow-500 px-5 py-2 rounded-lg hover:bg-yellow-400 dark:hover:bg-yellow-500 transition">
          Contact Me
        </button>
      </motion.div>
    </div>
  );
}

export default About;
