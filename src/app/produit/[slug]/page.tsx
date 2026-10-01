"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { initialProducts, initialCategories } from "@/data/initialData";
import { formatFcfa } from "@/lib/storage";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/common/ProductCard";
import {
  ChevronRight,
  Plus,
  Minus,
  Check,
  MessageCircle,
  PackageCheck,
  AlertCircle,
  Copy,
  Layers,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart } = useCart();

  const product = initialProducts.find((p) => p.slug === slug);

  const [quantite, setQuantite] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const category = initialCategories.find((c) => c.id === product.categoryId);

  const relatedProducts = initialProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantite);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleShareWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Consultez ce produit chez Qualimat SARL (${product.nom}) : ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Fil d'ariane */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-brand-900">Accueil</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/catalogue" className="hover:text-brand-900">Catalogue</Link>
        {category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href={`/catalogue/${category.slug}`} className="hover:text-brand-900">
              {category.nom}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900 truncate max-w-[200px]">
          {product.nom}
        </span>
      </nav>

      {/* Fiche Produit Principale */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Galerie Photos (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.nom}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.vedette && (
                  <span className="bg-brand-900 text-white text-xs font-bold px-2.5 py-0.5 rounded shadow-sm">
                    Phare
                  </span>
                )}
                {product.enStock ? (
                  <span className="bg-emerald-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>En stock</span>
                  </span>
                ) : (
                  <span className="bg-amber-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Sur commande</span>
                  </span>
                )}
              </div>
            </div>

            {/* Miniatures si multiples images */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx ? "border-brand-900" : "border-slate-200 opacity-70"
                    }`}
                  >
                    <Image src={img} alt={`Photo ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations & Ajout au devis (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Marques & Référence */}
              <div className="flex items-center gap-3 text-xs mb-2">
                <span className="bg-brand-50 text-brand-900 font-bold uppercase px-2.5 py-0.5 rounded">
                  {product.marque || "Qualimat"}
                </span>
                {product.reference && (
                  <span className="font-mono text-slate-500 font-medium">
                    Réf : {product.reference}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 leading-snug">
                {product.nom}
              </h1>

              {/* Bloc Prix */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs text-slate-500 font-medium uppercase block">
                    Prix unitaire indicatif
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none mt-1">
                    {product.modePrix === "sur_devis" || !product.prixFcfa ? (
                      <span className="text-brand-900 font-bold">Sur devis</span>
                    ) : (
                      <span>{formatFcfa(product.prixFcfa)}</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-600 mt-1 block">
                    Unité : <strong className="text-slate-900">{product.unite}</strong>
                  </span>
                </div>

                <div className="text-right text-xs text-slate-500">
                  <p className="font-semibold text-slate-700">Tarif direct magasin</p>
                  <p className="text-[11px]">Remises quantitatives pour chantiers & entreprises</p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="font-heading font-bold text-sm text-slate-900 mb-2">
                  Description & Spécifications
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Spécifications techniques */}
              {product.ficheTechnique && (
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <h3 className="font-heading font-bold text-sm text-slate-900 mb-3">
                    Fiche Technique
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.ficheTechnique).map(([cle, val]) => (
                      <div key={cle} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex justify-between">
                        <span className="text-slate-500 font-medium">{cle} :</span>
                        <span className="text-slate-900 font-semibold text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions : Quantité et Bouton Ajout Liste */}
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Sélecteur de quantité */}
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white shrink-0 h-12">
                  <button
                    onClick={() => setQuantite((prev) => Math.max(1, prev - 1))}
                    className="w-12 h-full flex items-center justify-center hover:bg-slate-100 text-slate-600"
                    aria-label="Diminuer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantite}
                    onChange={(e) => setQuantite(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-full text-center font-bold text-sm focus:outline-none bg-transparent text-slate-900"
                  />
                  <button
                    onClick={() => setQuantite((prev) => prev + 1)}
                    className="w-12 h-full flex items-center justify-center hover:bg-slate-100 text-slate-600"
                    aria-label="Augmenter"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Bouton Ajout Devis */}
                <button
                  onClick={handleAddToCart}
                  className={`btn-touch flex-1 rounded-lg font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-sm transition active:scale-95 h-12 ${
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-brand-900 hover:bg-brand-800 text-white"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Ajouté à votre liste !</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Ajouter à ma liste de devis ({quantite} {product.unite})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Boutons Partage & Raccourcis */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500 flex-wrap gap-2">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleShareWhatsApp}
                    className="inline-flex items-center gap-1.5 text-emerald-700 hover:underline font-semibold"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Partager sur WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? "Lien copié !" : "Copier le lien"}</span>
                  </button>
                </div>

                <Link
                  href="/ma-liste"
                  className="font-semibold text-brand-900 hover:underline inline-flex items-center gap-1"
                >
                  <span>Voir ma liste de devis en cours</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produits recommandés */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <div className="border-b border-slate-200 pb-3 mb-6">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              Matériaux Complémentaires Recommandés
            </h2>
            <p className="text-xs text-slate-500">
              Fréquemment commandés ensemble pour les mêmes étapes de chantier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
