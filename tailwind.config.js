/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070B18",
        panel: "#0D1426",
        neon: {
          pink: "#FF2D95",
          cyan: "#22D3EE",
          lime: "#A3E635",
          amber: "#FBBF24",
          violet: "#A855F7",
          red: "#FF3B5C",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(255, 45, 149, 0.55)",
        card: "0 24px 60px -30px rgba(0, 0, 0, 0.85)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
