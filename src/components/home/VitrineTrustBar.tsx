"use client";

import React from "react";
import { Truck, ShieldCheck, FileCheck, Building2, MapPin } from "lucide-react";

export default function VitrineTrustBar() {
  const commitments = [
    {
      icon: MapPin,
      title: "Dépôt & Magasin Réel",
      subtitle: "Pavé de Tankpè / Allègléta, Calavi",
    },
    {
      icon: Truck,
      title: "Livraison sur Chantier",
      subtitle: "Bennes & camions sous 24h à 48h",
    },
    {
      icon: ShieldCheck,
      title: "Matériaux Certifiés",
      subtitle: "Ciments & aciers aux normes BTP",
    },
    {
      icon: FileCheck,
      title: "Factures avec IFU / RCCM",
      subtitle: "Conformité fiscale & transparence",
    },
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {commitments.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-primary-600/50 hover:bg-white hover:shadow-sm transition"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 border border-primary-200/60 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-heading font-black text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
