"use client";

import React, { useState } from "react";
import Link from "next/link";
import { initialProducts } from "@/data/initialData";
import ProductCard from "@/components/common/ProductCard";
import { Flame, ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "Tous les phares" },
    { id: "cat-gros-oeuvre", label: "Gros Œuvre & Ciment" },
    { id: "cat-plomberie", label: "Plomberie" },
    { id: "cat-electricite", label: "Électricité" },
    { id: "cat-outillage", label: "Outillage" },
  ];

  const featured = initialProducts.filter((p) => p.vedette);

  const displayedProducts =
    selectedFilter === "all"
      ? featured
      : featured.filter((p) => p.categoryId === selectedFilter);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* En-tête de section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b-2 border-acier-200 pb-4">
        <div>
          <div className="text-xs font-bold text-jaune-hover uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Flame className="w-4 h-4 text-jaune fill-current" />
            <span>Articles les plus demandés sur chantier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-acier uppercase">
            Produits du Moment en Stock
          </h2>
        </div>

        {/* Filtres par onglets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`text-xs uppercase font-bold px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                selectedFilter === tab.id
                  ? "bg-acier text-jaune"
                  : "bg-white text-acier-600 hover:bg-acier-100 border border-beton-dark"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grille de produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pied de section CTA */}
      <div className="mt-10 text-center">
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 bg-acier-900 hover:bg-acier-800 text-white font-bold uppercase text-xs px-6 py-3 rounded tracking-wider shadow transition"
        >
          <span>Accéder au catalogue complet (plus de 30 références)</span>
          <ArrowRight className="w-4 h-4 text-jaune" />
        </Link>
      </div>
    </section>
  );
}
