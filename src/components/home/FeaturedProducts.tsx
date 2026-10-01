"use client";

import React, { useState } from "react";
import Link from "next/link";
import { initialProducts } from "@/data/initialData";
import ProductCard from "@/components/common/ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";

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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-amber-500 fill-current" />
            <span>Sélection Qualimat</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
            Produits Phares Disponibles en Magasin
          </h2>
        </div>

        {/* Filtres par onglets épurés */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                selectedFilter === tab.id
                  ? "bg-brand-900 text-white font-semibold shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
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

      {/* Pied de section */}
      <div className="mt-10 text-center">
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs px-6 py-3 rounded-lg border border-slate-300 shadow-sm transition"
        >
          <span>Consulter le catalogue complet (plus de 30 références)</span>
          <ArrowRight className="w-4 h-4 text-brand-900" />
        </Link>
      </div>
    </section>
  );
}
