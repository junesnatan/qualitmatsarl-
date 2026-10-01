"use client";

import React from "react";
import Link from "next/link";
import { initialCategories, initialSettings } from "@/data/initialData";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Building2,
  ShieldCheck,
  Truck,
  FileCheck,
} from "lucide-react";

export default function Footer() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-24 md:pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        {/* Piliers de confiance Corporate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-800/80 border border-brand-700/60 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Matériaux Certifiés
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Fers haute adhérence FE E500, ciments conformes et cuivre pur.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-800/80 border border-brand-700/60 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Livraison Chantier
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Camions bennes et plateaux livrés à Calavi, Cotonou, Godomey et Ouidah.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-800/80 border border-brand-700/60 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Devis Direct WhatsApp
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Composez votre liste sur le site et recevez vos prix en quelques minutes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-800/80 border border-brand-700/60 flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Factures avec IFU
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Facturation normalisée pour entreprises et professionnels du BTP.
              </p>
            </div>
          </div>
        </div>

        {/* Corps du Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-sm">
          {/* Bloc 1 : Entreprise */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-800 text-amber-400 flex items-center justify-center rounded-lg font-black text-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                QUALITMATSARL
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Distributeur officiel de matériaux de construction et quincaillerie générale à Abomey-Calavi (Bénin). Matériel fiable pour fondations durables.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p><strong className="text-slate-200">IFU :</strong> {initialSettings.ifu}</p>
              <p><strong className="text-slate-200">RCCM :</strong> {initialSettings.rccm}</p>
            </div>
          </div>

          {/* Bloc 2 : Rayons */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">
              Rayons Spécialisés
            </h4>
            <ul className="space-y-2 text-xs">
              {initialCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/catalogue/${cat.slug}`}
                    className="hover:text-amber-400 transition flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-slate-500 rounded-full" />
                    <span>{cat.nom}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloc 3 : Services & Pro */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">
              Services & Informations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/pro" className="text-amber-400 font-semibold hover:underline flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-amber-400 rounded-full" />
                  <span>Espace Pro BTP & Devis Chantier</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Services (Livraison, Découpe aciers)
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="hover:text-white transition">
                  Références de chantiers
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-white transition">
                  Présentation de l&apos;entreprise
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Plan d&apos;accès et Horaires
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-white transition">
                  Mentions Légales & Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Bloc 4 : Coordonnées */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">
              Magasin & Entrepôt
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{initialSettings.adresse}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="text-white hover:text-amber-400 font-semibold">
                  {initialSettings.telephonePrincipal}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${initialSettings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  01 96 53 84 55 (WhatsApp Direct)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${initialSettings.email}`} className="hover:text-white">
                  {initialSettings.email}
                </a>
              </div>
              <div className="pt-2 border-t border-slate-800 text-slate-400 flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200 font-medium">{initialSettings.horairesSemaine}</p>
                  <p className="text-[11px] text-slate-500">{initialSettings.horairesDimanche}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bas de page légal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} QUALITMATSARL. Tous droits réservés. Abomey-Calavi, République du Bénin.</p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="hover:text-slate-300">
              Mentions légales & Confidentialité
            </Link>
            <span className="text-slate-700">|</span>
            <Link href="/admin" className="hover:text-slate-300">
              Espace Gestionnaire
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
