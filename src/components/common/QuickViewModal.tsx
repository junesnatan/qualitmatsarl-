"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useQuickView } from "@/context/QuickViewContext";
import { useCart } from "@/context/CartContext";
import SafeImage from "@/components/common/SafeImage";
import { formatFcfa } from "@/lib/storage";
import { initialProducts } from "@/data/initialData";
import {
  X,
  Plus,
  Minus,
  Check,
  PackageCheck,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function QuickViewModal() {
  const { selectedProduct, closeQuickView } = useQuickView();
  const { addToCart, items } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [quantite, setQuantite] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setQuantite(1);
    setJustAdded(false);
  }, [selectedProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuickView();
    };
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProduct, closeQuickView]);

  if (!selectedProduct) return null;

  const existingInCart = items.find((i) => i.product.id === selectedProduct.id);

  const relatedProducts = initialProducts
    .filter(
      (p) =>
        p.categoryId === selectedProduct.categoryId &&
        p.id !== selectedProduct.id
    )
    .slice(0, 3);

  const handleAdd = () => {
    addToCart(selectedProduct, quantite);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const images = selectedProduct.images?.length
    ? selectedProduct.images
    : ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={closeQuickView}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-y-auto z-10 animate-scale-up">
        {/* Bouton Fermer */}
        <button
          onClick={closeQuickView}
          className="absolute top-3 right-3 z-20 w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition active:scale-95"
          aria-label="Fermer la vue rapide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Colonne Galerie Images (5 cols) */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shadow-inner">
                <SafeImage
                  src={images[activeImage] || images[0]}
                  alt={selectedProduct.nom}
                  categorySlug={selectedProduct.categoryId}
                  fill
                  className="object-cover"
                />
                {selectedProduct.vedette && (
                  <span className="absolute top-2.5 left-2.5 bg-brand-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    Produit Phare
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                        activeImage === idx
                          ? "border-brand-900 shadow-sm"
                          : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <SafeImage
                        src={img}
                        alt={`Miniature ${idx + 1}`}
                        categorySlug={selectedProduct.categoryId}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Colonne Détails & Action (7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs mb-1">
                  <span className="font-semibold text-brand-900 uppercase tracking-wide">
                    {selectedProduct.marque || "QUALITMAT"}
                  </span>
                  {selectedProduct.reference && (
                    <span className="text-slate-400 font-mono">
                      • Réf : {selectedProduct.reference}
                    </span>
                  )}
                </div>

                <h2 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 leading-snug">
                  {selectedProduct.nom}
                </h2>

                <div className="mt-2.5 flex items-center gap-3">
                  <div className="text-lg font-extrabold text-brand-900">
                    {selectedProduct.modePrix === "sur_devis" || !selectedProduct.prixFcfa ? (
                      <span className="text-sm font-bold bg-brand-50 text-brand-900 px-2.5 py-1 rounded">
                        Sur devis
                      </span>
                    ) : (
                      formatFcfa(selectedProduct.prixFcfa)
                    )}
                  </div>
                  <span className="text-xs text-slate-500">
                    / {selectedProduct.unite}
                  </span>

                  <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold">
                    {selectedProduct.enStock ? (
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
                        En stock
                      </span>
                    ) : (
                      <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        Sur commande
                      </span>
                    )}
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {selectedProduct.description}
                </p>

                {selectedProduct.ficheTechnique && (
                  <div className="mt-4 bg-slate-50 rounded-lg p-2.5 border border-slate-100 text-[11px]">
                    <div className="font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Spécifications clés :
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-600">
                      {Object.entries(selectedProduct.ficheTechnique).slice(0, 4).map(([k, v]) => (
                        <div key={k} className="truncate">
                          <span className="text-slate-400">{k}:</span> {v}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sélecteur de Quantité & Boutons */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-slate-700">Quantité :</span>
                  <div className="inline-flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-sm">
                    <button
                      onClick={() => setQuantite((q) => Math.max(1, q - 1))}
                      className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 transition active:scale-95"
                      aria-label="Diminuer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 font-bold text-xs text-slate-900 min-w-[2.5rem] text-center">
                      {quantite}
                    </span>
                    <button
                      onClick={() => setQuantite((q) => q + 1)}
                      className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 transition active:scale-95"
                      aria-label="Augmenter"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {existingInCart && (
                    <span className="text-[11px] text-slate-400">
                      (Déjà {existingInCart.quantite} dans votre liste)
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handleAdd}
                    className={`flex-1 btn-touch py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95 shadow-sm ${
                      justAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-brand-900 hover:bg-brand-800 text-white"
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Ajouté au devis !</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Ajouter à ma liste de devis</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/produit/${selectedProduct.slug}`}
                    onClick={closeQuickView}
                    className="btn-touch py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Fiche complète</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Produits similaires / complémentaires */}
          {relatedProducts.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Matériaux souvent associés
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    className="flex items-center gap-2.5 p-2 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition text-left cursor-pointer"
                    onClick={() => {
                      addToCart(rel, 1);
                    }}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <SafeImage
                        src={rel.images?.[0]}
                        alt={rel.nom}
                        categorySlug={rel.categoryId}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {rel.nom}
                      </p>
                      <p className="text-[11px] text-brand-900 font-semibold">
                        {rel.prixFcfa ? formatFcfa(rel.prixFcfa) : "Sur devis"}
                      </p>
                    </div>
                    <span className="text-xs text-brand-900 font-bold px-1.5 py-0.5 rounded bg-brand-50 shrink-0">
                      +1
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
