"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { initialProducts } from "@/data/initialData";
import { formatFcfa } from "@/lib/storage";
import { useCart } from "@/context/CartContext";
import {
  Sparkles,
  Flame,
  Check,
  Plus,
  ArrowRight,
  PackageCheck,
  Tag,
} from "lucide-react";

type ProductTab = "bestsellers" | "nouveautes" | "gros-oeuvre" | "finitions";

export default function LaTourTabsProducts() {
  const [activeTab, setActiveTab] = useState<ProductTab>("bestsellers");
  const { addToCart, items } = useCart();
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const handleAdd = (product: any) => {
    addToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  const getFilteredList = () => {
    switch (activeTab) {
      case "bestsellers":
        return initialProducts.filter((p) => p.vedette).slice(0, 8);
      case "nouveautes":
        return initialProducts.slice(4, 12);
      case "gros-oeuvre":
        return initialProducts.filter(
          (p) => p.categoryId === "cat-gros-oeuvre" || p.categoryId === "cat-ferraillage"
        ).slice(0, 8);
      case "finitions":
        return initialProducts.filter(
          (p) =>
            p.categoryId === "cat-sanitaire" ||
            p.categoryId === "cat-peinture" ||
            p.categoryId === "cat-plomberie"
        ).slice(0, 8);
      default:
        return initialProducts.slice(0, 8);
    }
  };

  const products = getFilteredList();

  const tabs: { id: ProductTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "bestsellers",
      label: "MEILLEURES VENTES",
      icon: <Flame className="w-4 h-4 text-primary-500" />,
    },
    {
      id: "nouveautes",
      label: "NOUVEAUTÉS & ARRIVAGES",
      icon: <Sparkles className="w-4 h-4 text-solar-500" />,
    },
    {
      id: "gros-oeuvre",
      label: "GROS ŒUVRE & ACIERS",
      icon: <Tag className="w-4 h-4 text-primary-500" />,
    },
    {
      id: "finitions",
      label: "SANITAIRE & CARRELAGE",
      icon: <Tag className="w-4 h-4 text-solar-500" />,
    },
  ];

  return (
    <section className="py-14 bg-slate-50 border-b-2 border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Titre façon La Tour Boutique */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="bg-primary-100 text-primary-700 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            SÉLECTION DE LA SEMAINE
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-dark-900 mt-2">
            Nos Produits les Plus Demandés
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tarifs indicatifs directs, stock permanent vérifié au dépôt d&apos;Allègléta.
          </p>
        </div>

        {/* Barre d'Onglets La Tour Boutique */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-xl font-black text-xs sm:text-sm tracking-wide whitespace-nowrap transition-all duration-200 flex items-center gap-2 border-2 ${
                  isActive
                    ? "bg-primary-600 text-white border-primary-600 shadow-vibrant scale-105"
                    : "bg-white text-dark-700 border-slate-300 hover:border-primary-500 hover:bg-slate-50"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grille Produits Éclatante (Style La Tour) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => {
            const inCart = items.find((i) => i.product.id === p.id);
            const isJustAdded = justAddedId === p.id;

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border-2 border-slate-200 hover:border-primary-600 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Photo & Badge */}
                <div className="relative h-44 sm:h-52 w-full bg-slate-100 overflow-hidden">
                  <SafeImage
                    src={p.images?.[0]}
                    alt={p.nom}
                    categorySlug={p.categoryId}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {p.vedette && (
                    <span className="absolute top-2.5 left-2.5 bg-primary-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded shadow">
                      POPULAIRE
                    </span>
                  )}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="bg-white/95 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full shadow border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      En Stock
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {p.categoryName || "Matériau BTP"}
                    </span>
                    <Link href={`/produit/${p.slug}`}>
                      <h3 className="font-heading font-black text-sm text-dark-900 group-hover:text-primary-600 line-clamp-2 leading-snug mt-0.5">
                        {p.nom}
                      </h3>
                    </Link>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Unité : <strong className="text-dark-800">{p.unite}</strong>
                    </p>
                  </div>

                  {/* Prix & Bouton Rouge */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        Prix Unitaire
                      </span>
                      <span className="font-black text-base sm:text-lg text-primary-600">
                        {p.prixFcfa ? formatFcfa(p.prixFcfa) : "Sur devis"}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(p)}
                      className={`w-full py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-sm ${
                        isJustAdded
                          ? "bg-emerald-600 text-white"
                          : inCart
                          ? "bg-solar-500 text-dark-950 hover:bg-solar-600"
                          : "btn-red"
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Ajouté !</span>
                        </>
                      ) : inCart ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Dans la liste ({inCart.quantite})</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Ajouter au devis</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bouton catalogue complet */}
        <div className="mt-10 text-center">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 bg-dark-900 hover:bg-primary-600 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg transition active:scale-95"
          >
            <span>Accéder à Tout le Catalogue (40+ Matériaux)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
