"use client";

import React from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { Product } from "@/types";
import { formatFcfa } from "@/lib/storage";
import { useQuickView } from "@/context/QuickViewContext";
import { initialSettings } from "@/data/initialData";
import {
  MessageCircle,
  Eye,
  ShieldCheck,
  Check,
  FileText,
  Phone,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export default function ProductCard({
  product,
  viewMode = "grid",
}: ProductCardProps) {
  const { openQuickView } = useQuickView();

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const whatsappMessage = encodeURIComponent(
    `Bonjour QUALITMAT SARL, je souhaite un devis pour ce matériau : ${product.nom} (Réf: ${product.reference || product.id}). Pouvez-vous m'indiquer la disponibilité et le tarif pour mon chantier ?`
  );
  const whatsappUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${whatsappMessage}`;

  // Mode Liste
  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded-2xl border-2 border-slate-200 hover:border-primary-600 hover:shadow-xl transition-all duration-300 p-4 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden">
        {/* Image avec zoom au survol */}
        <div
          onClick={handleOpenQuickView}
          className="relative w-full sm:w-48 h-44 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 cursor-pointer group-hover:opacity-95 transition"
        >
          <SafeImage
            src={product.images?.[0]}
            alt={product.nom}
            categorySlug={product.categoryId}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.enStock && (
            <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
              En Stock Magasin
            </span>
          )}
        </div>

        {/* Informations */}
        <div className="flex-1 text-center sm:text-left space-y-2 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-[11px] font-bold text-primary-600 uppercase tracking-wider bg-primary-50 px-2 py-0.5 rounded">
              {product.categoryName || "Matériau BTP"}
            </span>
            {product.marque && (
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Marque: {product.marque}
              </span>
            )}
          </div>

          <Link href={`/produit/${product.slug}`}>
            <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 group-hover:text-primary-600 transition truncate">
              {product.nom}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
            <div className="text-xs font-bold text-slate-900">
              Tarif indicatif :{" "}
              <span className="text-sm font-black text-primary-600">
                {product.prixFcfa && product.prixFcfa > 0 ? formatFcfa(product.prixFcfa) : "Sur devis"}
              </span>{" "}
              <span className="text-[11px] text-slate-500 font-normal">
                / {product.unite || "unité"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Vitrine Directes */}
        <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-48 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Devis WhatsApp</span>
          </a>

          <Link
            href={`/produit/${product.slug}`}
            className="w-full sm:w-48 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition text-center"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Fiche technique</span>
          </Link>
        </div>
      </div>
    );
  }

  // Mode Grille (Défaut Vitrine)
  return (
    <div className="group bg-white rounded-2xl border-2 border-slate-200 hover:border-primary-600 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Zone Image */}
      <div
        onClick={handleOpenQuickView}
        className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
      >
        <SafeImage
          src={product.images?.[0]}
          alt={product.nom}
          categorySlug={product.categoryId}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge Disponibilité Magasin */}
        {product.enStock && (
          <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>En Stock à Calavi</span>
          </div>
        )}

        {/* Bouton Aperçu Rapide sur l'image */}
        <button
          onClick={handleOpenQuickView}
          className="absolute bottom-2.5 right-2.5 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
          title="Aperçu rapide"
        >
          <Eye className="w-4 h-4 text-slate-700" />
        </button>
      </div>

      {/* Contenu */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold text-primary-600 uppercase tracking-wider bg-primary-50 px-2 py-0.5 rounded">
              {product.categoryName || "Matériau"}
            </span>
            {product.marque && (
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                {product.marque}
              </span>
            )}
          </div>

          <Link href={`/produit/${product.slug}`}>
            <h3 className="font-heading font-black text-sm sm:text-base text-slate-900 group-hover:text-primary-600 transition line-clamp-1">
              {product.nom}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Prix indicatif & Actions Vitrine */}
        <div className="pt-2 border-t border-slate-100 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] text-slate-400 font-medium">Tarif indicatif :</span>
            <div className="text-right">
              <span className="text-sm sm:text-base font-black text-slate-900">
                {product.prixFcfa && product.prixFcfa > 0 ? formatFcfa(product.prixFcfa) : "Sur devis"}
              </span>
              <span className="text-[10px] text-slate-500 block">
                par {product.unite || "unité"}
              </span>
            </div>
          </div>

          {/* Boutons d'action Vitrine Directe */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href={`/produit/${product.slug}`}
              className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center gap-1 transition text-center"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Fiche</span>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-sm transition active:scale-95 text-center"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Devis</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
