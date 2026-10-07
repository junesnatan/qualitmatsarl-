import React from "react";
import Link from "next/link";
import { Truck, Scissors, MessageSquare, ShieldCheck, ArrowRight, Building2 } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Truck,
      title: "Livraison Directe sur Chantier",
      subtitle: "Abomey-Calavi, Godomey, Cotonou, Ouidah",
      description:
        "Flotte logistique adaptée comprenant camions bennes (sable, gravier) et camions plateaux pour acheminer sans risque vos palettes de ciment et paquets de fer à béton jusqu'au pied de vos fondations.",
      features: [
        "Déchargement méthodique sur site",
        "Créneaux horaires calés pour le coulage de béton",
        "Livraison réactive selon disponibilité",
      ],
    },
    {
      icon: Scissors,
      title: "Découpe & Façonnage d'Aciers",
      subtitle: "Cadres, étriers, épingles sur mesure",
      description:
        "Optimisez votre productivité sur chantier : nos équipes d'atelier découpent et façonnent vos barres de fer à béton selon vos plans de ferraillage pour accélérer le montage de vos armatures.",
      features: [
        "Sections de fer de 6 mm à 16 mm",
        "Conformité rigoureuse aux cotes de pliage",
        "Armatures prêtes à poser",
      ],
    },
    {
      icon: MessageSquare,
      title: "Conseil & Accompagnement Technique",
      subtitle: "Expertise quincaillerie & BTP",
      description:
        "Besoin de trancher entre ciment CPJ 35 ou CPJ 45 ? De dimensionner un câble de cuivre pour climatisation ou un diamètre de PVC d'évacuation ? Nos conseillers expérimentés vous guident avec précision.",
      features: [
        "Fiches techniques fabricants disponibles",
        "Estimation réaliste des quantités",
        "Conseils adaptés aux contraintes du sol",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Vente en Gros & Marchés Entreprises",
      subtitle: "Partenariats pour promoteurs et majors",
      description:
        "Approvisionnement continu pour programmes immobiliers et chantiers d'envergure. Négociations directes d'usines pour vous faire bénéficier de tarifs de volume très compétitifs.",
      features: [
        "Grilles tarifaires dégressives",
        "Priorité d'attribution sur les stocks",
        "Facturation normalisée avec IFU",
      ],
    },
  ];

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="bg-white rounded-2xl p-6 sm:p-12 mb-12 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 border border-primary-200 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <Building2 className="w-4 h-4" />
            <span>Nos Services aux Professionnels & Particuliers BTP</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 leading-tight">
            Des prestations conçues pour fluidifier vos opérations de chantier avec <span className="text-primary-600">QUALITMAT SARL</span>
          </h1>
          <p className="mt-3 text-xs sm:text-base text-slate-600 leading-relaxed">
            Au-delà de la vente de matériaux, QUALITMATSARL est un partenaire logistique et technique fiable à chaque étape de votre construction à Abomey-Calavi et dans l&apos;Atlantique.
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
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-primary-500 hover:shadow-md transition"
            >
              <div>
                <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-1">
                  {srv.title}
                </h3>
                <p className="text-xs text-solar-600 font-bold mb-4">
                  {srv.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {srv.description}
                </p>

                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  {srv.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/contact"
                  className="text-xs font-bold text-primary-600 hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Demander un renseignement</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
