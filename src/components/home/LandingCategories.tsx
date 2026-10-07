"use client";

import React from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { ArrowRight, Layers, Sparkles } from "lucide-react";

interface CategoryShowcase {
  slug: string;
  nom: string;
  badge: string;
  description: string;
  exemples: string;
  image: string;
}

const CATEGORIES_SHOWCASE: CategoryShowcase[] = [
  {
    slug: "gros-oeuvre",
    nom: "Gros Œuvre & Ciments",
    badge: "Rayon Fondations",
    description: "Ciment CPJ 35 & 45 haute résistance, parpaings creux vibrés, sable lagunaire et graviers.",
    exemples: "CIMBENIN, NOCIBE, Agrégats 15/25",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "ferraillage",
    nom: "Aciers & Ferraillage",
    badge: "Armatures Certifiées",
    description: "Barres de fer à béton HA de 6 mm à 16 mm, rouleaux de fil recuit et treillis soudés.",
    exemples: "Aciers FE E500, Barres 12 m",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "plomberie",
    nom: "Plomberie & Assainissement",
    badge: "Fluides & Évacuation",
    description: "Tubes PVC pression et évacuation, raccords coudes, colle PVC, siphons et vannes d'arrêt.",
    exemples: "PVC Ø 32 à 160 mm, Sanitaire",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "electricite",
    nom: "Électricité & Câblerie",
    badge: "Sécurité & Normes",
    description: "Câbles rigides et souples cuivre pur, disjoncteurs différentiels, tableaux et gaines ICTA.",
    exemples: "Câbles 1.5 à 6 mm², Legrand",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "peinture",
    nom: "Peintures & Finitions",
    badge: "Protection & Déco",
    description: "Peintures acryliques intérieures et extérieures microporeuses, enduits de lissage et rouleaux.",
    exemples: "Pots 20 kg, Enduits 25 kg",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "outillage",
    nom: "Outillage & Équipements",
    badge: "Matériel Chantier",
    description: "Brouettes renforcées, pelles de maçon, truelles, meuleuses, disques diamant et EPI.",
    exemples: "Brouettes BTP, Outillage à main",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80",
  },
];

export default function LandingCategories() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-primary-600 uppercase tracking-widest bg-primary-50 border border-primary-200 px-3 py-1 rounded-full mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Rayons du Magasin</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900 leading-tight">
              Explorez Nos Rayons de Matériaux
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl">
              Cliquez sur un univers pour accéder aux articles correspondants, fiches techniques et tarifs unitaires en FCFA.
            </p>
          </div>

          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-primary-600 hover:text-primary-700 transition group self-start md:self-auto"
          >
            <span>Voir tout le catalogue (48+ références)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grille des 6 Rayons (Responsive : 1 col sur mobile, 2 sur tablette, 3 sur desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CATEGORIES_SHOWCASE.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalogue?cat=${cat.slug}`}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-500 transition-all duration-300 flex flex-col justify-between active:scale-[0.99]"
            >
              {/* Image d'illustration de la catégorie */}
              <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
                <SafeImage
                  src={cat.image}
                  alt={cat.nom}
                  categorySlug={cat.slug}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Badge catégorie */}
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm">
                  {cat.badge}
                </span>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-heading font-black text-lg sm:text-xl text-white drop-shadow-md">
                    {cat.nom}
                  </h3>
                </div>
              </div>

              {/* Description & Exemples */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium truncate max-w-[170px]">
                    {cat.exemples}
                  </span>
                  <span className="font-extrabold text-primary-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0">
                    <span>Accéder aux articles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bouton Global en bas de grille */}
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/catalogue"
            className="btn-red inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-primary-600/25 active:scale-95"
          >
            <Layers className="w-4 h-4" />
            <span>Ouvrir le Catalogue Général (Voir tous les articles)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
