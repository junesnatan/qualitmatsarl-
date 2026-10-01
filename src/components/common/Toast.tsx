"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";

export default function Toast() {
  const { toast, dismissToast, totalItems } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-sm bg-acier text-white rounded-lg shadow-2xl border-2 border-jaune p-4 flex items-start gap-3 animate-bounce-in">
      <CheckCircle2 className="w-5 h-5 text-jaune shrink-0 mt-0.5" />
      <div className="flex-1 text-sm">
        <p className="font-semibold text-white">{toast}</p>
        <div className="mt-2 flex items-center gap-3">
          <Link
            href="/ma-liste"
            className="text-xs font-bold text-jaune hover:underline uppercase tracking-wide inline-flex items-center gap-1"
          >
            Voir ma liste ({totalItems}) →
          </Link>
        </div>
      </div>
      <button
        onClick={dismissToast}
        className="text-acier-400 hover:text-white p-1"
        aria-label="Fermer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
