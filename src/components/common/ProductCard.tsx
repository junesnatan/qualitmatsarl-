"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatFcfa } from "@/lib/storage";
import { useCart } from "@/context/CartContext";
import { Plus, Check, Eye, PackageCheck, AlertCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  // Vérifier si l'article est déjà dans la liste
  const existingCartItem = items.find((i) => i.product.id === product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group bg-white rounded-lg border border-beton-dark hover:border-jaune shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden relative">
      {/* Badge promotion / vedette */}
      {product.vedette && (
        <span className="absolute top-2 left-2 z-10 bg-jaune text-acier-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
          Phare
        </span>
      )}

      {/* Image produit */}
      <Link
        href={`/produit/${product.slug}`}
        className="relative h-44 w-full bg-acier-100 overflow-hidden block"
      >
        <Image
          src={product.images[0] || "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80"}
          alt={product.nom}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-acier-950/0 group-hover:bg-acier-950/10 transition-colors" />

        {/* État du stock */}
        <div className="absolute bottom-2 right-2">
          {product.enStock ? (
            <span className="inline-flex items-center gap-1 bg-white/95 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm backdrop-blur-sm">
              <PackageCheck className="w-3 h-3 text-emerald-600" />
              <span>En stock</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-white/95 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              <AlertCircle className="w-3 h-3 text-amber-600" />
              <span>Sur commande</span>
            </span>
          )}
        </div>
      </Link>

      {/* Détails du produit */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-acier-400 mb-1">
            <span className="font-semibold text-bleu uppercase tracking-wider truncate max-w-[150px]">
              {product.marque || "Qualimat"}
            </span>
            {product.reference && (
              <span className="font-mono text-acier-500">Réf: {product.reference}</span>
            )}
          </div>

          <Link href={`/produit/${product.slug}`} className="block group-hover:text-bleu transition-colors">
            <h3 className="font-heading font-bold text-lg text-acier uppercase leading-tight line-clamp-2">
              {product.nom}
            </h3>
          </Link>

          <p className="mt-1 text-xs text-acier-500 font-medium">
            Unité : <span className="text-acier-800 font-semibold">{product.unite}</span>
          </p>
        </div>

        {/* Prix & Bouton Ajout */}
        <div className="mt-4 pt-3 border-t border-beton flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-acier-400 uppercase font-bold">Prix indicatif</div>
            <div className="text-base font-black text-acier leading-tight">
              {product.modePrix === "sur_devis" || !product.prixFcfa ? (
                <span className="text-bleu font-bold text-xs uppercase bg-bleu/10 px-2 py-0.5 rounded">
                  Sur devis
                </span>
              ) : (
                <span>{formatFcfa(product.prixFcfa)}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`btn-touch px-3 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition active:scale-95 shadow-sm ${
              justAdded
                ? "bg-emerald-600 text-white"
                : existingCartItem
                ? "bg-acier-800 text-jaune hover:bg-acier-700"
                : "bg-jaune hover:bg-jaune-hover text-acier-950"
            }`}
            title="Ajouter à ma liste de devis"
            aria-label={`Ajouter ${product.nom} à ma liste`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline">Ajouté</span>
              </>
            ) : existingCartItem ? (
              <>
                <Plus className="w-4 h-4" />
                <span>({existingCartItem.quantite})</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Ajouter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
