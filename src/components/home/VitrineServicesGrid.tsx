"use client";

import React from "react";
import Link from "next/link";
import { Truck, Scissors, MessageSquare, ShieldCheck, ArrowRight, Building2 } from "lucide-react";

export default function VitrineServicesGrid() {
  const services = [
    {
      icon: Truck,
      title: "Livraison Directe sur Chantier",
      subtitle: "Abomey-Calavi, Cotonou, Ouidah",
      description:
        "Flotte de camions bennes (sable, gravier) et plateaux pour acheminer palettes de ciment et fers à béton jusqu'au pied de vos fondations.",
    },
    {
      icon: Scissors,
      title: "Découpe & Façonnage d'Aciers",
      subtitle: "Cadres, étriers, épingles sur mesure",
      description:
        "Nos équipes découpent et façonnent vos barres de fer selon vos plans de ferraillage pour accélérer le montage de vos armatures sur le chantier.",
    },
    {
      icon: MessageSquare,
      title: "Conseil & Accompagnement Technique",
      subtitle: "Dimensionnement & métrés",
      description:
        "Orientation personnalisée sur le choix de ciment (CPJ 35 vs 45), le dimensionnement des câbles cuivre ou des diamètres de tuyauterie PVC.",
    },
    {
      icon: ShieldCheck,
      title: "Vente en Gros & Marchés Entreprises",
      subtitle: "Tarifs dégressifs pour promoteurs",
      description:
        "Approvisionnement continu pour programmes immobiliers et gros chantiers avec facturation normalisée (IFU) et tarifs usines préférentiels.",
    },
  ];

  return (
    <section className="bg-slate-100 py-14 sm:py-20 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-widest bg-primary-50 border border-primary-200 px-3.5 py-1.5 rounded-full">
            <Building2 className="w-3.5 h-3.5" />
            <span>Nos Prestations Pro & Logistique</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900">
            Des Services Conçus pour Accélérer vos Travaux
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Plus qu&apos;une quincaillerie, QUALITMAT SARL est un partenaire de confiance qui s&apos;assure que vos approvisionnements ne ralentissent jamais votre calendrier de chantier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-primary-600 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 border border-primary-200 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base text-slate-900">
                      {srv.title}
                    </h3>
                    <p className="text-[11px] font-bold text-primary-600 uppercase tracking-wider mt-0.5">
                      {srv.subtitle}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href="/services"
                    className="text-xs font-bold text-slate-900 hover:text-primary-600 flex items-center gap-1.5 transition"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary-600" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
