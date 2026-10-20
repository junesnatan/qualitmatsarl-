"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useQuickView } from "@/context/QuickViewContext";
import SafeImage from "@/components/common/SafeImage";
import { formatFcfa } from "@/lib/storage";
import { initialProducts, initialSettings } from "@/data/initialData";
import {
  X,
  MessageCircle,
  Check,
  FileText,
  Phone,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function QuickViewModal() {
  const { selectedProduct, closeQuickView } = useQuickView();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
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

  const images = selectedProduct.images?.length
    ? selectedProduct.images
    : ["/images/products/placeholder.jpg"];

  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  const whatsappMessage = encodeURIComponent(
    `Bonjour QUALITMAT SARL, je souhaite demander une cotation pour ce matériau : ${selectedProduct.nom} (Réf: ${selectedProduct.reference || selectedProduct.id}). Merci de me renseigner.`
  );
  const whatsappUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton Fermer */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          aria-label="Fermer la vue rapide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Colonne Galerie Images */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden">
              <SafeImage
                src={images[activeImage]}
                alt={selectedProduct.nom}
                categorySlug={selectedProduct.categoryId}
                fill
                className="object-cover"
              />
              {selectedProduct.enStock && (
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>En Stock Magasin</span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                      activeImage === idx
                        ? "border-primary-600 shadow"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <SafeImage
                      src={img}
                      alt={`${selectedProduct.nom} miniature ${idx + 1}`}
                      categorySlug={selectedProduct.categoryId}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonne Détails & Action Vitrine */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider bg-primary-50 px-2.5 py-1 rounded-md">
                  {selectedProduct.categoryName || "Matériau"}
                </span>
                {selectedProduct.marque && (
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {selectedProduct.marque}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 leading-tight">
                {selectedProduct.nom}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Prix indicatif */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Tarif indicatif :</span>
                  <span className="text-xl font-heading font-black text-primary-600">
                    {selectedProduct.prixFcfa && selectedProduct.prixFcfa > 0
                      ? formatFcfa(selectedProduct.prixFcfa)
                      : "Sur devis spécifique"}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-semibold">
                  / {selectedProduct.unite || "unité"}
                </span>
              </div>

              {/* Spécifications rapides */}
              <div className="space-y-1.5 text-xs text-slate-600">
                {selectedProduct.unite && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">Conditionnement :</span>
                    <span>{selectedProduct.unite}</span>
                  </div>
                )}
                {selectedProduct.reference && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">Référence BTP :</span>
                    <span className="font-mono text-slate-500">{selectedProduct.reference}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Vitrine */}
            <div className="space-y-2.5 pt-3 border-t border-slate-200">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Demander un devis sur WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${cleanPhone}`}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition text-center"
                >
                  <Phone className="w-4 h-4 text-primary-600" />
                  <span>Appeler</span>
                </a>

                <Link
                  href={`/produit/${selectedProduct.slug}`}
                  onClick={closeQuickView}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition text-center"
                >
                  <FileText className="w-4 h-4" />
                  <span>Fiche complète</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
