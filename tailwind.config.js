/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.php",
    "./template-parts/**/*.php",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#333333",
        secondary: "#C0C0C0",
        tertiery: "#F5F5F5",
        bgBlue: "#1B4E9B",
        bgBlue2: "#244DBD",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
