"use client";

import React from "react";
import Link from "next/link";
import { initialSettings } from "@/data/initialData";
import { MessageCircle, Layers, ArrowRight, MapPin, Phone } from "lucide-react";

export default function LandingFinalCta() {
  return (
    <section className="py-12 sm:py-16 bg-primary-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest bg-white/20 text-white px-3.5 py-1 rounded-full">
          Prêt à Lancer Votre Chantier ?
        </span>

        <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-white leading-tight">
          Consultez Nos Articles & Prix en Ligne ou Obtenez un Devis Direct
        </h2>

        <p className="text-xs sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
          Retrouvez nos matériaux disponibles au dépôt d&apos;Allègléta (Abomey-Calavi) ou faites-vous livrer directement sur votre chantier.
        </p>

        {/* Boutons d'action finaux */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3">
          <Link
            href="/catalogue"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-slate-100 text-primary-700 font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl transition active:scale-95 text-center"
          >
            <Layers className="w-4 h-4 text-primary-600" />
            <span>Entrer dans le Catalogue (Voir les Articles)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={`https://wa.me/${initialSettings.whatsappNumber}?text=Bonjour%20QUALITMATSARL%2C%20je%20souhaite%20un%20devis%20rapide%20pour%20mon%20chantier`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-solar-500 hover:bg-solar-400 text-dark-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-solar transition active:scale-95 text-center"
          >
            <MessageCircle className="w-4 h-4 text-dark-900" />
            <span>Devis Express sur WhatsApp</span>
          </a>
        </div>

        {/* Coordonnées de contact rapide */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-white/80 font-semibold">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-solar-300" />
            <span>Allègléta / Pavé de Tankpè, Abomey-Calavi</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <a
            href="tel:+22996538455"
            className="flex items-center gap-1.5 hover:text-white transition font-bold"
          >
            <Phone className="w-3.5 h-3.5 text-solar-300" />
            <span>+229 96 53 84 55</span>
          </a>
        </div>
      </div>
    </section>
  );
}
