"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { initialSettings } from "@/data/initialData";
import {
  ArrowRight,
  MessageCircle,
  Building2,
  Truck,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Sparkles,
} from "lucide-react";

const HERO_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    title: "Finitions & Carrelages Grands Formats",
    subtitle: "Des revêtements durables et esthétiques pour sublimer chaque espace de vie.",
    badge: "Showroom Finitions",
  },
  {
    url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1400&q=80",
    title: "Gros Œuvre & Fondations Durables",
    subtitle: "Ciment CPJ certifié et aciers haute adhérence FE E500 pour des structures inébranlables.",
    badge: "Qualité Bâtisseur",
  },
  {
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    title: "Dépôt d'Allègléta — Stock Permanent",
    subtitle: "Disponibilité immédiate et logistique camions bennes sur Calavi, Cotonou et environs.",
    badge: "Comptoir Central",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const whatsappDirectUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
    "Bonjour QUALITMAT SARL, je souhaite demander un devis pour mes matériaux de construction."
  )}`;

  return (
    <section className="relative overflow-hidden bg-sand-50/70 border-b border-sand-200 py-10 lg:py-16">
      {/* Trame d'architecture discrète en arrière-plan */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0B1728 1px, transparent 1px), linear-gradient(90deg, #0B1728 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Colonne Gauche : Statut, Titre, CTAs, Métriques (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tag Badge Statutaire */}
            <div className="inline-flex items-center gap-2 bg-white border border-sand-200 px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-gold-600" />
              <span className="text-xs font-semibold text-charcoal-700">
                Comptoir Allègléta / Tankpè — Abomey-Calavi
              </span>
            </div>

            {/* Titre fort & Haute Couture */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-brand-900 tracking-tight leading-[1.12]">
              L&apos;Excellence des Matériaux & le Savoir-Faire BTP.
            </h1>

            {/* Sous-titre soigné */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              De la solidité du gros œuvre (ciment CPJ certifié, fers haute adhérence) à la finesse des finitions intérieures (carrelage, sanitaire, plomberie). Obtenez un chiffrage transparent en FCFA et approvisionnez vos chantiers en toute sérénité.
            </p>

            {/* Double Action Prestige */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* CTA Primaire Doré Champagne */}
              <Link
                href="/catalogue"
                className="btn-touch px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-gold-glow transition-all active:scale-95 group"
              >
                <span>Explorer les Collections & Prix</span>
                <ArrowRight className="w-4 h-4 text-brand-950 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* CTA Secondaire WhatsApp VIP */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-touch px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-600/40 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Devis Immédiat par WhatsApp</span>
              </a>
            </div>

            {/* Métriques d'Autorité BTP (3 Chiffres clés) */}
            <div className="pt-6 border-t border-sand-200/90 grid grid-cols-3 gap-4">
              <div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-brand-900">
                  15+ ans
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  Présence au Bénin
                </div>
              </div>

              <div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-brand-900">
                  1 000+
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  Chantiers approvisionnés
                </div>
              </div>

              <div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-brand-900">
                  24-48h
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  Livraison sur site
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Slider Architectural Haute Définition (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-showroom-hover border border-sand-200 bg-brand-900 group">
              {/* Image active */}
              <div className="relative h-80 sm:h-96 w-full">
                <SafeImage
                  src={HERO_SLIDES[activeSlide].url}
                  alt={HERO_SLIDES[activeSlide].title}
                  categorySlug="cat-gros-oeuvre"
                  fill
                  priority
                  className="object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />

                {/* Légende en bas de diapositive */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="inline-flex items-center gap-1.5 bg-gold-400 text-brand-950 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    {HERO_SLIDES[activeSlide].badge}
                  </span>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-white drop-shadow-sm">
                    {HERO_SLIDES[activeSlide].title}
                  </h3>
                  <p className="text-xs text-slate-300 font-normal mt-0.5 line-clamp-2">
                    {HERO_SLIDES[activeSlide].subtitle}
                  </p>
                </div>
              </div>

              {/* Sélecteur de diapositives raffiné */}
              <div className="absolute top-4 right-4 flex gap-1.5 z-20">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSlide === idx
                        ? "w-7 bg-gold-400"
                        : "w-2 bg-white/60 hover:bg-white"
                    }`}
                    aria-label={`Diapositive ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Badge Flottant "Logistique Calavi & Cotonou" */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-sm border border-sand-200 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gold-100 text-gold-800 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] text-slate-400 uppercase font-bold">Logistique BTP</div>
                  <div className="text-xs font-bold text-slate-900">Camions Bennes & Plateaux</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
