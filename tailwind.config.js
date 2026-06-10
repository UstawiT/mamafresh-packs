/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        fresh: { 50: "#f1f9f1", 100: "#dcf0dc", 500: "#2e8b3d", 600: "#247232", 700: "#1d5c29" },
        warm: { 100: "#fff1e2", 500: "#f5862e", 600: "#e07118" },
        cream: "#fdf9f2",
        ink: "#27322a"
      },
      borderRadius: { card: "1.25rem" }
    }
  },
  plugins: []
};
