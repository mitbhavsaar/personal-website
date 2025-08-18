import React, { useState } from "react";
import { motion } from "framer-motion";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted: " + JSON.stringify(formData));
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto min-h-screen px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-8 text-primary dark:text-yellow-400 underline underline-offset-8"
      >
        Contact Me
      </motion.h1>
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-yellow-400"
      >
        <input type="text" name="name" placeholder="Your Name" value={formData.name}
          onChange={handleChange} required className="w-full p-3 mb-4 border rounded text-black" />
        <input type="email" name="email" placeholder="Your Email" value={formData.email}
          onChange={handleChange} required className="w-full p-3 mb-4 border rounded text-black" />
        <textarea name="message" placeholder="Your Message" value={formData.message}
          onChange={handleChange} rows="4" required className="w-full p-3 mb-4 border rounded text-black" />
        <button className="w-full border-2 border-yellow-500 py-2 rounded-lg hover:bg-yellow-400 dark:hover:bg-yellow-500 transition">
          Send Message
        </button>
      </motion.form>
    </div>
  );
}

export default Contact;
