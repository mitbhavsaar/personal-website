import React, { useState } from "react";
import { motion } from "framer-motion";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setFormData({ name: "", email: "", message: "" });
        setStatus({ type: "success", message: "Message sent successfully!" });
        setTimeout(() => setStatus({ type: "", message: "" }), 5000);
      } else {
        console.error("Error: " + data.error);
        setStatus({ type: "error", message: "Failed to send message: " + data.error });
      }
    } catch (err) {
      console.error("Server Error: " + err.message);
      setStatus({ type: "error", message: "Server error. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
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

        {status.message && (
          <div className={`mb-4 p-3 rounded text-center ${status.type === "success" ? "bg-green-100 text-green-700 border border-green-400" : "bg-red-100 text-red-700 border border-red-400"}`}>
            {status.message}
          </div>
        )}

        <button
          disabled={isSubmitting}
          className="w-full border-2 border-yellow-500 py-2 rounded-lg hover:bg-yellow-400 dark:hover:bg-yellow-500 transition disabled:opacity-50 font-bold"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </motion.form>
    </div>
  );
}

export default Contact;
