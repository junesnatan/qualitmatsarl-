"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, X, ClipboardList, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Toast() {
  const { toast, dismissToast, totalItems } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-sm w-full bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-4 flex items-start gap-3.5 animate-slide-up">
      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
      </div>

      <div className="flex-1 text-xs">
        <div className="font-bold text-slate-900 leading-snug">
          Notification
        </div>
        <p className="text-slate-600 mt-0.5 leading-relaxed">{toast}</p>

        <div className="mt-2.5 flex items-center gap-3">
          <Link
            href="/ma-liste"
            onClick={dismissToast}
            className="text-xs font-bold text-brand-900 hover:text-brand-700 inline-flex items-center gap-1 group"
          >
            <ClipboardList className="w-3.5 h-3.5 text-amber-500" />
            <span>Voir mon devis ({totalItems})</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      <button
        onClick={dismissToast}
        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
        aria-label="Fermer la notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
