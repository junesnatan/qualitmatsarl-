import React from "react";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CalculatorTeaser from "@/components/home/CalculatorTeaser";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HomeGallerySection from "@/components/home/HomeGallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LocationSection from "@/components/home/LocationSection";
import FinalCtaBanner from "@/components/home/FinalCtaBanner";

export default function HomePage() {
  return (
    <div className="space-y-2">
      {/* 2. Hero dynamique split avec stats et visuels réels */}
      <Hero />

      {/* 3. Bande de confiance (trust bar) : IFU, Livraison, WhatsApp, Dépôt Calavi */}
      <TrustBar />

      {/* 4. Catégories phares (grille visuelle 8 cartes avec photos et hover) */}
      <CategoryGrid />

      {/* 5. Produits populaires / Promotions avec onglets et cartes v2 */}
      <FeaturedProducts />

      {/* 6. Calculateur de matériaux (teaser interactif) */}
      <CalculatorTeaser />

      {/* 7. Pourquoi nous choisir (4 colonnes illustrées) */}
      <WhyChooseUs />

      {/* 8. Réalisations / Galerie chantiers livrés avec lightbox */}
      <HomeGallerySection />

      {/* 9. Témoignages clients avec slider */}
      <TestimonialsSection />

      {/* 10. Zone de couverture & Carte Google Maps interactive */}
      <LocationSection />

      {/* 11. Bannière CTA finale avant pied de page */}
      <FinalCtaBanner />
    </div>
  );
}
