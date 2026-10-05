"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
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
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [badgeBounced, setBadgeBounced] = useState(false);

  // Détection du scroll pour effet shrink & backdrop-blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation de rebond du badge panier lors d'un ajout
  useEffect(() => {
    if (totalItems > 0) {
      setBadgeBounced(true);
      const timer = setTimeout(() => setBadgeBounced(false), 600);
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
    { label: "Catalogue", href: "/catalogue" },
    { label: "Espace Pro", href: "/pro" },
    { label: "Calculateur", href: "/calculateur", badge: "Nouveau" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Contact", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-slate-200/80"
          : "bg-white shadow-sm border-b border-slate-200 py-3.5"
      }`}
    >
      {/* Barre Principale */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          {/* Logo Corporate QUALITMATSARL */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div
              className={`bg-brand-900 text-white flex items-center justify-center rounded-xl shadow-md group-hover:bg-brand-800 transition-all ${
                isScrolled ? "w-9 h-9" : "w-11 h-11"
              }`}
            >
              <Building2 className={`text-amber-400 ${isScrolled ? "w-5 h-5" : "w-6 h-6"}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-heading font-extrabold tracking-tight text-slate-900 transition-all ${
                    isScrolled ? "text-xl" : "text-2xl"
                  }`}
                >
                  QUALITMATSARL
                </span>
              </div>
              {!isScrolled && (
                <p className="hidden sm:block text-[11px] text-slate-500 font-medium tracking-wide">
                  Quincaillerie & Matériaux — Allègléta / Tankpè (Calavi)
                </p>
              )}
            </div>
          </Link>

          {/* Barre de recherche centrale */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md lg:max-w-lg relative"
          >
            <input
              type="text"
              placeholder="Rechercher ciment, fer à béton, tuyau PVC, câble, peinture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-xs sm:text-sm px-4 py-2.5 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:bg-white focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 transition shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <button
              type="submit"
              className="bg-brand-900 hover:bg-brand-800 text-white font-semibold px-3.5 py-1.5 rounded-lg absolute right-1.5 top-1.5 text-xs transition"
            >
              Chercher
            </button>
          </form>

          {/* Actions Droite : Téléphone Direct + Panier Devis + Burger */}
          <div className="flex items-center gap-3">
            {/* Téléphone direct desktop */}
            <a
              href="tel:+22996538455"
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-brand-900 hover:bg-slate-100 transition border border-slate-200"
              title="Appeler QUALITMATSARL"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[10px] text-slate-400 uppercase font-medium block">
                  Conseiller Magasin
                </span>
                <span className="font-bold text-slate-900">+229 96 53 84 55</span>
              </div>
            </a>

            {/* Bouton Panier Devis avec Rebond animé */}
            <Link
              href="/ma-liste"
              className="btn-touch relative bg-brand-900 hover:bg-brand-800 text-white font-semibold px-3.5 sm:px-4 py-2 rounded-xl flex items-center gap-2.5 shadow-sm transition active:scale-95"
            >
              <ClipboardList className="w-5 h-5 text-amber-400" />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold leading-tight">
                  Ma Liste de Devis
                </span>
                <span className="text-[10px] text-slate-300 leading-none">
                  WhatsApp Direct
                </span>
              </div>
              <span
                className={`ml-1 bg-amber-400 text-brand-950 text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center shadow-sm transition-transform ${
                  badgeBounced ? "scale-125 animate-bounce" : "scale-100"
                }`}
              >
                {totalItems}
              </span>
            </Link>

            {/* Menu burger mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-brand-900 rounded-xl focus:outline-none border border-slate-200"
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu de navigation secondaire (Desktop) */}
      <nav className="hidden md:block bg-white border-t border-slate-100 mt-2.5">
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
                        ? "text-brand-900 font-bold border-brand-900 bg-brand-50/70"
                        : "text-slate-600 hover:text-brand-900 hover:bg-slate-50 border-transparent"
                    }`}
                  >
                    {link.label === "Calculateur" && (
                      <Calculator className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 text-xs text-slate-500 py-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px]">Matériaux certifiés — Prix au détail & gros</span>
          </div>
        </div>
      </nav>

      {/* Menu mobile déroulant */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 p-4 shadow-xl animate-fade-in">
          {/* Recherche mobile */}
          <form onSubmit={handleSearch} className="mb-4 relative">
            <input
              type="text"
              placeholder="Rechercher un matériau..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-sm px-4 py-2.5 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-900"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <button
              type="submit"
              className="bg-brand-900 text-white font-semibold px-3 py-1.5 rounded-lg absolute right-1.5 top-1.5 text-xs"
            >
              OK
            </button>
          </form>

          {/* Numéro direct sur mobile */}
          <div className="mb-3 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
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
                        ? "bg-brand-50 text-brand-900 font-bold border-l-4 border-brand-900"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {link.label === "Calculateur" && (
                        <Calculator className="w-4 h-4 text-amber-600" />
                      )}
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 border-t border-slate-200">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 text-xs text-slate-500 hover:text-slate-900"
              >
                Espace Gestionnaire / Administration
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
