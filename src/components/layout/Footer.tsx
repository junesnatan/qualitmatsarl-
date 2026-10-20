"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { initialSettings } from "@/data/initialData";

export default function Footer() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t-2 border-primary-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Grille épurée sans navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 pb-10 border-b border-slate-800">
          {/* Colonne 1 : Identité & Métier (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-black text-base shadow">
                Q
              </div>
              <span className="font-heading font-black text-xl text-white tracking-tight">
                QUALITMAT <span className="text-primary-500">SARL</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg">
              Distributeur agréé de matériaux de construction et quincaillerie professionnelle à Abomey-Calavi. Approvisionnement direct, ciments certifiés, fers à béton haute adhérence et livraison rapide sur chantier.
            </p>
          </div>

          {/* Colonne 2 : Coordonnées Directes & Dépôt (5 cols) */}
          <div className="md:col-span-5 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-widest text-solar-400">
              Point de Vente & Contact
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2.5 text-white hover:text-solar-400 transition font-bold"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-solar-400 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+229 96 53 84 55 (01 96 53 84 55)</span>
              </a>

              <a
                href={`https://wa.me/${initialSettings.whatsappNumber}?text=Bonjour%20QUALITMAT%20SARL`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition font-bold"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span>Devis WhatsApp Direct</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400 pt-0.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="leading-tight">
                  <span className="block font-semibold text-slate-200">Dépôt & Magasin :</span>
                  <span>Allègléta / Pavé de Tankpè, Abomey-Calavi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne Inférieure : Copyright & Légal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} QUALITMAT SARL. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/mentions-legales" className="hover:text-slate-300 transition">
              Mentions Légales & Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
