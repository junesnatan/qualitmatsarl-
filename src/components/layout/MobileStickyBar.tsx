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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-acier-950/95 backdrop-blur-md border-t border-acier-800 p-2 md:hidden shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Bouton Appeler */}
        <a
          href={`tel:${cleanPhone}`}
          className="btn-touch flex flex-col items-center justify-center bg-acier-800 hover:bg-acier-700 text-white rounded py-1.5 px-1 border border-acier-700 active:scale-95 transition"
        >
          <Phone className="w-5 h-5 text-jaune mb-0.5" />
          <span className="text-[11px] font-bold uppercase tracking-wider">Appeler</span>
        </a>

        {/* Bouton WhatsApp direct */}
        <a
          href={`https://wa.me/${initialSettings.whatsappNumber}?text=${encodeURIComponent(
            "Bonjour Qualimat, je souhaite des renseignements sur vos matériaux."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-touch flex flex-col items-center justify-center bg-whatsapp hover:bg-whatsapp-hover text-white rounded py-1.5 px-1 active:scale-95 transition font-bold"
        >
          <MessageCircle className="w-5 h-5 fill-current mb-0.5" />
          <span className="text-[11px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Bouton Ma Liste Devis */}
        <Link
          href="/ma-liste"
          className="btn-touch relative flex flex-col items-center justify-center bg-jaune hover:bg-jaune-hover text-acier-950 rounded py-1.5 px-1 active:scale-95 transition"
        >
          <div className="relative">
            <ClipboardList className="w-5 h-5 text-acier-950 mb-0.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-acier-950 text-jaune text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-jaune">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider">Ma Liste</span>
        </Link>
      </div>
    </div>
  );
}
