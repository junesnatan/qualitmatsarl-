"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MessageCircle,
  Truck,
  CheckCircle2,
  Building2,
  ArrowRight,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { initialSettings } from "@/data/initialData";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/catalogue?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const fastTags = [
    { label: "Ciment CPJ 35", href: "/catalogue?q=ciment" },
    { label: "Fer à béton Ø10", href: "/catalogue?q=fer" },
    { label: "Tuyau PVC Ø100", href: "/catalogue?q=pvc" },
    { label: "Câble 2.5 mm²", href: "/catalogue?q=cable" },
    { label: "Peinture Façade", href: "/catalogue?q=peinture" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Colonne Gauche : Titre Corporate & Recherche */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-900 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Magasin & Entrepôt ouverts • Abomey-Calavi (Carrefour Arconville)</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-[1.15] tracking-tight">
              Matériaux de construction & quincaillerie de référence au <span className="text-brand-900">Bénin</span>
            </h1>

            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Ciments certifiés, fers à béton haute adhérence, plomberie et outillage professionnel. Consultez nos tarifs en FCFA et transmettez votre liste à notre équipe sur <strong>WhatsApp en 1 geste</strong>.
            </p>

            {/* Moteur de recherche clair et épuré */}
            <form
              onSubmit={handleSearch}
              className="mt-7 bg-white p-2 rounded-xl border border-slate-300 shadow-md flex flex-col sm:flex-row gap-2 max-w-xl"
            >
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher ciment, fer, tuyau PVC, câble..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-slate-900 placeholder-slate-400 pl-11 pr-3 py-2.5 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs uppercase px-5 py-3 rounded-lg tracking-wider flex items-center justify-center gap-2 transition active:scale-95 shadow-sm"
              >
                <span>Rechercher</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Mots-clés fréquents */}
            <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-slate-500">
              <span className="font-medium text-slate-400">Suggestions :</span>
              {fastTags.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="bg-white hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 transition text-[11px] font-medium"
                >
                  {tag.label}
                </Link>
              ))}
            </div>

            {/* Boutons d'action principaux */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/catalogue"
                className="btn-touch bg-brand-900 hover:bg-brand-800 text-white font-semibold px-6 py-3 rounded-lg text-sm flex items-center gap-2 shadow-sm transition"
              >
                <span>Accéder au catalogue complet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/pro"
                className="btn-touch bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3 rounded-lg text-sm border border-slate-300 shadow-sm transition"
              >
                <Building2 className="w-4 h-4 text-brand-900" />
                <span>Espace Pro & Entreprises BTP</span>
              </Link>
            </div>
          </div>

          {/* Colonne Droite : Carte Corporate Devis Rapide */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900">
                    Service Devis Instantané
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Réponse tarifaire officielle sur votre téléphone
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
              </div>

              <div className="space-y-3.5 mb-6 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tarifs transparents :</strong> Prix fermes au sac, à la barre ou au camion.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-brand-900 shrink-0 mt-0.5" />
                  <span>
                    <strong>Livraison sur site :</strong> Camions bennes et plateaux sur Calavi et environs.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Régularité fiscale :</strong> Factures normalisées avec IFU pour entreprises.
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
                  "Bonjour Qualimat SARL, je souhaite demander une cotation pour des matériaux."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-touch bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Demander un devis sur WhatsApp</span>
              </a>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Phone className="w-3.5 h-3.5 text-brand-900" />
                <span>
                  Ou contactez le magasin au{" "}
                  <strong className="text-slate-900 font-semibold">{initialSettings.telephonePrincipal}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
