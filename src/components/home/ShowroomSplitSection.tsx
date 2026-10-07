"use client";

import React from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { initialSettings } from "@/data/initialData";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building,
  Layers,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

export default function ShowroomSplitSection() {
  const whatsappUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
    "Bonjour QUALITMAT SARL, je souhaite des conseils pour un projet de construction/finition."
  )}`;

  return (
    <section className="py-14 bg-white border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Colonne Gauche (6 cols) : Grand Visuel Immersif d'Inspiration (Inspiration JAFCO & La Roche) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-showroom-hover border border-sand-200 h-96 sm:h-[480px]">
              <SafeImage
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Showroom Qualitmat SARL — Finitions et Carrelages"
                categorySlug="cat-peinture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-black/10" />

              {/* Badge Showroom d'inspiration */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-sm border border-sand-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span className="text-xs font-bold text-brand-900 tracking-wide uppercase">
                  Espace Inspirations & Finitions
                </span>
              </div>

              {/* Texte en bas du visuel */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs text-gold-300 font-semibold uppercase tracking-wider block mb-1">
                  Abomey-Calavi • Bénin
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white leading-snug">
                  Harmonie des matières, noblesse du bâti.
                </h3>
              </div>
            </div>
          </div>

          {/* Colonne Droite (6 cols) : Bloc Éditorial Haute Définition */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 uppercase tracking-widest mb-2">
                <Layers className="w-3.5 h-3.5 text-gold-600" />
                <span>Du Gros Œuvre à la Finition</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-brand-900 tracking-tight leading-tight">
                L&apos;Exigence BTP au Service de Vos Plus Beaux Espaces.
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Chez QUALITMAT SARL, nous croyons qu&apos;une construction réussie conjugue la robustesse invisible des fondations et l&apos;élégance visible des finitions. Notre comptoir approvisionne les maîtres d&apos;ouvrage avec le même degré d&apos;intransigeance sur la qualité.
              </p>
            </div>

            {/* Deux Piliers d'Accompagnement */}
            <div className="space-y-4 pt-1">
              <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-gold-100 text-gold-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-brand-900">
                    Structure & Gros Œuvre Certifié
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Ciments frais CPJ 35 & 45 contrôlés, armatures acier haute adhérence FE E500 conformes aux normes et agrégats criblés pour une pérennité décennale.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-gold-100 text-gold-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-brand-900">
                    Finitions, Carrelages & Sanitaire
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Grands carreaux effet marbre ou béton ciré, robinetterie céramique contemporaine, peintures lavables et appareillages pour valoriser chaque pièce.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/catalogue"
                className="btn-touch px-5 py-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
              >
                <span>Consulter le Catalogue Complet</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-touch px-5 py-3 rounded-xl bg-white hover:bg-sand-50 text-slate-800 border border-sand-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Conseil Personnalisé</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
