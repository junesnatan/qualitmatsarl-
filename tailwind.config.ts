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
        // Rouge Éclatant Signature Showroom BTP (Inspiration La Roche & La Tour Boutique)
        primary: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626", // Rouge Vif Puissant
          700: "#b91c1c", // Rouge BTP Intense
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        // Alias brand pour compatibilité avec le rouge BTP et contraste
        brand: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        // Jaune Solaire & Or Éclatant (Inspiration La Tour Boutique & Batimat)
        solar: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b", // Jaune Éclatant
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // Alias gold vers solar pour éclat immédiat
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // Noir Graphique & Contraste Franc
        dark: {
          DEFAULT: "#111827",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        whatsapp: {
          DEFAULT: "#25D366",
          hover: "#1EBE5D",
          dark: "#128C7E",
        },
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "'Montserrat'", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "'Inter'", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        'vibrant': '0 10px 25px -5px rgba(220, 38, 38, 0.25), 0 8px 10px -6px rgba(220, 38, 38, 0.15)',
        'solar': '0 10px 25px -5px rgba(245, 158, 11, 0.3), 0 8px 10px -6px rgba(245, 158, 11, 0.15)',
        'card-pop': '0 8px 24px -4px rgba(17, 24, 39, 0.08)',
      },
    },
  },
  plugins: [],
};
export default config;
