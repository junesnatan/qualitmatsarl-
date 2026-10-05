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
      <div className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 p-4 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
        {/* Image */}
        <div
          onClick={handleOpenQuickView}
          className="relative w-full sm:w-44 h-40 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 cursor-pointer group-hover:opacity-95 transition"
        >
          <SafeImage
            src={product.images?.[0]}
            alt={product.nom}
            categorySlug={product.categoryId}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.vedette && (
            <span className="absolute top-2 left-2 bg-brand-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
              Phare
            </span>
          )}
          <button
            onClick={handleOpenQuickView}
            className="absolute bottom-2 right-2 p-1.5 bg-white/90 hover:bg-white text-slate-700 rounded-lg shadow-sm sm:opacity-0 group-hover:opacity-100 transition"
            title="Aperçu rapide"
            aria-label="Aperçu rapide"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              {product.categoryName || "Matériau BTP"}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {product.marque || "QUALITMAT"}
            </span>
          </div>

          <Link href={`/produit/${product.slug}`} className="block group-hover:text-brand-900 transition-colors">
            <h3 className="font-heading font-bold text-base text-slate-900 line-clamp-1">
              {product.nom}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
            {product.description}
          </p>

          <div className="mt-2 flex items-center gap-3 text-xs text-slate-600">
            <span>Unité : <strong className="text-slate-800">{product.unite}</strong></span>
            <span>•</span>
            {product.enStock ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
                En stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Sur commande
              </span>
            )}
          </div>
        </div>

        {/* Prix & Action */}
        <div className="w-full sm:w-48 shrink-0 flex sm:flex-col justify-between sm:items-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-left sm:text-right">
            <div className="text-[10px] text-slate-400 uppercase font-medium">Prix unitaire</div>
            <div className="text-base font-extrabold text-brand-900">
              {product.modePrix === "sur_devis" || !product.prixFcfa ? (
                <span className="text-xs font-bold text-brand-900 bg-brand-50 px-2 py-0.5 rounded">
                  Sur devis
                </span>
              ) : (
                formatFcfa(product.prixFcfa)
              )}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`w-full sm:w-auto btn-touch px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95 shadow-sm ${
              justAdded
                ? "bg-emerald-600 text-white"
                : existingCartItem
                ? "bg-brand-50 text-brand-900 border border-brand-300 hover:bg-brand-100"
                : "bg-brand-900 hover:bg-brand-800 text-white"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Ajouté</span>
              </>
            ) : existingCartItem ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand-900" />
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
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Badge Vedette */}
      {product.vedette && (
        <span className="absolute top-3 left-3 z-10 bg-brand-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
          Phare
        </span>
      )}

      {/* Image produit avec fond gris clair uniforme et Quick View au clic */}
      <div
        onClick={handleOpenQuickView}
        className="relative h-48 w-full bg-slate-50 border-b border-slate-100 overflow-hidden cursor-pointer"
        title="Cliquer pour un aperçu rapide"
      >
        <SafeImage
          src={product.images?.[0]}
          alt={product.nom}
          categorySlug={product.categoryId}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge Disponibilité Coin Supérieur Droit */}
        <div className="absolute top-3 right-3 z-10">
          {product.enStock ? (
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              En stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-amber-100">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Sur commande
            </span>
          )}
        </div>

        {/* Bouton Quick View au survol desktop */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none sm:pointer-events-auto">
          <span className="bg-white/95 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-brand-900" />
            Aperçu rapide
          </span>
        </div>
      </div>

      {/* Détails Produit */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span className="font-semibold text-brand-900 uppercase tracking-wide truncate max-w-[130px]">
              {product.marque || "QUALITMAT"}
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium truncate max-w-[110px]">
              {product.categoryName || "Gros Œuvre"}
            </span>
          </div>

          <Link href={`/produit/${product.slug}`} className="block group-hover:text-brand-900 transition-colors">
            <h3 className="font-heading font-bold text-sm text-slate-900 line-clamp-2 leading-snug">
              {product.nom}
            </h3>
          </Link>

          <p className="mt-1 text-xs text-slate-500">
            Unité : <span className="font-medium text-slate-700">{product.unite}</span>
          </p>
        </div>

        {/* Prix & Bouton Pleine Largeur */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-slate-400 uppercase font-medium">Prix unitaire</span>
            <div className="text-base font-extrabold text-brand-900 leading-tight">
              {product.modePrix === "sur_devis" || !product.prixFcfa ? (
                <span className="text-xs font-bold text-brand-900 bg-brand-50 px-2.5 py-0.5 rounded">
                  Sur devis
                </span>
              ) : (
                <span>{formatFcfa(product.prixFcfa)}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`w-full btn-touch py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95 shadow-sm ${
              justAdded
                ? "bg-emerald-600 text-white"
                : existingCartItem
                ? "bg-brand-50 text-brand-900 border border-brand-300 hover:bg-brand-100"
                : "bg-brand-900 hover:bg-brand-800 text-white"
            }`}
            title="Ajouter à ma liste de devis"
            aria-label={`Ajouter ${product.nom} à ma liste`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Ajouté au devis !</span>
              </>
            ) : existingCartItem ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand-900" />
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
