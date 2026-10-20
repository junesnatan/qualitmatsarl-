"use client";

import React from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { initialSettings } from "@/data/initialData";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  CheckCircle,
  Store,
} from "lucide-react";

export default function VitrineDepotSpotlight() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  const whatsappMessage = encodeURIComponent(
    "Bonjour QUALITMAT SARL, je souhaite me rendre à votre magasin d'Allègléta / Tankpè. Pouvez-vous me partager vos coordonnées GPS précises ?"
  );
  const whatsappUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-800 text-white shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Colonne Gauche : Descriptif Magasin, Horaires & Accès */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-black text-solar-400 uppercase tracking-widest bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-full">
              <Store className="w-3.5 h-3.5" />
              <span>Point de Vente Physique à Abomey-Calavi</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white leading-tight">
              Venez Nous Rendre Visite à Notre Comptoir de Tankpè
            </h2>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Nos conseillers vous accueillent du lundi au samedi pour vous présenter nos échantillons, vérifier nos stocks de ciment et d&apos;aciers, et établir votre devis immédiat.
            </p>

            {/* Fiche d'Informations Pratiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 text-solar-400 font-bold text-xs uppercase tracking-wider">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>Adresse & Repère</span>
                </div>
                <p className="text-xs text-white font-bold">
                  Allègléta / Pavé de Tankpè
                </p>
                <p className="text-[11px] text-slate-400">
                  Abomey-Calavi, Atlantique, Bénin
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Horaires d'Ouverture</span>
                </div>
                <p className="text-xs text-white font-bold">
                  Lun — Sam : 07h30 — 18h30
                </p>
                <p className="text-[11px] text-slate-400">
                  Dimanche matin : Permanence urgences
                </p>
              </div>
            </div>

            {/* Boutons d'Action Directs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={`tel:${cleanPhone}`}
                className="btn-red py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 shadow-md active:scale-95 text-center text-white"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Appeler : 01 96 53 84 55</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solar py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 shadow-md active:scale-95 text-slate-950 text-center"
              >
                <MessageCircle className="w-4 h-4 shrink-0 text-slate-950" />
                <span>Localisation WhatsApp</span>
              </a>

              <Link
                href="/contact"
                className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-slate-700 transition active:scale-95 text-center"
              >
                <Navigation className="w-4 h-4 shrink-0 text-slate-400" />
                <span>Plan d&apos;accès</span>
              </Link>
            </div>
          </div>

          {/* Colonne Droite : Visuel du dépôt / Stock */}
          <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full relative min-h-[320px]">
            <SafeImage
              src="/images/hero/depot-magasin.jpg"
              alt="Dépôt et stock QUALITMAT SARL à Tankpè"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs text-slate-300">
              <span className="font-bold text-white block">Stock permanent en magasin :</span>
              Ciments frais usine, ferraillage certifié, tubes PVC et outillage pro disponibles immédiatement au chargement.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
