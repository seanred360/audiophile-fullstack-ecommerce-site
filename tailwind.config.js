/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,js,jsx}", "./components/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        burntOrange: "#D87D4A",
        lightGray: "#F1F1F1",
        smoke: "#191919",
      },
    },
  },
  screens: {
    sm: "576px",
    // => @media (min-width: 640px) { ... }

    md: "768px",
    // => @media (min-width: 768px) { ... }

    lg: "992px",
    // => @media (min-width: 1024px) { ... }

    xl: "1200px",
    // => @media (min-width: 1280px) { ... }

    "2xl": "1400px",
    // => @media (min-width: 1536px) { ... }
  },
};
