import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <div className="fixed w-full top-0 left-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4 text-lg font-semibold">
        <div className="text-primary dark:text-yellow-400 text-2xl">
          Mit's Portfolio
        </div>
        <div className="flex gap-6 items-center">
          {["Home", "About", "Skills", "Projects", "Contact"].map((page) => (
            <Link
              key={page}
              to={page.toLowerCase() === "home" ? "/" : `/${page.toLowerCase()}`}
              className="hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors"
            >
              {page}
            </Link>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <MdOutlineLightMode size={24} /> : <MdDarkMode size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
