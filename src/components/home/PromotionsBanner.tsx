"use client";

import React from "react";
import Link from "next/link";
import { initialPromotions } from "@/data/initialData";
import { Tag, ArrowRight } from "lucide-react";

export default function PromotionsBanner() {
  const activePromos = initialPromotions.filter((p) => p.publie);

  if (activePromos.length === 0) return null;

  return (
    <section className="py-6 px-4 max-w-7xl mx-auto">
      <div className="space-y-4">
        {activePromos.map((promo) => (
          <div
            key={promo.id}
            className="bg-brand-50 border border-brand-200 text-slate-900 rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-brand-900 text-white font-semibold text-[11px] px-2.5 py-0.5 rounded-full mb-2">
                <Tag className="w-3 h-3 text-amber-400" />
                <span>{promo.badge}</span>
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 mb-1.5">
                {promo.titre}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {promo.texte}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              {promo.remise && (
                <div className="bg-white border border-brand-200 text-brand-900 font-bold px-3.5 py-2 rounded-lg text-xs text-center w-full md:w-auto shadow-sm">
                  {promo.remise}
                </div>
              )}
              {promo.lien && (
                <Link
                  href={promo.lien}
                  className="btn-touch w-full md:w-auto bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                >
                  <span>Découvrir l&apos;offre</span>
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
