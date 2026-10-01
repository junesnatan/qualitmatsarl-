"use client";

import React, { useState } from "react";
import { initialSettings } from "@/data/initialData";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  Navigation,
  Check,
} from "lucide-react";

export default function ContactPage() {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("Information produit & disponibilité");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !telephone || !message) return;
    setSent(true);
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <span className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5 mb-1">
          <MapPin className="w-4 h-4 text-amber-500" />
          <span>Service Client & Magasin</span>
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900">
          Contact & Accès Magasin
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Une question sur nos stocks, un itinéraire pour votre camion ou une demande de devis spécifique ? Nos conseillers sont à votre disposition par téléphone, WhatsApp ou au comptoir.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Colonne Gauche : Formulaire de contact (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <h2 className="font-heading font-bold text-xl text-slate-900 mb-1">
            Transmettre un Message
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Remplissez ce formulaire pour toute demande de cotation ou renseignement logistique.
          </p>

          {sent ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-emerald-950 mb-1">
                Message envoyé avec succès !
              </h3>
              <p className="text-xs text-emerald-800 mb-6 leading-relaxed">
                Merci <strong>{nom}</strong>. Notre équipe d&apos;accueil vous recontactera très rapidement au <strong>{telephone}</strong>.
              </p>
              <button
                onClick={() => setSent(false)}
                className="btn-touch bg-brand-900 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-sm"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : M. Paul Dossou"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Téléphone de contact *
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
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Adresse e-mail (facultatif)
                </label>
                <input
                  type="email"
                  placeholder="votre-email@domaine.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Objet de la demande
                </label>
                <select
                  value={sujet}
                  onChange={(e) => setSujet(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                >
                  <option value="Information produit & disponibilité">Information produit & disponibilité en stock</option>
                  <option value="Renseignement sur les livraisons chantier">Renseignement sur les livraisons chantier</option>
                  <option value="Demande de compte professionnel BTP">Demande de compte professionnel BTP</option>
                  <option value="Autre demande">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Votre message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Écrivez votre message ici..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-touch bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer le message</span>
              </button>
            </form>
          )}
        </div>

        {/* Colonne Droite : Coordonnées (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="font-heading font-bold text-xl text-slate-900 mb-6">
              Coordonnées Officielles
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-xs">Magasin & Entrepôt</h4>
                  <p className="text-slate-600 mt-0.5">{initialSettings.adresse}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{initialSettings.ville}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-xs">Horaires d&apos;ouverture</h4>
                  <p className="text-slate-900 font-semibold mt-0.5">{initialSettings.horairesSemaine}</p>
                  <p className="text-slate-500 text-xs">{initialSettings.horairesDimanche}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-xs">Lignes Téléphoniques</h4>
                  <p className="text-brand-900 font-bold mt-0.5">
                    <a href={`tel:${cleanPhone}`} className="hover:underline">
                      {initialSettings.telephonePrincipal}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-xs">WhatsApp Commercial</h4>
                  <a
                    href={`https://wa.me/${initialSettings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline inline-block mt-0.5"
                  >
                    +229 96 53 84 55 (Cliquer pour échanger sur WhatsApp)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-900 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-xs">E-mail Officiel</h4>
                  <a href={`mailto:${initialSettings.email}`} className="text-slate-600 hover:text-brand-900 mt-0.5 block">
                    {initialSettings.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4">
              <a
                href={initialSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-touch bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Ouvrir Google Maps</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="btn-touch bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-900" />
                <span>Appeler maintenant</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
