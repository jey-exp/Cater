/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...require("tailwindcss/colors"),
      "custom-blue": {
        123: "#1D3557",
        122:"#e8f2ff"
      },
      "custom-gray": {
        123: "#555555",
      },
    },
  },
  plugins: [],
};
