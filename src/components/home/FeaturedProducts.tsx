"use client";

import React, { useState } from "react";
import Link from "next/link";
import { initialProducts } from "@/data/initialData";
import ProductCard from "@/components/common/ProductCard";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Percent,
} from "lucide-react";

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<"tous" | "gros-oeuvre" | "second-oeuvre">("tous");

  const displayedProducts = initialProducts.filter((product) => {
    if (activeTab === "tous") return product.vedette;
    if (activeTab === "gros-oeuvre") {
      return (
        (product.categoryId === "cat-gros-oeuvre" ||
          product.categoryId === "cat-ferraillage") &&
        product.vedette
      );
    }
    if (activeTab === "second-oeuvre") {
      return (
        product.categoryId !== "cat-gros-oeuvre" &&
        product.categoryId !== "cat-ferraillage" &&
        product.vedette
      );
    }
    return true;
  }).slice(0, 8);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto border-t border-slate-200">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Matériaux les plus demandés</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
            Produits Populaires & Incontournables
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Retrouvez les indispensables de vos chantiers avec stock disponible en continu à Allègléta / Tankpè.
          </p>
        </div>

        {/* Filtres par onglets */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setActiveTab("tous")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === "tous"
                ? "bg-white text-brand-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tous les phares
          </button>
          <button
            onClick={() => setActiveTab("gros-oeuvre")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === "gros-oeuvre"
                ? "bg-white text-brand-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Ciment & Fers
          </button>
          <button
            onClick={() => setActiveTab("second-oeuvre")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === "second-oeuvre"
                ? "bg-white text-brand-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Plomberie, Câbles & Outillage
          </button>
        </div>
      </div>

      {/* Grille de cartes produits v2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bouton voir tout */}
      <div className="mt-10 text-center">
        <Link
          href="/catalogue"
          className="btn-touch inline-flex items-center gap-2 bg-slate-900 hover:bg-brand-900 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition active:scale-95"
        >
          <span>Consulter les {initialProducts.length} références du catalogue</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </Link>
      </div>
    </section>
  );
}
