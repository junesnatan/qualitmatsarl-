"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Building,
  User,
  MapPin,
  Phone,
  AlertCircle,
  Copy,
  Check,
  ArrowLeft,
  PackageOpen,
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

    // Enregistrement préalable pour les statistiques (A-07 / 5.3)
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

    // Ouverture de WhatsApp
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
        <div className="bg-white rounded-2xl border border-beton-dark p-8 sm:p-12 shadow-sm">
          <div className="w-16 h-16 bg-acier-100 rounded-full flex items-center justify-center mx-auto mb-4 text-acier-400">
            <ClipboardList className="w-8 h-8" />
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl text-acier uppercase mb-2">
            Votre liste de devis est vide
          </h1>

          <p className="text-xs sm:text-sm text-acier-600 max-w-md mx-auto mb-8 leading-relaxed">
            Parcourez notre catalogue et ajoutez vos matériaux (ciment, fer, tuyaux PVC, câbles, peinture) pour obtenir un devis WhatsApp immédiat.
          </p>

          <Link
            href="/catalogue"
            className="btn-touch inline-flex items-center gap-2 bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-xs px-6 py-3 rounded tracking-wider shadow-lg transition active:scale-95"
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
      <div className="border-b-2 border-acier-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-bleu hover:underline uppercase tracking-wider mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continuer mes ajouts</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-acier uppercase">
            Ma Liste de Devis Chantier
          </h1>
          <p className="text-xs sm:text-sm text-acier-600 mt-1">
            Vérifiez vos quantités avant d&apos;envoyer votre demande directement sur le WhatsApp officiel de Qualimat SARL.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-800 font-bold uppercase tracking-wider flex items-center gap-1 self-start md:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          <span>Vider la liste</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Colonne Gauche : Tableau / Liste des articles (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-beton-dark shadow-sm overflow-hidden">
            <div className="p-4 bg-acier text-white flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span>Articles sélectionnés ({totalItems})</span>
              <span className="text-jaune">Prix indicatif magasin</span>
            </div>

            <div className="divide-y divide-beton">
              {items.map(({ product, quantite }) => (
                <div key={product.id} className="p-4 sm:p-5 flex items-center gap-4">
                  {/* Miniature */}
                  <div className="relative w-16 h-16 rounded bg-acier-100 overflow-hidden shrink-0 border border-beton">
                    <Image
                      src={product.images[0] || ""}
                      alt={product.nom}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Infos article */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-bleu font-bold uppercase">
                      {product.marque || "Qualimat"}
                    </div>
                    <Link
                      href={`/produit/${product.slug}`}
                      className="font-heading font-bold text-base text-acier uppercase hover:text-bleu truncate block"
                    >
                      {product.nom}
                    </Link>
                    <div className="text-xs text-acier-500">
                      Unité : <span className="font-semibold text-acier-700">{product.unite}</span>
                    </div>
                    <div className="text-xs font-bold text-acier mt-1 sm:hidden">
                      {product.prixFcfa ? formatFcfa(product.prixFcfa * quantite) : "Sur devis"}
                    </div>
                  </div>

                  {/* Contrôle Quantité (+ / -) */}
                  <div className="flex items-center border border-acier-300 rounded overflow-hidden bg-white shrink-0">
                    <button
                      onClick={() => updateQuantity(product.id, quantite - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-acier-100 text-acier-700"
                      aria-label="Diminuer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-xs">
                      {quantite}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantite + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-acier-100 text-acier-700"
                      aria-label="Augmenter"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total par ligne (Desktop) */}
                  <div className="hidden sm:block text-right w-28 shrink-0">
                    <div className="text-sm font-black text-acier">
                      {product.prixFcfa ? (
                        formatFcfa(product.prixFcfa * quantite)
                      ) : (
                        <span className="text-bleu font-bold text-xs">Sur devis</span>
                      )}
                    </div>
                    {product.prixFcfa && quantite > 1 && (
                      <div className="text-[10px] text-acier-400">
                        {formatFcfa(product.prixFcfa)} / u
                      </div>
                    )}
                  </div>

                  {/* Supprimer */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-acier-400 hover:text-rose-600 p-1.5 transition"
                    title="Retirer de la liste"
                    aria-label={`Supprimer ${product.nom}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-beton-light rounded-lg border border-beton flex items-start gap-3 text-xs text-acier-600">
            <ShieldCheck className="w-5 h-5 text-jaune-hover shrink-0 mt-0.5" />
            <p>
              <strong>Bon à savoir :</strong> Les prix sont donnés à titre indicatif pour le magasin d&apos;Abomey-Calavi. Notre équipe commerciale confirmera la disponibilité immédiate et les éventuels frais de transport selon votre lieu exact de livraison.
            </p>
          </div>
        </div>

        {/* Colonne Droite : Coordonnées + Envoi WhatsApp (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border-2 border-acier-800 shadow-xl p-6 sm:p-8 relative">
            <div className="h-2 stripe-accent w-full absolute top-0 left-0 rounded-t-xl" />

            <h2 className="font-heading font-black text-2xl text-acier uppercase mb-1">
              Finaliser ma demande
            </h2>
            <p className="text-xs text-acier-500 mb-6">
              Renseignez vos coordonnées (facultatives) pour que nous préparions votre devis plus vite.
            </p>

            {/* Formulaire léger */}
            <div className="space-y-4 mb-6 text-xs">
              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-jaune-hover" />
                  <span>Votre Nom / Société (facultatif)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex : M. Dossou / Entreprise BTP"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-jaune-hover" />
                  <span>Téléphone de contact (facultatif)</span>
                </label>
                <input
                  type="tel"
                  placeholder="Ex : +229 97 00 00 00"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-jaune-hover" />
                  <span>Quartier / Chantier (facultatif)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex : Tankpè, Arconville, Godomey, Zoundja..."
                  value={quartier}
                  onChange={(e) => setQuartier(e.target.value)}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                />
              </div>
            </div>

            {/* Total estimatif */}
            <div className="bg-acier-900 text-white p-4 rounded-xl mb-6">
              <div className="flex items-center justify-between text-xs text-acier-300 pb-2 border-b border-acier-800">
                <span>Total articles :</span>
                <span className="font-bold text-white">{totalItems} unité(s)</span>
              </div>
              <div className="flex items-center justify-between pt-3">
                <span className="text-xs font-bold uppercase text-jaune">Montant estimatif :</span>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-heading font-black text-white">
                    {formatFcfa(totalEstimatedFcfa)}
                  </div>
                  {hasSurDevisItems && (
                    <span className="text-[10px] text-jaune block">
                      * Certains articles nécessitent un calcul sur devis
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Alerte si le message dépasse 2000 caractères */}
            {isTooLong && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Votre liste est très fournie. Si WhatsApp ne s&apos;ouvre pas directement, utilisez le bouton &quot;Copier le texte&quot; ou passez par notre formulaire Pro.
                </p>
              </div>
            )}

            {/* Bouton Principal : Envoi WhatsApp */}
            <button
              onClick={handleSendWhatsApp}
              disabled={isSubmitting}
              className="w-full btn-touch bg-whatsapp hover:bg-whatsapp-hover text-white font-black uppercase text-sm px-6 py-3.5 rounded-lg shadow-xl flex items-center justify-center gap-3 transition active:scale-95"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
              <span>Envoyer ma liste sur WhatsApp</span>
            </button>

            {/* Bouton Secondaire : Copier le texte */}
            <button
              onClick={handleCopyText}
              className="mt-3 w-full btn-touch bg-acier-100 hover:bg-acier-200 text-acier-800 font-bold uppercase text-xs px-4 py-2.5 rounded flex items-center justify-center gap-2 transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Texte copié dans le presse-papier !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copier le texte du message</span>
                </>
              )}
            </button>

            {/* Aperçu du message modèle généré */}
            <div className="mt-6 pt-4 border-t border-beton">
              <span className="text-[11px] font-bold uppercase text-acier-400 block mb-2">
                Aperçu du message transmis à Qualimat :
              </span>
              <pre className="bg-beton-light p-3 rounded text-[11px] text-acier-800 whitespace-pre-wrap font-sans border border-beton max-h-40 overflow-y-auto">
                {rawText}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
