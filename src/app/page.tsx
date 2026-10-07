import React from "react";
import VibrantHero from "@/components/home/VibrantHero";
import LaRocheProductRibbon from "@/components/home/LaRocheProductRibbon";
import LaTourTabsProducts from "@/components/home/LaTourTabsProducts";
import BatimatServices from "@/components/home/BatimatServices";
import VibrantCtaBanner from "@/components/home/VibrantCtaBanner";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Slider Grand Format d'Impact (Style La Roche & Batimat) */}
      <VibrantHero />

      {/* 2. Ruban des Produits & Showcase Dynamique 50/50 (Signature La Roche Bénin) */}
      <LaRocheProductRibbon />

      {/* 3. Sélection Produits en Onglets Dynamiques & Prix Visibles (Signature La Tour Boutique) */}
      <LaTourTabsProducts />

      {/* 4. Logistique BTP & Engagements de Qualité (Style Batimat & Jafco) */}
      <BatimatServices />

      {/* 5. Bannière Flash d'Appel à l'Action & WhatsApp Direct */}
      <VibrantCtaBanner />
    </div>
  );
}
