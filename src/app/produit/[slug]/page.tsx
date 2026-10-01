"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { initialProducts, initialCategories, initialSettings } from "@/data/initialData";
import { formatFcfa } from "@/lib/storage";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/common/ProductCard";
import {
  ChevronRight,
  Plus,
  Minus,
  Check,
  Share2,
  MessageCircle,
  Truck,
  ShieldCheck,
  ArrowLeft,
  PackageCheck,
  AlertCircle,
  Copy,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart, items } = useCart();

  const product = initialProducts.find((p) => p.slug === slug);

  const [quantite, setQuantite] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const category = initialCategories.find((c) => c.id === product.categoryId);

  // Produits liés (même catégorie, sauf lui-même)
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
    const text = `Regarde ce produit chez Qualimat SARL (${product.nom}) : ${url}`;
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
      <nav className="flex items-center gap-2 text-xs text-acier-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-bleu">Accueil</Link>
        <ChevronRight className="w-3.5 h-3.5 text-acier-400" />
        <Link href="/catalogue" className="hover:text-bleu">Catalogue</Link>
        {category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-acier-400" />
            <Link href={`/catalogue/${category.slug}`} className="hover:text-bleu">
              {category.nom}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-acier-400" />
        <span className="font-bold text-acier truncate max-w-[200px] uppercase">
          {product.nom}
        </span>
      </nav>

      {/* Fiche Produit Principale */}
      <div className="bg-white rounded-2xl border border-beton-dark shadow-sm overflow-hidden p-6 sm:p-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Galerie Photos (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden bg-acier-100 border border-beton-dark shadow-inner">
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
                  <span className="bg-jaune text-acier-950 text-xs font-black uppercase px-2.5 py-0.5 rounded shadow">
                    Phare
                  </span>
                )}
                {product.enStock ? (
                  <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow flex items-center gap-1">
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>En stock</span>
                  </span>
                ) : (
                  <span className="bg-amber-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow flex items-center gap-1">
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
                      selectedImage === idx ? "border-jaune" : "border-beton-dark opacity-70"
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
                <span className="bg-bleu/10 text-bleu font-black uppercase px-2.5 py-1 rounded tracking-wider">
                  {product.marque || "Qualimat"}
                </span>
                {product.reference && (
                  <span className="font-mono text-acier-500 font-semibold">
                    Réf : {product.reference}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-acier uppercase leading-tight">
                {product.nom}
              </h1>

              {/* Bloc Prix */}
              <div className="mt-4 p-4 rounded-xl bg-beton-light border border-beton flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs text-acier-500 font-bold uppercase block">
                    Prix unitaire indicatif
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-acier leading-none mt-1">
                    {product.modePrix === "sur_devis" || !product.prixFcfa ? (
                      <span className="text-bleu font-black">SUR DEVIS</span>
                    ) : (
                      <span className="text-acier">{formatFcfa(product.prixFcfa)}</span>
                    )}
                  </div>
                  <span className="text-xs text-acier-600 mt-1 block">
                    Unité de vente : <strong className="text-acier font-bold">{product.unite}</strong>
                  </span>
                </div>

                <div className="text-right text-xs text-acier-500">
                  <p className="font-semibold text-acier-700">Prix direct magasin</p>
                  <p className="text-[11px]">Tarifs dégressifs pour chantiers et gros volumes</p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="font-heading font-bold text-sm uppercase text-acier mb-2">
                  Description & Usages
                </h3>
                <p className="text-xs sm:text-sm text-acier-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Spécifications techniques */}
              {product.ficheTechnique && (
                <div className="mt-6 pt-4 border-t border-beton">
                  <h3 className="font-heading font-bold text-sm uppercase text-acier mb-3">
                    Spécifications techniques
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.ficheTechnique).map(([cle, val]) => (
                      <div key={cle} className="bg-white p-2.5 rounded border border-beton flex justify-between">
                        <span className="text-acier-500 font-semibold">{cle} :</span>
                        <span className="text-acier-900 font-bold text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions : Quantité et Bouton Ajout Liste */}
            <div className="mt-8 pt-6 border-t border-beton space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Sélecteur de quantité */}
                <div className="flex items-center border border-acier-300 rounded-lg overflow-hidden bg-white shrink-0 h-12">
                  <button
                    onClick={() => setQuantite((prev) => Math.max(1, prev - 1))}
                    className="w-12 h-full flex items-center justify-center hover:bg-acier-100 text-acier-700"
                    aria-label="Diminuer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantite}
                    onChange={(e) => setQuantite(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-full text-center font-bold text-sm focus:outline-none bg-transparent"
                  />
                  <button
                    onClick={() => setQuantite((prev) => prev + 1)}
                    className="w-12 h-full flex items-center justify-center hover:bg-acier-100 text-acier-700"
                    aria-label="Augmenter"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Bouton Ajout Devis */}
                <button
                  onClick={handleAddToCart}
                  className={`btn-touch flex-1 rounded-lg font-black uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95 h-12 ${
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-jaune hover:bg-jaune-hover text-acier-950"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5 stroke-[3]" />
                      <span>Ajouté à ma liste !</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                      <span>Ajouter à ma liste de devis ({quantite} {product.unite})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Boutons Partage & Raccourcis WhatsApp */}
              <div className="flex items-center justify-between pt-2 text-xs text-acier-600 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleShareWhatsApp}
                    className="inline-flex items-center gap-1.5 text-whatsapp hover:underline font-semibold"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Partager sur WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 text-acier-600 hover:text-acier font-semibold"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? "Lien copié !" : "Copier le lien"}</span>
                  </button>
                </div>

                <Link
                  href="/ma-liste"
                  className="font-bold text-bleu hover:underline uppercase tracking-wide"
                >
                  Voir ma liste en cours →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produits liés / Recommandations */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <div className="border-b-2 border-acier-200 pb-3 mb-6">
            <h2 className="text-2xl font-heading font-black text-acier uppercase">
              Matériaux complémentaires recommandés
            </h2>
            <p className="text-xs text-acier-500">
              Souvent commandés ensemble pour les mêmes étapes de chantier.
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
