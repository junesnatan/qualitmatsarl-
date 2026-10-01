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
  HardHat,
  ChevronRight,
  ShieldCheck,
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
    { label: "Espace Pro", href: "/pro", highlight: true },
    { label: "Services", href: "/services" },
    { label: "Réalisations", href: "/realisations" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Liseré supérieur de chantier */}
      <div className="h-1.5 stripe-accent w-full" />

      {/* Topbar rapide infos pratiques */}
      <div className="bg-acier text-acier-200 text-xs py-2 px-4 border-b border-acier-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-acier-100">
              <MapPin className="w-3.5 h-3.5 text-jaune" />
              <span>{initialSettings.adresse}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-acier-300">
              <Clock className="w-3.5 h-3.5 text-jaune" />
              <span>{initialSettings.horairesSemaine}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href={`tel:${initialSettings.telephonePrincipal.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 text-white hover:text-jaune font-medium transition"
            >
              <Phone className="w-3.5 h-3.5 text-jaune" />
              <span>{initialSettings.telephonePrincipal}</span>
            </a>
            <a
              href={`https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
                "Bonjour Qualimat, j'ai une question sur vos matériaux."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-whatsapp font-semibold hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Direct</span>
            </a>
            <Link
              href="/admin"
              className="text-[11px] text-acier-400 hover:text-jaune border-l border-acier-700 pl-3 transition"
              title="Accès administration"
            >
              Accès Pro / Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Barre Principale */}
      <div className="bg-acier-900 border-b border-acier-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo & Identité */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 bg-jaune text-acier-900 flex items-center justify-center rounded font-heading font-black text-2xl tracking-tighter shadow-md group-hover:scale-105 transition-transform">
              <HardHat className="w-7 h-7 text-acier-950" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-extrabold text-2xl tracking-wider text-white">
                  QUALIMAT
                </span>
                <span className="text-xs font-bold text-jaune uppercase tracking-wider bg-acier-800 px-1.5 py-0.5 rounded">
                  SARL
                </span>
              </div>
              <p className="text-[11px] text-acier-300 font-medium tracking-wide uppercase">
                Quincaillerie & Matériaux — Abomey-Calavi
              </p>
            </div>
          </Link>

          {/* Moteur de recherche rapide (Desktop / Tablette) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4 relative"
          >
            <input
              type="text"
              placeholder="Rechercher ciment, fer, tuyau PVC, câble..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-acier-800 text-white placeholder-acier-400 text-sm px-4 py-2.5 pl-10 rounded border border-acier-700 focus:outline-none focus:border-jaune focus:ring-1 focus:ring-jaune transition"
            />
            <Search className="w-4 h-4 text-acier-400 absolute left-3 top-3" />
            <button
              type="submit"
              className="bg-jaune hover:bg-jaune-hover text-acier-900 font-bold px-3 py-1.5 rounded-r absolute right-1 top-1 text-xs uppercase"
            >
              Trouver
            </button>
          </form>

          {/* Actions Droite : Devis & Menu Mobile */}
          <div className="flex items-center gap-3">
            <Link
              href="/ma-liste"
              className="btn-touch relative bg-jaune hover:bg-jaune-hover text-acier-950 font-bold px-4 py-2 rounded flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <ClipboardList className="w-5 h-5 text-acier-950" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-black uppercase leading-tight">
                  Ma Liste Devis
                </span>
                <span className="text-[10px] text-acier-800 font-semibold leading-none">
                  Envoi WhatsApp
                </span>
              </div>
              <span className="ml-1 bg-acier-950 text-jaune text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border border-jaune">
                {totalItems}
              </span>
            </Link>

            {/* Bouton burger mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-jaune rounded focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Barre de navigation principale (Desktop) */}
      <nav className="hidden md:block bg-acier-950 border-b border-acier-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center space-x-1 text-sm font-semibold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`inline-block py-2.5 px-3.5 transition-colors uppercase tracking-wider text-xs ${
                    link.highlight
                      ? "text-jaune font-black bg-acier-800/80 border-b-2 border-jaune hover:bg-acier-700"
                      : "text-acier-200 hover:text-white hover:bg-acier-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-xs text-acier-400 py-1">
            <ShieldCheck className="w-4 h-4 text-jaune" />
            <span>Matériaux certifiés — Prix au sac, barre et gros volumes</span>
          </div>
        </div>
      </nav>

      {/* Menu mobile dépliant */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-acier-950 border-b-2 border-jaune p-4 animate-fade-in">
          {/* Recherche mobile */}
          <form onSubmit={handleSearch} className="mb-4 relative">
            <input
              type="text"
              placeholder="Rechercher un matériau..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-acier-900 text-white placeholder-acier-400 text-sm px-4 py-2.5 pl-10 rounded border border-acier-700 focus:outline-none focus:border-jaune"
            />
            <Search className="w-4 h-4 text-acier-400 absolute left-3 top-3.5" />
            <button
              type="submit"
              className="bg-jaune text-acier-950 font-bold px-3 py-1.5 rounded absolute right-1.5 top-1.5 text-xs"
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
                  className={`flex items-center justify-between py-3 px-3 rounded font-bold uppercase text-sm ${
                    link.highlight
                      ? "bg-jaune/10 text-jaune border-l-4 border-jaune"
                      : "text-white hover:bg-acier-900"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-acier-800">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 text-xs text-acier-400 hover:text-white"
              >
                Administration & Gestion de catalogue
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
