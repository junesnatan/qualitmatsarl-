import React from "react";
import { initialTestimonials } from "@/data/initialData";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center justify-center gap-1.5 mb-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Retours d&apos;expérience</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
          La Confiance des Bâtisseurs de Calavi & Cotonou
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          Artisans maçons, plombiers, promoteurs immobiliers et particuliers témoignent de leur collaboration avec QUALITMATSARL.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {initialTestimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.note)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-slate-300" />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-6">
                &ldquo;{t.texte}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900">
                  {t.auteur}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {t.role}
                </p>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                {t.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
