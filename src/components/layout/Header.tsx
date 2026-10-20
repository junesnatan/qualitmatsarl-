"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { initialSettings } from "@/data/initialData";
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  FileText,
  Clock,
  Sparkles,
  Building2,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "ACCUEIL", href: "/" },
    { label: "NOS MATÉRIAUX", href: "/catalogue" },
    { label: "SERVICES & CHANTIER", href: "/services" },
    { label: "RÉALISATIONS", href: "/realisations" },
    { label: "L'ENTREPRISE", href: "/a-propos" },
    { label: "CONTACT & DEVIS", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* Barre Principale : Logo + Contact Téléphonique Direct + Bouton Devis */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo QUALITMAT SARL (Élégant, percutant et 100% responsive sur mobile) */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 min-w-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-primary-600 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-md group-hover:bg-primary-700 transition shrink-0">
              Q
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-heading font-black text-lg sm:text-2xl tracking-tight text-slate-900 leading-none truncate">
                  QUALITMAT
                </span>
                <span className="bg-primary-600 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded shrink-0">
                  SARL
                </span>
              </div>
              <p className="hidden sm:block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5 truncate">
                Matériaux de Construction & Quincaillerie BTP
              </p>
            </div>
          </Link>

          {/* Navigation Desktop Élégante (Pure Vitrine) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-xs font-extrabold uppercase tracking-wider rounded-lg transition-colors ${
                    active
                      ? "text-primary-600 bg-primary-50"
                      : "text-slate-700 hover:text-primary-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions Droite : Téléphone Direct + Bouton Demande de Devis Vitrine + Menu Mobile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Bouton Appel Direct (Toujours accessible et visible sur mobile !) */}
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1.5 text-slate-800 hover:text-primary-600 transition p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold"
              title="Appeler le comptoir : +229 96 53 84 55"
              aria-label="Appeler le comptoir QUALITMAT SARL"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight hidden md:block">
                <span className="text-[10px] text-slate-400 block font-normal">Conseil & Devis</span>
                <span className="font-extrabold text-slate-900">01 96 53 84 55</span>
              </div>
            </a>

            {/* Bouton CTA Pure Vitrine : Demande de Devis Rapide */}
            <Link
              href="/contact"
              className="btn-solar flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md transition active:scale-95 text-xs font-black text-slate-950"
              title="Demander un devis pour votre chantier"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span className="hidden sm:inline">Demander un Devis</span>
              <span className="sm:hidden">Devis</span>
            </Link>

            {/* Bouton Hamburger Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-800 hover:text-primary-600 border border-slate-200 hover:bg-slate-50 transition active:scale-95"
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Tiroir Mobile (Optimisé Smartphone / Tablette) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 p-4 shadow-2xl animate-slide-up">
          <ul className="space-y-1 mb-5">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-bold transition ${
                      active
                        ? "bg-primary-50 text-primary-600 font-black border-l-4 border-primary-600"
                        : "text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Raccourcis Directs dans le menu mobile */}
          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
            >
              <Phone className="w-4 h-4 text-primary-600" />
              <span>Appeler le magasin : +229 96 53 84 55</span>
            </a>

            <a
              href={`https://wa.me/${initialSettings.whatsappNumber}?text=Bonjour%20QUALITMATSARL%2C%20je%20souhaite%20un%20devis%20de%20matériaux%20pour%20mon%20chantier.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuter sur WhatsApp Direct</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
