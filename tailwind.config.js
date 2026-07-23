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
          bg: "#0F1B16",
          surface: "#18261F",
          border: "#2A3A33",
          primary: "#C6A15B",
          secondary: "#23452F",
          accent: "#8FA98B",
          success: "#4F8A5B",
          warning: "#D88A2D",
          textPrimary: "#F3EFE3",
          textSecondary: "#C4C0B4",
          muted: "#6D7B71",
          hover: "#D6B46E",
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
