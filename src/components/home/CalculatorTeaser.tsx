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
  Paintbrush,
  Grid,
} from "lucide-react";

export default function CalculatorTeaser() {
  const [activeProject, setActiveProject] = useState<"dalle" | "mur" | "peinture">("dalle");
  const [surface, setSurface] = useState(50);

  // Calcul rapide indicatif
  const estimate = {
    cimentSacs: Math.round(surface * 0.7),
    ferBarres: Math.round(surface * 0.9),
    sableM3: (surface * 0.08).toFixed(1),
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-brand-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        {/* Cercles de fond décoratifs */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Colonne Gauche : Explications (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full">
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>Outil BTP Interactif — Exclusivité QUALITMATSARL</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight">
              Calculez vos matériaux de chantier en 3 clics
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Fini les incertitudes sur les quantités ! Estimez instantanément le nombre de sacs de ciment, barres de fer, volumes de sable et pots de peinture pour vos dalles, murs ou rénovations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-1" />
                <div className="text-xs font-bold text-white">Dosages réels</div>
                <div className="text-[10px] text-slate-300">Normes de maçonnerie béninoise</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-amber-400 mb-1" />
                <div className="text-xs font-bold text-white">Chiffrage FCFA</div>
                <div className="text-[10px] text-slate-300">Estimation immédiate des coûts</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mb-1" />
                <div className="text-xs font-bold text-white">Ajout au devis</div>
                <div className="text-[10px] text-slate-300">Envoi direct sur WhatsApp</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/calculateur"
                className="btn-touch inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-brand-950 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition active:scale-95 group"
              >
                <span>Accéder au Calculateur Complet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Colonne Droite : Simulateur Interactif Express (5 cols) */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Aperçu express
              </span>
              <span className="text-[11px] text-slate-300">Dalle béton (12 cm)</span>
            </div>

            {/* Slider de surface */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-slate-300">Surface du projet :</span>
                <span className="font-extrabold text-lg text-white font-mono">
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
                className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10 m² (petite pièce)</span>
                <span>200 m² (grand bâtiment)</span>
              </div>
            </div>

            {/* Résultats estimés */}
            <div className="mt-5 p-4 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">
                Estimation des besoins :
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Ciment CPJ 45/35 (50 kg) :</span>
                <span className="font-bold text-amber-300 font-mono">
                  ~ {estimate.cimentSacs} sacs
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Fers à béton HA (barres 12 m) :</span>
                <span className="font-bold text-amber-300 font-mono">
                  ~ {estimate.ferBarres} barres
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Sable propre de lagune :</span>
                <span className="font-bold text-amber-300 font-mono">
                  ~ {estimate.sableM3} m³
                </span>
              </div>
            </div>

            <Link
              href="/calculateur"
              className="mt-4 w-full py-2.5 px-4 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition text-center"
            >
              <span>Personnaliser ce calcul & ajouter au devis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
