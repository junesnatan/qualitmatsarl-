"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { initialSettings } from "@/data/initialData";
import {
  Search,
  Phone,
  MessageCircle,
  ClipboardList,
  Menu,
  X,
  ChevronRight,
  HardHat,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/catalogue?q=${encodeURIComponent(searchTerm.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "ACCUEIL", href: "/" },
    { label: "CATALOGUE PRODUITS", href: "/catalogue" },
    { label: "ESPACE PRO CHANTIER", href: "/pro" },
    { label: "CALCULATEUR BTP", href: "/calculateur" },
    { label: "RÉALISATIONS", href: "/realisations" },
    { label: "CONTACTEZ-NOUS", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      {/* Barre Principale : Logo + Recherche (Desktop) + Panier / Actions */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          {/* Logo QUALITMAT SARL (Compact et 100% responsive sur tout téléphone) */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-primary-600 text-white rounded-xl flex items-center justify-center font-black text-lg sm:text-xl shadow-md shrink-0">
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
              <p className="hidden sm:block text-[10px] sm:text-[11px] font-bold text-primary-600 uppercase tracking-wider mt-0.5 truncate">
                Quincaillerie & Matériaux BTP
              </p>
            </div>
          </Link>

          {/* Recherche Centrale Pro (Desktop / Tablette large) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-lg lg:max-w-xl relative"
          >
            <input
              type="text"
              placeholder="Rechercher ciment, fer à béton, carrelage, PVC, outillage..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-xs sm:text-sm px-4 py-2.5 pl-10 rounded-xl border border-slate-300 focus:outline-none focus:border-primary-600 focus:bg-white focus:ring-1 focus:ring-primary-600 transition shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-3.5 py-1.5 rounded-lg absolute right-1.5 top-1.5 text-xs transition active:scale-95 shadow-sm"
            >
              Rechercher
            </button>
          </form>

          {/* Actions Droite : Téléphone Direct (Desktop) + Panier Devis + Menu Mobile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Numéro de téléphone direct sur desktop */}
            <a
              href="tel:+22996538455"
              className="hidden lg:flex items-center gap-2 text-slate-700 hover:text-primary-600 transition px-3 py-2 rounded-xl hover:bg-slate-50 border border-slate-200 text-xs font-bold"
              title="Appeler le magasin"
            >
              <div className="w-7 h-7 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[10px] text-slate-400 block font-normal">Contact direct</span>
                <span className="font-extrabold text-slate-900">01 96 53 84 55</span>
              </div>
            </a>

            {/* Bouton Ma Liste / Devis (Ultra clair & responsive) */}
            <Link
              href="/ma-liste"
              className="flex items-center gap-2 sm:gap-2.5 bg-solar-500 hover:bg-solar-600 text-dark-950 font-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md transition active:scale-95"
              title="Consulter mon panier de devis"
            >
              <div className="relative">
                <ClipboardList className="w-5 h-5 text-dark-950" />
                {totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-primary-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-black">
                {totalItems > 0 ? `${totalItems} article${totalItems > 1 ? "s" : ""}` : "Mon Devis"}
              </span>
            </Link>

            {/* Bouton Hamburger Mobile (Accessible & bien proportionné) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-800 hover:text-primary-600 border border-slate-200 hover:bg-slate-50 transition active:scale-95"
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Barre de recherche visible sur mobile sous le logo */}
        <form
          onSubmit={handleSearch}
          className="md:hidden mt-2.5 relative w-full"
        >
          <input
            type="text"
            placeholder="Rechercher ciment, fer, PVC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-xs px-3.5 py-2 pl-9 rounded-xl border border-slate-300 focus:outline-none focus:border-primary-600 focus:bg-white"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          {searchTerm && (
            <button
              type="submit"
              className="bg-primary-600 text-white font-bold px-2 py-1 rounded text-[10px] absolute right-1.5 top-1.5"
            >
              OK
            </button>
          )}
        </form>
      </div>

      {/* Bandeau Menu Horizontal Vif (Desktop & Tablette) */}
      <nav className="hidden md:block bg-primary-600 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-start space-x-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-3 px-3.5 lg:px-4 text-xs font-extrabold tracking-wider transition-colors ${
                      active
                        ? "bg-primary-800 text-solar-400 font-black"
                        : "text-white hover:bg-solar-500 hover:text-dark-950"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Menu Tiroir Mobile (Optimisé Smartphone / Tablette) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 p-4 shadow-2xl animate-slide-up">
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
              href="tel:+22996538455"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
            >
              <Phone className="w-4 h-4 text-primary-600" />
              <span>Appeler le magasin : +229 96 53 84 55</span>
            </a>

            <a
              href={`https://wa.me/${initialSettings.whatsappNumber}?text=Bonjour%20QUALITMATSARL%2C%20je%20souhaite%20un%20devis%20matériaux`}
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
