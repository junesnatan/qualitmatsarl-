"use client";

import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, MessageCircle, Building2, ArrowRight } from "lucide-react";
import { initialSettings } from "@/data/initialData";

export default function BatimatServices() {
  const services = [
    {
      icon: Truck,
      color: "bg-primary-600 text-white",
      badge: "LOGISTIQUE 24H",
      title: "Livraison Directe Chantier",
      desc: "Camions bennes (10m³, 20m³) et camions plateaux pour décharger directement vos matériaux à Calavi, Cotonou et périphérie.",
    },
    {
      icon: ShieldCheck,
      color: "bg-dark-900 text-solar-400",
      badge: "CERTIFIÉ CONFORME",
      title: "Matériaux 100% Agréés BTP",
      desc: "Ciments frais de marques certifiées, aciers haute adhérence FE E500 antisismiques. Zéro contrefaçon, fiches de conformité fournies.",
    },
    {
      icon: MessageCircle,
      color: "bg-emerald-600 text-white",
      badge: "RÉPONSE EN 2 MIN",
      title: "Cotation WhatsApp Directe",
      desc: "Composez votre liste de matériaux en ligne et recevez votre bordereau quantitatif officiel chiffré en FCFA sans attendre.",
    },
    {
      icon: Building2,
      color: "bg-solar-500 text-dark-950",
      badge: "PRIX DÉGRESSIFS",
      title: "Comptoir Pro & Grossistes",
      desc: "Conditions préférentielles pour entrepreneurs et artisans. Factures normalisées avec IFU et RCCM remises le jour même.",
    },
  ];

  return (
    <section className="py-14 bg-white border-b-2 border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
          <div>
            <div className="flex items-center gap-2 text-primary-600 font-black text-xs uppercase tracking-widest">
              <span className="w-3 h-1 bg-primary-600" />
              <span>ENGAGEMENT QUALITÉ & SERVICE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-dark-900 mt-1">
              Pourquoi Bâtir avec QUALITMAT SARL ?
            </h2>
          </div>
          <Link
            href="/pro"
            className="text-xs font-black text-primary-600 hover:text-primary-700 flex items-center gap-1.5 uppercase tracking-wider"
          >
            <span>Ouvrir un compte Pro</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-200 hover:border-primary-600 hover:bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-black shadow-md ${item.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200 text-dark-900">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-base text-dark-900 group-hover:text-primary-600 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] font-black text-primary-600 flex items-center gap-1">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
