/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        temple: {
          bg: "#0D1A12", // Deep Forest
          surface: "#233728", // Moss
          secondaryBg: "#3A2D25", // Wet Bark
          border: "#5E645A", // Ancient Stone
          primary: "#9B7A41", // Sacred Bronze
          accent: "#4F7A4D", // Fresh Leaf
          highlightText: "#F7F2E7", // Elanji Flower
          textPrimary: "#F7F2E7",
          textSecondary: "#D8D5C8", // Mist
          muted: "#5E645A",
          hover: "#4F7A4D",
        },
      },
      fontFamily: {
        display: ["var(--font-forum)", "Forum", "serif"],
        heading: ["var(--font-gloock)", "Gloock", "serif"],
        body: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
        img: "24px",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        gold: "0 4px 20px -2px rgba(198, 161, 91, 0.25)",
      },
    },
  },
  plugins: [],
};
