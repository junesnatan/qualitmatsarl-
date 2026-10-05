import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f6ff",
          100: "#e0edfe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36abf6",
          500: "#0c8ee7",
          600: "#0170c6",
          700: "#0259a0",
          800: "#064b84",
          900: "#0f2c59", // Corporate Navy Principal
          950: "#0a1c38",
        },
        accent: {
          DEFAULT: "#D97706",
          hover: "#B45309",
          light: "#FEF3C7",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8FAFC",
          subtle: "#F1F5F9",
          border: "#E2E8F0",
        },
        whatsapp: {
          DEFAULT: "#25D366",
          hover: "#1EBE5D",
          dark: "#128C7E",
        },
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "'Inter'", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
