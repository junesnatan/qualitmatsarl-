"use client";

import React from "react";
import Link from "next/link";
import { initialSettings } from "@/data/initialData";
import { MessageCircle, FileCheck, PhoneCall, ArrowRight, Sparkles } from "lucide-react";

export default function VitrineCtaBanner() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  const whatsappMessage = encodeURIComponent(
    "Bonjour QUALITMAT SARL, je souhaite vous soumettre ma liste de matériaux pour obtenir un devis complet de chantier."
  );
  const whatsappUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden border-2 border-primary-500">
        {/* Cercles décoratifs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-solar-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-solar-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chiffrage Express sous 30 Minutes</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white leading-tight">
            Prêt à Démarrer ou Approvisionner Votre Chantier ?
          </h2>

          <p className="text-xs sm:text-base text-white/90 leading-relaxed font-medium">
            Particuliers, maîtres d&apos;œuvre, maçons et promoteurs : envoyez-nous votre bordereau de prix ou liste de fournitures. Nos techniciens vous transmettent un devis chiffré au meilleur tarif en FCFA.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solar w-full sm:w-auto px-8 py-4 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 shadow-xl active:scale-95 text-slate-950"
            >
              <MessageCircle className="w-5 h-5 text-slate-950" />
              <span>Envoyer ma liste sur WhatsApp</span>
            </a>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 border border-white/30 backdrop-blur-md transition active:scale-95"
            >
              <FileCheck className="w-5 h-5" />
              <span>Formulaire de devis en ligne</span>
            </Link>
          </div>

          <div className="pt-2 text-xs text-white/80">
            <span>Ou joignez-nous directement : </span>
            <a href={`tel:${cleanPhone}`} className="underline font-bold text-solar-300 hover:text-white">
              +229 96 53 84 55
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
