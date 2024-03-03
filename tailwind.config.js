/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#1f2027",
        "sidebar": "#272831",
        "header": "#393a42",
        "border": "#414248",
        "node": "#454757",
        "logo": "#5467ce",
        "logo1": "#3c4992"
      },
      
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
