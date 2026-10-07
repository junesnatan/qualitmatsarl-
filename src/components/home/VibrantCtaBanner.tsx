"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Phone, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import { initialSettings } from "@/data/initialData";

export default function VibrantCtaBanner() {
  const whatsappUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
    "Bonjour QUALITMATSARL, je souhaite demander une cotation pour mes matériaux de construction."
  )}`;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border-2 border-primary-500">
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <span className="inline-block bg-solar-500 text-dark-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            DEVIS GRATUIT & SANS ENGAGEMENT
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white leading-tight">
            Vous Avez un Chantier en Cours ou à Venir ?
          </h2>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mx-auto font-medium">
            Envoyez-nous votre bordereau de matériaux ou échangez directement avec notre équipe commerciale sur WhatsApp pour un chiffrage immédiat en FCFA.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-solar px-8 py-4 rounded-xl text-sm font-black flex items-center justify-center gap-3 shadow-solar active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-dark-950" />
              <span>Envoyer ma Liste sur WhatsApp (+229 96 53 84 55)</span>
            </a>

            <a
              href="tel:+22996538455"
              className="w-full sm:w-auto bg-dark-950 hover:bg-dark-900 text-white px-7 py-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
            >
              <Phone className="w-4 h-4 text-solar-400" />
              <span>Appeler le Magasin</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-white/80">
            <span>✓ Facture normalisée avec IFU</span>
            <span>•</span>
            <span>✓ Livraison sous 24-48h</span>
            <span>•</span>
            <span>✓ Dépôt Allègléta ouvert du Lun au Sam</span>
          </div>
        </div>
      </div>
    </section>
  );
}
