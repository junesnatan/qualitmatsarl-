"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { initialSettings } from "@/data/initialData";
import {
  ClipboardList,
  Search,
  Menu,
  X,
  Building2,
  ChevronRight,
  PhoneCall,
  ShieldCheck,
  Calculator,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [badgeBounced, setBadgeBounced] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (totalItems > 0) {
      setBadgeBounced(true);
      const timer = setTimeout(() => setBadgeBounced(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/catalogue?q=${encodeURIComponent(searchTerm.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Catalogue & Univers", href: "/catalogue" },
    { label: "Espace Pro BTP", href: "/pro" },
    { label: "Studio Calculateur", href: "/calculateur", badge: "Outil" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact & Accès", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white transition-all duration-300">
      {/* 1. Topbar Prestige (Inspiration Batimat & La Roche) */}
      <div className="bg-brand-900 text-slate-300 text-[11px] font-medium border-b border-brand-800/80 py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span>Dépôt & Comptoir : Allègléta / Pavé de Tankpè, Abomey-Calavi</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400 border-l border-brand-800 pl-4">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              <span>Lun — Sam : 07h30 à 18h30</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gold-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Matériaux Certifiés BTP</span>
            </span>
            <a
              href={`tel:${initialSettings.whatsappNumber}`}
              className="text-white hover:text-gold-300 transition font-bold flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-gold-400" />
              <span>+229 96 53 84 55</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Barre Principale de Navigation */}
      <div
        className={`w-full transition-all duration-300 border-b border-sand-200 ${
          isScrolled
            ? "py-2.5 shadow-showroom bg-white/98 backdrop-blur-md"
            : "py-3.5 bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo Prestige QUALITMAT */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center text-gold-400 shadow-sm border border-brand-800 group-hover:border-gold-500/50 transition-colors">
              <Building2 className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black tracking-tight text-xl sm:text-2xl text-brand-900 leading-none">
                  QUALITMAT
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-gold-100 text-gold-800 border border-gold-200">
                  SARL
                </span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mt-0.5 hidden xs:block">
                Showroom & Comptoir Matériaux
              </p>
            </div>
          </Link>

          {/* Barre de Recherche Épurée */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md lg:max-w-lg relative"
          >
            <input
              type="text"
              placeholder="Rechercher ciment, fers à béton, carrelage, tuyaux..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-sand-50/70 text-slate-900 placeholder-slate-400 text-xs sm:text-sm px-4 py-2.5 pl-10 rounded-full border border-sand-200 focus:outline-none focus:bg-white focus:border-gold-500 focus:ring-2 focus:ring-gold-500/15 transition shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <button
              type="submit"
              className="bg-brand-900 hover:bg-brand-800 text-gold-300 font-medium px-4 py-1.5 rounded-full absolute right-1.5 top-1 text-xs transition"
            >
              Rechercher
            </button>
          </form>

          {/* Actions Droite : Conseiller + Panier Devis + Burger */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Téléphone direct */}
            <a
              href="tel:+22996538455"
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-brand-900 hover:bg-sand-100 transition border border-sand-200"
              title="Conseiller Comptoir"
            >
              <div className="w-7 h-7 rounded-lg bg-gold-100 text-gold-800 flex items-center justify-center">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[9px] text-slate-400 uppercase font-semibold block">
                  Conseiller Dépôt
                </span>
                <span className="font-bold text-slate-900">+229 96 53 84 55</span>
              </div>
            </a>

            {/* Bouton Panier Devis Haute Couture */}
            <Link
              href="/ma-liste"
              className="btn-touch relative bg-brand-900 hover:bg-brand-800 text-white font-medium px-3.5 sm:px-4 py-2 rounded-xl flex items-center gap-2.5 shadow-sm border border-brand-800 hover:border-gold-500/40 transition active:scale-95"
            >
              <ClipboardList className="w-5 h-5 text-gold-400" />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold leading-tight">
                  Ma Liste de Devis
                </span>
                <span className="text-[10px] text-gold-300 leading-none">
                  Chiffrage WhatsApp
                </span>
              </div>
              <span
                className={`ml-1 bg-gold-400 text-brand-950 text-xs font-extrabold w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-sm transition-transform ${
                  badgeBounced ? "scale-125" : "scale-100"
                }`}
              >
                {totalItems}
              </span>
            </Link>

            {/* Menu burger mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-brand-900 rounded-xl focus:outline-none border border-sand-200"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Navigation Secondaire Épurée (Desktop) */}
      <nav className="hidden md:block bg-sand-50/50 border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center space-x-1 text-xs font-semibold">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1.5 py-2.5 px-3.5 transition-all font-medium border-b-2 rounded-t-lg ${
                      active
                        ? "text-brand-900 font-bold border-gold-500 bg-white shadow-sm"
                        : "text-slate-600 hover:text-brand-900 hover:bg-white/60 border-transparent"
                    }`}
                  >
                    {link.label === "Studio Calculateur" && (
                      <Calculator className="w-3.5 h-3.5 text-gold-600" />
                    )}
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="bg-gold-100 text-gold-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase border border-gold-200">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 text-xs text-slate-500 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-medium text-slate-600">
              Stock permanent vérifié à Calavi
            </span>
          </div>
        </div>
      </nav>

      {/* 4. Menu Mobile Déroulant */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-sand-200 p-4 shadow-xl animate-fade-in">
          {/* Recherche mobile */}
          <form onSubmit={handleSearch} className="mb-4 relative">
            <input
              type="text"
              placeholder="Rechercher un matériau..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-sand-50 text-slate-900 placeholder-slate-400 text-sm px-4 py-2.5 pl-10 rounded-xl border border-sand-200 focus:outline-none focus:border-gold-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <button
              type="submit"
              className="bg-brand-900 text-gold-300 font-semibold px-3 py-1.5 rounded-lg absolute right-1.5 top-1.5 text-xs"
            >
              OK
            </button>
          </form>

          {/* Contact direct mobile */}
          <div className="mb-3 p-3 bg-sand-50 rounded-xl border border-sand-200 flex items-center justify-between">
            <span className="text-xs text-slate-600">Comptoir Allègléta :</span>
            <a
              href="tel:+22996538455"
              className="text-xs font-bold text-brand-900 flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              +229 96 53 84 55
            </a>
          </div>

          <ul className="space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium ${
                      active
                        ? "bg-sand-100 text-brand-900 font-bold border-l-4 border-gold-500"
                        : "text-slate-700 hover:bg-sand-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {link.label === "Studio Calculateur" && (
                        <Calculator className="w-4 h-4 text-gold-600" />
                      )}
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="bg-gold-100 text-gold-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 border-t border-sand-200">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 text-xs text-slate-500 hover:text-slate-900"
              >
                Espace Gestionnaire
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
