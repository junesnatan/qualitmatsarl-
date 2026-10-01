import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export default function RealisationsPage() {
  const chantiers = [
    {
      titre: "Immeuble Résidentiel R+3 à Arconville",
      lieu: "Abomey-Calavi, quartier Arconville",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
      materiaux: "3 200 sacs de ciment CPJ 45, 28 tonnes de fer à béton HA FE E500",
      duree: "Chantier livré sur 6 mois",
      description: "Fourniture complète des armatures gros œuvre, ciment haute résistance et réseau d'évacuation PVC Ø 100/125 mm.",
    },
    {
      titre: "Villas Duplex Modernes à Tankpè",
      lieu: "Abomey-Calavi, Tankpè Carrefour",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      materiaux: "Câblerie cuivre H07V-U, tubes ICTA, appareillage Legrand, peintures façades",
      duree: "Second œuvre & Finitions",
      description: "Approvisionnement électrique intégral, éclairage LED chantier et peintures acryliques microporeuses.",
    },
    {
      titre: "Complexe Commercial & Bureaux",
      lieu: "Zone Carrefour IITA, Calavi",
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      materiaux: "Tôles bac alu-zinc 0.35 mm, visserie étanche, cuves 2 000 L, adduction eau",
      duree: "Lots toiture & plomberie",
      description: "Mise hors d'eau et installation de l'infrastructure hydraulique avec réserves d'eau.",
    },
  ];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="border-b-2 border-acier-200 pb-6 mb-8">
        <div className="text-xs font-bold text-bleu uppercase tracking-widest flex items-center gap-1.5 mb-1">
          <Building2 className="w-4 h-4 text-jaune-hover" />
          <span>Confiance du terrain</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-acier uppercase">
          Nos Références & Chantiers Livrés
        </h1>
        <p className="text-xs sm:text-sm text-acier-600 mt-1 max-w-2xl">
          Découvrez quelques-uns des chantiers approvisionnés par Qualimat SARL à Abomey-Calavi et dans le Grand Cotonou.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {chantiers.map((c, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-beton-dark shadow-sm overflow-hidden flex flex-col hover:border-jaune transition"
          >
            <div className="relative h-52 w-full bg-acier-800">
              <Image src={c.image} alt={c.titre} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-acier-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-jaune" />
                <span>{c.lieu}</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-black text-xl text-acier uppercase mb-2">
                  {c.titre}
                </h3>
                <p className="text-xs text-acier-600 leading-relaxed mb-4">
                  {c.description}
                </p>

                <div className="bg-beton-light p-3 rounded text-xs space-y-1 mb-4 border border-beton">
                  <div className="text-acier-500 font-semibold">Matériaux fournis :</div>
                  <div className="text-acier-900 font-bold">{c.materiaux}</div>
                </div>
              </div>

              <div className="text-[11px] text-bleu font-bold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{c.duree}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-acier-900 text-white rounded-xl p-8 text-center max-w-3xl mx-auto border border-acier-800">
        <h3 className="font-heading font-black text-2xl uppercase mb-2">
          Un nouveau projet à démarrer ?
        </h3>
        <p className="text-xs text-acier-300 max-w-xl mx-auto mb-6">
          Transmettez-nous vos plans ou vos bordereaux quantitatifs pour une cotation sans engagement.
        </p>
        <Link
          href="/pro"
          className="btn-touch inline-flex items-center gap-2 bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-xs px-6 py-3 rounded tracking-wider shadow"
        >
          <span>Déposer un devis chantier</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
