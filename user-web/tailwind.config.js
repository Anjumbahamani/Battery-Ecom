/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
extend: {
  colors: {
    primary: "#D62828",     // Logo Red
    blackMain: "#000000",   // Logo Black
    softBg: "#F9F9F9",      // Page background
    borderLight: "#E5E5E5",
  },
},
  },
  plugins: [],
};