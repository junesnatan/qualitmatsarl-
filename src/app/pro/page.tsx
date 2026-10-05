"use client";

import React, { useState } from "react";
import Link from "next/link";
import { recordProRequest } from "@/lib/storage";
import { initialSettings } from "@/data/initialData";
import {
  Building2,
  Truck,
  CheckCircle2,
  FileCheck,
  Send,
  MessageCircle,
  Clock,
  ShieldCheck,
  Check,
  Briefcase,
  Coins,
  Percent,
  Star,
  Quote,
} from "lucide-react";

export default function EspaceProPage() {
  const [societe, setSociete] = useState("");
  const [contact, setContact] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [villeQuartier, setVilleQuartier] = useState("");
  const [typeChantier, setTypeChantier] = useState<"batiment" | "renovation" | "lotissement" | "autre">("batiment");
  const [volumeEstime, setVolumeEstime] = useState("Moins de 5 Millions FCFA");
  const [description, setDescription] = useState("");
  const [besoinsTexte, setBesoinsTexte] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!societe || !contact || !telephone) return;

    recordProRequest({
      id: "pro-" + Date.now(),
      societe,
      contact,
      telephone,
      email: email || undefined,
      villeQuartier: villeQuartier || "Abomey-Calavi / Cotonou",
      typeChantier,
      description: `${description} [Volume estimé : ${volumeEstime}]`,
      besoinsTexte,
      statut: "nouveau",
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  const handleSendWhatsAppFallback = () => {
    const text = `Bonjour QUALITMATSARL, je suis ${contact} (${societe}).\nChantier à : ${villeQuartier || "Calavi"}.\nType : ${typeChantier}.\nVolume : ${volumeEstime}.\nBesoins : ${besoinsTexte || description}\nContact : ${telephone}`;
    window.open(`https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const proPartners = [
    {
      company: "BTP Habitat Bénin",
      author: "M. Marcellin Agossou, Conducteur de Travaux",
      quote: "QUALITMATSARL est notre partenaire de référence sur Calavi pour les fers à béton certifiés et le ciment. Approvisionnement ponctuel, factures normalisées avec IFU transmises le jour même.",
      rating: 5,
    },
    {
      company: "Société Générale de Bâtiment (SGB)",
      author: "Mme Clarisse Tokpo, Acheteuse Projets",
      quote: "Les tarifs dégressifs par camion benne et fagots d'armatures nous font faire de vraies économies d'échelle sur nos programmes immobiliers.",
      rating: 5,
    },
  ];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Bannière Corporate Pro */}
      <div className="bg-brand-900 text-white rounded-3xl p-6 sm:p-12 mb-12 border border-brand-800 shadow-2xl relative overflow-hidden">
        {/* Décors */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-800 text-amber-400 border border-brand-700 text-xs font-semibold px-3.5 py-1 rounded-full mb-4">
            <Briefcase className="w-4 h-4" />
            <span>Service Dédié Entreprises & Artisans BTP</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-tight">
            Espace Professionnel & Tarifs Grossistes Chantiers
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Vous pilotez un chantier d&apos;immeuble, de lotissement, de villa ou des travaux de second œuvre à Abomey-Calavi, Cotonou ou dans l&apos;Atlantique ? Bénéficiez d&apos;un compte pro avec tarifs dégressifs, facturation normalisée et livraison continue par camions bennes et plateaux.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-amber-400 font-bold">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-white" />
              <span>Chiffrage officiel &lt; 2h ouvrées</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-white" />
              <span>Flotte bennes & plateaux dédiée</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-white" />
              <span>Facture normalisée avec IFU & RCCM</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Colonne Gauche : Formulaire de Demande Pro (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
            <h2 className="font-heading font-extrabold text-xl text-slate-900 mb-1">
              Formulaire de Cotation Gros Chantier
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Renseignez les détails de votre besoin. Notre responsable commercial vous transmet un bordereau quantitatif sous 2h.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fade-in">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-emerald-950 mb-1">
                  Demande de cotation transmise !
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 mb-6 leading-relaxed">
                  Merci <strong>{contact}</strong> ({societe}). Notre responsable des ventes chantiers prépare votre bordereau et vous recontacte au <strong>{telephone}</strong>.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleSendWhatsAppFallback}
                    className="btn-touch px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Transmettre aussi sur WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-slate-600 hover:underline font-semibold"
                  >
                    Nouvelle demande
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Raison Sociale / Entreprise *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Entreprise BTP Bénin"
                      value={societe}
                      onChange={(e) => setSociete(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Nom du Responsable / Contact *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : M. Paul Dossou"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Téléphone de contact *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex : +229 97 00 00 00"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Email professionnel
                    </label>
                    <input
                      type="email"
                      placeholder="contact@societe.bj"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Type de Travaux
                    </label>
                    <select
                      value={typeChantier}
                      onChange={(e) => setTypeChantier(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                    >
                      <option value="batiment">Bâtiment neuf / Gros œuvre</option>
                      <option value="renovation">Rénovation & Second œuvre</option>
                      <option value="lotissement">Lotissement & Clôtures</option>
                      <option value="autre">Autre ouvrage BTP</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Volume estimé de la commande
                    </label>
                    <select
                      value={volumeEstime}
                      onChange={(e) => setVolumeEstime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                    >
                      <option value="Moins de 5 Millions FCFA">Moins de 5 Millions FCFA</option>
                      <option value="5 à 15 Millions FCFA">5 à 15 Millions FCFA</option>
                      <option value="Plus de 15 Millions FCFA">Plus de 15 Millions FCFA (Grand Projet)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Localisation exacte du chantier
                  </label>
                  <input
                    type="text"
                    placeholder="Ex : Allègléta, Tankpè, Arconville, Calavi, Godomey..."
                    value={villeQuartier}
                    onChange={(e) => setVilleQuartier(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Liste des matériaux ou bordereau estimatif
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ex : 250 sacs Ciment CPJ 45, 2 tonnes Fer à béton Ø 12, 1 camion benne gravier 15/25..."
                    value={besoinsTexte}
                    onChange={(e) => setBesoinsTexte(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-touch py-3.5 px-6 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Transmettre ma demande de devis pro</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Colonne Droite : Avantages BTP Pro & Partenaires (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-5">
            <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Pourquoi ouvrir un compte Pro chez QUALITMAT ?</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Tarifs Grossistes Dégressifs</div>
                  <div className="text-slate-500 mt-0.5">
                    Bénéficiez de remises quantitatives directes sur ciments, fers à béton et tuyauteries.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Factures Normalisées avec IFU</div>
                  <div className="text-slate-500 mt-0.5">
                    Toutes vos commandes font l&apos;objet de factures normalisées déductibles comptablement.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Priorité Logistique Camion</div>
                  <div className="text-slate-500 mt-0.5">
                    Planning d&apos;approvisionnement garanti pour éviter tout arrêt de chantier au coulage.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Témoignages Partenaires BTP */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Témoignages d&apos;entreprises partenaires
            </h4>

            {proPartners.map((partner, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs"
              >
                <div className="flex items-center gap-1 mb-2 text-amber-400">
                  {[...Array(partner.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 italic leading-relaxed">
                  &ldquo;{partner.quote}&rdquo;
                </p>
                <div className="mt-3 font-bold text-slate-900">
                  {partner.author} — <span className="text-brand-900">{partner.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
