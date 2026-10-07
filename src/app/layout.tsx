import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { QuickViewProvider } from "@/context/QuickViewContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import Toast from "@/components/common/Toast";
import QuickViewModal from "@/components/common/QuickViewModal";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1728",
};

export const metadata: Metadata = {
  title: "QUALITMAT SARL — Showroom & Comptoir Matériaux de Construction à Abomey-Calavi (Bénin)",
  description:
    "Showroom et comptoir de matériaux de construction et finitions à Abomey-Calavi (Allègléta / Tankpè). Ciments certifiés CPJ 35/45, fers à béton HA FE E500, carrelage, sanitaire, tuyauterie PVC et outillage pro. Devis direct sur WhatsApp (+229 96 53 84 55).",
  keywords: [
    "quincaillerie Abomey-Calavi",
    "showroom carrelage Calavi",
    "matériaux de construction Bénin",
    "ciment CPJ 45 Bénin",
    "fer à béton FE E500 Cotonou",
    "sanitaire robinetterie Bénin",
    "devis matériaux Bénin",
    "QUALITMAT SARL",
  ],
  authors: [{ name: "QUALITMAT SARL" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-sand-50/40 text-charcoal-900 font-sans antialiased min-h-screen flex flex-col">
        <CartProvider>
          <QuickViewProvider>
            <Header />
            <main className="flex-1 w-full pb-16 md:pb-0">{children}</main>
            <Footer />
            <MobileStickyBar />
            <FloatingWhatsApp />
            <Toast />
            <QuickViewModal />
          </QuickViewProvider>
        </CartProvider>
      </body>
    </html>
  );
}
