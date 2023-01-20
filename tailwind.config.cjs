/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      // "bumblebee",
      // "emerald",
      // "corporate",
      // "garden",
      "wireframe",
      // "dracula",
      // "cmyk",
      // "autumn",
      // "lemonade",
      "winter",
    ],
  },
};
