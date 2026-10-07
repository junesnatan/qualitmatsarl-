"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { initialProducts } from "@/data/initialData";
import { formatFcfa } from "@/lib/storage";
import {
  Calculator,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ClipboardList,
  Building2,
  Plus,
  Minus,
  RotateCcw,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";

type ProjectType = "dalle" | "mur" | "peinture" | "carrelage";

export default function CalculateurPage() {
  const { addToCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [projectType, setProjectType] = useState<ProjectType>("dalle");

  // Inputs Dalle
  const [dalleLongueur, setDalleLongueur] = useState(10);
  const [dalleLargeur, setDalleLargeur] = useState(5);
  const [dalleEpaisseur, setDalleEpaisseur] = useState(12); // en cm

  // Inputs Mur
  const [murLongueur, setMurLongueur] = useState(15);
  const [murHauteur, setMurHauteur] = useState(2.8);
  const [murTypeParpaing, setMurTypeParpaing] = useState<15 | 20>(15);

  // Inputs Peinture
  const [peintureSurface, setPeintureSurface] = useState(80);
  const [peintureCouches, setPeintureCouches] = useState<1 | 2>(2);

  // Inputs Carrelage
  const [carrelageSurface, setCarrelageSurface] = useState(45);
  const [carrelageMarge, setCarrelageMarge] = useState(10); // % de perte

  const [allAdded, setAllAdded] = useState(false);

  // Calculs Dalle
  const dalleSurface = dalleLongueur * dalleLargeur;
  const dalleVolume = Number((dalleSurface * (dalleEpaisseur / 100)).toFixed(2));
  // Dosage standard 350 kg/m3 : 7 sacs ciment / m3
  const dalleCimentSacs = Math.ceil(dalleVolume * 7);
  const dalleSableM3 = Number((dalleVolume * 0.45).toFixed(1));
  const dalleGravierM3 = Number((dalleVolume * 0.8).toFixed(1));
  // Armatures : environ 8 barres de fer 10mm par 10 m2
  const dalleFer10Barres = Math.ceil((dalleSurface / 10) * 8);
  const dalleFilRecuitRouleau = Math.max(1, Math.ceil(dalleSurface / 80));

  // Calculs Mur
  const murSurface = Number((murLongueur * murHauteur).toFixed(1));
  // 12.5 parpaings par m2
  const murParpaingsTotal = Math.ceil(murSurface * 12.5);
  // Joint mortier : ~ 1 sac ciment pour 45 parpaings
  const murCimentSacs = Math.ceil(murParpaingsTotal / 45);
  const murSableM3 = Number((murCimentSacs * 0.12).toFixed(1));

  // Calculs Peinture
  // Rendement standard : ~ 6 m2 par kg pour 1 couche
  const peintureKgTotal = Math.ceil(
    (peintureSurface * peintureCouches) / 6
  );
  const peinturePots20kg = Math.ceil(peintureKgTotal / 20);
  const peintureEnduitSacs = Math.ceil(peintureSurface / 40);

  // Calculs Carrelage
  const carrelageSurfaceTotal = Math.ceil(
    carrelageSurface * (1 + carrelageMarge / 100)
  );
  // 1 sac colle 25kg pour environ 5 m2
  const carrelageColleSacs = Math.ceil(carrelageSurface / 5);

  // Trouver les produits correspondants du catalogue pour injection dans CartContext
  const prodCiment35 = initialProducts.find((p) => p.id === "prod-cim-35");
  const prodCiment45 = initialProducts.find((p) => p.id === "prod-cim-45");
  const prodFer10 = initialProducts.find((p) => p.id === "prod-fer-10");
  const prodFilRecuit = initialProducts.find((p) => p.id === "prod-fil-recuit");
  const prodParpaings15 = initialProducts.find((p) => p.id === "prod-parpaings-15");
  const prodPeintureFacade = initialProducts.find((p) => p.id === "prod-peinture-facade-20kg");
  const prodEnduitLissage = initialProducts.find((p) => p.id === "prod-enduit-lissage-25kg");
  const prodColleCarrelage = initialProducts.find((p) => p.id === "prod-colle-carrelage-25kg");

  // Ajouter tous les matériaux calculés au panier
  const handleAddAllToCart = () => {
    if (projectType === "dalle") {
      if (prodCiment45) addToCart(prodCiment45, dalleCimentSacs);
      if (prodFer10) addToCart(prodFer10, dalleFer10Barres);
      if (prodFilRecuit) addToCart(prodFilRecuit, dalleFilRecuitRouleau);
    } else if (projectType === "mur") {
      if (prodParpaings15) addToCart(prodParpaings15, murParpaingsTotal);
      if (prodCiment35) addToCart(prodCiment35, murCimentSacs);
    } else if (projectType === "peinture") {
      if (prodPeintureFacade) addToCart(prodPeintureFacade, peinturePots20kg);
      if (prodEnduitLissage) addToCart(prodEnduitLissage, peintureEnduitSacs);
    } else if (projectType === "carrelage") {
      if (prodColleCarrelage) addToCart(prodColleCarrelage, carrelageColleSacs);
      if (prodCiment35) addToCart(prodCiment35, Math.ceil(carrelageSurface / 20));
    }

    setAllAdded(true);
    setTimeout(() => setAllAdded(false), 3000);
  };

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      {/* En-tête */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 uppercase tracking-widest mb-2 bg-sand-100 px-3.5 py-1 rounded-full border border-sand-200">
          <Calculator className="w-4 h-4 text-gold-600" />
          <span>Studio d&apos;Ingénierie & Calculateur BTP</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-heading font-black text-brand-900 leading-tight">
          Estimez vos Quantités & Votre Devis en 3 Étapes
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Sélectionnez votre type de travaux, ajustez vos dimensions et obtenez un bordereau quantitatif précis que vous pouvez injecter directement dans votre liste de devis WhatsApp.
        </p>
      </div>

      {/* Stepper Horizontal avec barre de progression */}
      <div className="mb-10 max-w-xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Ligne de fond */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 -z-10" />
          {/* Ligne active */}
          <div
            className="absolute top-1/2 left-0 h-1 bg-brand-900 -translate-y-1/2 -z-10 transition-all duration-300"
            style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
          />

          {/* Étape 1 */}
          <button
            onClick={() => setStep(1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition shadow-sm ${
              step >= 1
                ? "bg-brand-900 text-white ring-4 ring-brand-100"
                : "bg-white border-2 border-slate-300 text-slate-500"
            }`}
          >
            1
          </button>

          {/* Étape 2 */}
          <button
            onClick={() => setStep(2)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition shadow-sm ${
              step >= 2
                ? "bg-brand-900 text-white ring-4 ring-brand-100"
                : "bg-white border-2 border-slate-300 text-slate-500"
            }`}
          >
            2
          </button>

          {/* Étape 3 */}
          <button
            onClick={() => setStep(3)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition shadow-sm ${
              step === 3
                ? "bg-brand-900 text-white ring-4 ring-brand-100"
                : "bg-white border-2 border-slate-300 text-slate-500"
            }`}
          >
            3
          </button>
        </div>

        <div className="flex justify-between text-[11px] font-bold text-slate-600 mt-2 px-1">
          <span className={step === 1 ? "text-brand-900" : ""}>1. Projet</span>
          <span className={step === 2 ? "text-brand-900" : ""}>2. Dimensions</span>
          <span className={step === 3 ? "text-brand-900" : ""}>3. Résultat</span>
        </div>
      </div>

      {/* Conteneur Carte Principale */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 mb-8">
        {/* ÉTAPE 1 : Type de projet */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
              Étape 1 : Quel ouvrage souhaitez-vous réaliser ?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1 : Dalle Béton */}
              <div
                onClick={() => setProjectType("dalle")}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  projectType === "dalle"
                    ? "border-brand-900 bg-brand-50/50 shadow-md ring-2 ring-brand-900/10"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
                    🏗️
                  </div>
                  {projectType === "dalle" && (
                    <CheckCircle2 className="w-5 h-5 text-brand-900" />
                  )}
                </div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">
                  Dalle ou Plancher Béton Armé
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Coulage de dalle pleine, radier, plancher terrasse ou dallage de sol. Calcule le ciment, ferraillage, sable et gravier.
                </p>
              </div>

              {/* Option 2 : Mur en parpaings */}
              <div
                onClick={() => setProjectType("mur")}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  projectType === "mur"
                    ? "border-brand-900 bg-brand-50/50 shadow-md ring-2 ring-brand-900/10"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-lg">
                    🧱
                  </div>
                  {projectType === "mur" && (
                    <CheckCircle2 className="w-5 h-5 text-brand-900" />
                  )}
                </div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">
                  Mur en Parpaings & Clôture
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Élévation de murs extérieurs, clôtures de terrain ou cloisons intérieures. Calcule les parpaings, ciment de pose et sable.
                </p>
              </div>

              {/* Option 3 : Peinture & Finition */}
              <div
                onClick={() => setProjectType("peinture")}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  projectType === "peinture"
                    ? "border-brand-900 bg-brand-50/50 shadow-md ring-2 ring-brand-900/10"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                    🎨
                  </div>
                  {projectType === "peinture" && (
                    <CheckCircle2 className="w-5 h-5 text-brand-900" />
                  )}
                </div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">
                  Peinture Façade ou Intérieur
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Mise en peinture neuve ou rénovation de murs. Calcule les pots de peinture 20 kg et les sacs d&apos;enduit de lissage.
                </p>
              </div>

              {/* Option 4 : Carrelage Sol */}
              <div
                onClick={() => setProjectType("carrelage")}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  projectType === "carrelage"
                    ? "border-brand-900 bg-brand-50/50 shadow-md ring-2 ring-brand-900/10"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-lg">
                    📐
                  </div>
                  {projectType === "carrelage" && (
                    <CheckCircle2 className="w-5 h-5 text-brand-900" />
                  )}
                </div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">
                  Pose de Carrelage & Faïence
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Revêtement des sols et pièces d&apos;eau. Calcule la surface avec marge de chute et les sacs de ciment-colle haute performance.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="btn-touch px-6 py-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition active:scale-95"
              >
                <span>Étape suivante : Dimensions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : Dimensions */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
                Étape 2 : Indiquez les dimensions de votre projet
              </h2>
              <span className="text-xs font-bold text-brand-900 bg-brand-50 px-2.5 py-1 rounded">
                Type : {projectType.toUpperCase()}
              </span>
            </div>

            {/* Formulaire selon projet */}
            {projectType === "dalle" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Longueur de la dalle (mètres)
                    </label>
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => setDalleLongueur((v) => Math.max(1, v - 1))}
                        className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={dalleLongueur}
                        onChange={(e) => setDalleLongueur(Number(e.target.value))}
                        className="w-full text-center font-bold text-sm text-slate-900 p-2.5 focus:outline-none"
                      />
                      <button
                        onClick={() => setDalleLongueur((v) => v + 1)}
                        className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Largeur de la dalle (mètres)
                    </label>
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => setDalleLargeur((v) => Math.max(1, v - 1))}
                        className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={dalleLargeur}
                        onChange={(e) => setDalleLargeur(Number(e.target.value))}
                        className="w-full text-center font-bold text-sm text-slate-900 p-2.5 focus:outline-none"
                      />
                      <button
                        onClick={() => setDalleLargeur((v) => v + 1)}
                        className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Épaisseur (cm) — Standard 12 cm
                    </label>
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => setDalleEpaisseur((v) => Math.max(8, v - 1))}
                        className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min="8"
                        max="30"
                        value={dalleEpaisseur}
                        onChange={(e) => setDalleEpaisseur(Number(e.target.value))}
                        className="w-full text-center font-bold text-sm text-slate-900 p-2.5 focus:outline-none"
                      />
                      <button
                        onClick={() => setDalleEpaisseur((v) => v + 1)}
                        className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 text-xs text-brand-900 flex items-center justify-between">
                  <span>Surface calculée : <strong>{dalleSurface} m²</strong></span>
                  <span>Volume de béton estimé : <strong>{dalleVolume} m³</strong></span>
                </div>
              </div>
            )}

            {projectType === "mur" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Longueur cumulée du mur (mètres)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={murLongueur}
                      onChange={(e) => setMurLongueur(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-brand-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hauteur du mur (mètres)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={murHauteur}
                      onChange={(e) => setMurHauteur(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-brand-900"
                    />
                  </div>
                </div>

                <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 text-xs text-brand-900">
                  Surface de maçonnerie : <strong>{murSurface} m²</strong> (environ <strong>{murParpaingsTotal} parpaings</strong>)
                </div>
              </div>
            )}

            {projectType === "peinture" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Surface totale des murs à peindre (m²)
                    </label>
                    <input
                      type="number"
                      min="5"
                      value={peintureSurface}
                      onChange={(e) => setPeintureSurface(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-brand-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nombre de couches recommandées
                    </label>
                    <select
                      value={peintureCouches}
                      onChange={(e) => setPeintureCouches(Number(e.target.value) as 1 | 2)}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-900 bg-white"
                    >
                      <option value={1}>1 couche (rafraîchissement)</option>
                      <option value={2}>2 couches (finition optimale & durable)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {projectType === "carrelage" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Surface de la pièce (m²)
                    </label>
                    <input
                      type="number"
                      min="2"
                      value={carrelageSurface}
                      onChange={(e) => setCarrelageSurface(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-brand-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Marge de chutes & découpes
                    </label>
                    <select
                      value={carrelageMarge}
                      onChange={(e) => setCarrelageMarge(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-900 bg-white"
                    >
                      <option value={5}>5% (pose droite simple)</option>
                      <option value={10}>10% (pose avec découpes régulières)</option>
                      <option value={15}>15% (pose diagonale)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 text-xs text-brand-900">
                  Surface totale à commander (avec découpes) : <strong>{carrelageSurfaceTotal} m²</strong>
                </div>
              </div>
            )}

            {/* Boutons de navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep(1)}
                className="btn-touch px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour au choix du projet</span>
              </button>

              <button
                onClick={() => setStep(3)}
                className="btn-touch px-6 py-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition active:scale-95"
              >
                <span>Calculer les Matériaux</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : Résultat & Ajout au Devis */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
                  Étape 3 : Estimation Quantitative des Matériaux
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Voici les fournitures nécessaires calculées selon les normes de chantier en vigueur au Bénin.
                </p>
              </div>
              <button
                onClick={() => setStep(2)}
                className="text-xs text-brand-900 font-bold hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Modifier dimensions
              </button>
            </div>

            {/* Tableau des Matériaux Calculés */}
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
              {projectType === "dalle" && (
                <>
                  <div className="p-4 bg-white flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Ciment Haute Résistance CPJ 45 (ou CPJ 35)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Dosage 350 kg/m³ de béton armé
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-brand-900">
                        {dalleCimentSacs} sacs de 50 kg
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ~ {formatFcfa(dalleCimentSacs * (prodCiment45?.prixFcfa || 4950))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Fer à béton HA FE E500 Ø 10 mm (Barres 12 m)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Quadrillage d&apos;armature et chaînages
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-brand-900">
                        {dalleFer10Barres} barres
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ~ {formatFcfa(dalleFer10Barres * (prodFer10?.prixFcfa || 4800))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Fil de fer recuit de ligature
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Ligatures des armatures
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-brand-900">
                        {dalleFilRecuitRouleau} rouleau (25 kg)
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ~ {formatFcfa(dalleFilRecuitRouleau * (prodFilRecuit?.prixFcfa || 16500))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Sable propre de lagune + Gravier concassé
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {dalleSableM3} m³ de sable & {dalleGravierM3} m³ de gravier 15/25
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-brand-900">
                        Camion benne
                      </div>
                      <div className="text-[10px] text-amber-600 font-bold">
                        Sur devis transport
                      </div>
                    </div>
                  </div>
                </>
              )}

              {projectType === "mur" && (
                <>
                  <div className="p-4 bg-white flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Parpaings creux vibrés 15 x 20 x 40 cm
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Haute densité pour élévation
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-brand-900">
                        {murParpaingsTotal} pièces
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ~ {formatFcfa(murParpaingsTotal * (prodParpaings15?.prixFcfa || 280))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Ciment CPJ 35 — Sacs 50 kg
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Mortier de pose et arase
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-brand-900">
                        {murCimentSacs} sacs
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ~ {formatFcfa(murCimentSacs * (prodCiment35?.prixFcfa || 4450))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {projectType === "peinture" && (
                <>
                  <div className="p-4 bg-white flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Peinture Acrylique Façade / Intérieur — Pot 20 kg
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Couverture pour {peintureSurface} m² ({peintureCouches} couches)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-brand-900">
                        {peinturePots20kg} pot(s) de 20 kg
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ~ {formatFcfa(peinturePots20kg * (prodPeintureFacade?.prixFcfa || 38000))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Enduit de lissage en poudre — Sac 25 kg
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Préparation des fonds avant mise en peinture
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-brand-900">
                        {peintureEnduitSacs} sac(s)
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ~ {formatFcfa(peintureEnduitSacs * (prodEnduitLissage?.prixFcfa || 12500))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {projectType === "carrelage" && (
                <>
                  <div className="p-4 bg-white flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Ciment Colle Carrelage C2TE — Sac 25 kg
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Pour {carrelageSurfaceTotal} m² de surface
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-brand-900">
                        {carrelageColleSacs} sacs de 25 kg
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ~ {formatFcfa(carrelageColleSacs * (prodColleCarrelage?.prixFcfa || 4600))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Actions : Ajouter Tout au Devis + Lien WhatsApp */}
            <div className="p-6 bg-brand-50 rounded-2xl border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Prêt à envoyer à QUALITMATSARL ?
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Ajoutez instantanément toutes ces lignes chiffrées à votre liste de devis.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAddAllToCart}
                  className={`flex-1 sm:flex-none btn-touch px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95 shadow-md ${
                    allAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-brand-900 hover:bg-brand-800 text-white"
                  }`}
                >
                  {allAdded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Matériaux ajoutés au devis !</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Ajouter tout au devis</span>
                    </>
                  )}
                </button>

                <Link
                  href="/ma-liste"
                  className="btn-touch px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Voir ma liste</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
