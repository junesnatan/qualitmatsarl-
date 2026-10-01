"use client";

import React from "react";
import Link from "next/link";
import { initialPromotions } from "@/data/initialData";
import { Tag, ArrowRight, Sparkles } from "lucide-react";

export default function PromotionsBanner() {
  const activePromos = initialPromotions.filter((p) => p.publie);

  if (activePromos.length === 0) return null;

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <div className="space-y-4">
        {activePromos.map((promo) => (
          <div
            key={promo.id}
            className="bg-gradient-to-r from-acier-900 via-acier-800 to-bleu text-white rounded-xl p-6 sm:p-8 shadow-xl border-2 border-jaune relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            {/* Liseré diagonal d'avertissement */}
            <div className="absolute top-0 right-0 w-24 h-24 stripe-accent-slim opacity-20 pointer-events-none transform rotate-12" />

            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-jaune text-acier-950 font-black text-xs uppercase px-2.5 py-0.5 rounded tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{promo.badge}</span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
                {promo.titre}
              </h3>
              <p className="text-xs sm:text-sm text-acier-200 leading-relaxed">
                {promo.texte}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full md:w-auto">
              {promo.remise && (
                <div className="bg-acier-950/80 border border-jaune/40 text-jaune px-4 py-2 rounded text-center font-heading font-black text-lg tracking-wider w-full md:w-auto">
                  {promo.remise}
                </div>
              )}
              {promo.lien && (
                <Link
                  href={promo.lien}
                  className="btn-touch w-full md:w-auto bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-xs px-5 py-2.5 rounded tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
                >
                  <span>En profiter</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
