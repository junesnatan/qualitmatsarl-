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
  MapPin,
  Clock,
  Shield,
  ChevronRight,
  Calculator,
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
    { label: "PRODUITS & UNIVERS", href: "/catalogue" },
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
      {/* 1. Topbar d'Impact (Style La Tour Boutique & Batimat) */}
      <div className="bg-dark-900 text-white text-xs py-2 px-4 border-b border-dark-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-solar-400" />
              <span>Allègléta / Pavé de Tankpè, Abomey-Calavi</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300 border-l border-dark-700 pl-4">
              <Clock className="w-3.5 h-3.5 text-solar-400" />
              <span>Lun — Sam : 07h30 - 18h30</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <a
              href="tel:+22996538455"
              className="flex items-center gap-1 text-white hover:text-solar-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-solar-400" />
              <span>+229 96 53 84 55</span>
            </a>
            <a
              href={`https://wa.me/${initialSettings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded text-[11px] transition font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Barre Centrale : Logo + Recherche + Panier */}
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo Puissant QUALITMAT SARL */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 bg-primary-600 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-md">
              Q
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-2xl tracking-tight text-dark-900 leading-none">
                  QUALITMAT
                </span>
                <span className="bg-primary-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                  SARL
                </span>
              </div>
              <p className="text-[11px] font-bold text-primary-600 uppercase tracking-wider mt-0.5">
                Quincaillerie & Matériaux de Construction
              </p>
            </div>
          </Link>

          {/* Recherche Centrale Pro */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl relative"
          >
            <input
              type="text"
              placeholder="Recherche ciment, fer à béton, carrelage, sanitaire, peinture, PVC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-sm px-4 py-2.5 pl-10 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-primary-600 focus:bg-white transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-4 py-1.5 rounded-lg absolute right-1.5 top-1.5 text-xs transition"
            >
              Rechercher
            </button>
          </form>

          {/* Action Devis Panier Droite */}
          <div className="flex items-center gap-3">
            <Link
              href="/ma-liste"
              className="flex items-center gap-3 bg-solar-500 hover:bg-solar-600 text-dark-950 font-black px-4 py-2.5 rounded-xl shadow-md transition active:scale-95"
            >
              <div className="relative">
                <ClipboardList className="w-5 h-5 text-dark-950" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <span className="text-[10px] uppercase font-bold text-dark-900 block">
                  Ma Liste Devis
                </span>
                <span className="text-xs font-black">
                  {totalItems} article{totalItems > 1 ? "s" : ""}
                </span>
              </div>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-dark-900 border border-slate-200"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bandeau Menu Horizontal Vif (Inspiration La Tour & La Roche) */}
      <nav className="hidden md:block bg-primary-600 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-start space-x-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-3 px-4 text-xs font-extrabold tracking-wider transition-colors ${
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 p-4 shadow-xl animate-fade-in">
          <form onSubmit={handleSearch} className="mb-4 relative">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 text-sm px-4 py-2.5 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <button
              type="submit"
              className="bg-primary-600 text-white font-bold px-3 py-1.5 rounded-lg absolute right-1.5 top-1.5 text-xs"
            >
              OK
            </button>
          </form>

          <ul className="space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-bold ${
                      active
                        ? "bg-primary-50 text-primary-600 font-black"
                        : "text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
