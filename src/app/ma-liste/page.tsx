"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { useCart } from "@/context/CartContext";
import { formatFcfa, buildWhatsAppQuoteUrl, recordQuoteRequest } from "@/lib/storage";
import { initialSettings } from "@/data/initialData";
import {
  ClipboardList,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  User,
  MapPin,
  Phone,
  AlertCircle,
  Copy,
  Check,
  ArrowLeft,
} from "lucide-react";

export default function MaListePage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalItems, totalEstimatedFcfa, hasSurDevisItems } = useCart();

  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [quartier, setQuartier] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { url, isTooLong, rawText } = buildWhatsAppQuoteUrl(
    items,
    initialSettings.whatsappNumber,
    nom,
    quartier,
    telephone
  );

  const handleSendWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    recordQuoteRequest({
      id: "quote-" + Date.now(),
      nom: nom.trim() || undefined,
      telephone: telephone.trim() || undefined,
      quartier: quartier.trim() || undefined,
      items: items.map((i) => ({
        productId: i.product.id,
        nom: i.product.nom,
        unite: i.product.unite,
        quantite: i.quantite,
        prixUnitaire: i.product.prixFcfa,
      })),
      totalEstime: totalEstimatedFcfa,
      source: "whatsapp",
      statut: "nouveau",
      createdAt: new Date().toISOString(),
    });

    window.open(url, "_blank");
    setIsSubmitting(false);
  };

  const handleCopyText = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-16 px-4 max-w-3xl mx-auto text-center">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-900">
            <ClipboardList className="w-8 h-8" />
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mb-2">
            Votre liste de devis est vide
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
            Parcourez notre catalogue et ajoutez vos matériaux (ciment, fer, tuyaux PVC, câbles, peinture) pour obtenir une estimation immédiate par WhatsApp.
          </p>

          <Link
            href="/catalogue"
            className="btn-touch inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs px-6 py-3 rounded-lg shadow-sm transition active:scale-95"
          >
            <span>Parcourir le catalogue Qualimat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="border-b border-slate-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-900 hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continuer mes sélections</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900">
            Ma Liste de Devis Matériaux
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Vérifiez vos quantités avant d&apos;envoyer votre demande directement sur le WhatsApp officiel de Qualimat SARL.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1.5 self-start md:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          <span>Vider la liste</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Colonne Gauche : Tableau des articles (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700 uppercase">
              <span>Articles sélectionnés ({totalItems})</span>
              <span className="text-brand-900">Prix unitaire indicatif</span>
            </div>

            <div className="divide-y divide-slate-100">
              {items.map(({ product, quantite }) => (
                <div key={product.id} className="p-4 sm:p-5 flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <SafeImage
                      src={product.images?.[0]}
                      alt={product.nom}
                      categorySlug={product.categoryId}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-brand-900 font-bold uppercase">
                      {product.marque || "Qualimat"}
                    </div>
                    <Link
                      href={`/produit/${product.slug}`}
                      className="font-heading font-bold text-sm text-slate-900 hover:text-brand-900 truncate block"
                    >
                      {product.nom}
                    </Link>
                    <div className="text-xs text-slate-500">
                      Unité : <span className="font-medium text-slate-700">{product.unite}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-1 sm:hidden">
                      {product.prixFcfa ? formatFcfa(product.prixFcfa * quantite) : "Sur devis"}
                    </div>
                  </div>

                  {/* Contrôle Quantité */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shrink-0">
                    <button
                      onClick={() => updateQuantity(product.id, quantite - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-slate-600"
                      aria-label="Diminuer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-xs text-slate-900">
                      {quantite}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantite + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-slate-600"
                      aria-label="Augmenter"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total ligne */}
                  <div className="hidden sm:block text-right w-28 shrink-0">
                    <div className="text-sm font-bold text-slate-900">
                      {product.prixFcfa ? (
                        formatFcfa(product.prixFcfa * quantite)
                      ) : (
                        <span className="text-brand-900 font-semibold text-xs">Sur devis</span>
                      )}
                    </div>
                    {product.prixFcfa && quantite > 1 && (
                      <div className="text-[10px] text-slate-400">
                        {formatFcfa(product.prixFcfa)} / u
                      </div>
                    )}
                  </div>

                  {/* Supprimer */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 transition"
                    title="Retirer de la liste"
                    aria-label={`Supprimer ${product.nom}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3 text-xs text-slate-600 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong>Précision commerciale :</strong> Les tarifs affichés sont des prix indicatifs magasin à Abomey-Calavi. Notre équipe commerciale confirmera la disponibilité immédiate en stock et les conditions de livraison sur votre chantier.
            </p>
          </div>
        </div>

        {/* Colonne Droite : Formulaire & Envoi WhatsApp (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-7">
            <h2 className="font-heading font-bold text-xl text-slate-900 mb-1">
              Finaliser ma Demande de Devis
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Renseignez vos coordonnées (facultatives) pour recevoir votre chiffrage sans délai.
            </p>

            {/* Formulaire léger */}
            <div className="space-y-4 mb-6 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-900" />
                  <span>Votre Nom / Société (facultatif)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex : M. Dossou / Entreprise BTP"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-900" />
                  <span>Téléphone de contact (facultatif)</span>
                </label>
                <input
                  type="tel"
                  placeholder="Ex : +229 97 00 00 00"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-900" />
                  <span>Quartier / Chantier (facultatif)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex : Tankpè, Allègléta, Godomey, Calavi Centre, Zoundja..."
                  value={quartier}
                  onChange={(e) => setQuartier(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>
            </div>

            {/* Total estimatif corporate */}
            <div className="bg-brand-900 text-white p-5 rounded-xl mb-6 shadow-sm border border-brand-800">
              <div className="flex items-center justify-between text-xs text-slate-200 pb-2.5 border-b border-brand-800">
                <span>Total des articles :</span>
                <span className="font-bold text-white">{totalItems} unité(s)</span>
              </div>
              <div className="flex items-center justify-between pt-3">
                <span className="text-xs font-semibold uppercase text-slate-300">Montant indicatif :</span>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-heading font-extrabold text-amber-400">
                    {formatFcfa(totalEstimatedFcfa)}
                  </div>
                  {hasSurDevisItems && (
                    <span className="text-[10px] text-amber-300 block mt-0.5">
                      * Dont articles avec calcul sur devis
                    </span>
                  )}
                </div>
              </div>
            </div>

            {isTooLong && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Votre liste est très complète. Si WhatsApp ne s&apos;ouvre pas directement, utilisez le bouton &laquo; Copier le texte &raquo;.
                </p>
              </div>
            )}

            {/* Bouton Envoi WhatsApp */}
            <button
              onClick={handleSendWhatsApp}
              disabled={isSubmitting}
              className="w-full btn-touch bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg shadow-md flex items-center justify-center gap-2.5 transition active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Envoyer ma liste sur WhatsApp</span>
            </button>

            {/* Bouton Copier */}
            <button
              onClick={handleCopyText}
              className="mt-3 w-full btn-touch bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Texte copié dans le presse-papier !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span>Copier le texte du message</span>
                </>
              )}
            </button>

            {/* Aperçu du message modèle */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                Aperçu du message formaté (Section 5.3) :
              </span>
              <pre className="bg-slate-50 p-3 rounded-lg text-[11px] text-slate-700 whitespace-pre-wrap font-sans border border-slate-200 max-h-36 overflow-y-auto">
                {rawText}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
