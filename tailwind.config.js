module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#1A2B4A",
        background: "#F8F7F4",
        score: {
          green: "#16A34A",
          orange: "#D97706",
          red: "#DC2626",
        }
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)"],
        sora: ["var(--font-sora)"],
      },
    },
  },
  plugins: [],
};
