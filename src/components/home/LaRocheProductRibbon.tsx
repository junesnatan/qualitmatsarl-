"use client";

import React, { useState } from "react";
import Link from "next/link";
import { initialSettings } from "@/data/initialData";
import {
  Layers,
  Wrench,
  Droplet,
  Zap,
  Paintbrush,
  Hammer,
  Bath,
  ShieldAlert,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

interface CategoryShowcase {
  id: string;
  name: string;
  slug: string;
  icon: React.ReactNode;
  image: string;
  badge: string;
  title: string;
  description: string;
  highlights: string[];
}

const SHOWCASE_DATA: CategoryShowcase[] = [
  {
    id: "gros-oeuvre",
    name: "Gros Œuvre & Ciment",
    slug: "gros-oeuvre",
    icon: <Layers className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    badge: "Rayon N°1",
    title: "Ciment CPJ 35 & 45 certifié et agrégats criblés",
    description: "Pour la solidité de vos fondations, élévations de murs et crépissages. Ciment frais en direct d'usine, sable lavé et graviers de concassage disponibles par sacs ou camions bennes.",
    highlights: ["Sacs de 50 kg CPJ 35 & 45", "Parpaings vibrés haute densité", "Livraison bennes 10 à 20 m³"],
  },
  {
    id: "ferraillage",
    name: "Fers à Béton HA",
    slug: "ferraillage",
    icon: <Hammer className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    badge: "Aciers Certifiés",
    title: "Fers haute adhérence FE E500 pour armatures",
    description: "Norme antisismique et haute résistance mécanique pour vos poteaux, chaînages, poutres et dalles. Barres standards de 12 mètres du Ø 6 mm au Ø 20 mm et fil recuit.",
    highlights: ["Diamètres 8, 10, 12, 14, 16 mm", "Certificats de conformité usine", "Vente au détail et par tonnes"],
  },
  {
    id: "carrelage",
    name: "Carrelage & Sols",
    slug: "peinture", // mapped for catalogue
    icon: <Layers className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    badge: "Showroom Déco",
    title: "Revêtements intérieurs & extérieurs grands formats",
    description: "Carreaux grès cérame émaillé, effet marbre poli, effet pierre et travertin. Colles à carrelage professionnelles C2TE et joints hydrofuges haute longévité.",
    highlights: ["Formats 60x60, 60x120 cm", "Carrelage antidérapant terrasse", "Colle carrelage & croisillons autonivelants"],
  },
  {
    id: "sanitaire",
    name: "Sanitaire & Salle d'Eau",
    slug: "sanitaire",
    icon: <Bath className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    badge: "Confort & Design",
    title: "Cuvettes suspendues, vasques et robinetterie moderne",
    description: "Équipez vos salles de bains avec des éléments durables et esthétiques. Packs WC complets économes en eau, mitigeurs en laiton chromé et colonnes de douche modernes.",
    highlights: ["Mitigeurs cartouche céramique", "Packs WC double chasse 3/6L", "Meubles sous-vasque hydrofuges"],
  },
  {
    id: "plomberie",
    name: "Plomberie & PVC",
    slug: "plomberie",
    icon: <Droplet className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
    badge: "Réseaux d'Eau",
    title: "Tuyaux PVC évacuation & pression certifiés NF",
    description: "Canalisations fiables contre les fuites et la chaleur. Tubes d'évacuation Ø 40 à 160 mm, raccords coudes, tés, vannes quart de tour et réservoirs de stockage d'eau.",
    highlights: ["Tubes PVC pression & assainissement", "Vannes laiton et clapets anti-retour", "Cuves polyéthylène 500 à 2 000 L"],
  },
  {
    id: "electricite",
    name: "Électricité BTP",
    slug: "electricite",
    icon: <Zap className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    badge: "Normes Sécurité",
    title: "Câblerie cuivre pur, gaines et disjoncteurs",
    description: "Sécurisez vos installations électriques avec du cuivre certifié sans impuretés. Couronnes de fil 1.5 et 2.5 mm², gaines ICTA annelées, disjoncteurs et tableaux modulaires.",
    highlights: ["Câbles cuivre pur certifiés", "Disjoncteurs divisionnaires et différentiels", "Interrupteurs et prises étanches IP55"],
  },
  {
    id: "outillage",
    name: "Outillage Pro",
    slug: "outillage",
    icon: <Wrench className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80",
    badge: "Équipement Chantier",
    title: "Brouettes renforcées, disqueuses et outillage maçon",
    description: "Équipements robustes conçus pour l'usage intensif sur chantier. Brouettes tubulaires, pelles, truelles italiennes, disques diamantés pour meuleuses et marteaux.",
    highlights: ["Brouettes gros volume châssis renforcé", "Disques à tronçonner béton & acier", "Niveaux laser et règles de maçon"],
  },
  {
    id: "peinture",
    name: "Peinture & Finition",
    slug: "peinture",
    icon: <Paintbrush className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    badge: "Protection Façade",
    title: "Peintures acryliques lavables et enduits lisses",
    description: "Protégez vos murs extérieurs contre l'humidité tropicale et sublimez vos intérieurs. Peintures mates et satinées, enduits de lissage et vernis pour boiseries.",
    highlights: ["Peinture façade hydrofuge anti-moisissure", "Fûts de 20 litres haute couvrance", "Rouleaux et pinceaux professionnels"],
  },
];

export default function LaRocheProductRibbon() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const active = SHOWCASE_DATA[selectedIndex];

  const whatsappQuoteUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
    `Bonjour QUALITMATSARL, je souhaite demander un devis pour le rayon : ${active.name}.`
  )}`;

  return (
    <section className="py-12 bg-white border-b-2 border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Titre de section façon La Roche */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary-600 font-black text-xs uppercase tracking-widest">
              <span className="w-3 h-1 bg-primary-600" />
              <span>DÉPARTEMENTS & FAMILLES DE PRODUITS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-dark-900 mt-1">
              Explorez nos Rayons Spécialisés
            </h2>
          </div>
          <Link
            href="/catalogue"
            className="text-xs font-black text-primary-600 hover:text-primary-700 flex items-center gap-1.5 uppercase tracking-wider"
          >
            <span>Voir tout le catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 1. Ruban de Catégories Interactif (#ourProducts de La Roche) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pb-2">
          {SHOWCASE_DATA.map((item, idx) => {
            const isCurrent = selectedIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedIndex(idx)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 border-2 ${
                  isCurrent
                    ? "bg-primary-600 text-white border-primary-600 shadow-vibrant scale-105 z-10"
                    : "bg-slate-50 hover:bg-slate-100 text-dark-800 border-slate-200"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                    isCurrent ? "bg-white text-primary-600 shadow-sm" : "bg-white text-dark-700 shadow-xs"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-[11px] font-black leading-tight line-clamp-2">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Showcase Split 50/50 Dynamique (#featuredCateg de La Roche) */}
        <div className="mt-8 bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            {/* Visuel immersif plein cadre à gauche (6 cols) */}
            <div
              className="lg:col-span-6 relative min-h-[280px] lg:min-h-full bg-cover bg-center transition-all duration-500"
              style={{ backgroundImage: `url(${active.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-dark-950/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-solar-500 text-dark-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {active.badge}
                </span>
              </div>
            </div>

            {/* Fiche descriptive & Action à droite (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-10 text-white flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-extrabold text-solar-400 uppercase tracking-widest">
                  QUALITMAT SARL • {active.name}
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white leading-tight">
                  {active.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {active.description}
                </p>

                {/* Points forts */}
                <div className="space-y-2 pt-2">
                  {active.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-primary-500" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Double Action Rouge Vif & WhatsApp */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-slate-800">
                <Link
                  href={`/catalogue?cat=${active.slug}`}
                  className="btn-red px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-vibrant"
                >
                  <span>Voir les prix au catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={whatsappQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solar px-5 py-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-solar"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Devis immédiat pour ce rayon</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
