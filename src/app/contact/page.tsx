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
  CheckCircle2,
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
      <div className="border-b-2 border-acier-200 pb-6 mb-8">
        <div className="text-xs font-bold text-bleu uppercase tracking-widest flex items-center gap-1.5 mb-1">
          <MapPin className="w-4 h-4 text-jaune-hover" />
          <span>Toujours à votre écoute</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-acier uppercase">
          Contact & Accès au Magasin
        </h1>
        <p className="text-xs sm:text-sm text-acier-600 mt-1 max-w-2xl">
          Une question sur nos stocks, un itinéraire pour votre camion ou un besoin de conseil ? Joignez-nous par téléphone, WhatsApp ou directement en rayon à Abomey-Calavi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Colonne Gauche : Formulaire de contact (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-beton-dark shadow-sm p-6 sm:p-8">
          <h2 className="font-heading font-black text-2xl text-acier uppercase mb-2">
            Envoyer un message à l&apos;équipe
          </h2>
          <p className="text-xs text-acier-500 mb-6">
            Remplissez ce formulaire pour toute demande de renseignement ou réclamation.
          </p>

          {sent ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-heading font-black text-xl text-emerald-950 uppercase mb-2">
                Message envoyé avec succès !
              </h3>
              <p className="text-xs text-emerald-800 mb-6 leading-relaxed">
                Merci <strong>{nom}</strong>. Notre équipe d&apos;accueil vous recontactera très rapidement au <strong>{telephone}</strong>.
              </p>
              <button
                onClick={() => setSent(false)}
                className="btn-touch bg-acier-900 text-white font-bold uppercase text-xs px-5 py-2.5 rounded"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-acier-700 mb-1">
                    Votre Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : M. Paul Dossou"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-acier-700 mb-1">
                    Téléphone (avec WhatsApp si possible) *
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
              </div>

              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1">
                  Adresse e-mail (facultatif)
                </label>
                <input
                  type="email"
                  placeholder="votre-email@domaine.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1">
                  Objet de la demande
                </label>
                <select
                  value={sujet}
                  onChange={(e) => setSujet(e.target.value)}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                >
                  <option value="Information produit & disponibilité">Information produit & disponibilité en stock</option>
                  <option value="Renseignement sur les livraisons chantier">Renseignement sur les livraisons chantier</option>
                  <option value="Demande de compte professionnel BTP">Demande de compte professionnel BTP</option>
                  <option value="Autre demande">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1">
                  Votre message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Écrivez votre message ici..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs text-acier focus:outline-none focus:border-jaune"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-xs sm:text-sm px-6 py-3 rounded tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer le message</span>
              </button>
            </form>
          )}
        </div>

        {/* Colonne Droite : Coordonnées, Horaires & Accès direct (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-acier-900 text-white rounded-2xl border border-acier-800 p-6 sm:p-8 shadow-xl">
            <h3 className="font-heading font-black text-2xl uppercase mb-6 text-jaune">
              Coordonnées Officielles
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-jaune shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs">Magasin & Entrepôt</h4>
                  <p className="text-acier-300 mt-0.5">{initialSettings.adresse}</p>
                  <p className="text-[11px] text-acier-400 mt-0.5">{initialSettings.ville}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-jaune shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs">Heures d&apos;ouverture</h4>
                  <p className="text-acier-200 font-semibold mt-0.5">{initialSettings.horairesSemaine}</p>
                  <p className="text-acier-400 text-xs">{initialSettings.horairesDimanche}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-jaune shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs">Lignes Téléphoniques</h4>
                  <p className="text-acier-200 font-bold mt-0.5">
                    <a href={`tel:${cleanPhone}`} className="hover:text-jaune">
                      {initialSettings.telephonePrincipal}
                    </a>{" "}
                    / {initialSettings.telephoneSecondaire}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-whatsapp shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs">WhatsApp Commercial</h4>
                  <a
                    href={`https://wa.me/${initialSettings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-whatsapp font-bold hover:underline inline-block mt-0.5"
                  >
                    +{initialSettings.whatsappNumber} (Cliquer pour démarrer la discussion)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-jaune shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase text-xs">E-mail Officiel</h4>
                  <a href={`mailto:${initialSettings.email}`} className="text-acier-300 hover:text-white mt-0.5 block">
                    {initialSettings.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-acier-800 flex flex-wrap gap-4">
              <a
                href={initialSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-bold uppercase text-xs px-5 py-2.5 rounded tracking-wider flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Itinéraire Google Maps</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="btn-touch bg-acier-800 hover:bg-acier-700 text-white font-bold uppercase text-xs px-5 py-2.5 rounded flex items-center gap-2 border border-acier-700"
              >
                <Phone className="w-4 h-4 text-jaune" />
                <span>Appeler maintenant</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
