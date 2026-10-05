"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { initialSettings, initialCategories } from "@/data/initialData";
import {
  MapPin,
  Phone,
  MessageCircle,
  Building2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Moon,
  Sun,
  Facebook,
  Share2,
} from "lucide-react";

export default function Footer() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Vérifier si le mode sombre a été activé manuellement
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("qualimat_theme");
      if (savedTheme === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("qualimat_theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("qualimat_theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-12 pb-24 md:pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        {/* Grille 4 Colonnes Enrichie */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-200 dark:border-slate-800 text-sm">
          {/* Colonne 1 : Identité & Réseaux Sociaux (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-900 text-amber-400 flex items-center justify-center rounded-xl shadow-sm font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                QUALITMATSARL
              </span>
            </Link>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Votre quincaillerie et référence en matériaux de construction à Abomey-Calavi (Allègléta / Tankpè) et dans tout le Bénin. Ciment frais, aciers certifiés FE E500, tuyauterie et outillage professionnel.
            </p>

            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg font-mono text-slate-700 dark:text-slate-300">
                IFU : {initialSettings.ifu}
              </span>
              <span className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg font-mono text-slate-700 dark:text-slate-300">
                RCCM : {initialSettings.rccm}
              </span>
            </div>

            {/* Réseaux Sociaux */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href={initialSettings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-brand-900 dark:hover:text-amber-400 hover:border-brand-900 transition"
                title="Page Facebook QUALITMATSARL"
                aria-label="Facebook QUALITMATSARL"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${initialSettings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-600 hover:border-emerald-600 transition"
                title="WhatsApp QUALITMATSARL"
                aria-label="WhatsApp QUALITMATSARL"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Navigation Rapide (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-brand-900 dark:hover:text-amber-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-brand-900 dark:hover:text-amber-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Catalogue Général</span>
                </Link>
              </li>
              <li>
                <Link href="/calculateur" className="hover:text-brand-900 dark:hover:text-amber-400 font-bold text-brand-900 dark:text-amber-400 transition flex items-center gap-1.5">
                  <Calculator className="w-3 h-3 text-amber-500" />
                  <span>Calculateur Chantier</span>
                </Link>
              </li>
              <li>
                <Link href="/pro" className="hover:text-brand-900 dark:hover:text-amber-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Espace Pro BTP</span>
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="hover:text-brand-900 dark:hover:text-amber-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Nos Réalisations</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-900 dark:hover:text-amber-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Contact & Plan d&apos;accès</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Catégories Populaires (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Catégories Phares
            </h4>
            <ul className="space-y-2 text-xs">
              {initialCategories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/catalogue?cat=${c.slug}`}
                    className="hover:text-brand-900 dark:hover:text-amber-400 transition flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span>{c.nom}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Contact, Horaires & Bouton WhatsApp (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Comptoir & Horaires
            </h4>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{initialSettings.adresse}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-900 dark:text-amber-400 shrink-0" />
                <a
                  href={`tel:${cleanPhone}`}
                  className="font-bold text-slate-800 dark:text-slate-200 hover:text-brand-900 dark:hover:text-amber-400"
                >
                  {initialSettings.telephonePrincipal}
                </a>
              </div>

              <div className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{initialSettings.horairesSemaine}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${initialSettings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-touch py-2.5 px-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp (+229 96 53 84 55)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Ligne Inférieure : Mentions légales, IFU & Discret Toggle Thème */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2025-2026 QUALITMATSARL. Tous droits réservés. Abomey-Calavi, Bénin.</p>

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <Link href="/mentions-legales" className="hover:text-slate-800 dark:hover:text-white transition">
              Mentions Légales
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-slate-800 dark:hover:text-white transition">
              Espace Gestionnaire
            </Link>
            <span>•</span>

            {/* Toggle Dark Mode discret */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 p-1 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              title="Changer le thème d'affichage"
              aria-label="Basculer le thème clair ou sombre"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px]">Thème Clair</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[10px]">Thème Nuit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
