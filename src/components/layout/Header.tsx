"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { initialSettings } from "@/data/initialData";
import {
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  ClipboardList,
  Search,
  Menu,
  X,
  Building2,
  ChevronRight,
  ShieldCheck,
  Briefcase,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
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
    { label: "Accueil", href: "/" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Espace Pro BTP", href: "/pro", highlight: true },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "L'Entreprise", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      {/* Topbar Corporate claire et épurée */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-5 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{initialSettings.adresse}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{initialSettings.horairesSemaine}</span>
            </span>
          </div>

          <div className="flex items-center gap-5 ml-auto">
            <a
              href={`tel:${initialSettings.telephonePrincipal.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 text-white hover:text-amber-400 font-semibold transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{initialSettings.telephonePrincipal}</span>
            </a>
            <a
              href={`https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
                "Bonjour Qualimat SARL, je souhaite me renseigner sur vos matériaux."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Direct</span>
            </a>
            <Link
              href="/admin"
              className="text-[11px] text-slate-400 hover:text-white border-l border-slate-700 pl-3 transition"
            >
              Espace Gestionnaire
            </Link>
          </div>
        </div>
      </div>

      {/* Barre Principale : Logo, Recherche, Devis */}
      <div className="border-b border-slate-200 py-3.5 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Logo Corporate */}
          <Link href="/" className="flex items-center gap-3.5 shrink-0 group">
            <div className="w-11 h-11 bg-brand-900 text-white flex items-center justify-center rounded-xl shadow-md group-hover:bg-brand-800 transition-colors">
              <Building2 className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900">
                  QUALIMAT
                </span>
                <span className="text-[10px] font-bold text-brand-900 uppercase tracking-widest bg-brand-50 border border-brand-200 px-1.5 py-0.5 rounded">
                  SARL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Quincaillerie & Matériaux de Construction — Abomey-Calavi
              </p>
            </div>
          </Link>

          {/* Recherche centrale épurée (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-lg relative"
          >
            <input
              type="text"
              placeholder="Rechercher un produit, ciment, fer, tuyau, câble..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-sm px-4 py-2.5 pl-10 rounded-lg border border-slate-300 focus:outline-none focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <button
              type="submit"
              className="bg-brand-900 hover:bg-brand-800 text-white font-semibold px-4 py-1.5 rounded-md absolute right-1.5 top-1.5 text-xs transition"
            >
              Rechercher
            </button>
          </form>

          {/* Actions : Bouton Panier Devis & Burger */}
          <div className="flex items-center gap-3">
            <Link
              href="/ma-liste"
              className="btn-touch relative bg-brand-900 hover:bg-brand-800 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2.5 shadow-sm transition active:scale-95"
            >
              <ClipboardList className="w-5 h-5 text-amber-400" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold leading-tight">
                  Ma Liste de Devis
                </span>
                <span className="text-[10px] text-slate-300 leading-none">
                  Envoi WhatsApp
                </span>
              </div>
              <span className="ml-1 bg-amber-400 text-brand-950 text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </Link>

            {/* Menu burger mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-brand-900 rounded-lg focus:outline-none border border-slate-200"
              aria-label="Ouvrir le menu"
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
      <nav className="hidden md:block bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center space-x-1 text-xs font-semibold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`inline-block py-3 px-4 transition-colors font-medium ${
                    link.highlight
                      ? "text-brand-900 font-bold bg-brand-50 border-b-2 border-brand-900 hover:bg-brand-100"
                      : "text-slate-600 hover:text-brand-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-xs text-slate-500 py-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Matériaux certifiés — Gros & Détail</span>
          </div>
        </div>
      </nav>

      {/* Menu mobile déroulant */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 shadow-xl animate-fade-in">
          {/* Recherche mobile */}
          <form onSubmit={handleSearch} className="mb-4 relative">
            <input
              type="text"
              placeholder="Rechercher un matériau..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-sm px-4 py-2.5 pl-10 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-900"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <button
              type="submit"
              className="bg-brand-900 text-white font-semibold px-3 py-1.5 rounded absolute right-1.5 top-1.5 text-xs"
            >
              OK
            </button>
          </form>

          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium ${
                    link.highlight
                      ? "bg-brand-50 text-brand-900 font-bold border-l-4 border-brand-900"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </li>
            ))}
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
