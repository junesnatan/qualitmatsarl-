"use client";

import React from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { initialCategories } from "@/data/initialData";
import {
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";

export default function CategoryGrid() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* En-tête de section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>Rayons & Matériaux de Construction</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
            Explorez nos Catégories Phares
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Du gros œuvre au second œuvre, trouvez l&apos;ensemble de vos fournitures avec tarifs transparents et fiches techniques.
          </p>
        </div>

        <Link
          href="/catalogue"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-900 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-xl transition"
        >
          <span>Voir tout le catalogue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grille Visuelle de 8 Cartes Catégories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {initialCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalogue?cat=${cat.slug}`}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image avec zoom doux & overlay bleu marine à 10% au survol */}
            <div className="relative h-36 sm:h-44 w-full bg-slate-100 overflow-hidden">
              <SafeImage
                src={cat.image}
                alt={cat.nom}
                categorySlug={cat.slug}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay bleu marine au hover */}
              <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/15 transition-colors duration-300" />
              
              {/* Badge nombre d'articles */}
              <span className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-slate-200">
                {cat.count || 6}+ réf.
              </span>
            </div>

            {/* Contenu textuel */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-brand-900 transition-colors leading-snug">
                  {cat.nom}
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-900 group-hover:text-amber-600 transition-colors">
                <span>Parcourir</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
