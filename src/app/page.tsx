import React from "react";
import VitrineHero from "@/components/home/VitrineHero";
import VitrineTrustBar from "@/components/home/VitrineTrustBar";
import VitrineDepartments from "@/components/home/VitrineDepartments";
import VitrineServicesGrid from "@/components/home/VitrineServicesGrid";
import VitrineDepotSpotlight from "@/components/home/VitrineDepotSpotlight";
import VitrineCtaBanner from "@/components/home/VitrineCtaBanner";

export default function HomePage() {
  return (
    <div className="space-y-0 w-full overflow-hidden">
      {/* 1. Hero Vitrine Haut Impact */}
      <VitrineHero />

      {/* 2. Bandeau de Réassurance BTP */}
      <VitrineTrustBar />

      {/* 3. Showroom des 6 Familles de Matériaux */}
      <VitrineDepartments />

      {/* 4. Prestations & Services Dédiés aux Chantiers */}
      <VitrineServicesGrid />

      {/* 5. Le Point de Vente & Dépôt Physique de Tankpè / Allègléta */}
      <VitrineDepotSpotlight />

      {/* 6. Appel à l'action final : Devis Rapide WhatsApp & Contact */}
      <VitrineCtaBanner />
    </div>
  );
}
