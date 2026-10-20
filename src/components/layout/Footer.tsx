"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, MessageCircle, Mail } from "lucide-react";
import { initialSettings } from "@/data/initialData";

export default function Footer() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t-2 border-primary-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Grille principale aérée et non superposée */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-slate-800">
          {/* Colonne 1 : Identité & Description (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-black text-base shadow">
                Q
              </div>
              <span className="font-heading font-black text-xl text-white tracking-tight">
                QUALITMAT <span className="text-primary-500">SARL</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Distributeur agréé de matériaux de construction et quincaillerie professionnelle à Abomey-Calavi. Approvisionnement direct, ciments certifiés, fers à béton haute adhérence et livraison sur chantier.
            </p>
          </div>

          {/* Colonne 2 : Liens de Navigation Vitrine (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-solar-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition block py-0.5">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-white transition block py-0.5">
                  Nos Matériaux
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition block py-0.5">
                  Services & Chantier
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="hover:text-white transition block py-0.5">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-white transition block py-0.5">
                  L&apos;Entreprise
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition block py-0.5">
                  Contact & Devis
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Coordonnées Directes & Dépôt (4 cols) */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-widest text-solar-400">
              Nous Joindre
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-2.5 text-white hover:text-solar-400 transition font-bold"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-solar-400 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+229 96 53 84 55 (01 96 53 84 55)</span>
              </a>

              <a
                href={`https://wa.me/${initialSettings.whatsappNumber}?text=Bonjour%20QUALITMAT%20SARL`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition font-bold"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <span>Devis WhatsApp Direct</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400 pt-1">
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="leading-tight">
                  <span className="block font-semibold text-slate-200">Dépôt & Magasin :</span>
                  <span>Allègléta / Pavé de Tankpè, Abomey-Calavi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne Inférieure : Copyright & Légal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} QUALITMAT SARL. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/mentions-legales" className="hover:text-slate-300 transition">
              Mentions Légales & Confidentialité
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-300 transition">
              Plan d&apos;accès
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
