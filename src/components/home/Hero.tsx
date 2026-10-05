"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { initialSettings } from "@/data/initialData";
import {
  ArrowRight,
  MessageCircle,
  Building2,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  MapPin,
} from "lucide-react";

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    caption: "Dépôt Allègléta — Stock permanent de ciments & agrégats",
  },
  {
    url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
    caption: "Livraison directe sur chantier — Camions bennes et plateaux",
  },
  {
    url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    caption: "Aciers certifiés FE E500 haute adhérence pour dalles & fondations",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const whatsappDirectUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
    "Bonjour QUALITMATSARL, je souhaite me renseigner sur vos matériaux et disponibilités."
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/40 border-b border-slate-200/80 py-10 lg:py-16">
      {/* Motif de grille architectural en arrière-plan */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0F2C59 1px, transparent 1px), linear-gradient(90deg, #0F2C59 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Colonne Gauche : Titre, Positionnement, CTAs, Stats (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tag Badge de Localisation & Autorité */}
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200/70 text-brand-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-brand-900" />
              <span>Quincaillerie & Matériaux — Allègléta / Pavé de Tankpè (Calavi)</span>
            </div>

            {/* Titre fort */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Vos matériaux de construction,{" "}
              <span className="text-brand-900 relative">
                livrés sans détour
                <svg
                  className="absolute left-0 -bottom-1.5 w-full h-2 text-amber-400 -z-10"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="transparent" />
                </svg>
              </span>
              .
            </h1>

            {/* Sous-titre percutant */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Ciment frais CPJ 35 & 45, fers à béton haute adhérence, tuyauterie PVC, câblerie cuivre et outillage professionnel. Obtenez votre devis chiffré en FCFA et faites-vous livrer directement sur chantier à Abomey-Calavi et Cotonou.
            </p>

            {/* Double Call-To-Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {/* CTA Primaire Ambre */}
              <Link
                href="/catalogue"
                className="btn-touch px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-brand-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 group"
              >
                <span>Voir le catalogue de prix</span>
                <ArrowRight className="w-4 h-4 text-brand-950 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* CTA Secondaire WhatsApp */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-touch px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-600/80 font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Discuter sur WhatsApp</span>
              </a>
            </div>

            {/* 3 Chiffres Clés en ligne (Stats) */}
            <div className="pt-6 border-t border-slate-200/90 grid grid-cols-3 gap-4">
              <div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-brand-900">
                  15+ ans
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  D&apos;expertise et présence
                </div>
              </div>

              <div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-brand-900">
                  1000+
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Chantiers approvisionnés
                </div>
              </div>

              <div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-brand-900">
                  24-48h
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Livraison sur site
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Slider Réel / Visuel Dépôt & Camion (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              {/* Image principale */}
              <div className="relative h-72 sm:h-96 w-full">
                <SafeImage
                  src={HERO_IMAGES[activeSlide].url}
                  alt={HERO_IMAGES[activeSlide].caption}
                  categorySlug="cat-gros-oeuvre"
                  fill
                  priority
                  className="object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                {/* Légende en bas de l'image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-flex items-center gap-1.5 bg-amber-400 text-brand-950 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                    <ShieldCheck className="w-3 h-3 text-brand-950" />
                    QUALITMATSARL
                  </span>
                  <p className="text-xs sm:text-sm font-semibold leading-snug drop-shadow-sm">
                    {HERO_IMAGES[activeSlide].caption}
                  </p>
                </div>
              </div>

              {/* Sélecteur de diapositives interactif */}
              <div className="absolute top-4 right-4 flex gap-1.5 z-20">
                {HERO_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      activeSlide === idx
                        ? "w-6 bg-amber-400"
                        : "w-2 bg-white/60 hover:bg-white"
                    }`}
                    aria-label={`Afficher la photo ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Badge flottant Livraison */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-lg border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Flotte dédiée</div>
                  <div className="text-xs font-bold text-slate-900">Livraison Calavi & Cotonou</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
