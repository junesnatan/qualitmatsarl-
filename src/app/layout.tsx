import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import Toast from "@/components/common/Toast";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0F2C59",
};

export const metadata: Metadata = {
  title: "QUALITMATSARL — Quincaillerie & Matériaux de Construction à Abomey-Calavi (Bénin)",
  description:
    "Quincaillerie et vente de matériaux de construction à Abomey-Calavi. Ciment CPJ 35/45, fer à béton HA, tuyaux PVC, câblerie électrique, outillage et peinture. Préparez votre liste et demandez votre devis direct sur WhatsApp (01 96 53 84 55) !",
  keywords: [
    "quincaillerie Abomey-Calavi",
    "matériaux de construction Calavi",
    "ciment Bénin",
    "fer à béton Cotonou",
    "tuyaux PVC Bénin",
    "câbles électriques Bénin",
    "devis matériaux Bénin",
    "QUALITMATSARL",
  ],
  authors: [{ name: "QUALITMATSARL" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1 w-full pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileStickyBar />
          <FloatingWhatsApp />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
