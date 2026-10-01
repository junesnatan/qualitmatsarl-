"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";

export default function Toast() {
  const { toast, dismissToast, totalItems } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-sm bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 p-4 flex items-start gap-3 animate-fade-in">
      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
      <div className="flex-1 text-xs">
        <p className="font-semibold text-slate-900 leading-snug">{toast}</p>
        <div className="mt-2 flex items-center gap-3">
          <Link
            href="/ma-liste"
            className="text-xs font-bold text-brand-900 hover:underline inline-flex items-center gap-1"
          >
            Consulter ma liste ({totalItems}) →
          </Link>
        </div>
      </div>
      <button
        onClick={dismissToast}
        className="text-slate-400 hover:text-slate-600 p-1"
        aria-label="Fermer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
