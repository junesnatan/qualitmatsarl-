import React from "react";
import { initialTestimonials } from "@/data/initialData";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-bleu uppercase tracking-widest mb-1">
          <CheckCircle2 className="w-4 h-4 text-jaune-hover" />
          <span>Témoignages vérifiés du terrain</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-heading font-black text-acier uppercase">
          Ce que disent les bâtisseurs de Calavi
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-acier-600">
          Artisans maçons, plombiers, promoteurs et particuliers nous font confiance pour leurs chantiers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {initialTestimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-xl border border-beton-dark shadow-sm flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-jaune">
                  {[...Array(t.note)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-acier-200" />
              </div>

              <p className="text-xs sm:text-sm text-acier-700 italic leading-relaxed mb-6">
                &ldquo;{t.texte}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-beton flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-sm text-acier uppercase tracking-wide">
                  {t.auteur}
                </h4>
                <p className="text-[11px] text-acier-500 font-medium">
                  {t.role}
                </p>
              </div>
              <span className="text-[10px] text-acier-400 font-medium">
                {t.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
