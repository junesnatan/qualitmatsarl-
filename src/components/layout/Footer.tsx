"use client";

import React from "react";
import Link from "next/link";
import { initialCategories, initialSettings } from "@/data/initialData";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  HardHat,
  ShieldCheck,
  Truck,
  FileCheck,
} from "lucide-react";

export default function Footer() {
  const cleanPhone = initialSettings.telephonePrincipal.replace(/\s+/g, "");

  return (
    <footer className="bg-acier-950 text-acier-300 border-t border-acier-800 pt-12 pb-24 md:pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        {/* Avantages phares */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-acier-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-jaune/10 border border-jaune/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-jaune" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wide">
                Qualité Certifiée
              </h4>
              <p className="text-xs text-acier-400 mt-1">
                Fers haute adhérence FE E500, ciments conformes et câblerie cuivre pur.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-jaune/10 border border-jaune/30 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-jaune" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wide">
                Livraison Chantier
              </h4>
              <p className="text-xs text-acier-400 mt-1">
                Camions bennes et plateaux livrés à Abomey-Calavi, Cotonou, Godomey et Ouidah.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-jaune/10 border border-jaune/30 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-jaune" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wide">
                Devis Rapide WhatsApp
              </h4>
              <p className="text-xs text-acier-400 mt-1">
                Préparez votre liste sur le site et recevez les disponibilités et prix en quelques minutes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-jaune/10 border border-jaune/30 flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6 text-jaune" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wide">
                Tarifs Gros & BTP
              </h4>
              <p className="text-xs text-acier-400 mt-1">
                Conditions préférentielles pour entrepreneurs du bâtiment et artisans réguliers.
              </p>
            </div>
          </div>
        </div>

        {/* Corps du Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-acier-800 text-sm">
          {/* Bloc 1 : Entreprise */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-jaune text-acier-950 flex items-center justify-center rounded font-heading font-black text-lg">
                <HardHat className="w-5 h-5 text-acier-950" />
              </div>
              <span className="font-heading font-black text-2xl tracking-wider text-white">
                QUALIMAT <span className="text-xs text-jaune font-mono">SARL</span>
              </span>
            </div>
            <p className="text-xs text-acier-400 leading-relaxed mb-4">
              Votre partenaire de référence en matériaux de construction et quincaillerie professionnelle à Abomey-Calavi (Bénin). Matériel fiable pour fondations durables.
            </p>
            <div className="text-xs text-acier-400 space-y-1">
              <p><strong className="text-acier-200">IFU :</strong> {initialSettings.ifu}</p>
              <p><strong className="text-acier-200">RCCM :</strong> {initialSettings.rccm}</p>
            </div>
          </div>

          {/* Bloc 2 : Rayons & Matériaux */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-jaune pl-2">
              Rayons du Catalogue
            </h4>
            <ul className="space-y-2 text-xs">
              {initialCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/catalogue/${cat.slug}`}
                    className="hover:text-jaune transition flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-jaune rounded-full" />
                    <span>{cat.nom}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloc 3 : Liens utiles & Pro */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-jaune pl-2">
              Services & Informations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/pro" className="text-jaune font-semibold hover:underline flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-jaune rounded-full" />
                  <span>Espace Pro & Devis Chantier</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Services (Livraison, Découpe)
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="hover:text-white transition">
                  Références de chantiers
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-white transition">
                  Présentation de Qualimat
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Plan d&apos;accès et Horaires
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-white transition">
                  Mentions Légales & Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Bloc 4 : Coordonnées & Horaires */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-jaune pl-2">
              Magasin Abomey-Calavi
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-jaune shrink-0 mt-0.5" />
                <span>{initialSettings.adresse}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-jaune shrink-0" />
                <a href={`tel:${cleanPhone}`} className="text-white hover:text-jaune font-bold">
                  {initialSettings.telephonePrincipal}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-whatsapp shrink-0" />
                <a
                  href={`https://wa.me/${initialSettings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-whatsapp hover:underline font-bold"
                >
                  +{initialSettings.whatsappNumber} (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-jaune shrink-0" />
                <a href={`mailto:${initialSettings.email}`} className="hover:text-white">
                  {initialSettings.email}
                </a>
              </div>
              <div className="pt-2 border-t border-acier-800">
                <div className="flex items-start gap-2 text-acier-400">
                  <Clock className="w-4 h-4 text-jaune shrink-0 mt-0.5" />
                  <div>
                    <p className="text-acier-200 font-semibold">{initialSettings.horairesSemaine}</p>
                    <p className="text-[11px]">{initialSettings.horairesDimanche}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bas de page légal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-acier-400">
          <p>© {new Date().getFullYear()} Qualimat SARL. Tous droits réservés. Abomey-Calavi, République du Bénin.</p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="hover:text-white">
              Mentions légales & Données
            </Link>
            <span className="text-acier-700">|</span>
            <Link href="/admin" className="hover:text-jaune">
              Administration
            </Link>
          </div>
        </div>
      </div>

      {/* Liseré inférieur de chantier */}
      <div className="h-1.5 stripe-accent w-full mt-8" />
    </footer>
  );
}
