"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  Box,
  Compass,
} from "lucide-react";

export default function CalculatorTeaser() {
  const [surface, setSurface] = useState(50);

  // Estimation rapide selon ratios BTP standards
  const estimate = {
    cimentSacs: Math.round(surface * 0.7),
    ferBarres: Math.round(surface * 0.9),
    sableM3: (surface * 0.08).toFixed(1),
  };

  return (
    <section className="py-14 px-4 max-w-7xl mx-auto">
      <div className="bg-brand-900 rounded-3xl p-6 sm:p-12 text-white shadow-showroom-hover border border-brand-800 relative overflow-hidden">
        {/* Cercles de fond décoratifs doux */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 top-0 w-64 h-64 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Colonne Gauche : Explications (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-gold-500/15 text-gold-300 border border-gold-500/30 text-xs font-bold px-3.5 py-1.5 rounded-full">
              <Compass className="w-3.5 h-3.5 text-gold-400" />
              <span>Studio d&apos;Ingénierie & Estimation Chantier</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white leading-tight">
              Estimez Vos Volumes de Matériaux en Toute Précision.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Évitez les surplus coûteux et les ruptures sur chantier. Notre simulateur intègre les ratios de dosage certifiés pour les dalles béton, fondations, maçonneries et carrelages au Bénin.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-brand-800/80 rounded-xl p-3.5 border border-brand-700">
                <CheckCircle2 className="w-4 h-4 text-gold-400 mb-1" />
                <div className="text-xs font-bold text-white">Dosages réels</div>
                <div className="text-[10px] text-slate-300">Normes maçonnerie béninoise</div>
              </div>

              <div className="bg-brand-800/80 rounded-xl p-3.5 border border-brand-700">
                <CheckCircle2 className="w-4 h-4 text-gold-400 mb-1" />
                <div className="text-xs font-bold text-white">Chiffrage FCFA</div>
                <div className="text-[10px] text-slate-300">Tarifs actualisés du dépôt</div>
              </div>

              <div className="bg-brand-800/80 rounded-xl p-3.5 border border-brand-700">
                <CheckCircle2 className="w-4 h-4 text-gold-400 mb-1" />
                <div className="text-xs font-bold text-white">Export devis direct</div>
                <div className="text-[10px] text-slate-300">Envoi en 1 clic sur WhatsApp</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/calculateur"
                className="btn-touch inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-gold-glow transition active:scale-95 group"
              >
                <span>Accéder au Simulateur Complet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Colonne Droite : Simulateur Express Épuré (5 cols) */}
          <div className="lg:col-span-5 bg-brand-950/80 rounded-2xl p-6 border border-brand-800 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-800">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                Simulation Express Dalle (12 cm)
              </span>
              <span className="text-[11px] text-slate-400">Béton armé</span>
            </div>

            {/* Slider de surface */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-300">Surface à couler :</span>
                <span className="font-extrabold text-xl text-gold-400 font-mono">
                  {surface} m²
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={surface}
                onChange={(e) => setSurface(Number(e.target.value))}
                className="w-full accent-gold-400 h-2 bg-brand-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10 m² (rénovation)</span>
                <span>200 m² (bâtiment R+1)</span>
              </div>
            </div>

            {/* Résultats estimés */}
            <div className="mt-5 p-4 rounded-xl bg-brand-900/90 border border-brand-800 space-y-2">
              <div className="text-[10px] text-gold-300 uppercase font-bold tracking-wider">
                Approvisionnement recommandé :
              </div>
              <div className="flex justify-between text-xs pt-1">
                <span className="text-slate-300">Ciment CPJ 45/35 (50 kg) :</span>
                <span className="font-bold text-gold-300 font-mono">
                  ~ {estimate.cimentSacs} sacs
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Aciers HA FE E500 (12 m) :</span>
                <span className="font-bold text-gold-300 font-mono">
                  ~ {estimate.ferBarres} barres
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Sable lavé criblé :</span>
                <span className="font-bold text-gold-300 font-mono">
                  ~ {estimate.sableM3} m³
                </span>
              </div>
            </div>

            <Link
              href="/calculateur"
              className="mt-4 w-full py-2.5 px-4 bg-brand-800 hover:bg-brand-700 text-white border border-brand-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition text-center"
            >
              <span>Personnaliser & ajouter à la liste</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
