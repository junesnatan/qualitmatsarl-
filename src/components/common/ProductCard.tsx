"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { Product } from "@/types";
import { formatFcfa } from "@/lib/storage";
import { useCart } from "@/context/CartContext";
import { useQuickView } from "@/context/QuickViewContext";
import {
  Plus,
  Check,
  PackageCheck,
  AlertCircle,
  Eye,
  Sparkles,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export default function ProductCard({
  product,
  viewMode = "grid",
}: ProductCardProps) {
  const { addToCart, items } = useCart();
  const { openQuickView } = useQuickView();
  const [justAdded, setJustAdded] = useState(false);

  const existingCartItem = items.find((i) => i.product.id === product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  // Mode Liste
  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded-2xl border-2 border-slate-200 hover:border-primary-600 hover:shadow-xl transition-all duration-300 p-4 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
        {/* Image */}
        <div
          onClick={handleOpenQuickView}
          className="relative w-full sm:w-44 h-40 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 cursor-pointer group-hover:opacity-95 transition"
        >
          <SafeImage
            src={product.images?.[0]}
            alt={product.nom}
            categorySlug={product.categoryId}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.vedette && (
            <span className="absolute top-2 left-2 bg-primary-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
              PHARE
            </span>
          )}
          <button
            onClick={handleOpenQuickView}
            className="absolute bottom-2 right-2 p-1.5 bg-white/95 hover:bg-white text-dark-800 rounded-lg shadow-sm sm:opacity-0 group-hover:opacity-100 transition"
            title="Aperçu rapide"
            aria-label="Aperçu rapide"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-dark-800 px-2 py-0.5 rounded">
              {product.categoryName || "Matériau BTP"}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {product.marque || "QUALITMAT"}
            </span>
          </div>

          <Link href={`/produit/${product.slug}`} className="block group-hover:text-primary-600 transition-colors">
            <h3 className="font-heading font-black text-base text-dark-900 line-clamp-1">
              {product.nom}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
            {product.description}
          </p>

          <div className="mt-2 flex items-center gap-3 text-xs text-slate-600">
            <span>Unité : <strong className="text-dark-900">{product.unite}</strong></span>
            <span>•</span>
            {product.enStock ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
                En stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-solar-700 font-bold">
                <AlertCircle className="w-3.5 h-3.5 text-solar-600" />
                Sur commande
              </span>
            )}
          </div>
        </div>

        {/* Prix & Action */}
        <div className="w-full sm:w-48 shrink-0 flex sm:flex-col justify-between sm:items-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-left sm:text-right">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Prix unitaire</div>
            <div className="text-lg font-black text-primary-600">
              {product.modePrix === "sur_devis" || !product.prixFcfa ? (
                <span className="text-xs font-bold text-dark-900 bg-slate-100 px-2 py-0.5 rounded">
                  Sur devis
                </span>
              ) : (
                formatFcfa(product.prixFcfa)
              )}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition active:scale-95 shadow-sm ${
              justAdded
                ? "bg-emerald-600 text-white"
                : existingCartItem
                ? "bg-solar-500 text-dark-950 hover:bg-solar-600"
                : "btn-red"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Ajouté</span>
              </>
            ) : existingCartItem ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>({existingCartItem.quantite}) Devis</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>+ Ajouter au devis</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Mode Grille (par défaut)
  return (
    <div className="group bg-white rounded-2xl border-2 border-slate-200 hover:border-primary-600 hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Badge Vedette */}
      {product.vedette && (
        <span className="absolute top-3 left-3 z-10 bg-primary-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded shadow-md">
          POPULAIRE
        </span>
      )}

      {/* Image produit */}
      <div
        onClick={handleOpenQuickView}
        className="relative h-48 w-full bg-slate-100 border-b border-slate-100 overflow-hidden cursor-pointer"
        title="Aperçu rapide"
      >
        <SafeImage
          src={product.images?.[0]}
          alt={product.nom}
          categorySlug={product.categoryId}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge Disponibilité */}
        <div className="absolute top-3 right-3 z-10">
          {product.enStock ? (
            <span className="inline-flex items-center gap-1 bg-white/95 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full shadow border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              En stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-white/95 text-solar-800 text-[10px] font-black px-2 py-0.5 rounded-full shadow border border-solar-200">
              <span className="w-1.5 h-1.5 rounded-full bg-solar-500" />
              Sur commande
            </span>
          )}
        </div>

        {/* Bouton Quick View au survol */}
        <div className="absolute inset-0 bg-dark-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white text-dark-900 text-xs font-black px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-primary-600" />
            Aperçu rapide
          </span>
        </div>
      </div>

      {/* Détails Produit */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span className="font-bold text-dark-900 uppercase tracking-wide truncate max-w-[130px]">
              {product.marque || "QUALITMAT"}
            </span>
            <span className="text-[10px] bg-slate-100 text-dark-700 px-2 py-0.5 rounded font-bold truncate max-w-[110px]">
              {product.categoryName || "Gros Œuvre"}
            </span>
          </div>

          <Link href={`/produit/${product.slug}`} className="block group-hover:text-primary-600 transition-colors">
            <h3 className="font-heading font-black text-sm text-dark-900 line-clamp-2 leading-snug">
              {product.nom}
            </h3>
          </Link>

          <p className="mt-1 text-xs text-slate-500">
            Unité : <span className="font-bold text-dark-800">{product.unite}</span>
          </p>
        </div>

        {/* Prix & Bouton Pleine Largeur */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Prix unitaire</span>
            <div className="text-lg font-black text-primary-600 leading-tight">
              {product.modePrix === "sur_devis" || !product.prixFcfa ? (
                <span className="text-xs font-bold text-dark-900 bg-slate-100 px-2.5 py-0.5 rounded">
                  Sur devis
                </span>
              ) : (
                <span>{formatFcfa(product.prixFcfa)}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition active:scale-95 shadow-sm ${
              justAdded
                ? "bg-emerald-600 text-white"
                : existingCartItem
                ? "bg-solar-500 text-dark-950 hover:bg-solar-600"
                : "btn-red"
            }`}
            title="Ajouter au devis"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Ajouté au devis !</span>
              </>
            ) : existingCartItem ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Ajouté ({existingCartItem.quantite} dans la liste)</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>+ Ajouter au devis</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
