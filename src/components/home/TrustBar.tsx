"use client";

import React from "react";
import { ShieldCheck, Truck, MessageCircle, MapPin } from "lucide-react";
import { initialSettings } from "@/data/initialData";

export default function TrustBar() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Entreprise Agréée BTP",
      subtitle: `IFU ${initialSettings.ifu} • RCCM Bénin`,
    },
    {
      icon: Truck,
      title: "Livraison Directe Chantier",
      subtitle: "Flotte dédiée Calavi & Cotonou",
    },
    {
      icon: MessageCircle,
      title: "Chiffrage WhatsApp Rapide",
      subtitle: "Devis chiffré clair en FCFA",
    },
    {
      icon: MapPin,
      title: "Comptoir Central Allègléta",
      subtitle: "Pavé de Tankpè, Abomey-Calavi",
    },
  ];

  return (
    <div className="bg-white border-b border-sand-200 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-sand-200">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 py-2 sm:py-1 ${
                  idx > 0 ? "lg:pl-6" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-sand-50 border border-sand-200 flex items-center justify-center shrink-0 text-gold-700 shadow-inner">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-brand-900 truncate font-heading">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium truncate">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
