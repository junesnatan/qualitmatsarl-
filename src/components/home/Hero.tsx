"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MessageCircle,
  Truck,
  CheckCircle2,
  HardHat,
  ArrowRight,
  ShieldAlert,
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
    { label: "Brouette chantier", href: "/catalogue?q=brouette" },
  ];

  return (
    <section className="relative bg-acier-900 text-white overflow-hidden border-b border-acier-800">
      {/* Texture d'arrière-plan avec dégradé industriel */}
      <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-jaune/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Colonne Gauche : Accroche & Recherche */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 bg-acier-800/90 border border-jaune/40 text-jaune px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-jaune animate-ping" />
              <span>Magasin ouvert • Abomey-Calavi (Carrefour Arconville)</span>
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-none">
              Gagnez du temps sur <br />
              <span className="text-jaune">vos chantiers & rénovations</span>
            </h1>

            <p className="mt-4 text-acier-200 text-base sm:text-lg max-w-2xl leading-relaxed">
              Tout le matériel de quincaillerie et gros œuvre en stock immédiat. Préparez votre liste de matériaux en ligne et envoyez-la à Qualimat sur <strong>WhatsApp en un geste</strong>.
            </p>

            {/* Moteur de recherche principal ultra visible */}
            <form
              onSubmit={handleSearch}
              className="mt-6 bg-acier-950 p-2 rounded-lg border-2 border-jaune shadow-2xl flex flex-col sm:flex-row gap-2 max-w-2xl"
            >
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-jaune absolute left-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Que cherchez-vous ? Ciment, fer, tuyau, câble, peinture..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-acier-400 pl-11 pr-3 py-3 text-base focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-sm px-6 py-3 rounded tracking-wider flex items-center justify-center gap-2 transition active:scale-95 shadow-lg"
              >
                <span>Chercher</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Tags rapides de recherche */}
            <div className="mt-3 flex items-center gap-2 flex-wrap text-xs text-acier-300">
              <span className="font-semibold text-acier-400">Recherches fréquentes :</span>
              {fastTags.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="bg-acier-800 hover:bg-acier-700 text-acier-200 hover:text-white px-2.5 py-1 rounded transition"
                >
                  {tag.label}
                </Link>
              ))}
            </div>

            {/* CTAs Secondaires */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/catalogue"
                className="btn-touch bg-white hover:bg-acier-100 text-acier-950 font-bold px-6 py-3 rounded text-sm uppercase tracking-wider flex items-center gap-2 shadow transition"
              >
                <span>Voir tout le catalogue</span>
                <ArrowRight className="w-4 h-4 text-acier-900" />
              </Link>

              <Link
                href="/pro"
                className="btn-touch bg-acier-800 hover:bg-acier-700 text-jaune font-bold px-6 py-3 rounded text-sm uppercase tracking-wider flex items-center gap-2 border border-acier-700 transition"
              >
                <HardHat className="w-4 h-4 text-jaune" />
                <span>Espace Pro & Gros Chantiers</span>
              </Link>
            </div>
          </div>

          {/* Colonne Droite : Carte d'action express WhatsApp & Magasin */}
          <div className="lg:col-span-4">
            <div className="bg-acier-800/90 border border-acier-700 rounded-xl p-6 shadow-2xl relative">
              <div className="absolute -top-3 right-4 bg-jaune text-acier-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow">
                Service Express
              </div>

              <h3 className="font-heading text-xl text-white font-bold uppercase mb-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-whatsapp" />
                <span>Devis Chantier en 1 clic</span>
              </h3>

              <p className="text-xs text-acier-300 leading-relaxed mb-4">
                Pas le temps d&apos;attendre au comptoir ? Composez votre panier de matériaux et recevez une réponse tarifaire officielle directement sur votre téléphone.
              </p>

              <div className="space-y-2.5 text-xs text-acier-200 mb-6 bg-acier-900/60 p-3.5 rounded border border-acier-700/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-jaune shrink-0" />
                  <span>Prix fermes au sac, à la barre ou au camion</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-jaune shrink-0" />
                  <span>Livraison disponible à Calavi et environs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-jaune shrink-0" />
                  <span>Factures normalisées avec IFU</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
                  "Bonjour Qualimat, j'ai besoin d'une cotation rapide pour mon chantier."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-touch bg-whatsapp hover:bg-whatsapp-hover text-white font-bold py-3 px-4 rounded text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Contacter sur WhatsApp</span>
              </a>

              <div className="mt-3 text-center">
                <span className="text-[11px] text-acier-400">
                  Ou par appel direct au{" "}
                  <strong className="text-white">{initialSettings.telephonePrincipal}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
