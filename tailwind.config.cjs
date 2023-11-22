/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    // themes: ["corporate"],
    // themes: ["dark"],
    // themes: ["emerald"],
    // themes: ["forest"],
    // themes: ["lofi"],
    // themes: ["synthwave"],
    // themes: ["halloween"],
    // themes: ["wireframe"],
    themes: ["coffee"],
  },
};
