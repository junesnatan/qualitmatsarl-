import React from "react";
import Hero from "@/components/home/Hero";
import PromotionsBanner from "@/components/home/PromotionsBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProSection from "@/components/home/ProSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LocationSection from "@/components/home/LocationSection";

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 1. Héro avec recherche immédiate sans scroll & devis express */}
      <Hero />

      {/* 2. Bandeau promotionnel gérable */}
      <PromotionsBanner />

      {/* 3. Rayons et Catégories de matériaux */}
      <CategoryGrid />

      {/* 4. Produits phares du moment */}
      <FeaturedProducts />

      {/* 5. Espace Pro & Chantiers */}
      <ProSection />

      {/* 6. Témoignages & Avis clients vérifiés */}
      <TestimonialsSection />

      {/* 7. Localisation, itinéraire et horaires magasin */}
      <LocationSection />
    </div>
  );
}
