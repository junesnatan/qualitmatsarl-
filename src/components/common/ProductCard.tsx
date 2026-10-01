"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatFcfa } from "@/lib/storage";
import { useCart } from "@/context/CartContext";
import { Plus, Check, PackageCheck, AlertCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const existingCartItem = items.find((i) => i.product.id === product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden relative">
      {/* Badge Vedette */}
      {product.vedette && (
        <span className="absolute top-2.5 left-2.5 z-10 bg-brand-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
          Phare
        </span>
      )}

      {/* Image produit */}
      <Link
        href={`/produit/${product.slug}`}
        className="relative h-44 w-full bg-slate-100 overflow-hidden block"
      >
        <Image
          src={product.images[0] || "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80"}
          alt={product.nom}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* État du stock épuré */}
        <div className="absolute bottom-2 right-2">
          {product.enStock ? (
            <span className="inline-flex items-center gap-1 bg-white/95 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
              <PackageCheck className="w-3 h-3 text-emerald-600" />
              <span>En stock</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-white/95 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
              <AlertCircle className="w-3 h-3 text-amber-600" />
              <span>Sur commande</span>
            </span>
          )}
        </div>
      </Link>

      {/* Détails Produit */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
            <span className="font-semibold text-brand-900 uppercase tracking-wide truncate max-w-[140px]">
              {product.marque || "Qualimat"}
            </span>
            {product.reference && (
              <span className="font-mono text-slate-400">Réf : {product.reference}</span>
            )}
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

        {/* Prix & Bouton Ajout */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-medium">Prix unitaire</div>
            <div className="text-sm font-extrabold text-slate-900 leading-tight">
              {product.modePrix === "sur_devis" || !product.prixFcfa ? (
                <span className="text-brand-900 font-bold text-xs uppercase bg-brand-50 px-2 py-0.5 rounded">
                  Sur devis
                </span>
              ) : (
                <span>{formatFcfa(product.prixFcfa)}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`btn-touch px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-sm ${
              justAdded
                ? "bg-emerald-600 text-white"
                : existingCartItem
                ? "bg-brand-50 text-brand-900 border border-brand-200 hover:bg-brand-100"
                : "bg-brand-900 hover:bg-brand-800 text-white"
            }`}
            title="Ajouter à ma liste de devis"
            aria-label={`Ajouter ${product.nom} à ma liste`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">Ajouté</span>
              </>
            ) : existingCartItem ? (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>({existingCartItem.quantite})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Ajouter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
