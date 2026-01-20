import React, { useEffect, useRef } from "react";
import pdf from "./Pdf/MIT_BHAVSAR_Resume.pdf";
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa";
import Typed from "typed.js";
import { motion } from "framer-motion";

function Home() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "MIT BHAVSAR",
        "Odoo Developer",
        "Python & ERP Learner",
        "Exploring Odoo Customization",
      ],
      typeSpeed: 45,
      backSpeed: 25,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-around items-center h-screen px-6">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col items-center lg:items-start text-center lg:text-left"
      >
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          <span ref={el} />
        </h1>
        <a href={pdf} download>
          <button className="mt-4 border-2 border-yellow-500 text-black dark:text-white hover:bg-yellow-400 font-bold py-2 px-6 rounded-lg transition">
            Download Resume
          </button>
        </a>
        <div className="mt-6 flex gap-4">
          <FaWhatsapp size={30} className="text-green-500 hover:scale-110" />
          <FaLinkedin size={30} className="text-blue-500 hover:scale-110" />
          <FaInstagram size={30} className="text-pink-500 hover:scale-110" />
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-8 lg:mt-0"
      >
        <div className="relative w-60 h-60 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl">
          <img
            src="/src/assets/images/mit.png"
            alt="Developer"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
