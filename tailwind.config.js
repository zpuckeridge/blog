/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        128: "32rem",
      },
      height: {
        128: "28rem",
      },
      borderRadius: {
        "2xl": "24px",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography", "@tailwindcss/aspect-ratio", "@tailwindcss/forms", "@tailwindcss/line-clamp"),
  ],
};
