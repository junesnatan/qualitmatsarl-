"use client";

import React from "react";
import Link from "next/link";
import { Calculator, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingToolsTeaser() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1 : Calculateur de Matériaux BTP */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-solar-50 text-solar-600 border border-solar-200 flex items-center justify-center">
                  <Calculator className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase text-solar-700 bg-solar-100 px-2.5 py-1 rounded-full">
                  Outil Gratuit & Pratique
                </span>
              </div>

              <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 mb-2">
                Calculateur de Matériaux de Chantier
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                Ne vous trompez plus dans vos métrés ! Renseignez les dimensions de votre dalle, mur de parpaings, surface de peinture ou carrelage et obtenez les quantités exactes de ciment, fer et sable.
              </p>

              <ul className="space-y-2 text-xs text-slate-700 mb-6 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Calcul immédiat des sacs de ciment (CPJ 35 / 45)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Estimation des armatures et barres de fer à béton</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Ajout en 1 clic à votre devis WhatsApp</span>
                </li>
              </ul>
            </div>

            <Link
              href="/calculateur"
              className="btn-solar w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm active:scale-95 text-center"
            >
              <span>Lancer le Calculateur de Chantier</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2 : Espace Professionnels & Chantiers Gros Volume */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-primary-600/30 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary-600/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-600/20 text-primary-400 border border-primary-600/30 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase text-solar-400 bg-solar-500/10 border border-solar-500/20 px-2.5 py-1 rounded-full">
                  Entreprises BTP & Artisans
                </span>
              </div>

              <h3 className="font-heading font-black text-xl sm:text-2xl text-white mb-2">
                Espace Professionnels & Tarifs Grossistes
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                Vous pilotez un immeuble, un programme immobilier ou des travaux de second œuvre ? Bénéficiez d&apos;un compte professionnel avec des tarifs dégressifs d&apos;usine et une priorité logistique continue.
              </p>

              <ul className="space-y-2 text-xs text-slate-300 mb-6 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-solar-400 shrink-0" />
                  <span>Tarifs grossistes négociés par camions complets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-solar-400 shrink-0" />
                  <span>Planning de coulage garanti (aucun arrêt de chantier)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-solar-400 shrink-0" />
                  <span>Délivrance de factures normalisées avec IFU</span>
                </li>
              </ul>
            </div>

            <Link
              href="/pro"
              className="relative z-10 btn-red w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-vibrant active:scale-95 text-center"
            >
              <span>Accéder à l&apos;Espace Professionnel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
