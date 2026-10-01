"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { initialSettings } from "@/data/initialData";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanNumber = initialSettings.whatsappNumber.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "Bonjour QUALITMATSARL, je souhaite me renseigner sur vos matériaux."
  )}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex items-end flex-col gap-2">
      {/* Tooltip d'accueil (peut être fermé par l'utilisateur) */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl shadow-xl border border-slate-200 animate-fade-in max-w-xs">
          <span>Besoin d&apos;un devis ? <strong>Écrivez-nous sur WhatsApp</strong></span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Fermer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Bouton Flottant Circulaire */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white"
        title="Discuter sur WhatsApp avec QUALITMATSARL (01 96 53 84 55)"
        aria-label="Contacter QUALITMATSARL sur WhatsApp"
      >
        {/* Anneau de pulsation subtil */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 pointer-events-none" />

        {/* Icône WhatsApp */}
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />

        {/* Badge en ligne */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </span>
      </a>
    </div>
  );
}
