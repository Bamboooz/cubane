/** @type {import("tailwindcss").Config} */
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
                "accent": "#3e4c98",
                "accent-2": "#5365cb",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
