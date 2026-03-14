import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 24px 80px -32px rgba(15, 23, 42, 0.4)"
      },
      colors: {
        ink: "#122033",
        sand: "#f5efe6",
        peach: "#f7d8b6",
        mint: "#d8f0e0",
        coral: "#f2684a"
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(242, 104, 74, 0.18), transparent 30%), radial-gradient(circle at top right, rgba(216, 240, 224, 0.55), transparent 28%), linear-gradient(135deg, #fffdf8 0%, #fef6ee 55%, #f3efe8 100%)"
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"]
      }
    }
  },
  plugins: []
};

export default config;
