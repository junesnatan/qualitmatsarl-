import React from "react";
import Image from "next/image";
import Link from "next/link";
import { initialSettings } from "@/data/initialData";
import { HardHat, ShieldCheck, Target, Award, ArrowRight, MapPin } from "lucide-react";

export default function AProposPage() {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="border-b-2 border-acier-200 pb-6 mb-8">
        <div className="text-xs font-bold text-bleu uppercase tracking-widest flex items-center gap-1.5 mb-1">
          <HardHat className="w-4 h-4 text-jaune-hover" />
          <span>Qui sommes-nous</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-acier uppercase">
          L&apos;Exigence des Matériaux pour Bâtir Durable
        </h1>
        <p className="text-xs sm:text-sm text-acier-600 mt-1 max-w-3xl">
          Implantée au cœur de la commune d&apos;Abomey-Calavi, Qualimat SARL est née d&apos;une volonté claire : rendre l&apos;approvisionnement en matériaux de construction rapide, transparent et fiable pour tous les bâtisseurs béninois.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-acier-700 leading-relaxed">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-acier uppercase">
            Notre Mission : Faire gagner du temps à ceux qui construisent
          </h2>
          <p>
            Sur un chantier, chaque heure perdue à attendre un camion ou à négocier des prix introuvables coûte cher. Chez Qualimat, nous avons repensé la quincaillerie :
          </p>
          <ul className="space-y-2 pl-4 border-l-2 border-jaune">
            <li><strong>Des prix clairs et affichés :</strong> Fini le flou tarifaire. Nos prix sont nets et transparents.</li>
            <li><strong>Zéro compromis sur la solidité :</strong> Nous ne vendons aucun fer sous-dosé ou ciment altéré. Seuls les produits certifiés entrent dans nos entrepôts.</li>
            <li><strong>Le numérique au service du terrain :</strong> Avec notre outil de devis WhatsApp, vous préparez votre liste depuis votre téléphone sur le chantier, et notre équipe prépare le chargement avant même votre arrivée.</li>
          </ul>
        </div>

        <div className="lg:col-span-6 relative h-80 rounded-2xl overflow-hidden shadow-xl border-2 border-acier-800">
          <Image
            src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
            alt="Entrepôt et équipe Qualimat"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Valeurs piliers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-6 rounded-xl border border-beton-dark shadow-sm">
          <div className="w-12 h-12 bg-jaune/10 border border-jaune/30 rounded-lg flex items-center justify-center text-jaune mb-4">
            <ShieldCheck className="w-6 h-6 text-jaune-hover" />
          </div>
          <h3 className="font-heading font-black text-xl text-acier uppercase mb-2">
            1. Conformité & Qualité
          </h3>
          <p className="text-xs text-acier-600 leading-relaxed">
            Fers haute adhérence FE E500 contrôlés, ciments d&apos;usines certifiées, câbleries cuivre pur. Nous garantissons la pérennité de vos ouvrages.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-beton-dark shadow-sm">
          <div className="w-12 h-12 bg-jaune/10 border border-jaune/30 rounded-lg flex items-center justify-center text-jaune mb-4">
            <Target className="w-6 h-6 text-jaune-hover" />
          </div>
          <h3 className="font-heading font-black text-xl text-acier uppercase mb-2">
            2. Réactivité Chantier
          </h3>
          <p className="text-xs text-acier-600 leading-relaxed">
            Réponse WhatsApp rapide, chargement fluide des camions au magasin et livraisons coordonnées selon vos étapes de coulage.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-beton-dark shadow-sm">
          <div className="w-12 h-12 bg-jaune/10 border border-jaune/30 rounded-lg flex items-center justify-center text-jaune mb-4">
            <Award className="w-6 h-6 text-jaune-hover" />
          </div>
          <h3 className="font-heading font-black text-xl text-acier uppercase mb-2">
            3. Rigueur Fiscale & Légale
          </h3>
          <p className="text-xs text-acier-600 leading-relaxed">
            Entreprise formelle enregistrée au RCCM d&apos;Abomey-Calavi avec IFU actif. Délivrance systématique de factures normalisées pour entreprises.
          </p>
        </div>
      </div>

      {/* Cadre légal */}
      <div className="bg-acier-900 text-white rounded-xl p-8 border border-acier-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-heading font-black text-2xl uppercase mb-1">
            Qualimat SARL — Identité Entreprise
          </h3>
          <p className="text-xs text-acier-300">
            RCCM : {initialSettings.rccm} • IFU : {initialSettings.ifu} • Siège : {initialSettings.adresse}
          </p>
        </div>

        <Link
          href="/contact"
          className="btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-xs px-6 py-3 rounded tracking-wider flex items-center gap-2 shrink-0 shadow"
        >
          <MapPin className="w-4 h-4" />
          <span>Venir au magasin</span>
        </Link>
      </div>
    </div>
  );
}
