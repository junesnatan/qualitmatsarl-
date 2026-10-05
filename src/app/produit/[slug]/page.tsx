"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
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
  MessageCircle,
  PackageCheck,
  AlertCircle,
  Copy,
  Layers,
  ShieldCheck,
  Truck,
  Sparkles,
  Share2,
  Clock,
  RotateCcw,
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
  const [activeTab, setActiveTab] = useState<"desc" | "tech" | "livraison">("desc");

  if (!product) {
    notFound();
  }

  const category = initialCategories.find(
    (c) => c.id === product.categoryId || c.slug === product.categoryId
  );

  const existingInCart = items.find((i) => i.product.id === product.id);

  // Produits complémentaires contextuels
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
    const text = `Consultez ce matériau chez QUALITMATSARL (${product.nom}) : ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const images = product.images?.length
    ? product.images
    : ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto pb-28 sm:pb-12">
      {/* Fil d'ariane enrichi */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-brand-900 transition">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/catalogue" className="hover:text-brand-900 transition">
          Catalogue
        </Link>
        {category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              href={`/catalogue?cat=${category.slug}`}
              className="hover:text-brand-900 transition"
            >
              {category.nom}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900 truncate max-w-[220px]">
          {product.nom}
        </span>
      </nav>

      {/* Fiche Produit Principale */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Galerie Photos avec miniatures et zoom (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 group shadow-inner">
              <SafeImage
                src={images[selectedImage] || images[0]}
                alt={product.nom}
                categorySlug={product.categoryId}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                priority
              />

              {product.vedette && (
                <span className="absolute top-3 left-3 bg-brand-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                  Phare Chantier
                </span>
              )}
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                      selectedImage === idx
                        ? "border-brand-900 shadow-sm"
                        : "border-slate-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <SafeImage
                      src={img}
                      alt={`${product.nom} miniature ${idx + 1}`}
                      categorySlug={product.categoryId}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonne Informations & Ajout au devis (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Marque & Réf */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-extrabold text-brand-900 uppercase tracking-wider bg-brand-50 px-2.5 py-0.5 rounded">
                  {product.marque || "QUALITMATSARL"}
                </span>
                {product.reference && (
                  <span className="font-mono text-slate-400">
                    Réf : {product.reference}
                  </span>
                )}
              </div>

              {/* Titre */}
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 leading-tight">
                {product.nom}
              </h1>

              {/* Bloc Clé : Prix, Stock, Unité, Délai */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">
                    Tarif Indicatif Unitaire
                  </div>
                  <div className="text-2xl font-black text-brand-900 leading-none mt-1">
                    {product.modePrix === "sur_devis" || !product.prixFcfa ? (
                      <span className="text-lg font-bold text-brand-900">Sur devis</span>
                    ) : (
                      formatFcfa(product.prixFcfa)
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Conditionnement : <strong className="text-slate-800">{product.unite}</strong>
                  </div>
                </div>

                <div className="space-y-1.5 text-right">
                  <div>
                    {product.enStock ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
                        <PackageCheck className="w-4 h-4 text-emerald-600" />
                        En stock au dépôt
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        Disponible sous 24-48h
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-end gap-1">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Livraison chantier Calavi / Cotonou</span>
                  </div>
                </div>
              </div>

              {/* Description courte introductive */}
              <p className="mt-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Sélecteur de Quantité & Actions d'Ajout */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Stepper Quantité */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Quantité :</span>
                  <div className="inline-flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-xs">
                    <button
                      onClick={() => setQuantite((q) => Math.max(1, q - 1))}
                      className="p-2.5 text-slate-600 hover:bg-slate-100 transition active:scale-95"
                      aria-label="Diminuer la quantité"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-mono font-bold text-sm text-slate-900 min-w-[3rem] text-center">
                      {quantite}
                    </span>
                    <button
                      onClick={() => setQuantite((q) => q + 1)}
                      className="p-2.5 text-slate-600 hover:bg-slate-100 transition active:scale-95"
                      aria-label="Augmenter la quantité"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bouton Principal : Ajouter au devis */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 btn-touch py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95 shadow-md ${
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-brand-900 hover:bg-brand-800 text-white"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Ajouté à votre liste de devis !</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Ajouter à ma liste de devis</span>
                    </>
                  )}
                </button>
              </div>

              {/* Boutons secondaires : Partage WhatsApp & Copier lien */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={handleShareWhatsApp}
                  className="btn-touch px-4 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Partager sur WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="btn-touch px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Lien copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copier le lien</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Système d'Onglets : Description / Fiche Technique / Livraison */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex border-b border-slate-200 gap-6 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab("desc")}
              className={`pb-3 border-b-2 transition ${
                activeTab === "desc"
                  ? "border-brand-900 text-brand-900 font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Description & Usage
            </button>
            <button
              onClick={() => setActiveTab("tech")}
              className={`pb-3 border-b-2 transition ${
                activeTab === "tech"
                  ? "border-brand-900 text-brand-900 font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Caractéristiques Techniques
            </button>
            <button
              onClick={() => setActiveTab("livraison")}
              className={`pb-3 border-b-2 transition ${
                activeTab === "livraison"
                  ? "border-brand-900 text-brand-900 font-extrabold"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Livraison & Manutention
            </button>
          </div>

          <div className="py-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {activeTab === "desc" && (
              <div className="space-y-3">
                <p>{product.description}</p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                  <div className="font-bold text-slate-900">Conseil d&apos;expert chantier :</div>
                  <p className="text-slate-600">
                    Pour garantir la performance de ce matériau, veillez à respecter les conditions de stockage (à l&apos;abri de l&apos;humidité pour le ciment et les aciers) et les ratios de dosage indiqués dans notre calculateur de matériaux.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "tech" && (
              <div className="space-y-4">
                {product.ficheTechnique ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(product.ficheTechnique).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between"
                      >
                        <span className="font-semibold text-slate-500">{key}</span>
                        <span className="font-bold text-slate-900 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">
                    Fiche technique conforme aux normes en vigueur pour la référence {product.reference || product.nom}. Contactez-nous pour la fiche de données de sécurité.
                  </p>
                )}
              </div>
            )}

            {activeTab === "livraison" && (
              <div className="space-y-3">
                <p>
                  <strong>Enlèvement magasin :</strong> Disponible immédiatement à notre dépôt situé à <strong>Allègléta / Pavé de Tankpè</strong> (Abomey-Calavi).
                </p>
                <p>
                  <strong>Livraison sur chantier :</strong> Assurée par camion benne (pour sable, gravier, ciment) ou camion plateau (pour fers à béton de 12 m). Déchargement au pied d&apos;œuvre possible selon accès camion.
                </p>
                <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Assurance transport et contrôle qualitatif avant déchargement.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section Produits complémentaires (Cross-Sell BTP) */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Compléments de chantier</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                Matériaux Souvent Associés
              </h2>
            </div>
            <Link
              href={`/catalogue?cat=${category?.slug || ""}`}
              className="text-xs font-bold text-brand-900 hover:underline"
            >
              Voir la catégorie →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Barre Sticky Mobile en Bas d'Écran */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden shadow-2xl flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-bold">Prix unitaire</div>
          <div className="text-sm font-extrabold text-brand-900">
            {product.prixFcfa ? formatFcfa(product.prixFcfa) : "Sur devis"}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`btn-touch px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-md ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-brand-900 text-white"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Ajouté !</span>
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
  );
}
