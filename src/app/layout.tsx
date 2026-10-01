import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import Toast from "@/components/common/Toast";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#16222B",
};

export const metadata: Metadata = {
  title: "Qualimat SARL — Quincaillerie & Matériaux de Construction à Abomey-Calavi (Bénin)",
  description:
    "Quincaillerie et vente de matériaux de construction à Abomey-Calavi. Ciment CPJ 35/45, fer à béton HA, tuyaux PVC, câblerie électrique, outillage et peinture. Préparez votre liste et demandez votre devis direct sur WhatsApp !",
  keywords: [
    "quincaillerie Abomey-Calavi",
    "matériaux de construction Calavi",
    "ciment Bénin",
    "fer à béton Cotonou",
    "tuyaux PVC Bénin",
    "câbles électriques Bénin",
    "devis matériaux Bénin",
    "Qualimat SARL",
  ],
  authors: [{ name: "Qualimat SARL" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-beton text-acier font-sans antialiased min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1 w-full pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileStickyBar />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
