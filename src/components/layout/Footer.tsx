"use client";

import React from "react";
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
  Facebook,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  return (
    <footer className="bg-brand-900 text-slate-300 border-t border-brand-800 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Grille 4 Colonnes Prestige */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-brand-800/80 text-sm">
          {/* Colonne 1 : Identité & Statut (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-800 text-gold-400 border border-gold-500/40 flex items-center justify-center rounded-xl shadow-sm">
                <Building2 className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <span className="font-heading font-black text-xl text-white tracking-tight">
                  QUALITMAT
                </span>
                <span className="ml-1.5 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  SARL
                </span>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Showroom & Comptoir Matériaux
                </p>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Référence en quincaillerie, matériaux de construction et finitions d&apos;exception à Abomey-Calavi (Allègléta / Tankpè) et Cotonou. Ciment certifié, aciers haute adhérence, carrelage et équipements pour chantiers exigeants.
            </p>

            <div className="flex flex-wrap gap-2 text-[11px] pt-1">
              <span className="bg-brand-800/90 border border-brand-700 px-2.5 py-1 rounded-lg font-mono text-gold-300">
                IFU : {initialSettings.ifu}
              </span>
              <span className="bg-brand-800/90 border border-brand-700 px-2.5 py-1 rounded-lg font-mono text-gold-300">
                RCCM : {initialSettings.rccm}
              </span>
            </div>

            {/* Réseaux Sociaux & Contact */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={initialSettings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-brand-800 border border-brand-700 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/50 transition"
                title="Page Facebook QUALITMAT SARL"
                aria-label="Facebook QUALITMAT SARL"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${initialSettings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-600/40 flex items-center justify-center text-emerald-400 hover:border-emerald-500 transition"
                title="WhatsApp Direct"
                aria-label="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Univers & Matériaux (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider border-b border-brand-800 pb-2 flex items-center justify-between">
              <span>Univers & Départements</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            </h4>
            <ul className="space-y-2 text-xs">
              {initialCategories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/catalogue?cat=${cat.slug}`}
                    className="text-slate-400 hover:text-gold-300 transition flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-gold-400 transition" />
                    <span>{cat.nom}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Services & Devis (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider border-b border-brand-800 pb-2 flex items-center justify-between">
              <span>Services</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/calculateur"
                  className="text-slate-400 hover:text-gold-300 transition flex items-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5 text-gold-400" />
                  <span>Studio Calculateur</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pro"
                  className="text-slate-400 hover:text-gold-300 transition"
                >
                  Espace Pro & Gros Chantiers
                </Link>
              </li>
              <li>
                <Link
                  href="/ma-liste"
                  className="text-slate-400 hover:text-gold-300 transition"
                >
                  Demande de Devis Direct
                </Link>
              </li>
              <li>
                <Link
                  href="/realisations"
                  className="text-slate-400 hover:text-gold-300 transition"
                >
                  Galerie Chantiers Réalisés
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-slate-500 hover:text-slate-300 transition text-[11px]"
                >
                  Espace Gestionnaire
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Comptoir Allègléta & Accès (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider border-b border-brand-800 pb-2 flex items-center justify-between">
              <span>Comptoir Physique</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">{initialSettings.adresse}</p>
                  <p className="text-[11px] text-slate-400">{initialSettings.ville}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">{initialSettings.horairesSemaine}</p>
                  <p className="text-[11px] text-slate-400">{initialSettings.horairesDimanche}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${cleanPhone}`}
                  className="font-bold text-white hover:text-gold-300 transition"
                >
                  {initialSettings.telephonePrincipal}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={initialSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gold-400 hover:text-gold-300 hover:underline"
              >
                <span>Itinéraire Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Barre inférieure de droits et mentions */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} QUALITMAT SARL — Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/mentions-legales"
              className="hover:text-slate-400 transition"
            >
              Mentions Légales & Confidentialité
            </Link>
            <span className="text-slate-700">•</span>
            <span className="text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Matériaux Certifiés Bénin</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
