"use client";

import React from "react";
import { ShieldCheck, Truck, MessageCircle, MapPin } from "lucide-react";
import { initialSettings } from "@/data/initialData";

export default function TrustBar() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Entreprise agréée",
      subtitle: `IFU ${initialSettings.ifu} • RCCM`,
      color: "text-brand-900 bg-brand-50 border-brand-200",
    },
    {
      icon: Truck,
      title: "Livraison rapide",
      subtitle: "Bennes & plateaux sur vos chantiers",
      color: "text-amber-700 bg-amber-50 border-amber-200",
    },
    {
      icon: MessageCircle,
      title: "Devis WhatsApp immédiat",
      subtitle: "Chiffrage précis en moins de 2 min",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      icon: MapPin,
      title: "Dépôt physique à Calavi",
      subtitle: "Allègléta / Pavé de Tankpè",
      color: "text-blue-700 bg-blue-50 border-blue-200",
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200 py-4 shadow-xs">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 py-2 sm:py-1 ${
                  idx > 0 ? "sm:pl-6" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-extrabold text-slate-900 truncate">
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
