import React from "react";
import Link from "next/link";
import { Truck, Scissors, MessageSquare, ShieldCheck, ArrowRight, HardHat } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Truck,
      title: "Livraison sur Chantier",
      subtitle: "Abomey-Calavi, Godomey, Cotonou, Ouidah",
      description:
        "Nous disposons d'une logistique adaptée avec camions bennes (gravier, sable) et camions plateaux pour la livraison sécurisée de vos palettes de ciment et paquets de fer à béton jusqu'au lieu exact de vos travaux.",
      features: [
        "Déchargement soigné sur site",
        "Créneaux horaires respectés pour coulage de béton",
        "Livraison express sous 24h selon stock",
      ],
    },
    {
      icon: Scissors,
      title: "Découpe & Façonnage de Fer",
      subtitle: "Cadres, étriers, épingles sur mesure",
      description:
        "Gagnez un temps précieux sur chantier : nos équipes d'atelier découpent et façonnent vos aciers selon vos plans de ferraillage pour accélérer le montage de vos armatures de poteaux et poutres.",
      features: [
        "Section de 6 mm à 16 mm",
        "Précision millimétrique des dimensions",
        "Ferraillage prêt à l'emploi",
      ],
    },
    {
      icon: MessageSquare,
      title: "Conseil Technique & Échantillonnage",
      subtitle: "Accompagnement par des professionnels",
      description:
        "Doute sur le choix entre ciment CPJ 35 ou CPJ 45 ? Sur le dimensionnement d'un câble cuivre ou le débit d'un tuyau de pression ? Nos conseillers expérimentés vous guident avec franchise et expertise.",
      features: [
        "Fiches techniques des fabricants",
        "Estimation des quantités requises",
        "Solutions adaptées à votre budget",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Vente en Gros & Approvisionnement BTP",
      subtitle: "Contrats et bordereaux pour promoteurs",
      description:
        "Pour les projets de grande envergure, nous négocions directement auprès des cimenteries et aciéries pour vous garantir les meilleurs prix du marché et un calendrier d'approvisionnement continu.",
      features: [
        "Tarifs dégressifs sur volumes importants",
        "Priorité d'attribution sur les stocks",
        "Facturation normalisée avec IFU",
      ],
    },
  ];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="bg-acier-900 text-white rounded-2xl p-6 sm:p-12 mb-12 border border-acier-800 shadow-xl relative overflow-hidden">
        <div className="h-1.5 stripe-accent w-full absolute top-0 left-0" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-jaune text-acier-950 text-xs font-black uppercase px-3 py-1 rounded tracking-wider mb-4">
            <HardHat className="w-4 h-4" />
            <span>Nos Services d&apos;Accompagnement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase text-white leading-tight">
            Des services pensés pour faciliter <br />
            <span className="text-jaune">la vie sur le chantier</span>
          </h1>
          <p className="mt-4 text-xs sm:text-base text-acier-200 leading-relaxed">
            Parce qu&apos;une quincaillerie moderne ne se limite pas à vendre du matériel, Qualimat vous accompagne de la préparation de vos besoins jusqu&apos;à la livraison finale.
          </p>
        </div>
      </div>

      {/* Grille des services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-beton-dark p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-jaune transition"
            >
              <div>
                <div className="w-12 h-12 bg-jaune/10 border border-jaune/30 rounded-lg flex items-center justify-center text-jaune mb-4">
                  <Icon className="w-6 h-6 text-jaune-hover" />
                </div>
                <h3 className="font-heading font-black text-2xl text-acier uppercase mb-1">
                  {srv.title}
                </h3>
                <p className="text-xs text-bleu font-bold uppercase mb-4 tracking-wide">
                  {srv.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-acier-600 leading-relaxed mb-6">
                  {srv.description}
                </p>

                <ul className="space-y-2 text-xs text-acier-700 mb-6">
                  {srv.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-jaune" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-beton">
                <Link
                  href="/contact"
                  className="text-xs font-bold text-acier-900 hover:text-bleu uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <span>Demander ce service</span>
                  <ArrowRight className="w-4 h-4 text-jaune-hover" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
