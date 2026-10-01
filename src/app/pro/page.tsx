"use client";

import React, { useState } from "react";
import Link from "next/link";
import { recordProRequest } from "@/lib/storage";
import { initialSettings } from "@/data/initialData";
import {
  HardHat,
  Building2,
  Truck,
  CheckCircle2,
  FileCheck,
  Send,
  MessageCircle,
  Clock,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function EspaceProPage() {
  const [societe, setSociete] = useState("");
  const [contact, setContact] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [villeQuartier, setVilleQuartier] = useState("");
  const [typeChantier, setTypeChantier] = useState<"batiment" | "renovation" | "lotissement" | "autre">("batiment");
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
      description,
      besoinsTexte,
      statut: "nouveau",
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  const handleSendWhatsAppFallback = () => {
    const text = `Bonjour Qualimat, je suis ${contact} (${societe}).\nChantier à : ${villeQuartier || "Calavi"}.\nType : ${typeChantier}.\nBesoins : ${besoinsTexte || description}\nContact : ${telephone}`;
    window.open(`https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Bannière d'en-tête Pro */}
      <div className="bg-gradient-to-r from-acier-950 via-acier-900 to-bleu text-white rounded-2xl p-6 sm:p-12 mb-12 border-2 border-jaune shadow-2xl relative overflow-hidden">
        <div className="h-2 stripe-accent w-full absolute top-0 left-0" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-jaune text-acier-950 text-xs font-black uppercase px-3 py-1 rounded tracking-wider mb-4">
            <HardHat className="w-4 h-4" />
            <span>Service Entreprises BTP & Artisans</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase text-white leading-tight">
            Espace Professionnel & Devis Gros Chantier
          </h1>

          <p className="mt-4 text-xs sm:text-base text-acier-200 leading-relaxed">
            Vous gérez un chantier de construction d&apos;immeuble, de villa, de lotissement ou des travaux de second œuvre à Abomey-Calavi, Cotonou ou environs ? Obtenez un interlocuteur dédié, des remises quantitatives et une livraison coordonnée sur site.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-jaune font-bold">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-white" />
              <span>Chiffrage sous 2h ouvrées</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-white" />
              <span>Livraison camion plateau / benne</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-white" />
              <span>Facture normalisée avec IFU</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Colonne Gauche : Formulaire de demande Chantier (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-beton-dark shadow-sm p-6 sm:p-8">
            <h2 className="font-heading font-black text-2xl text-acier uppercase mb-2">
              Formulaire de cotation spéciale chantier
            </h2>
            <p className="text-xs text-acier-500 mb-6">
              Remplissez les informations ci-dessous. Notre responsable technique vous rappelle avec un bordereau chiffré.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="font-heading font-black text-xl text-emerald-950 uppercase mb-2">
                  Demande Pro bien reçue !
                </h3>
                <p className="text-xs text-emerald-800 mb-6 leading-relaxed">
                  Merci <strong>{contact}</strong>. Votre dossier pour <strong>{societe}</strong> a été transmis à la direction commerciale de Qualimat SARL. Vous recevrez votre retour sous 2 heures.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleSendWhatsAppFallback}
                    className="btn-touch bg-whatsapp hover:bg-whatsapp-hover text-white font-bold uppercase text-xs px-5 py-2.5 rounded flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Transmettre aussi sur WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-touch bg-acier-100 hover:bg-acier-200 text-acier-800 font-bold uppercase text-xs px-4 py-2.5 rounded"
                  >
                    Nouvelle demande
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-acier-700 mb-1">
                      Nom de l&apos;entreprise / Promoteur *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Ets BTP Moderne / Particulier"
                      value={societe}
                      onChange={(e) => setSociete(e.target.value)}
                      className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-acier-700 mb-1">
                      Nom du responsable / Contact *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Ing. Dossou"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-acier-700 mb-1">
                      Téléphone mobile direct *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex : +229 97 00 00 00"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-acier-700 mb-1">
                      Adresse email (facultatif)
                    </label>
                    <input
                      type="email"
                      placeholder="contact@societe.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-acier-700 mb-1">
                      Lieu du chantier (Ville & Quartier) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Abomey-Calavi (Tankpè, Akassato, etc.)"
                      value={villeQuartier}
                      onChange={(e) => setVilleQuartier(e.target.value)}
                      className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-acier-700 mb-1">
                      Type de chantier
                    </label>
                    <select
                      value={typeChantier}
                      onChange={(e) => setTypeChantier(e.target.value as any)}
                      className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                    >
                      <option value="batiment">Bâtiment / Gros Œuvre (R+1, R+2...)</option>
                      <option value="renovation">Rénovation & Finitions</option>
                      <option value="lotissement">Aménagement / VRD / Clôture</option>
                      <option value="autre">Autre projet BTP</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase text-acier-700 mb-1">
                    Description succincte du projet
                  </label>
                  <input
                    type="text"
                    placeholder="Ex : Coulage de dalle de 150 m², besoin de fers et ciment"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-acier-700 mb-1">
                    Bordereau de besoins & Quantités estimées *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Exemple :&#10;- 200 sacs de Ciment CPJ 35&#10;- 80 barres de fer Ø 10 HA&#10;- 40 barres de fer Ø 12 HA&#10;- 2 camions de gravier concassé 15/25"
                    value={besoinsTexte}
                    onChange={(e) => setBesoinsTexte(e.target.value)}
                    className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-xs sm:text-sm px-6 py-3 rounded tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer ma demande de devis pro</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Colonne Droite : Engagements & Contact Direct (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-acier-900 text-white rounded-xl p-6 border border-acier-800 shadow-md">
            <h3 className="font-heading font-black text-xl uppercase mb-4 text-jaune flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span>Pourquoi Qualimat Pro ?</span>
            </h3>

            <ul className="space-y-3 text-xs text-acier-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-jaune shrink-0 mt-0.5" />
                <span>
                  <strong>Stock garanti sans rupture :</strong> Approvisionnement régulier direct usine ciment et aciéries.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-jaune shrink-0 mt-0.5" />
                <span>
                  <strong>Flotte de livraison dédiée :</strong> Camions bennes et plateaux disponibles du lundi au samedi.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-jaune shrink-0 mt-0.5" />
                <span>
                  <strong>Modalités de paiement :</strong> Virement bancaire, chèque ou paiement mobile MTN / Moov après validation de compte pro.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-jaune shrink-0 mt-0.5" />
                <span>
                  <strong>Assistance technique :</strong> Recommandation des sections d&apos;acier et dosages selon les préconisations du bureau d&apos;études.
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-acier-800">
              <span className="text-[11px] text-acier-400 block mb-2">Interlocuteur direct BTP :</span>
              <a
                href={`tel:${initialSettings.telephonePrincipal.replace(/\s+/g, "")}`}
                className="btn-touch w-full bg-acier-800 hover:bg-acier-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded flex items-center justify-center gap-2 border border-acier-700 transition"
              >
                <span>Appeler le {initialSettings.telephonePrincipal}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
