"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { notFound, useParams } from "next/navigation";
import { initialProducts, initialCategories, initialSettings } from "@/data/initialData";
import { formatFcfa } from "@/lib/storage";
import ProductCard from "@/components/common/ProductCard";
import {
  ChevronRight,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
  Sparkles,
  Share2,
  FileCheck,
  Building2,
  Check,
  Copy,
  Layers,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = initialProducts.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "tech" | "livraison">("desc");

  if (!product) {
    notFound();
  }

  const category = initialCategories.find(
    (c) => c.id === product.categoryId || c.slug === product.categoryId
  );

  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  const relatedProducts = initialProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleShareWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Consultez ce matériau chez QUALITMAT SARL (${product.nom}) : ${url}`;
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
    : ["/images/products/placeholder.jpg"];

  const whatsappMessage = encodeURIComponent(
    `Bonjour QUALITMAT SARL, je souhaite demander une cotation pour ce matériau : ${product.nom} (Réf: ${product.reference || product.id}). Quelles sont les conditions et délais de livraison sur mon chantier ?`
  );
  const whatsappUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Fil d'Ariane Vitrine */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-primary-600 transition">Accueil</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link href="/catalogue" className="hover:text-primary-600 transition">Nos Matériaux</Link>
        {category && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href={`/catalogue?cat=${category.slug}`} className="hover:text-primary-600 transition">
              {category.nom}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-900 font-bold truncate">{product.nom}</span>
      </nav>

      {/* Bloc Présentation Principale Fiche Vitrine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Galerie d'Images Showroom */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl bg-white border-2 border-slate-200 overflow-hidden shadow-sm">
            <SafeImage
              src={images[selectedImage]}
              alt={product.nom}
              categorySlug={product.categoryId}
              fill
              className="object-cover"
            />
            {product.enStock && (
              <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Disponible en stock magasin</span>
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition ${
                    selectedImage === idx
                      ? "border-primary-600 shadow-md scale-95"
                      : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt={`${product.nom} photo ${idx + 1}`}
                    categorySlug={product.categoryId}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Détails & Cotation Immédiate */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-primary-600 uppercase tracking-wider bg-primary-50 border border-primary-200 px-3 py-1 rounded-full">
                {product.categoryName || "Gamme BTP"}
              </span>
              {product.marque && (
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  Marque : {product.marque}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900 leading-tight">
              {product.nom}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Bloc Tarif Indicatif & Conditionnement */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
                  Tarif indicatif au comptoir :
                </span>
                <span className="text-2xl sm:text-3xl font-heading font-black text-primary-600">
                  {product.prixFcfa && product.prixFcfa > 0 ? formatFcfa(product.prixFcfa) : "Sur cotation"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Unité de vente :</span>
                <span className="text-sm font-bold text-slate-900">
                  {product.unite || "À l'unité"}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
              <span>* Tarifs dégressifs pour chantiers et commandes par camions.</span>
              {product.unite && (
                <span className="font-semibold text-slate-700">
                  Cond. : {product.unite}
                </span>
              )}
            </div>
          </div>

          {/* Boutons d'Action Vitrine Directe */}
          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition active:scale-95 text-center"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Demander un Devis Immédiat sur WhatsApp</span>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${cleanPhone}`}
                className="py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition text-center"
              >
                <Phone className="w-4 h-4 text-primary-600" />
                <span>Appeler : 01 96 53 84 55</span>
              </a>

              <Link
                href="/contact"
                className="btn-solar py-3.5 px-4 rounded-xl text-dark-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition text-center"
              >
                <FileCheck className="w-4 h-4" />
                <span>Formulaire de devis</span>
              </Link>
            </div>
          </div>

          {/* Piliers de Réassurance Chantier */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 text-xs">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
              <Truck className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Livraison Chantier</span>
                <span className="text-[11px] text-slate-500">Sous 24h à 48h dans l'Atlantique</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Certifié & Conforme</span>
                <span className="text-[11px] text-slate-500">Origine usines agréées Bénin</span>
              </div>
            </div>
          </div>

          {/* Partage */}
          <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
            <span>Partager ce matériau :</span>
            <button
              onClick={handleShareWhatsApp}
              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
              title="Partager sur WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              title="Copier le lien de la page"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Onglets Techniques & Pratiques */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex border-b border-slate-200 gap-4 sm:gap-8 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("desc")}
            className={`pb-3 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition border-b-2 whitespace-nowrap ${
              activeTab === "desc"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Description & Usages
          </button>
          <button
            onClick={() => setActiveTab("tech")}
            className={`pb-3 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition border-b-2 whitespace-nowrap ${
              activeTab === "tech"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Spécifications Techniques
          </button>
          <button
            onClick={() => setActiveTab("livraison")}
            className={`pb-3 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition border-b-2 whitespace-nowrap ${
              activeTab === "livraison"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Livraison & Logistique
          </button>
        </div>

        {activeTab === "desc" && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            <p>{product.description}</p>
            <p>
              Ce matériau répond aux exigences des chantiers modernes en République du Bénin. Qu&apos;il s&apos;agisse d&apos;une construction individuelle, d&apos;un bâtiment à étages ou de travaux de réhabilitation, nos approvisionnements garantissent sécurité et longévité à vos ouvrages.
            </p>
          </div>
        )}

        {activeTab === "tech" && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-400 block">Désignation complète</span>
                <span className="font-bold text-slate-900">{product.nom}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-400 block">Conditionnement standard</span>
                <span className="font-bold text-slate-900">{product.unite || "Standard BTP"}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-400 block">Catégorie</span>
                <span className="font-bold text-slate-900">{product.categoryName}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-400 block">Disponibilité magasin</span>
                <span className="font-bold text-emerald-600">En stock au magasin de Tankpè</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "livraison" && (
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed">
            <p>
              <strong>Zones de livraison :</strong> Abomey-Calavi (Tankpè, Allègléta, Ouèdo, Akassato, Zopah, Arconville), Cotonou, Godomey, Ouidah et communes environnantes.
            </p>
            <p>
              <strong>Flotte disponible :</strong> Bennes à agrégats, camions plateaux pour fers et palettes de ciment, tricycles de dépannage rapide pour petits réassorts de chantier.
            </p>
          </div>
        )}
      </div>

      {/* Matériaux Recommandés & Complémentaires */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900">
              Matériaux associés pour ce type de chantier
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Complétez vos approvisionnements avec ces références disponibles dans nos stocks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
