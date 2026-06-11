/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // "fresh" = deep market greens, "warm" = clay terracotta.
        // Names kept stable so every component inherits the new palette.
        fresh: { 50: "#eef5ec", 100: "#dcead7", 500: "#26693a", 600: "#1f5530", 700: "#193f25", 900: "#102918" },
        warm: { 100: "#f7e7d8", 500: "#c75b39", 600: "#a8482a" },
        cream: "#faf5ea",
        sun: "#e9a13b",
        ink: "#26291f",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "1.5rem" },
    },
  },
  plugins: [],
};
