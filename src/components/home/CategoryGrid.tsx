import React from "react";
import Link from "next/link";
import Image from "next/image";
import { initialCategories } from "@/data/initialData";
import { ArrowUpRight } from "lucide-react";

export default function CategoryGrid() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b-2 border-acier-200 pb-4">
        <div>
          <div className="text-xs font-bold text-bleu uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <span className="w-2.5 h-2.5 bg-jaune inline-block rounded-sm" />
            <span>Organisation par spécialité</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-acier uppercase">
            Nos Rayons & Matériaux
          </h2>
        </div>
        <Link
          href="/catalogue"
          className="text-xs font-bold text-acier-800 hover:text-bleu uppercase tracking-wider flex items-center gap-1 group self-start md:self-auto"
        >
          <span>Consulter toutes les catégories</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalogue/${cat.slug}`}
            className="group bg-white rounded-lg overflow-hidden border border-beton-dark hover:border-jaune shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col"
          >
            {/* Image avec ratio 16:9 et zoom au hover */}
            <div className="relative h-48 w-full bg-acier-800 overflow-hidden">
              <Image
                src={cat.image || ""}
                alt={cat.nom}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-acier-950/80 via-acier-950/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs font-bold bg-jaune text-acier-950 px-2 py-0.5 rounded uppercase tracking-wider">
                  {cat.count || 5}+ produits
                </span>
                <span className="text-xs bg-acier-900/80 text-acier-200 px-2 py-0.5 rounded backdrop-blur-sm">
                  Qualité Pro
                </span>
              </div>
            </div>

            {/* Contenu textuel */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-acier group-hover:text-bleu transition-colors uppercase leading-tight mb-2">
                  {cat.nom}
                </h3>
                <p className="text-xs text-acier-600 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-beton flex items-center justify-between text-xs font-bold text-bleu group-hover:text-jaune-hover">
                <span className="uppercase tracking-wider">Découvrir les références</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
