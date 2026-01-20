import React from "react";
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 border-t border-gray-300 dark:border-gray-700">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-6">
        <p className="text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} Mit Bhavsar. All Rights Reserved.
        </p>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <a href="https://wa.me/7874221860" target="_blank" rel="noreferrer">
            <FaWhatsapp className="text-green-500 hover:scale-110" size={28} />
          </a>
          <a href="https://linkedin.com/in/mit-bhavsar" target="_blank" rel="noreferrer">
            <FaLinkedin className="text-blue-500 hover:scale-110" size={28} />
          </a>
          <a href="https://instagram.com/your-profile" target="_blank" rel="noreferrer">
            <FaInstagram className="text-pink-500 hover:scale-110" size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
