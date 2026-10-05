"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight, PhoneCall, Building2, ShieldCheck } from "lucide-react";
import { initialSettings } from "@/data/initialData";

export default function FinalCtaBanner() {
  const whatsappUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
    "Bonjour QUALITMATSARL, je souhaite demander une cotation pour mes matériaux de construction."
  )}`;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-brand-900 text-white p-8 sm:p-12 shadow-2xl border border-brand-800">
        {/* Cercles de fond d'ambiance */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-800 text-amber-400 border border-brand-700 text-xs font-semibold px-3 py-1 rounded-full">
            <Building2 className="w-4 h-4" />
            <span>Un projet en vue à Calavi, Cotonou ou environs ?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight">
            Préparez votre Chantier avec les Meilleurs Matériaux au Meilleur Prix
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Gagnez du temps et sécurisez vos approvisionnements : parcourez notre catalogue, composez votre liste de matériaux ou échangez directement avec notre équipe commerciale sur WhatsApp.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/catalogue"
              className="w-full sm:w-auto btn-touch px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
            >
              <span>Accéder au catalogue complet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-touch px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Devis WhatsApp instantané (+229 96 53 84 55)</span>
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Facture normalisée IFU</span>
            </span>
            <span>•</span>
            <span>Livraison sous 24-48h</span>
            <span>•</span>
            <span>Paiement sécurisé</span>
          </div>
        </div>
      </div>
    </section>
  );
}
