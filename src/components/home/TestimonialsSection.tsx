"use client";

import React, { useState } from "react";
import { initialTestimonials } from "@/data/initialData";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((i) => (i === 0 ? initialTestimonials.length - 1 : i - 1));
  };

  const next = () => {
    setCurrentIndex((i) => (i === initialTestimonials.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="py-14 px-4 max-w-7xl mx-auto border-t border-slate-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold text-brand-900 uppercase tracking-wider inline-flex items-center gap-1.5 mb-1 bg-brand-50 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Retours d&apos;Expérience Vérifiés</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-2">
            La Confiance de nos Clients Artisans & BTP
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Découvrez ce que disent les professionnels et particuliers qui approvisionnent leurs chantiers auprès de QUALITMATSARL.
          </p>
        </div>

        {/* Contrôles de navigation slider */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition active:scale-95"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-xl bg-brand-900 hover:bg-brand-800 text-white flex items-center justify-center shadow-sm transition active:scale-95"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grille / Carousel Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {initialTestimonials.map((testimonial, idx) => (
          <div
            key={testimonial.id}
            className={`bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
              currentIndex === idx
                ? "border-brand-900 shadow-xl ring-2 ring-brand-900/10"
                : "border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md"
            }`}
          >
            <div>
              {/* Étoiles & Citation */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.note
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-brand-900/20" />
              </div>

              {/* Texte du témoignage */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                &ldquo;{testimonial.texte}&rdquo;
              </p>
            </div>

            {/* Auteur & Rôle */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-900 text-amber-400 font-bold flex items-center justify-center text-sm shadow-sm shrink-0">
                {testimonial.auteur.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-heading font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                  {testimonial.auteur}
                </div>
                <div className="text-[11px] text-slate-500 font-medium truncate">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
