"use client";

import React from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { initialCategories } from "@/data/initialData";
import {
  ArrowRight,
  Layers,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function CategoryGrid() {
  return (
    <section className="py-14 px-4 max-w-7xl mx-auto border-b border-sand-200">
      {/* En-tête de section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 uppercase tracking-widest mb-1.5">
            <Layers className="w-4 h-4 text-gold-600" />
            <span>Galerie des Départements</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-brand-900 tracking-tight">
            Explorez nos Collections par Univers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Du gros œuvre certifié aux finitions intérieures d&apos;architecte, explorez chaque famille de matériaux avec fiches détaillées.
          </p>
        </div>

        <Link
          href="/catalogue"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-900 hover:text-gold-700 bg-sand-100 hover:bg-sand-200 px-4 py-2 rounded-xl transition border border-sand-200"
        >
          <span>Voir tout le catalogue</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grille Visuelle de 8 Cartes Catégories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {initialCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalogue?cat=${cat.slug}`}
            className="group relative rounded-2xl overflow-hidden bg-white border border-sand-200 hover:border-gold-400 shadow-sm hover:shadow-showroom-hover transition-all duration-300 flex flex-col"
          >
            {/* Image avec zoom doux & overlay sombre subtil au survol */}
            <div className="relative h-36 sm:h-44 w-full bg-sand-50 overflow-hidden">
              <SafeImage
                src={cat.image}
                alt={cat.nom}
                categorySlug={cat.slug}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay soyeux au survol */}
              <div className="absolute inset-0 bg-brand-950/0 group-hover:bg-brand-950/15 transition-colors duration-300" />
              
              {/* Badge nombre d'articles */}
              <span className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-sm text-charcoal-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-sand-200">
                {cat.count || 6}+ réf.
              </span>
            </div>

            {/* Contenu textuel */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-brand-900 group-hover:text-gold-700 transition-colors leading-snug">
                  {cat.nom}
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-sand-100 flex items-center justify-between text-xs font-bold text-brand-900 group-hover:text-gold-600 transition-colors">
                <span>Découvrir</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-gold-600" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
