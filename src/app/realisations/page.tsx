import React from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import { Building2, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export default function RealisationsPage() {
  const chantiers = [
    {
      titre: "Immeuble Résidentiel R+3 à Allègléta",
      lieu: "Abomey-Calavi, quartier Allègléta / Pavé de Tankpè",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      materiaux: "3 200 sacs de ciment CPJ 45, 28 tonnes de fer à béton HA FE E500",
      duree: "Chantier livré sur 6 mois",
      description: "Fourniture complète des armatures gros œuvre, ciment haute résistance et réseau d'assainissement PVC Ø 100/125 mm.",
    },
    {
      titre: "Villas Duplex Modernes à Tankpè",
      lieu: "Abomey-Calavi, Carrefour Tankpè",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      materiaux: "Câblerie cuivre H07V-U, gaines ICTA, appareillage Legrand, peintures façades",
      duree: "Second œuvre & Finitions",
      description: "Approvisionnement électrique intégral, éclairage de chantier et peintures acryliques microporeuses.",
    },
    {
      titre: "Complexe Commercial & Bureaux",
      lieu: "Zone Carrefour IITA, Calavi",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      materiaux: "Tôles bac alu-zinc 0.35 mm, visserie étanche, cuves 2 000 L, adduction eau",
      duree: "Lots toiture & plomberie",
      description: "Mise hors d'eau et installation de l'infrastructure hydraulique avec réserves d'eau.",
    },
  ];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 mb-8">
        <span className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5 mb-1">
          <Building2 className="w-4 h-4 text-amber-500" />
          <span>Références & Projets Réalisés</span>
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900">
          Chantiers Approvisionnés par QUALITMATSARL
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Découvrez quelques-uns des projets résidentiels et tertiaires approvisionnés par notre équipe à Abomey-Calavi et dans le Grand Cotonou.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {chantiers.map((c, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-md transition"
          >
            <div className="relative h-48 w-full bg-slate-100">
              <SafeImage src={c.image} alt={c.titre} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{c.lieu}</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                  {c.titre}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {c.description}
                </p>

                <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 mb-4 border border-slate-200">
                  <div className="text-slate-500 font-medium">Matériaux fournis :</div>
                  <div className="text-slate-900 font-semibold">{c.materiaux}</div>
                </div>
              </div>

              <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{c.duree}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-3xl mx-auto shadow-sm">
        <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
          Un nouveau chantier en préparation ?
        </h3>
        <p className="text-xs text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
          Transmettez-nous vos bordereaux quantitatifs pour une cotation personnalisée et une étude logistique.
        </p>
        <Link
          href="/pro"
          className="btn-touch inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs px-6 py-3 rounded-lg shadow-sm"
        >
          <span>Déposer une demande de devis pro</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
