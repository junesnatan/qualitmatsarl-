"use client";

import React from "react";
import Link from "next/link";
import { initialSettings } from "@/data/initialData";
import {
  ArrowRight,
  MessageCircle,
  Truck,
  ShieldCheck,
  FileCheck,
  PhoneCall,
  Layers,
} from "lucide-react";

export default function LandingHero() {
  return (
    <section className="relative w-full bg-slate-950 text-white overflow-hidden py-12 sm:py-16 lg:py-24 border-b-4 border-primary-600">
      {/* Background subtil & éléments de profondeur visuelle */}
      <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-solar-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Colonne Gauche : Titre fort, description et boutons d'action */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            {/* Badge de confiance BTP */}
            <div className="inline-flex items-center gap-2 bg-primary-600/20 text-solar-400 border border-primary-600/40 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-solar-400 animate-pulse" />
              <span>Dépôt Physique & Quincaillerie à Abomey-Calavi</span>
            </div>

            {/* Titre percutant & responsive */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-[1.15] text-white">
              Vos Matériaux de Construction au Bénin,{" "}
              <span className="text-solar-400 block sm:inline">
                Livrés Directement sur Chantier.
              </span>
            </h1>

            {/* Sous-titre clair */}
            <p className="text-xs sm:text-base text-slate-300 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Ciment CPJ certifié, fers à béton haute adhérence, tuyauterie PVC, câblerie cuivre, peinture et outillage professionnel. Obtenez votre devis direct en FCFA en 2 minutes.
            </p>

            {/* Deux Boutons d'Action Principaux (100% responsives et confortables au touch) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link
                href="/catalogue"
                className="btn-red w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 shadow-vibrant active:scale-95 group text-center"
              >
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>Accéder au Catalogue Complet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`https://wa.me/${initialSettings.whatsappNumber}?text=Bonjour%20QUALITMATSARL%2C%20je%20souhaite%20un%20devis%20rapide%20de%20matériaux`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solar w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 shadow-solar active:scale-95 text-center"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-dark-900" />
                <span>Devis WhatsApp Immédiat</span>
              </a>
            </div>

            {/* Téléphone direct cliquable */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
              <span>Besoin d&apos;assistance téléphonique ?</span>
              <a
                href="tel:+22996538455"
                className="text-solar-400 hover:underline font-bold flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+229 96 53 84 55</span>
              </a>
            </div>
          </div>

          {/* Colonne Droite : Bloc de présentation visuelle & 3 Garanties */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 rounded-2xl sm:rounded-3xl border border-slate-800 p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[11px] font-bold text-solar-400 uppercase tracking-wider block">
                  Sécurité & Fiabilité BTP
                </span>
                <h3 className="text-base sm:text-lg font-heading font-black text-white mt-0.5">
                  Pourquoi les conducteurs de travaux nous font confiance :
                </h3>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-600/20 text-primary-400 border border-primary-600/30 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Livraison Dédiée 24h à 48h</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                      Camions bennes et plateaux disponibles pour Calavi, Cotonou et tout l&apos;Atlantique.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Matériaux Strictement Conformes</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                      Aciers certifiés FE E500, ciments frais d&apos;usines agréées et câbles cuivre purs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-solar-500/20 text-solar-400 border border-solar-500/30 flex items-center justify-center shrink-0">
                    <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-solar-400" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Factures Normalisées avec IFU</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                      Entreprise agréée RCCM & IFU garantissant des pièces comptables conformes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Raccourci vers le catalogue */}
              <div className="pt-2 border-t border-slate-800">
                <Link
                  href="/catalogue"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-between transition group"
                >
                  <span className="text-slate-300 group-hover:text-white">Découvrir nos rayons en stock</span>
                  <span className="text-solar-400 font-extrabold flex items-center gap-1">
                    Voir les articles <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
