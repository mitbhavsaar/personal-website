/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow :{
        'outer': '5px 5px 9px 8px rgba(101, 175, 10, 0.5)',
      }
    },
  },
  plugins: [],
}

