"use client";

import React, { useState, useEffect } from "react";
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
  Building2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function ContactPage() {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("Disponibilité matériaux & prix");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState<boolean>(true);
  const [closingInfo, setClosingInfo] = useState<string>("Ferme à 18h30");

  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  // Calcul dynamique de l'état d'ouverture selon l'heure réelle de Cotonou/Porto-Novo (UTC+1)
  useEffect(() => {
    try {
      const now = new Date();
      const beninTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Africa/Porto-Novo" })
      );
      const day = beninTime.getDay(); // 0 = Dimanche, 1-6 = Lundi-Samedi
      const decimalHour = beninTime.getHours() + beninTime.getMinutes() / 60;

      if (day >= 1 && day <= 6) {
        if (decimalHour >= 7.5 && decimalHour < 18.5) {
          setIsOpenNow(true);
          setClosingInfo("Ferme aujourd'hui à 18h30");
        } else {
          setIsOpenNow(false);
          setClosingInfo("Fermé actuellement • Ouvre à 07h30");
        }
      } else if (day === 0) {
        if (decimalHour >= 8.0 && decimalHour < 13.0) {
          setIsOpenNow(true);
          setClosingInfo("Ferme aujourd'hui à 13h00");
        } else {
          setIsOpenNow(false);
          setClosingInfo("Fermé le dimanche après-midi • Ouvre lundi à 07h30");
        }
      }
    } catch (e) {
      // Fallback
      setIsOpenNow(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !telephone || !message) return;
    setSent(true);
  };

  const scheduleTable = [
    { day: "Lundi", hours: "07h30 — 18h30", open: true },
    { day: "Mardi", hours: "07h30 — 18h30", open: true },
    { day: "Mercredi", hours: "07h30 — 18h30", open: true },
    { day: "Jeudi", hours: "07h30 — 18h30", open: true },
    { day: "Vendredi", hours: "07h30 — 18h30", open: true },
    { day: "Samedi", hours: "07h30 — 18h30", open: true },
    { day: "Dimanche", hours: "08h00 — 13h00 (Urgences Chantiers)", open: true },
  ];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8">
      {/* En-tête */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5 mb-1">
          <MapPin className="w-4 h-4 text-amber-500" />
          <span>Accueil Magasin & Contact</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900">
          Contact & Accès Magasin QUALITMATSARL
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Une question sur les stocks au dépôt, un itinéraire pour votre camion benne ou une cotation spéciale ? Nos conseillers sont à votre écoute par téléphone, WhatsApp ou au comptoir.
        </p>
      </div>

      {/* 1. Carte Interactive Grande Taille en Haut */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 relative h-72 sm:h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.977461876527!2d2.34567!3d6.4489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102355e100000001%3A0x123456789!2sAbomey-Calavi%2C%20B%C3%A9nin!5e0!3m2!1sfr!2sbj!4v1700000000000!5m2!1sfr!2sbj"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte Magasin QUALITMATSARL Calavi Tankpe"
          className="w-full h-full"
        />

        {/* Badge Flottant "Ouvert Maintenant" */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200 max-w-sm">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isOpenNow ? "bg-emerald-500 animate-ping" : "bg-rose-500"
              }`}
            />
            <span className="text-xs font-bold text-slate-900">
              {isOpenNow ? "Ouvert actuellement" : "Fermé actuellement"}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 font-medium">{closingInfo}</p>
          <div className="mt-2 text-[10px] text-slate-400">
            Dépôt : Allègléta / Pavé de Tankpè, Abomey-Calavi
          </div>
        </div>
      </div>

      {/* 2. Trois Cards d'Action Directe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Téléphone */}
        <a
          href={`tel:${cleanPhone}`}
          className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Appel Direct</div>
            <div className="text-base font-extrabold text-slate-900 mt-0.5">
              {initialSettings.telephonePrincipal}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Conseiller de vente joignable aux horaires d&apos;ouverture.
            </p>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${initialSettings.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">WhatsApp Direct</div>
            <div className="text-base font-extrabold text-slate-900 mt-0.5">
              +229 96 53 84 55
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Envoi de listes de matériaux, photos et devis en 2 minutes.
            </p>
          </div>
        </a>

        {/* Adresse & Maps */}
        <a
          href={initialSettings.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Localisation GPS</div>
            <div className="text-sm font-extrabold text-slate-900 mt-0.5">
              Allègléta / Pavé de Tankpè
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Abomey-Calavi (Atlantique). Ouvrir l&apos;itinéraire Maps.
            </p>
          </div>
        </a>
      </div>

      {/* 3. Horaires Détaillés & Formulaire de Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Horaires Jour par Jour (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-900" />
              <span>Horaires du Dépôt</span>
            </h3>

            <span
              className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                isOpenNow
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                  : "bg-rose-100 text-rose-800 border-rose-200"
              }`}
            >
              {isOpenNow ? "Ouvert" : "Fermé"}
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Le dépôt accueille les artisans, particuliers et transporteurs pour les enlèvements directs et départs de livraison.
          </p>

          <div className="divide-y divide-slate-100 text-xs">
            {scheduleTable.map((item, idx) => (
              <div
                key={idx}
                className="py-2.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg transition"
              >
                <span className="font-bold text-slate-800">{item.day}</span>
                <span className="font-mono text-slate-600">{item.hours}</span>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-brand-50 rounded-2xl border border-brand-200 text-xs text-brand-900 space-y-1">
            <div className="font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Service Express Chantiers Dimanche
            </div>
            <p className="text-[11px] text-slate-600">
              Permanence le dimanche matin de 08h00 à 13h00 pour le ciment et réapprovisionnements urgents de coulage.
            </p>
          </div>
        </div>

        {/* Formulaire de Contact Web (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
          <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-1">
            Envoyer un Message Écrit
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Vous préférez un retour par e-mail ou rappel téléphonique ? Écrivez-nous directement ici.
          </p>

          {sent ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fade-in">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="font-heading font-extrabold text-lg text-emerald-950 mb-1">
                Message transmis avec succès !
              </h4>
              <p className="text-xs text-emerald-800 mb-6">
                Merci <strong>{nom}</strong>. Notre équipe d&apos;accueil vous recontactera très rapidement au <strong>{telephone}</strong>.
              </p>
              <button
                onClick={() => setSent(false)}
                className="btn-touch bg-brand-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Votre nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : M. Paul Dossou"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                  />
                </div>

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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email (facultatif)
                  </label>
                  <input
                    type="email"
                    placeholder="paul@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Objet de votre demande
                  </label>
                  <select
                    value={sujet}
                    onChange={(e) => setSujet(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                  >
                    <option value="Disponibilité matériaux & prix">Disponibilité matériaux & prix</option>
                    <option value="Livraison camion sur chantier">Livraison camion sur chantier</option>
                    <option value="Compte professionnel / Devis BTP">Compte professionnel / Devis BTP</option>
                    <option value="Autre demande">Autre demande</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Votre message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Décrivez votre besoin en matériaux ou posez vos questions à notre équipe..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-touch py-3.5 px-6 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Envoyer le message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
