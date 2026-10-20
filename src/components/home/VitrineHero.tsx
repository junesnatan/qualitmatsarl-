"use client";

import React from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { initialSettings } from "@/data/initialData";
import {
  ArrowRight,
  MessageCircle,
  Truck,
  ShieldCheck,
  Building2,
  PhoneCall,
  Layers,
  MapPin,
  CheckCircle2,
  PackageCheck,
  FileCheck,
} from "lucide-react";

const TICKER_ITEMS = [
  { icon: PackageCheck, text: "Stocks disponibles en magasin", color: "text-emerald-400" },
  { icon: Truck, text: "Livraison camion directe sur votre chantier", color: "text-solar-400" },
  { icon: FileCheck, text: "Facturation officielle avec IFU & RCCM", color: "text-blue-400" },
  { icon: Layers, text: "Ciments frais certifiés (CIMBENIN, NOCIBE)", color: "text-primary-400" },
  { icon: ShieldCheck, text: "Fers à béton haute adhérence FE E500", color: "text-emerald-400" },
  { icon: MessageCircle, text: "Devis rapide sous 15 minutes sur WhatsApp", color: "text-solar-400" },
];

export default function VitrineHero() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  const whatsappMessage = encodeURIComponent(
    "Bonjour QUALITMAT SARL, je souhaite demander un devis de matériaux pour mon chantier."
  );
  const whatsappUrl = `https://wa.me/${initialSettings.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="relative w-full bg-slate-950 text-white overflow-hidden py-14 sm:py-20 lg:py-28 border-b-4 border-primary-600">
      {/* Texture de fond architecturale & halos lumineux */}
      <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-solar-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Colonne Gauche : Positionnement de marque, Titre fort et double CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Titre fort & affirmé — Rien au-dessus */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-black tracking-tight leading-[1.12] text-white">
              L&apos;Exigence des Matériaux pour{" "}
              <span className="text-solar-400">Bâtir Durable</span> au Bénin.
            </h1>

            {/* Descriptif d'activité clair et prestigieux */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Distributeur de référence à Abomey-Calavi et Cotonou : ciment d&apos;usines certifiées (CIMBENIN, NOCIBE), fers à béton haute adhérence FE E500, tuyauterie PVC, électricité et outillage professionnel.
            </p>

            {/* Ruban horizontal déroulant en continu de droite à gauche */}
            <div className="relative w-full overflow-hidden py-2.5 bg-slate-900/80 border-y border-slate-800 rounded-2xl">
              {/* Estompage dégradé aux extrémités */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee flex items-center gap-4">
                {/* 1ère séquence */}
                {TICKER_ITEMS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={`ticker-1-${idx}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-slate-200 whitespace-nowrap bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-slate-700/60 shrink-0"
                    >
                      <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
                {/* 2ème séquence identique pour la continuité infinie sans à-coup */}
                {TICKER_ITEMS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={`ticker-2-${idx}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-slate-200 whitespace-nowrap bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-slate-700/60 shrink-0"
                    >
                      <Icon className={`w-4 h-4 ${item.color} shrink-0`} />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Double CTA Vitrine : Showroom des Matériaux + Devis WhatsApp */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3">
              <Link
                href="/catalogue"
                className="btn-red px-6 sm:px-8 py-4 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 shadow-vibrant active:scale-95 group text-center"
              >
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>Consulter nos Matériaux</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solar px-6 sm:px-8 py-4 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2.5 shadow-solar active:scale-95 text-center text-slate-950"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                <span>Demander un Devis WhatsApp</span>
              </a>
            </div>

            {/* Contact direct téléphonique */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
              <span>Conseil technique direct au comptoir :</span>
              <a
                href={`tel:${cleanPhone}`}
                className="text-solar-400 hover:underline font-bold flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+229 96 53 84 55</span>
              </a>
            </div>
          </div>

          {/* Colonne Droite : Visuel Showroom BTP Prestige & Carte de Stature */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl aspect-[4/3] bg-slate-900 group">
              <SafeImage
                src="/images/hero/hero-chantier.jpg"
                alt="Matériaux de construction et chantier QUALITMAT SARL"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Badge superposé de réassurance */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-600/30 text-primary-400 border border-primary-500/40 flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-solar-400" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">Livraison 24h à 48h</h3>
                    <p className="text-[11px] text-slate-400">Abomey-Calavi, Cotonou & environs</p>
                  </div>
                </div>
                <Link
                  href="/services"
                  className="text-xs font-bold text-solar-400 hover:text-white flex items-center gap-1 transition"
                >
                  <span>Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 3 Métriques d'Impact en dessous */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="block text-lg sm:text-xl font-heading font-black text-solar-400">100%</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Origine Certifiée</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="block text-lg sm:text-xl font-heading font-black text-white">6+</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Univers BTP</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="block text-lg sm:text-xl font-heading font-black text-emerald-400">Rapide</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Devis WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
