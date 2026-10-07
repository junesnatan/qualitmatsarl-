"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { initialSettings } from "@/data/initialData";
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight, PhoneCall } from "lucide-react";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1600&q=80",
    title: "La Fondation du Bâtiment",
    titleHighlight: "par excellence",
    subtitle: "Ciment CPJ certifié, fers à béton haute adhérence FE E500 et agrégats pour tous vos chantiers au Bénin.",
    btnText: "Voir les Matériaux",
    btnLink: "/catalogue",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    title: "Carrelage, Sanitaire",
    titleHighlight: "& Finitions Modernes",
    subtitle: "Robinetterie céramique, revêtements design et outillage pro pour sublimer chaque espace de vie.",
    btnText: "Découvrir la Gamme",
    btnLink: "/catalogue",
  },
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    title: "Livraison Directe sur Chantier",
    titleHighlight: "Calavi & Cotonou",
    subtitle: "Approvisionnement continu par camions bennes et plateaux au départ de notre dépôt d'Allègléta.",
    btnText: "Demander un Devis WhatsApp",
    btnLink: `https://wa.me/${initialSettings.whatsappNumber}?text=Bonjour%20QUALITMATSARL%2C%20je%20souhaite%20un%20devis%20matériaux`,
    isExternal: true,
  },
];

export default function VibrantHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[500px] sm:h-[580px] lg:h-[640px] bg-dark-950 overflow-hidden">
      {/* Background Image avec transition douce */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === idx ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage: `url(${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay sombre puissant pour contraste parfait */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-950/70 to-dark-950/30" />
        </div>
      ))}

      {/* Contenu Textuel & Call To Action (Style La Roche & Batimat) */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 flex items-center">
        <div className="max-w-2xl text-white space-y-5">
          <div className="inline-flex items-center gap-2 bg-primary-600 text-white text-xs font-black px-3.5 py-1 rounded uppercase tracking-wider shadow-lg">
            <span>QUALITMAT SARL • Vente & Conseil BTP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.1] drop-shadow-md">
            {slide.title}{" "}
            <span className="text-solar-400 block sm:inline">
              {slide.titleHighlight}
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-200 font-medium leading-relaxed max-w-xl">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {slide.isExternal ? (
              <a
                href={slide.btnLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red px-7 py-4 rounded-xl text-sm font-black flex items-center gap-2.5 shadow-vibrant active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{slide.btnText}</span>
              </a>
            ) : (
              <Link
                href={slide.btnLink}
                className="btn-red px-7 py-4 rounded-xl text-sm font-black flex items-center gap-2.5 shadow-vibrant active:scale-95 group"
              >
                <span>{slide.btnText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            <a
              href={`https://wa.me/${initialSettings.whatsappNumber}?text=Bonjour%20QUALITMATSARL%2C%20je%20souhaite%20un%20devis%20rapide`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solar px-6 py-4 rounded-xl text-sm font-black flex items-center gap-2.5 shadow-solar active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-dark-900" />
              <span>Devis WhatsApp en 2 min</span>
            </a>
          </div>
        </div>
      </div>

      {/* Flèches de navigation slider */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-primary-600 text-white flex items-center justify-center backdrop-blur-sm transition active:scale-90"
        aria-label="Diapositive précédente"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-primary-600 text-white flex items-center justify-center backdrop-blur-sm transition active:scale-90"
        aria-label="Diapositive suivante"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Puces de pagination en bas */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2.5 rounded-full transition-all ${
              currentSlide === i ? "w-8 bg-solar-400" : "w-2.5 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
