import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        acier: {
          DEFAULT: "#16222B",
          50: "#f3f5f6",
          100: "#e4e8eb",
          200: "#ccd4d9",
          300: "#a6b6c0",
          400: "#7992a2",
          500: "#597587",
          600: "#445d6e",
          700: "#384c5a",
          800: "#233440",
          900: "#16222B",
          950: "#0e161c",
        },
        jaune: {
          DEFAULT: "#F2B705",
          hover: "#D9A404",
          light: "#FFF4D4",
        },
        bleu: {
          DEFAULT: "#1F4E6B",
          light: "#2B6B92",
          dark: "#143346",
        },
        beton: {
          DEFAULT: "#ECEDEE",
          dark: "#D6D8DA",
          light: "#F7F8F9",
        },
        whatsapp: {
          DEFAULT: "#25D366",
          hover: "#1EBE5D",
          dark: "#128C7E",
        },
      },
      fontFamily: {
        heading: ["Barlow Condensed", "Impact", "sans-serif"],
        sans: ["Barlow", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        "stripes-warning":
          "repeating-linear-gradient(45deg, #F2B705, #F2B705 14px, #16222B 14px, #16222B 28px)",
        "stripes-subtle":
          "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(22, 34, 43, 0.03) 10px, rgba(22, 34, 43, 0.03) 20px)",
      },
    },
  },
  plugins: [],
};
export default config;
