import React from "react";
import Link from "next/link";
import { HardHat, Building2, Truck, FileText, ArrowRight, ShieldCheck } from "lucide-react";

export default function ProSection() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-acier-900 rounded-2xl border border-acier-800 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
          {/* Contenu */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-jaune/20 border border-jaune/40 text-jaune px-3 py-1 rounded text-xs font-black uppercase tracking-wider mb-4">
              <HardHat className="w-4 h-4" />
              <span>Service BTP, Artisans & Entreprises</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase text-white leading-tight">
              Vous construisez un chantier à <span className="text-jaune">Calavi ou Cotonou ?</span>
            </h2>

            <p className="mt-4 text-acier-300 text-sm sm:text-base leading-relaxed">
              Qualimat SARL accompagne les maîtres d&apos;œuvre, chefs de chantiers, promoteurs et maçons avec des conditions dédiées : devis chantiers personnalisés, bordereaux de prix unitaires, livraison directe sur site et approvisionnement continu.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-acier-800/80 p-3 rounded border border-acier-700">
                <Truck className="w-5 h-5 text-jaune shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold uppercase">Livraison Grue & Benne</h4>
                  <p className="text-[11px] text-acier-400 mt-0.5">
                    Dépose de palettes de ciment et barres de fer directement au pied de vos fondations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-acier-800/80 p-3 rounded border border-acier-700">
                <Building2 className="w-5 h-5 text-jaune shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold uppercase">Tarifs Gros Volumes</h4>
                  <p className="text-[11px] text-acier-400 mt-0.5">
                    Remises quantitatives dès 100 sacs de ciment et 5 tonnes d&apos;acier.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-acier-800/80 p-3 rounded border border-acier-700">
                <FileText className="w-5 h-5 text-jaune shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold uppercase">Facturation avec IFU</h4>
                  <p className="text-[11px] text-acier-400 mt-0.5">
                    Conformité fiscale complète et factures normalisées pour votre comptabilité.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-acier-800/80 p-3 rounded border border-acier-700">
                <ShieldCheck className="w-5 h-5 text-jaune shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold uppercase">Matériaux Certifiés</h4>
                  <p className="text-[11px] text-acier-400 mt-0.5">
                    Acier FE E500 haute adhérence contrôlé, ciment frais sans agglomération.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/pro"
                className="btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-xs px-6 py-3 rounded tracking-wider flex items-center gap-2 shadow-lg transition active:scale-95"
              >
                <span>Déposer un devis chantier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Carte visuelle récapitulative */}
          <div className="lg:col-span-5">
            <div className="bg-acier-950 p-6 rounded-xl border border-acier-700 relative">
              <div className="h-1.5 stripe-accent w-full rounded-t -mt-6 -mx-6 mb-6" />

              <h3 className="font-heading text-xl text-white font-black uppercase mb-4">
                Formule Devis Express Chantier
              </h3>

              <ul className="space-y-3 text-xs text-acier-300 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-jaune/20 text-jaune flex items-center justify-center font-bold text-[10px]">1</span>
                  <span>Envoyez votre liste de besoins ou bordereau quantitatif</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-jaune/20 text-jaune flex items-center justify-center font-bold text-[10px]">2</span>
                  <span>Chiffrage détaillé avec remises de volume sous 2 heures</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-jaune/20 text-jaune flex items-center justify-center font-bold text-[10px]">3</span>
                  <span>Planification de livraison sur site ou retrait prioritaire</span>
                </li>
              </ul>

              <div className="bg-acier-900 p-4 rounded text-center border border-acier-800">
                <p className="text-xs text-acier-400 mb-2">Besoin d&apos;un échange direct maintenant ?</p>
                <Link
                  href="/contact"
                  className="text-xs font-bold text-jaune hover:underline uppercase tracking-wide inline-flex items-center gap-1"
                >
                  Contacter le Responsable Chantier Qualimat →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
