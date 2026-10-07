"use client";

import React, { useState } from "react";
import Link from "next/link";
import { initialProducts } from "@/data/initialData";
import ProductCard from "@/components/common/ProductCard";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Layers,
  Bath,
  Zap,
  ChevronRight,
} from "lucide-react";

type TabType = "tous" | "gros-oeuvre" | "finitions" | "sanitaire" | "electricite";

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<TabType>("tous");

  const displayedProducts = initialProducts.filter((product) => {
    if (activeTab === "tous") return product.vedette;
    if (activeTab === "gros-oeuvre") {
      return (
        product.categoryId === "cat-gros-oeuvre" ||
        product.categoryId === "cat-ferraillage"
      );
    }
    if (activeTab === "finitions") {
      return (
        product.categoryId === "cat-peinture" ||
        product.categoryId === "cat-toiture"
      );
    }
    if (activeTab === "sanitaire") {
      return (
        product.categoryId === "cat-sanitaire" ||
        product.categoryId === "cat-plomberie"
      );
    }
    if (activeTab === "electricite") {
      return (
        product.categoryId === "cat-electricite" ||
        product.categoryId === "cat-outillage"
      );
    }
    return true;
  }).slice(0, 8);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: "tous",
      label: "Incontournables du Moment",
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    {
      id: "gros-oeuvre",
      label: "Gros Œuvre & Aciers",
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: "sanitaire",
      label: "Sanitaire & Plomberie",
      icon: <Bath className="w-3.5 h-3.5" />,
    },
    {
      id: "finitions",
      label: "Peintures & Finitions",
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    {
      id: "electricite",
      label: "Électricité & Outillage",
      icon: <Zap className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <section className="py-14 px-4 max-w-7xl mx-auto border-b border-sand-200">
      {/* En-tête de section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 uppercase tracking-widest mb-1.5">
            <TrendingUp className="w-4 h-4 text-gold-600" />
            <span>Sélection & Références Vérifiées</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-brand-900 tracking-tight">
            Le Catalogue des Incontournables
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Sélection de matériaux de premier choix disponibles immédiatement au comptoir d&apos;Allègléta et livrables sur site.
          </p>
        </div>

        <Link
          href="/catalogue"
          className="text-xs font-bold text-brand-900 hover:text-gold-700 inline-flex items-center gap-1 transition group"
        >
          <span>Consulter toutes les références</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Barre d'Onglets Fluide (Inspiration La Tour Boutique) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                isActive
                  ? "bg-brand-900 text-white border-brand-900 shadow-sm"
                  : "bg-white text-slate-600 border-sand-200 hover:border-gold-400 hover:bg-sand-50"
              }`}
            >
              <span className={isActive ? "text-gold-400" : "text-slate-400"}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grille de Cartes Produits Showroom */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} viewMode="grid" />
        ))}
      </div>

      {/* Bannière d'accès au catalogue complet */}
      <div className="mt-10 p-6 rounded-2xl bg-sand-50 border border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-heading font-bold text-sm text-brand-900">
            Vous recherchez une référence spécifique pour votre chantier ?
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Notre équipe vérifie le stock en magasin et vous répond en moins de 15 minutes.
          </p>
        </div>
        <Link
          href="/catalogue"
          className="btn-touch px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold shadow-sm transition shrink-0"
        >
          Voir les 40+ Matériaux au Catalogue
        </Link>
      </div>
    </section>
  );
}
