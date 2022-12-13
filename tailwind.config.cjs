/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minHeight: {
      20: "5em",
      screen: "100vh",
      "screen-1/2": "50vh",
    },
    extend: {},
  },
  plugins: [],
};
