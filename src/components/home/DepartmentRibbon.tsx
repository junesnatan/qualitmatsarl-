"use client";

import React from "react";
import Link from "next/link";
import { initialCategories } from "@/data/initialData";
import {
  Layers,
  Wrench,
  Droplet,
  Zap,
  Paintbrush,
  Home,
  Bath,
  Hammer,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const DEPARTMENT_ICONS: Record<string, React.ReactNode> = {
  "gros-oeuvre": <Layers className="w-6 h-6 text-gold-600 group-hover:text-gold-700 transition" />,
  "ferraillage": <Hammer className="w-6 h-6 text-gold-600 group-hover:text-gold-700 transition" />,
  "plomberie": <Droplet className="w-6 h-6 text-gold-600 group-hover:text-gold-700 transition" />,
  "electricite": <Zap className="w-6 h-6 text-gold-600 group-hover:text-gold-700 transition" />,
  "outillage": <Wrench className="w-6 h-6 text-gold-600 group-hover:text-gold-700 transition" />,
  "peinture": <Paintbrush className="w-6 h-6 text-gold-600 group-hover:text-gold-700 transition" />,
  "toiture": <Home className="w-6 h-6 text-gold-600 group-hover:text-gold-700 transition" />,
  "sanitaire": <Bath className="w-6 h-6 text-gold-600 group-hover:text-gold-700 transition" />,
};

export default function DepartmentRibbon() {
  return (
    <section className="py-8 bg-white border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Titre discret de ruban */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-700 font-heading">
              Nos Univers & Rayons Spécialisés
            </h2>
          </div>
          <Link
            href="/catalogue"
            className="text-xs font-semibold text-gold-700 hover:text-gold-800 flex items-center gap-1 group"
          >
            <span>Voir l&apos;ensemble du catalogue</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Ruban de Médaillons Circulaires (Inspiration La Roche Bénin) */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 text-center">
          {initialCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogue?cat=${cat.slug}`}
              className="group flex flex-col items-center p-2 rounded-2xl hover:bg-sand-50 transition-all duration-300"
            >
              {/* Médaillon circulaire avec double cercle soigné */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sand-50 border border-sand-200 group-hover:border-gold-500/80 group-hover:shadow-md flex items-center justify-center transition-all duration-300 relative group-hover:scale-105">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-inner">
                  {DEPARTMENT_ICONS[cat.slug] || (
                    <Layers className="w-5 h-5 text-gold-600" />
                  )}
                </div>
              </div>

              {/* Libellé de l'univers */}
              <span className="mt-2 text-xs font-semibold text-slate-800 group-hover:text-brand-900 leading-snug line-clamp-2 transition-colors">
                {cat.nom.split("&")[0].trim()}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {cat.count || 5}+ réf.
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
