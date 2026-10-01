import React from "react";
import Link from "next/link";
import Image from "next/image";
import { initialCategories } from "@/data/initialData";
import { ArrowRight, Layers } from "lucide-react";

export default function CategoryGrid() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Layers className="w-4 h-4 text-amber-500" />
            <span>Catalogue Organisé</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
            Nos Rayons & Matériaux Spécialisés
          </h2>
        </div>
        <Link
          href="/catalogue"
          className="text-xs font-semibold text-brand-900 hover:text-brand-700 flex items-center gap-1 group self-start md:self-auto"
        >
          <span>Consulter toutes les catégories</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalogue/${cat.slug}`}
            className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-brand-900 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
          >
            {/* Image */}
            <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
              <Image
                src={cat.image || ""}
                alt={cat.nom}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-[11px] font-bold bg-white text-slate-900 px-2.5 py-0.5 rounded-full shadow-sm">
                  {cat.count || 5}+ références
                </span>
                <span className="text-[11px] font-medium text-slate-200">
                  En stock
                </span>
              </div>
            </div>

            {/* Contenu textuel épuré */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-900 transition-colors mb-2">
                  {cat.nom}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-900 group-hover:text-brand-700">
                <span>Découvrir les produits</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
