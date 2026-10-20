"use client";

import React from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { ArrowRight, Layers, Sparkles } from "lucide-react";

interface Department {
  slug: string;
  title: string;
  badge: string;
  description: string;
  examples: string;
  image: string;
}

const DEPARTMENTS: Department[] = [
  {
    slug: "gros-oeuvre",
    title: "Gros Œuvre & Ciments",
    badge: "Fondations & Maçonnerie",
    description: "Ciment CPJ 35 & 45 haute résistance, parpaings vibrés, sable lagunaire et graviers de carrière.",
    examples: "CIMBENIN, NOCIBE, Agrégats concassés",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "ferraillage",
    title: "Fers à Béton & Armatures",
    badge: "Aciers Haute Adhérence",
    description: "Barres de fer HA certifiées FE E500 de 6 mm à 16 mm, rouleaux de fil recuit et treillis soudés.",
    examples: "Barres 12m, Étriers, Cadres sur mesure",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "plomberie",
    title: "Plomberie & Assainissement",
    badge: "Distribution & Évacuation",
    description: "Tubes PVC pression et évacuation, raccords coudes, colles, vannes d'arrêt et équipements sanitaires.",
    examples: "PVC Ø 32 à 160 mm, Sanitaire pro",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "electricite",
    title: "Électricité & Câblage",
    badge: "100% Cuivre Pur Normé",
    description: "Câbles rigides et souples cuivre pur, disjoncteurs divisionnaires, coffrets modulaires et gaines ICTA.",
    examples: "Câbles 1.5 à 10 mm², Legrand, Schneider",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "peinture",
    title: "Peintures & Finitions",
    badge: "Revêtements & Protection",
    description: "Peintures acryliques façade et intérieur, enduits de lissage, sous-couches et accessoires d'application.",
    examples: "Pots 20 kg, Enduits 25 kg, Rouleaux",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "outillage",
    title: "Outillage Pro & Équipements",
    badge: "Matériel pour Artisans",
    description: "Bétonnières, disques diamant, meuleuses, truelles, brouettes renforcées et équipements de protection EPI.",
    examples: "Outillage à main, Consommables BTP",
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80",
  },
];

export default function VitrineDepartments() {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
      {/* En-tête de section vitrine */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full">
            <Layers className="w-3.5 h-3.5" />
            <span>Nos Domaines de Fourniture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900">
            Une Gamme Complète pour Tout Type de Chantier
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Du premier coup de pioche aux finitions intérieures, retrouvez tous vos matériaux essentiels approvisionnés directement auprès des fabricants.
          </p>
        </div>

        <Link
          href="/catalogue"
          className="btn-red py-2.5 px-5 rounded-xl text-xs font-bold flex items-center gap-2 self-start md:self-auto shrink-0 shadow-sm"
        >
          <span>Voir tout le catalogue</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grille des 6 Grandes Cartes Showroom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {DEPARTMENTS.map((dept) => (
          <Link
            key={dept.slug}
            href={`/catalogue?cat=${dept.slug}`}
            className="group bg-white rounded-3xl border-2 border-slate-200 hover:border-primary-600 hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Image avec zoom */}
            <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
              <SafeImage
                src={dept.image}
                alt={dept.title}
                categorySlug={dept.slug}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 bg-slate-900/90 text-solar-400 text-[10px] sm:text-xs font-black px-3 py-1 rounded-lg backdrop-blur-sm border border-slate-700">
                {dept.badge}
              </span>
            </div>

            {/* Corps descriptif */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-heading font-black text-lg sm:text-xl text-slate-900 group-hover:text-primary-600 transition">
                  {dept.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {dept.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-medium truncate max-w-[180px]">
                  {dept.examples}
                </span>
                <span className="font-bold text-primary-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0">
                  <span>Explorer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
