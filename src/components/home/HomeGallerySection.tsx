"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/common/SafeImage";
import {
  Building2,
  X,
  ExternalLink,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Maximize2,
} from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  location: string;
  date: string;
  materials: string;
  image: string;
  description: string;
}

const GALLERY_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Coulage Dalle Immeuble R+2",
    location: "Allègléta, Abomey-Calavi",
    date: "Mars 2026",
    materials: "280 sacs Ciment CPJ 45, 3.5 T Fer à béton HA Ø 12 & 10",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    description: "Approvisionnement continu en fers haute adhérence et ciment pour coulage de plancher en une journée sans interruption.",
  },
  {
    id: "proj-2",
    title: "Chantier Résidentiel & Clôture",
    location: "Pavé de Tankpè, Calavi",
    date: "Février 2026",
    materials: "1 500 parpaings creux 15x20x40, ciment CPJ 35, sable lagune",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    description: "Élévation de murs et clôture périmétrique avec parpaings vibrés haute densité fabriqués selon normes.",
  },
  {
    id: "proj-3",
    title: "Réseau Plomberie & Assainissement Villa",
    location: "Arconville, Abomey-Calavi",
    date: "Janvier 2026",
    materials: "Tubes PVC Ø 100 et 32, vanne laiton, cuve 1 000 L",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    description: "Installation complète d'alimentation sous pression et évacuation gravitaire des eaux vannes.",
  },
  {
    id: "proj-4",
    title: "Rénovation Façades & Peinture Extérieure",
    location: "Godomey, Atlantique",
    date: "Janvier 2026",
    materials: "Peinture acrylique mate hydrofuge, enduits de lissage",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    description: "Ravalement de façade avec protection anti-moisissures et résistance aux intempéries marines.",
  },
  {
    id: "proj-5",
    title: "Câblage Électrique Bâtiment Tertiaire",
    location: "Calavi Centre",
    date: "Décembre 2025",
    materials: "Couronnes 2,5 et 1,5 mm², gaines ICTA, disjoncteurs Legrand",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Distribution électrique sécurisée avec protection différentielle 30mA et tableau divisionnaire normalisé.",
  },
  {
    id: "proj-6",
    title: "Toiture Bac Alu-Zinc Immeuble",
    location: "Akassato, Calavi",
    date: "Novembre 2025",
    materials: "Tôles bac alu-zinc 0,35 mm, tirefonds étanches",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    description: "Couverture étanche haute longévité avec fixations néoprène renforcées contre les vents côtiers.",
  },
];

export default function HomeGallerySection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section className="py-14 px-4 max-w-7xl mx-auto border-t border-slate-200">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>Références sur le Terrain</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
            Chantiers Livrés & Réalisations Récentes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Découvrez quelques-uns des chantiers approvisionnés par QUALITMATSARL à Abomey-Calavi et dans l&apos;Atlantique.
          </p>
        </div>

        <Link
          href="/realisations"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-900 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-xl transition self-start md:self-auto"
        >
          <span>Voir toutes les réalisations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grille de Réalisations 3 colonnes avec Lightbox au clic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          >
            {/* Image avec bouton zoom */}
            <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
              <SafeImage
                src={project.image}
                alt={project.title}
                categorySlug="cat-gros-oeuvre"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-800 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-4 h-4 text-brand-900" />
                </span>
              </div>
              <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {project.location}
              </span>
            </div>

            {/* Détails */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-base text-slate-900 group-hover:text-brand-900 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[180px] font-medium text-slate-600">
                  {project.materials}
                </span>
                <span className="text-brand-900 font-bold group-hover:underline shrink-0">
                  Détails →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedProject(null)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-scale-up">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 bg-slate-900/60 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-72 w-full bg-slate-900">
              <SafeImage
                src={selectedProject.image}
                alt={selectedProject.title}
                categorySlug="cat-gros-oeuvre"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{selectedProject.location}</span>
                <span>•</span>
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedProject.date}</span>
              </div>

              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                {selectedProject.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <strong>Matériaux fournis par QUALITMATSARL :</strong>
                <p className="mt-0.5 text-slate-600">{selectedProject.materials}</p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                >
                  Fermer
                </button>
                <Link
                  href="/pro"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-900 hover:bg-brand-800 transition"
                >
                  Demander un devis pour votre chantier
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
