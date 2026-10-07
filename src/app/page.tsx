import React from "react";
import LandingHero from "@/components/home/LandingHero";
import LandingCategories from "@/components/home/LandingCategories";
import LandingBenefits from "@/components/home/LandingBenefits";
import LandingToolsTeaser from "@/components/home/LandingToolsTeaser";
import LandingFinalCta from "@/components/home/LandingFinalCta";

export default function HomePage() {
  return (
    <div className="space-y-0 w-full overflow-hidden">
      {/* 1. Hero Landing Page Percutante & Légère */}
      <LandingHero />

      {/* 2. Rayons Phares & Catégories (Cartes avec liens directs vers le catalogue) */}
      <LandingCategories />

      {/* 3. Engagements & Atouts BTP QUALITMAT SARL */}
      <LandingBenefits />

      {/* 4. Outils Utiles : Teaser Calculateur de Chantier & Espace Pro */}
      <LandingToolsTeaser />

      {/* 5. Appel à l'action final pour entrer dans le catalogue ou devis WhatsApp */}
      <LandingFinalCta />
    </div>
  );
}
