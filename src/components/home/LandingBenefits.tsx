"use client";

import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, MessageCircle, FileCheck, ArrowRight } from "lucide-react";

const BENEFITS = [
  {
    icon: Truck,
    title: "Livraison Directe sur Chantier",
    badge: "Flotte Dédiée",
    description:
      "Camions bennes pour agrégats (sable, gravier) et camions plateaux pour fers de 12 mètres et ciments palettisés.",
    highlight: "Déchargement au pied d'œuvre sur Calavi, Cotonou et Atlantique.",
  },
  {
    icon: ShieldCheck,
    title: "Matériaux 100% Certifiés",
    badge: "Normes BTP",
    description:
      "Approvisionnements directs auprès des industriels agréés : fers haute adhérence FE E500 et ciments d'usines fraîches.",
    highlight: "Zéro contrefaçon pour la sécurité de vos fondations.",
  },
  {
    icon: MessageCircle,
    title: "Devis WhatsApp en 2 Minutes",
    badge: "Réactivité Express",
    description:
      "Transmettez vos bordereaux ou listes de matériaux. Nos conseillers vous retournent un chiffrage net et précis en FCFA.",
    highlight: "Numéro direct : +229 96 53 84 55.",
  },
  {
    icon: FileCheck,
    title: "Factures Normalisées avec IFU",
    badge: "Cadre Légal",
    description:
      "Société formelle immatriculée au RCCM d'Abomey-Calavi avec IFU en règle pour toutes vos déclarations fiscales.",
    highlight: "Pièces comptables déductibles et sécurisées.",
  },
];

export default function LandingBenefits() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-black text-primary-600 uppercase tracking-widest bg-primary-50 border border-primary-200 px-3 py-1 rounded-full">
            Nos Engagements Chantiers
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900 mt-2 leading-tight">
            Pourquoi Choisir QUALITMAT SARL ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
            Des services logistiques et techniques pensés pour que votre chantier ne s&apos;arrête jamais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-primary-500 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-primary-600 bg-primary-100/60 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-base sm:text-lg text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 text-[11px] font-bold text-primary-700">
                  {item.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
