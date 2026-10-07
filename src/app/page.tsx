import React from "react";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import DepartmentRibbon from "@/components/home/DepartmentRibbon";
import ShowroomSplitSection from "@/components/home/ShowroomSplitSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryGrid from "@/components/home/CategoryGrid";
import CalculatorTeaser from "@/components/home/CalculatorTeaser";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HomeGallerySection from "@/components/home/HomeGallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LocationSection from "@/components/home/LocationSection";
import FinalCtaBanner from "@/components/home/FinalCtaBanner";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Majestueux BTP & Finitions (Inspiration Batimat & La Roche) */}
      <Hero />

      {/* 2. Bande de Réassurance & Autorité (IFU, Dépôt Calavi, Flotte dédiée) */}
      <TrustBar />

      {/* 3. Ruban des Départements en Médaillons Circulaires (Inspiration La Roche Bénin) */}
      <DepartmentRibbon />

      {/* 4. Section Inspirations Showroom 50/50 (Inspiration JAFCO & La Roche) */}
      <ShowroomSplitSection />

      {/* 5. Incontournables & Onglets Fluides (Inspiration La Tour Boutique) */}
      <FeaturedProducts />

      {/* 6. Galerie des Rayons & Familles de Matériaux */}
      <CategoryGrid />

      {/* 7. Studio Simulateur de Volumes BTP */}
      <CalculatorTeaser />

      {/* 8. Les 4 Standards d'Excellence Qualitmat SARL */}
      <WhyChooseUs />

      {/* 9. Galerie des Chantiers Réalisés au Bénin */}
      <HomeGallerySection />

      {/* 10. Avis & Témoignages Maîtres d'Ouvrage */}
      <TestimonialsSection />

      {/* 11. Accès & Comptoir Allègléta */}
      <LocationSection />

      {/* 12. Bannière de Cotation Finale */}
      <FinalCtaBanner />
    </div>
  );
}
