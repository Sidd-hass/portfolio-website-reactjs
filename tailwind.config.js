/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Syne", "system-ui", "sans-serif"],
      },
      colors: {
        accent: {
          light: "#F5F5F0",
          dark: "#0A0A0A",
        }
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "scale(1)",
          },
          "33%": {
            transform: "scale(1.1)",
          },
          "66%": {
            transform: "scale(0.95)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        blob: "blob 8s infinite",
      },
    },
  },
  plugins: [],
};
