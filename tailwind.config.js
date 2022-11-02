/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui"],
        display: ["Cormorant"],
      },

      colors: {
        primary: "#ECBCB3",
        secondary: "#949EA0",
        search: "#DADADA",
      },
      backgroundImage: {
        hero: "url('/assets/pl-hero.png')",
      },
      screens: {
        xl: { max: "1279px" },
        lg: { max: "1024px" },
        md: { max: "768px" },
        sm: { max: "640px" },
      },
    },
  },
  plugins: [],
};
