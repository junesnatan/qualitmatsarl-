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
        // Bleu Nuit Saphir Sombre Prestige (Inspiration Batimat & Jafco)
        brand: {
          50: "#f0f4f9",
          100: "#dbe4ef",
          200: "#b8cbdf",
          300: "#8ca9ca",
          400: "#5d83b1",
          500: "#3d6495",
          600: "#2d4e78",
          700: "#203a5b",
          800: "#14253b",
          900: "#0b1728", // Deep Navy Prestige
          950: "#060d17",
        },
        // Doré Champagne Mat & Bronze Brossé Showroom (Inspiration La Roche & La Tour Boutique)
        gold: {
          50: "#fbf9f4",
          100: "#f6f1e6",
          200: "#ede2ce",
          300: "#e0cdb0",
          400: "#cfb38c",
          500: "#be9b6b", // Doré Champagne Signature
          600: "#aa8351",
          700: "#8a663d",
          800: "#6e5033",
          900: "#583f2a",
          950: "#342315",
        },
        // Noir d'Ébène & Ardoise douce
        charcoal: {
          DEFAULT: "#181e25",
          50: "#f7f8f9",
          100: "#edf0f2",
          200: "#d7dde2",
          300: "#b5c0cb",
          400: "#8d9dae",
          500: "#6e8093",
          600: "#566677",
          700: "#455361",
          800: "#39444f",
          900: "#181e25",
          950: "#0f1318",
        },
        // Nuances Craie & Travertin lumineux
        sand: {
          50: "#faf9f6",
          100: "#f5f2eb",
          200: "#ebe4d5",
          300: "#ded2bd",
        },
        accent: {
          DEFAULT: "#be9b6b",
          hover: "#aa8351",
          light: "#f6f1e6",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#FAF9F6",
          subtle: "#F4F2EC",
          border: "#E7E4DC",
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
      boxShadow: {
        'showroom': '0 4px 20px -2px rgba(11, 23, 40, 0.05), 0 2px 6px -1px rgba(11, 23, 40, 0.03)',
        'showroom-hover': '0 20px 30px -10px rgba(11, 23, 40, 0.10), 0 10px 15px -5px rgba(190, 155, 107, 0.12)',
        'gold-glow': '0 4px 18px 0 rgba(190, 155, 107, 0.28)',
      },
    },
  },
  plugins: [],
};
export default config;
