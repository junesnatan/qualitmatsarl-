"use client";

import React from "react";
import { Award, Zap, Coins, Users2, ShieldCheck, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function WhyChooseUs() {
  const differentiators = [
    {
      icon: Award,
      title: "Traçabilité & Qualité Certifiée",
      description:
        "Ciments de marques agréées (CIMBENIN, DIAMOND, NOCIBE), fers à béton haute adhérence certifiés FE E500. Zéro compromis sur la solidité de votre bâti.",
      badge: "Certifié BTP",
    },
    {
      icon: Zap,
      title: "Chiffrage Express en Moins de 15 Min",
      description:
        "Préparez votre sélection de matériaux en quelques clics et recevez un chiffrage officiel et transparent directement sur WhatsApp.",
      badge: "WhatsApp Direct",
    },
    {
      icon: Coins,
      title: "Transparence & Tarifs Dégressifs",
      description:
        "Prix affichés clairement en FCFA. Tarifs grossistes préférentiels dès l'achat par palette, par camion benne ou pour les livraisons complètes de chantier.",
      badge: "Prix Transparents",
    },
    {
      icon: Users2,
      title: "Conseil Technique & Accompagnement",
      description:
        "Nos conseillers de vente sont des professionnels du bâtiment. Nous vous accompagnons dans le calcul de vos dosages et le choix des matériaux adaptés.",
      badge: "Expertise Conseil",
    },
  ];

  return (
    <section className="py-14 px-4 max-w-7xl mx-auto border-b border-sand-200">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-gold-700 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2 bg-sand-100 border border-sand-200 px-3.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
          Les Standards d&apos;Excellence
        </span>
        <h2 className="text-2xl sm:text-3xl font-heading font-black text-brand-900 mt-1">
          Pourquoi Confier vos Matériaux à QUALITMAT SARL ?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          De la première fondation jusqu&apos;à la dernière couche de finition, nous sommes le partenaire de confiance des architectes, artisans et maîtres d&apos;ouvrage au Bénin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {differentiators.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 border border-sand-200 hover:border-gold-400 hover:shadow-showroom-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-sand-50 border border-sand-200 flex items-center justify-center text-gold-700 transition-transform group-hover:scale-105 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-gold-800 uppercase tracking-wider bg-gold-50 border border-gold-200 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-brand-900 group-hover:text-gold-700 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-sand-100 text-[11px] font-bold text-gold-700 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-gold-600 stroke-[2.5]" />
                <span>Garantie Qualitmat SARL</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
