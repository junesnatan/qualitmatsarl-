import React from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { initialSettings } from "@/data/initialData";
import { Building2, ShieldCheck, Target, Award, MapPin } from "lucide-react";

export default function AProposPage() {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary-600 uppercase tracking-widest bg-primary-50 border border-primary-200 px-3 py-1 rounded-full mb-3">
          <Building2 className="w-4 h-4 text-primary-600" />
          <span>L&apos;Entreprise</span>
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900">
          L&apos;Exigence des Matériaux pour Bâtir Durable avec <span className="text-primary-600">QUALITMAT SARL</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
          Implantée à Abomey-Calavi (Allègléta / Pavé de Tankpè), QUALITMATSARL distribue des matériaux de construction et de la quincaillerie générale auprès des professionnels du BTP, artisans et maîtres d&apos;ouvrage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h2 className="font-heading font-bold text-2xl text-slate-900">
            Notre Mission : Fluidifier l&apos;approvisionnement de vos chantiers
          </h2>
          <p>
            Sur un chantier, la régularité et la conformité des approvisionnements conditionnent directement le calendrier et la pérennité de l&apos;ouvrage. Chez QUALITMATSARL, nous garantissons :
          </p>
          <ul className="space-y-2.5 pl-4 border-l-2 border-primary-600 text-slate-700">
            <li><strong>Des prix clairs et compétitifs :</strong> Transparence tarifaire en FCFA pour maîtriser vos budgets sans coûts cachés.</li>
            <li><strong>Des matériaux strictement conformes :</strong> Fers certifiés FE E500, ciments d&apos;usines aux normes, câbles 100% cuivre pur.</li>
            <li><strong>Des outils digitaux efficaces :</strong> Devis instantanés préparés en ligne et confirmés sur WhatsApp en temps record.</li>
          </ul>
        </div>

        <div className="lg:col-span-6 relative h-80 rounded-2xl overflow-hidden shadow-md border border-slate-200">
          <SafeImage
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
            alt="Entrepôt et équipe QUALITMATSARL"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Valeurs piliers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
            1. Qualité & Conformité
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Contrôle rigoureux des origines de nos produits auprès des industriels du ciment et de la sidérurgie pour garantir la sécurité des ouvrages.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-solar-50 border border-solar-200 rounded-xl flex items-center justify-center text-solar-600 mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
            2. Réactivité & Logistique
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Écoute active, réponse rapide par WhatsApp (01 96 53 84 55) et capacité de livraison programmée selon les phases de coulage.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
            3. Rigueur Légale
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Société formelle immatriculée au RCCM d&apos;Abomey-Calavi avec IFU en règle et délivrance systématique de factures normalisées.
          </p>
        </div>
      </div>

      {/* Cadre légal */}
      <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-1">
            QUALITMATSARL — Identité Entreprise
          </h3>
          <p className="text-xs text-slate-500">
            RCCM : {initialSettings.rccm} • IFU : {initialSettings.ifu} • Siège social : {initialSettings.adresse}
          </p>
        </div>

        <Link
          href="/contact"
          className="btn-red text-xs px-6 py-2.5 rounded-xl flex items-center gap-2 shrink-0 shadow-md font-bold"
        >
          <MapPin className="w-4 h-4" />
          <span>Localiser le magasin</span>
        </Link>
      </div>
    </div>
  );
}
