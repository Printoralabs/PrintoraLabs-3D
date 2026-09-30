/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        printora: {
          bg: "#0a0a0b",
          card: "#121214",
          border: "rgba(255,255,255,0.08)",
          accent: "#22d3ee",
          "accent-dim": "#0891b2",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(0,0,0,0.4)",
        glow: "0 0 40px -10px rgba(34,211,238,0.3)",
      },
    },
  },
  plugins: [],
};
