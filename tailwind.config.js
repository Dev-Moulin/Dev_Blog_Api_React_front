/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4F46E5",
          dark: "#6366F1",
        },
        dark: {
          bg: "#1F2937",
          card: "#374151",
          text: "#F9FAFB",
        },
      },
    },
  },
  plugins: [],
};
