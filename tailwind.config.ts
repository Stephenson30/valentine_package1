import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        float: "float 6s ease-in-out infinite",
        pop: "pop 0.6s ease-out",
        heart: "heart 1s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-30px)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        heart: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": {
            opacity: "0",
            transform: "translateY(-40px) scale(1.5)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
