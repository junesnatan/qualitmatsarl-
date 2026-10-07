"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { useCart } from "@/context/CartContext";
import { formatFcfa, recordQuoteRequest } from "@/lib/storage";
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
  Eye,
  X,
  Send,
  Sparkles,
} from "lucide-react";

export default function MaListePage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalEstimatedFcfa,
    hasSurDevisItems,
  } = useCart();

  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [quartier, setQuartier] = useState("");
  const [noteLibre, setNoteLibre] = useState("");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Construction du message WhatsApp formatté avec émojis et clarté
  const generateFormattedMessage = () => {
    let msg = `🛒 *DEMANDE DE DEVIS OFFICIEL — QUALITMATSARL*\n`;
    msg += `------------------------------------\n`;
    if (nom.trim()) msg += `👤 *Client :* ${nom.trim()}\n`;
    if (telephone.trim()) msg += `📞 *Téléphone :* ${telephone.trim()}\n`;
    if (quartier.trim()) msg += `📍 *Chantier / Quartier :* ${quartier.trim()}\n`;
    msg += `------------------------------------\n`;
    msg += `📋 *LISTE DES MATÉRIAUX :*\n\n`;

    items.forEach((item, index) => {
      const p = item.product;
      const subtotal =
        p.prixFcfa && p.modePrix === "affiche"
          ? ` (${formatFcfa(p.prixFcfa * item.quantite)})`
          : " (Sur devis)";
      msg += `${index + 1}. *${p.nom}*\n`;
      msg += `   └ Quantité : ${item.quantite} ${p.unite}${subtotal}\n`;
    });

    msg += `\n------------------------------------\n`;
    msg += `💰 *Total estimé des articles chiffrés :* ${formatFcfa(totalEstimatedFcfa)}\n`;
    if (hasSurDevisItems) {
      msg += `ℹ️ *Note :* Certains articles nécessitent un calcul de cubage ou transport spécifique.\n`;
    }
    if (noteLibre.trim()) {
      msg += `📝 *Remarque client :* ${noteLibre.trim()}\n`;
    }
    msg += `------------------------------------\n`;
    msg += `🚀 _Envoyé depuis www.qualitmatsarl.bj (Allègléta / Tankpè, Calavi)_`;

    return msg;
  };

  const formattedMessage = generateFormattedMessage();
  const whatsappUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
    formattedMessage
  )}`;

  const handleOpenPreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setPreviewModalOpen(true);
  };

  const handleConfirmSendWhatsApp = () => {
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

    window.open(whatsappUrl, "_blank");
    setIsSubmitting(false);
    setPreviewModalOpen(false);
  };

  const handleCopyText = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // État Devis Vide Soigné
  if (items.length === 0) {
    return (
      <div className="py-16 px-4 max-w-3xl mx-auto text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 shadow-xl">
          <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-inner border border-primary-200">
            <ClipboardList className="w-10 h-10 text-primary-600" />
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 mb-3">
            Votre Liste de Devis est Actuellement Vide
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
            Parcourez notre catalogue et ajoutez vos matériaux (ciments, fers à béton, carrelage, tuyauterie PVC, câbles électriques, peinture) ou utilisez notre calculateur de chantier pour composer votre liste en 1 clic.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/catalogue"
              className="w-full sm:w-auto btn-touch inline-flex items-center justify-center gap-2 btn-red text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-primary-600/25 transition active:scale-95"
            >
              <span>Parcourir le Catalogue</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>

            <Link
              href="/calculateur"
              className="w-full sm:w-auto btn-touch inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition border border-slate-200"
            >
              <span>Calculer mes besoins de chantier</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="mb-8 pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-primary-600 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <ClipboardList className="w-4 h-4 text-primary-600" />
            <span>Panier & Cotation Express</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900">
            Ma Liste de Devis Matériaux ({totalItems} article{totalItems > 1 ? "s" : ""})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 self-start sm:self-auto transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Vider toute la liste</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Colonne Gauche : Liste des Articles (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            {items.map((item) => {
              const product = item.product;
              const hasPrice = product.prixFcfa && product.modePrix === "affiche";
              const subtotal = hasPrice ? product.prixFcfa! * item.quantite : null;

              return (
                <div
                  key={product.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition"
                >
                  {/* Miniature & Titre */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <SafeImage
                        src={product.images?.[0]}
                        alt={product.nom}
                        categorySlug={product.categoryId}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-primary-600 bg-primary-50 px-2 py-0.2 rounded">
                        {product.categoryName || "Matériau"}
                      </span>
                      <Link
                        href={`/produit/${product.slug}`}
                        className="block font-heading font-extrabold text-xs sm:text-sm text-slate-900 hover:text-primary-600 transition-colors line-clamp-1 mt-0.5"
                      >
                        {product.nom}
                      </Link>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Prix unit. :{" "}
                        <strong>
                          {hasPrice ? formatFcfa(product.prixFcfa) : "Sur devis"}
                        </strong>{" "}
                        / {product.unite}
                      </div>
                    </div>
                  </div>

                  {/* Contrôles Quantité & Sous-total */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Stepper Quantité */}
                    <div className="inline-flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shadow-xs">
                      <button
                        onClick={() => updateQuantity(product.id, item.quantite - 1)}
                        className="p-2 text-slate-600 hover:bg-slate-100 transition active:scale-95"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 font-mono font-bold text-xs text-slate-900 min-w-[2.5rem] text-center">
                        {item.quantite}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, item.quantite + 1)}
                        className="p-2 text-slate-600 hover:bg-slate-100 transition active:scale-95"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Sous-total */}
                    <div className="text-right min-w-[5.5rem]">
                      <div className="text-[10px] text-slate-400 uppercase font-medium">
                        Sous-total
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-primary-600">
                        {subtotal !== null ? formatFcfa(subtotal) : "Sur devis"}
                      </div>
                    </div>

                    {/* Bouton Supprimer */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      title="Retirer de la liste"
                      aria-label="Retirer de la liste"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
            <Link
              href="/catalogue"
              className="text-primary-600 font-bold hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continuer vos achats</span>
            </Link>
            <span>Devis garanti sans engagement</span>
          </div>
        </div>

        {/* Colonne Droite : Récapitulatif & Prévisualisation (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6 sticky top-24">
          <div>
            <h2 className="font-heading font-extrabold text-lg text-slate-900 mb-1">
              Récapitulatif de la Cotation
            </h2>
            <p className="text-xs text-slate-500">
              Renseignez vos coordonnées facultatives pour personnaliser votre devis.
            </p>
          </div>

          {/* Formulaire Client Rapide */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Votre nom ou raison sociale (optionnel)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex : M. Paul Dossou / Entreprise BTP"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 pl-9 text-xs font-medium text-slate-900 focus:outline-none focus:border-primary-600"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Numéro de téléphone (optionnel)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Ex : +229 97 00 00 00"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 pl-9 text-xs font-medium text-slate-900 focus:outline-none focus:border-primary-600"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Quartier / Emplacement du chantier
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex : Allègléta, Tankpè, Arconville, Calavi..."
                  value={quartier}
                  onChange={(e) => setQuartier(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 pl-9 text-xs font-medium text-slate-900 focus:outline-none focus:border-primary-600"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Note libre / Instructions de livraison
              </label>
              <textarea
                rows={2}
                placeholder="Ex : Livraison urgente avant vendredi, besoin de camion benne..."
                value={noteLibre}
                onChange={(e) => setNoteLibre(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-primary-600 resize-none"
              />
            </div>
          </div>

          {/* Totaux & Chiffrage */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Articles au devis :</span>
              <span className="font-bold">{totalItems} unité(s)</span>
            </div>

            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-100">
              <span>Total chiffré estimé :</span>
              <span className="text-primary-600 font-mono text-xl font-black">
                {formatFcfa(totalEstimatedFcfa)}
              </span>
            </div>

            {hasSurDevisItems && (
              <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 p-2 rounded-xl">
                Certains matériaux (agrégats, transport) seront chiffrés sur mesure par notre conseiller WhatsApp.
              </p>
            )}
          </div>

          {/* Bouton d'Aperçu WhatsApp (Nouveau Fort Impact) */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleOpenPreview}
              className="w-full btn-touch py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
              style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>Aperçu avant envoi WhatsApp</span>
            </button>

            <p className="text-[10px] text-slate-400 text-center">
              Vérifiez le message préformaté avant son ouverture dans WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* MODAL DE PRÉVISUALISATION WHATSAPP AVANT ENVOI */}
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setPreviewModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-scale-up">
            {/* Barre de titre style WhatsApp */}
            <div
              className="p-4 text-white flex items-center justify-between"
              style={{ backgroundColor: "#075E54" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  💬
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm text-white">
                    Aperçu du Devis WhatsApp
                  </h3>
                  <p className="text-[10px] text-white/80">
                    Destinataire : QUALITMATSARL (+229 96 53 84 55)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setPreviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bulle de Message Prévisualisée */}
            <div className="p-5 bg-slate-100 max-h-[55vh] overflow-y-auto">
              <div className="bg-[#DCF8C6] border border-emerald-200 rounded-2xl p-4 text-slate-800 text-xs shadow-sm font-sans whitespace-pre-wrap leading-relaxed">
                {formattedMessage}
              </div>
            </div>

            {/* Actions de validation */}
            <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleCopyText}
                className="w-full sm:w-auto btn-touch px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Texte copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Copier le texte</span>
                  </>
                )}
              </button>

              <button
                onClick={handleConfirmSendWhatsApp}
                disabled={isSubmitting}
                className="w-full sm:flex-1 btn-touch py-3 px-4 rounded-xl text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                style={{ backgroundColor: "#25D366" }}
              >
                <Send className="w-4 h-4" />
                <span>Confirmer & Ouvrir WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
