import React from "react";
import { initialSettings } from "@/data/initialData";
import { MapPin, Clock, Phone, Navigation, CheckCircle2 } from "lucide-react";

export default function LocationSection() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl border border-beton-dark shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Infos pratiques */}
          <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-bleu uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <MapPin className="w-4 h-4 text-jaune-hover" />
                <span>Venez au magasin</span>
              </div>
              <h2 className="text-3xl font-heading font-black text-acier uppercase mb-4">
                Localisation & Horaires d&apos;Ouverture
              </h2>
              <p className="text-xs sm:text-sm text-acier-600 mb-6 leading-relaxed">
                Situé stratégiquement à Abomey-Calavi pour un chargement rapide de vos véhicules, tricycles ou camions. Espace de manœuvre adapté pour gros gabarits.
              </p>

              <div className="space-y-4 text-sm text-acier-800">
                <div className="flex items-start gap-3 bg-beton-light p-3.5 rounded border border-beton">
                  <MapPin className="w-5 h-5 text-jaune shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase text-acier">Adresse exacte</h4>
                    <p className="text-xs text-acier-700 mt-0.5 font-medium">{initialSettings.adresse}</p>
                    <p className="text-[11px] text-acier-500">Repère : À 200 m après le carrefour Tankpè en venant de la pharmacie.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-beton-light p-3.5 rounded border border-beton">
                  <Clock className="w-5 h-5 text-jaune shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase text-acier">Horaires continus</h4>
                    <p className="text-xs text-acier-800 font-semibold mt-0.5">{initialSettings.horairesSemaine}</p>
                    <p className="text-[11px] text-acier-600">{initialSettings.horairesDimanche}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-beton-light p-3.5 rounded border border-beton">
                  <Phone className="w-5 h-5 text-jaune shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase text-acier">Accueil téléphonique & Devis</h4>
                    <p className="text-xs font-bold text-acier mt-0.5">
                      <a href={`tel:${cleanPhone}`} className="hover:text-bleu">
                        {initialSettings.telephonePrincipal}
                      </a>{" "}
                      /{" "}
                      <span className="text-acier-600">{initialSettings.telephoneSecondaire}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-beton flex flex-wrap gap-4">
              <a
                href={initialSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-touch bg-acier-900 hover:bg-acier-800 text-white font-bold uppercase text-xs px-5 py-2.5 rounded tracking-wider flex items-center gap-2 shadow"
              >
                <Navigation className="w-4 h-4 text-jaune" />
                <span>Ouvrir dans Google Maps</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-bold uppercase text-xs px-5 py-2.5 rounded tracking-wider flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Appeler le magasin</span>
              </a>
            </div>
          </div>

          {/* Carte visuelle interactive d'accès */}
          <div className="lg:col-span-6 bg-acier-800 relative min-h-[350px] flex items-center justify-center p-6 text-white text-center">
            {/* Simulation de carte Google Maps stylisée avec repère */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-30" />
            <div className="absolute inset-0 bg-acier-950/60" />

            <div className="relative z-10 max-w-sm p-6 bg-acier-900/90 backdrop-blur-md rounded-xl border-2 border-jaune shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-jaune text-acier-950 mx-auto flex items-center justify-center mb-3 shadow-lg">
                <MapPin className="w-6 h-6 stroke-[2.5]" />
              </div>

              <h3 className="font-heading font-black text-xl text-white uppercase tracking-wide">
                Qualimat SARL — Abomey-Calavi
              </h3>

              <p className="text-xs text-acier-300 mt-2 mb-4 leading-relaxed">
                Carrefour Arconville, Route Inter-États Cotonou — Abomey-Calavi.
                Facilement accessible avec parking clients & zone de chargement poids lourds.
              </p>

              <div className="flex items-center justify-center gap-2 text-[11px] text-jaune font-semibold mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>Chargement immédiat en magasin</span>
              </div>

              <a
                href={initialSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-xs px-4 py-2.5 rounded tracking-wider flex items-center justify-center gap-2"
              >
                <span>Calculer mon itinéraire</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
