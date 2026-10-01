import React from "react";
import { initialSettings } from "@/data/initialData";
import { MapPin, Clock, Phone, Navigation, CheckCircle2 } from "lucide-react";

export default function LocationSection() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Infos pratiques */}
          <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-4 h-4 text-brand-900" />
                <span>Venir en magasin</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mb-4">
                Localisation & Horaires d&apos;Ouverture
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Situé sur un axe stratégique à Abomey-Calavi pour un chargement rapide de vos véhicules, tricycles ou camions de chantier.
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-slate-800">
                <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <MapPin className="w-5 h-5 text-brand-900 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase text-slate-900">Adresse officielle</h4>
                    <p className="text-xs text-slate-700 mt-0.5 font-medium">{initialSettings.adresse}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Repère : Quartier Allègléta / Pavé de Tankpè, Abomey-Calavi (Atlantique, Bénin).</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <Clock className="w-5 h-5 text-brand-900 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase text-slate-900">Horaires d&apos;accueil</h4>
                    <p className="text-xs text-slate-900 font-semibold mt-0.5">{initialSettings.horairesSemaine}</p>
                    <p className="text-[11px] text-slate-600">{initialSettings.horairesDimanche}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <Phone className="w-5 h-5 text-brand-900 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase text-slate-900">Service Commercial & Devis</h4>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">
                      <a href={`tel:${cleanPhone}`} className="hover:text-brand-900 text-brand-900">
                        {initialSettings.telephonePrincipal}
                      </a>
                    </p>
                  </div>
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
                <span>Ouvrir dans Google Maps</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="btn-touch bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-900" />
                <span>Appeler le magasin</span>
              </a>
            </div>
          </div>

          {/* Carte visuelle corporate */}
          <div className="lg:col-span-6 bg-slate-900 relative min-h-[350px] flex items-center justify-center p-6 text-white text-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-25" />
            <div className="absolute inset-0 bg-slate-900/70" />

            <div className="relative z-10 max-w-sm p-6 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl text-slate-900 text-left">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-900 text-white flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-base text-slate-900">
                    QUALITMATSARL
                  </h3>
                  <p className="text-xs text-slate-500">Allègléta / Tankpè, Abomey-Calavi</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Allègléta / Pavé de Tankpè, Abomey-Calavi (Atlantique, Bénin).
                Facilement accessible avec parking clients & zone de chargement pour camions, tricycles et véhicules de chantier.
              </p>

              <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Chargement immédiat en rayon</span>
              </div>

              <a
                href={initialSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-touch bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Calculer l&apos;itinéraire</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
