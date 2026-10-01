"use client";

import React from "react";
import Link from "next/link";
import { initialSettings } from "@/data/initialData";
import {
  MapPin,
  Phone,
  MessageCircle,
  Building2,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 pt-10 pb-20 md:pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-200 text-sm">
          {/* Colonne 1 : Identité Entreprise (5 cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-brand-900 text-amber-400 flex items-center justify-center rounded-lg shadow-sm font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-lg text-slate-900 tracking-tight">
                QUALITMATSARL
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4 max-w-sm">
              Votre référence en matériaux de gros œuvre, aciers certifiés, ciment, plomberie, électricité et quincaillerie professionnelle à Abomey-Calavi et au Bénin.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
              <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-mono">
                IFU : {initialSettings.ifu}
              </span>
              <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-mono">
                RCCM : {initialSettings.rccm}
              </span>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/catalogue" className="hover:text-brand-900 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Catalogue des Matériaux</span>
                </Link>
              </li>
              <li>
                <Link href="/pro" className="hover:text-brand-900 font-semibold text-brand-900 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>Espace Pro & Devis Chantier</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-900 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Services & Livraison</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-900 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>Contact & Plan d&apos;accès</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Contact & Horaires (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Magasin & Contact Direct
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{initialSettings.adresse}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-900 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="text-slate-800 hover:text-brand-900 font-bold">
                  {initialSettings.telephonePrincipal}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <a
                  href={`https://wa.me/${initialSettings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
                >
                  01 96 53 84 55 (WhatsApp Direct)
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{initialSettings.horairesSemaine}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bas de page légal et épuré */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} QUALITMATSARL. Tous droits réservés. Abomey-Calavi, Bénin.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <Link href="/mentions-legales" className="hover:text-slate-800 transition">
              Mentions Légales
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-slate-800 transition">
              Espace Gestionnaire
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
