"use client";

import React from "react";
import { initialSettings } from "@/data/initialData";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function LocationSection() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  const deliveryZones = [
    {
      name: "Abomey-Calavi",
      sub: "Allègléta, Tankpè, Arconville, Calavi Centre, Zogbadjè",
      badge: "Express 2h-4h",
      badgeColor: "bg-gold-50 text-gold-900 border-gold-200",
      icon: "📍",
    },
    {
      name: "Cotonou",
      sub: "Akpakpa, Fidjrossè, Cadjehoun, Agla, Haie Vive, Menontin",
      badge: "Livraison 24h",
      badgeColor: "bg-gold-50 text-gold-900 border-gold-200",
      icon: "📍",
    },
    {
      name: "Godomey & Togoudo",
      sub: "Axes échangeur, Dékoungbé, Hêvié, Togoudo",
      badge: "Même jour",
      badgeColor: "bg-gold-50 text-gold-900 border-gold-200",
      icon: "📍",
    },
    {
      name: "Ouidah, Allada & Tori",
      sub: "Chantiers périphériques, fermes et grands lotissements",
      badge: "Sur devis",
      badgeColor: "bg-sand-100 text-charcoal-700 border-sand-200",
      icon: "🚚",
    },
  ];

  return (
    <section className="py-14 px-4 max-w-7xl mx-auto border-b border-sand-200">
      <div className="bg-white rounded-3xl border border-sand-200 shadow-showroom-hover overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Colonne Gauche : Infos Dépôt & Zones de couverture (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 uppercase tracking-widest mb-2 bg-sand-100 border border-sand-200 px-3.5 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                <span>Présence Physique & Logistique</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-black text-brand-900 mb-2">
                Comptoir Central & Périmètre de Livraison
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Notre comptoir physique est situé à <strong>Allègléta / Pavé de Tankpè</strong> à Abomey-Calavi. Venez vous approvisionner directement ou faites acheminer vos commandes sur site grâce à notre flotte de camions.
              </p>

              {/* Coordonnées Dépôt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 bg-sand-50 rounded-xl border border-sand-200">
                  <div className="text-[10px] font-bold uppercase text-slate-400 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold-600" />
                    Adresse Showroom
                  </div>
                  <div className="text-xs font-bold text-brand-900 leading-snug">
                    {initialSettings.adresse}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Abomey-Calavi (Atlantique, Bénin)
                  </div>
                </div>

                <div className="p-3.5 bg-sand-50 rounded-xl border border-sand-200">
                  <div className="text-[10px] font-bold uppercase text-slate-400 mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gold-600" />
                    Horaires d&apos;accueil
                  </div>
                  <div className="text-xs font-bold text-brand-900 leading-snug">
                    {initialSettings.horairesSemaine}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {initialSettings.horairesDimanche}
                  </div>
                </div>
              </div>

              {/* Zones de couverture */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-3 flex items-center gap-1.5 font-heading">
                  <Truck className="w-3.5 h-3.5 text-gold-600" />
                  Zones desservies par notre flotte :
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {deliveryZones.map((zone, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-sand-200 bg-sand-50/50 hover:bg-sand-50 transition flex items-start justify-between gap-2"
                    >
                      <div>
                        <div className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                          <span>{zone.icon}</span>
                          <span>{zone.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                          {zone.sub}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${zone.badgeColor}`}
                      >
                        {zone.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Liens d'action rapide */}
            <div className="mt-8 pt-5 border-t border-sand-100 flex flex-wrap items-center gap-3">
              <a
                href={initialSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-touch inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 text-gold-400" />
                <span>Itinéraire Google Maps</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="btn-touch inline-flex items-center gap-2 bg-sand-100 hover:bg-sand-200 text-charcoal-800 font-bold text-xs px-4 py-2.5 rounded-xl transition border border-sand-200"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span>Appeler le comptoir (+229 96 53 84 55)</span>
              </a>
            </div>
          </div>

          {/* Colonne Droite : Carte Interactive Google Maps (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full bg-sand-100 border-t lg:border-t-0 lg:border-l border-sand-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.977461876527!2d2.34567!3d6.4489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102355e100000001%3A0x123456789!2sAbomey-Calavi%2C%20B%C3%A9nin!5e0!3m2!1sfr!2sbj!4v1700000000000!5m2!1sfr!2sbj"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte localisation QUALITMAT SARL Abomey-Calavi Allègléta"
              className="w-full h-full"
            />

            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-sand-200 max-w-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-900">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>QUALITMAT SARL Ouvert</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Allègléta / Pavé de Tankpè — Dépôt accessible camions & tricycles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
