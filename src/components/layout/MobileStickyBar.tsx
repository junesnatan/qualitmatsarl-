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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-sand-200 p-2 md:hidden shadow-lg">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Bouton Appeler */}
        <a
          href={`tel:${cleanPhone}`}
          className="btn-touch flex flex-col items-center justify-center bg-sand-100 hover:bg-sand-200 text-charcoal-800 rounded-xl py-1.5 px-1 active:scale-95 transition border border-sand-200"
        >
          <Phone className="w-4 h-4 text-brand-900 mb-0.5" />
          <span className="text-[11px] font-semibold">Appeler</span>
        </a>

        {/* Bouton WhatsApp direct */}
        <a
          href={`https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
            "Bonjour QUALITMAT SARL, je souhaite des renseignements sur vos matériaux."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-touch flex flex-col items-center justify-center bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl py-1.5 px-1 active:scale-95 transition font-semibold shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current mb-0.5" />
          <span className="text-[11px]">WhatsApp</span>
        </a>

        {/* Bouton Ma Liste Devis */}
        <Link
          href="/ma-liste"
          className="btn-touch relative flex flex-col items-center justify-center bg-brand-900 hover:bg-brand-800 text-white rounded-xl py-1.5 px-1 active:scale-95 transition border border-brand-800"
        >
          <div className="relative">
            <ClipboardList className="w-4 h-4 text-gold-400 mb-0.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gold-400 text-brand-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
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
