"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, ClipboardList } from "lucide-react";
import { initialSettings } from "@/data/initialData";
import { useCart } from "@/context/CartContext";

export default function MobileStickyBar() {
  const { totalItems } = useCart();
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 md:hidden shadow-lg">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Bouton Appeler */}
        <a
          href={`tel:${cleanPhone}`}
          className="btn-touch flex flex-col items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg py-1.5 px-1 active:scale-95 transition"
        >
          <Phone className="w-5 h-5 text-brand-900 mb-0.5" />
          <span className="text-[11px] font-semibold">Appeler</span>
        </a>

        {/* Bouton WhatsApp direct */}
        <a
          href={`https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
            "Bonjour Qualimat SARL, je souhaite des renseignements sur vos matériaux."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-touch flex flex-col items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-1.5 px-1 active:scale-95 transition font-semibold"
        >
          <MessageCircle className="w-5 h-5 fill-current mb-0.5" />
          <span className="text-[11px]">WhatsApp</span>
        </a>

        {/* Bouton Ma Liste Devis */}
        <Link
          href="/ma-liste"
          className="btn-touch relative flex flex-col items-center justify-center bg-brand-900 hover:bg-brand-800 text-white rounded-lg py-1.5 px-1 active:scale-95 transition"
        >
          <div className="relative">
            <ClipboardList className="w-5 h-5 text-amber-400 mb-0.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold">Ma Liste</span>
        </Link>
      </div>
    </div>
  );
}
