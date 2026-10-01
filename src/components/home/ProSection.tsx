import React from "react";
import Link from "next/link";
import { Building2, Truck, FileText, ArrowRight, ShieldCheck, Briefcase } from "lucide-react";

export default function ProSection() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
          {/* Contenu */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-brand-800 text-amber-400 border border-brand-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Service Entreprises & Artisans BTP</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight">
              Un partenaire de confiance pour vos chantiers à <span className="text-amber-400">Abomey-Calavi & Cotonou</span>
            </h2>

            <p className="mt-4 text-slate-300 text-sm leading-relaxed">
              Qualimat SARL accompagne les conducteurs de travaux, promoteurs, architectes et maîtres d&apos;œuvre : bordereaux quantitatifs, remises sur volumes, facturation normalisée et approvisionnement programmé.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                <Truck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold">Livraison Chantier</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Dépose de ciment et ferraillage directement sur votre site de construction.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                <Building2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold">Tarifs Grossiste BTP</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Conditions préférentielles dès 100 sacs de ciment et lots d&apos;acier.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                <FileText className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold">Factures Normalisées IFU</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Conformité légale et fiscale complète pour votre comptabilité.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-xs font-bold">Normes & Certifications</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Acier FE E500 haute adhérence contrôlé, ciment frais certifié.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/pro"
                className="btn-touch bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase px-6 py-3 rounded-lg tracking-wider inline-flex items-center gap-2 shadow transition active:scale-95"
              >
                <span>Accéder à l&apos;Espace Professionnel</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Carte visuelle récapitulative */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 p-6 sm:p-7 rounded-xl border border-slate-700">
              <h3 className="font-heading text-lg text-white font-bold mb-4">
                Comment fonctionne le service Pro ?
              </h3>

              <ul className="space-y-3.5 text-xs text-slate-300 mb-6">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-700 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">1</span>
                  <span>Transmettez votre bordereau de besoins ou liste estimative</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-700 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">2</span>
                  <span>Chiffrage détaillé avec remises de volume sous 2 heures</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-brand-700 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">3</span>
                  <span>Planification de livraison sur site ou retrait prioritaire</span>
                </li>
              </ul>

              <div className="bg-slate-900/80 p-4 rounded-lg text-center border border-slate-700/60">
                <p className="text-xs text-slate-400 mb-1.5">Un interlocuteur dédié vous répond :</p>
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-amber-400 hover:underline inline-flex items-center gap-1"
                >
                  Contacter le Responsable Chantier →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
