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
    },
  },
  plugins: [],
};
