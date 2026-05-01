module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37",
        secondary: "#0F172A",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        outfit: ["var(--font-outfit)"],
      },
    },
  },
  plugins: [],
};
