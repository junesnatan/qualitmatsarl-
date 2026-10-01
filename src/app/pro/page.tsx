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
    const text = `Bonjour QUALITMATSARL, je suis ${contact} (${societe}).\nChantier à : ${villeQuartier || "Calavi"}.\nType : ${typeChantier}.\nBesoins : ${besoinsTexte || description}\nContact : ${telephone}`;
    window.open(`https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Bannière Corporate Pro */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-12 mb-12 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-800 text-amber-400 border border-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Briefcase className="w-4 h-4" />
            <span>Service Entreprises & Artisans BTP</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight">
            Espace Professionnel & Devis Gros Chantier
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Vous gérez un chantier de construction d&apos;immeuble, de villa, de lotissement ou des travaux de second œuvre à Abomey-Calavi, Cotonou ou environs ? Bénéficiez d&apos;un interlocuteur dédié, de conditions tarifaires de gros et d&apos;une logistique d&apos;approvisionnement continue.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-amber-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-white" />
              <span>Chiffrage sous 2h ouvrées</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-white" />
              <span>Livraison camion benne / plateau</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-white" />
              <span>Facture normalisée avec IFU</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Colonne Gauche : Formulaire (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 className="font-heading font-bold text-xl text-slate-900 mb-1">
              Formulaire de Cotation Gros Chantier
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Remplissez les informations ci-dessous. Notre responsable technique vous transmet un bordereau chiffré sous 2h.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="font-heading font-bold text-lg text-emerald-950 mb-1">
                  Demande Pro bien transmise !
                </h3>
                <p className="text-xs text-emerald-800 mb-6 leading-relaxed">
                  Merci <strong>{contact}</strong>. Votre dossier pour <strong>{societe}</strong> est entre les mains de notre service commercial.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleSendWhatsAppFallback}
                    className="btn-touch bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Transmettre aussi sur WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-touch bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-lg"
                  >
                    Nouvelle demande
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nom de l&apos;entreprise / Promoteur *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Ets BTP Moderne / Particulier"
                      value={societe}
                      onChange={(e) => setSociete(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nom du responsable / Contact *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Ing. Dossou"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Téléphone mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex : +229 97 00 00 00"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Adresse email (facultatif)
                    </label>
                    <input
                      type="email"
                      placeholder="contact@societe.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Lieu du chantier (Ville & Quartier) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Abomey-Calavi (Tankpè, Akassato, etc.)"
                      value={villeQuartier}
                      onChange={(e) => setVilleQuartier(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Type de chantier
                    </label>
                    <select
                      value={typeChantier}
                      onChange={(e) => setTypeChantier(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                    >
                      <option value="batiment">Bâtiment / Gros Œuvre (R+1, R+2...)</option>
                      <option value="renovation">Rénovation & Finitions</option>
                      <option value="lotissement">Aménagement / VRD / Clôture</option>
                      <option value="autre">Autre projet BTP</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Bordereau de besoins & Quantités estimées *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Exemple :&#10;- 200 sacs de Ciment CPJ 35&#10;- 80 barres de fer Ø 10 HA&#10;- 40 barres de fer Ø 12 HA&#10;- 2 camions de gravier concassé 15/25"
                    value={besoinsTexte}
                    onChange={(e) => setBesoinsTexte(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full btn-touch bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmettre ma demande de devis pro</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Colonne Droite : Piliers Corporate (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-900" />
              <span>Avantages Partenaires BTP</span>
            </h3>

            <ul className="space-y-3.5 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Approvisionnement garanti :</strong> Sécurisation des volumes auprès des usines cimentières et aciéries.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Logistique chantier :</strong> Flotte de transport adaptée à la configuration de vos accès.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Facilités de paiement :</strong> Règlement par virement, chèque ou mobile money après ouverture de compte pro.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Assistance technique :</strong> Recommandations sur les dosages et calibres selon vos cahiers des charges.
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <span className="text-[11px] text-slate-500 block mb-2">Interlocuteur direct BTP :</span>
              <a
                href={`tel:${initialSettings.telephonePrincipal.replace(/\s+/g, "")}`}
                className="btn-touch w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition"
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
