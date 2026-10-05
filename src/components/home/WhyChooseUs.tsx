"use client";

import React from "react";
import { Award, Zap, Coins, Users2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WhyChooseUs() {
  const differentiators = [
    {
      icon: Award,
      title: "Qualité Garantie",
      description:
        "Ciments de marque agréée (CIMBENIN, DIAMOND, NOCIBE), fers à béton haute adhérence certifiés FE E500. Zéro compromis sur la solidité de votre bâti.",
      color: "text-amber-600 bg-amber-50 border-amber-200",
      badge: "Certifié",
    },
    {
      icon: Zap,
      title: "Devis Express (< 2 min)",
      description:
        "Préparez votre liste en quelques clics et recevez un chiffrage officiel et complet sur WhatsApp sans attendre des heures.",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      badge: "Instantané",
    },
    {
      icon: Coins,
      title: "Prix Transparents en FCFA",
      description:
        "Tous nos prix sont affichés sans ambiguïté. Tarifs grossistes dégressifs dès l'achat par palette, camion benne ou fagot d'aciers.",
      color: "text-blue-600 bg-blue-50 border-blue-200",
      badge: "Sans surprise",
    },
    {
      icon: Users2,
      title: "Accompagnement Technique",
      description:
        "Nos conseillers de vente sont des experts du BTP. Nous vous aidons à calculer vos dosages et optimiser les cubages de votre chantier.",
      color: "text-purple-600 bg-purple-50 border-purple-200",
      badge: "Conseil pro",
    },
  ];

  return (
    <section className="py-14 px-4 max-w-7xl mx-auto border-t border-slate-200">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-brand-900 uppercase tracking-wider inline-flex items-center gap-1.5 mb-1 bg-brand-50 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-900" />
          Nos Engagements d&apos;Excellence
        </span>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-2">
          Pourquoi Confier vos Matériaux à QUALITMATSARL ?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Des fondations aux finitions, nous sommes le partenaire de confiance des artisans, entrepreneurs et particuliers exigeants à Abomey-Calavi et au Bénin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {differentiators.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-base text-slate-900 group-hover:text-brand-900 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-brand-900 flex items-center gap-1 opacity-80 group-hover:opacity-100">
                <span>Engagement QUALITMAT</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
