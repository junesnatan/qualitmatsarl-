"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { initialSettings } from "@/data/initialData";

export default function Footer() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  return (
    <footer className="bg-slate-950 text-slate-300 py-6 px-4 border-t-2 border-primary-600 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Identité courte & Contact */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-center md:text-left">
          <span className="font-heading font-black text-white text-sm tracking-tight">
            QUALITMAT <span className="text-primary-500">SARL</span>
          </span>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-1 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-solar-400" />
            <span>Allègléta / Pavé de Tankpè, Abomey-Calavi</span>
          </span>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-1 font-bold text-white hover:text-solar-400 transition"
          >
            <Phone className="w-3.5 h-3.5 text-solar-400" />
            <span>+229 96 53 84 55</span>
          </a>
        </div>

        {/* Liens Vitrine Rapides en une seule ligne */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-semibold text-[11px]">
          <Link href="/catalogue" className="hover:text-white transition">
            Matériaux
          </Link>
          <Link href="/services" className="hover:text-white transition">
            Services
          </Link>
          <Link href="/realisations" className="hover:text-white transition">
            Réalisations
          </Link>
          <Link href="/a-propos" className="hover:text-white transition">
            L'Entreprise
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Devis & Contact
          </Link>
          <Link href="/mentions-legales" className="hover:text-white transition">
            Mentions Légales
          </Link>
          <span className="text-slate-700">|</span>
          <span className="text-slate-500">
            © {new Date().getFullYear()} QUALITMAT SARL
          </span>
        </div>
      </div>
    </footer>
  );
}
