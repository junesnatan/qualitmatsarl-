import React from "react";
import { initialSettings } from "@/data/initialData";
import { ShieldCheck, FileText, Lock } from "lucide-react";

export default function MentionsLegalesPage() {
  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <div className="border-b-2 border-acier-200 pb-6 mb-8">
        <div className="text-xs font-bold text-bleu uppercase tracking-widest flex items-center gap-1.5 mb-1">
          <ShieldCheck className="w-4 h-4 text-jaune-hover" />
          <span>Cadre réglementaire</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-black text-acier uppercase">
          Mentions Légales & Politique de Confidentialité
        </h1>
        <p className="text-xs sm:text-sm text-acier-600 mt-1">
          Conformité avec les lois de la République du Bénin (Loi n° 2017-20 portant Code du Numérique en République du Bénin).
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-beton-dark shadow-sm p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-acier-700 leading-relaxed">
        {/* Éditeur */}
        <section>
          <h2 className="font-heading font-black text-xl text-acier uppercase mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-jaune-hover" />
            <span>1. Informations Légales sur l&apos;Éditeur</span>
          </h2>
          <div className="space-y-1.5 pl-4 border-l-2 border-jaune">
            <p><strong>Dénomination sociale :</strong> Qualimat SARL (Société à Responsabilité Limitée)</p>
            <p><strong>Activité :</strong> Commerce général de quincaillerie, vente et distribution de matériaux de construction et outillage de bâtiment</p>
            <p><strong>Siège social :</strong> {initialSettings.adresse}, {initialSettings.ville}</p>
            <p><strong>Numéro IFU :</strong> {initialSettings.ifu}</p>
            <p><strong>Registre du Commerce et du Crédit Mobilier (RCCM) :</strong> {initialSettings.rccm}</p>
            <p><strong>Téléphone :</strong> {initialSettings.telephonePrincipal}</p>
            <p><strong>Courriel de contact :</strong> {initialSettings.email}</p>
          </div>
        </section>

        {/* Hébergement */}
        <section>
          <h2 className="font-heading font-black text-xl text-acier uppercase mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-jaune-hover" />
            <span>2. Hébergement du Site Web</span>
          </h2>
          <p>
            Le site web de Qualimat SARL est hébergé sur des serveurs sécurisés conformes aux protocoles de chiffrement HTTPS (SSL/TLS), garantissant l&apos;intégrité et la confidentialité des échanges entre le visiteur et notre plateforme.
          </p>
        </section>

        {/* Protection des données personnelles */}
        <section>
          <h2 className="font-heading font-black text-xl text-acier uppercase mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-jaune-hover" />
            <span>3. Protection des Données Personnelles (APDP Bénin)</span>
          </h2>
          <p className="mb-3">
            Conformément aux dispositions du Livre V de la Loi n° 2017-20 du 20 avril 2018 portant Code du Numérique en République du Bénin relative à la protection des données à caractère personnel :
          </p>
          <ul className="space-y-2 pl-4 border-l-2 border-acier-300">
            <li>
              <strong>Collecte minimale :</strong> Les coordonnées renseignées dans le formulaire de liste de devis (nom, téléphone, quartier) ne sont utilisées que dans le but strict de générer le devis WhatsApp et d&apos;organiser la livraison de vos matériaux.
            </li>
            <li>
              <strong>Stockage local :</strong> Vos sélections de produits sont conservées dans le stockage local de votre propre navigateur pour votre confort de navigation. Vous pouvez les supprimer à tout instant via le bouton &laquo; Vider la liste &raquo;.
            </li>
            <li>
              <strong>Droit d&apos;accès et de rectification :</strong> Vous disposez d&apos;un droit d&apos;accès, de modification et de suppression des données vous concernant en adressant un message à <a href={`mailto:${initialSettings.email}`} className="text-bleu font-bold underline">{initialSettings.email}</a>.
            </li>
          </ul>
        </section>

        {/* Propriété intellectuelle */}
        <section>
          <h2 className="font-heading font-black text-xl text-acier uppercase mb-3">
            4. Propriété Intellectuelle & Prix
          </h2>
          <p>
            Les marques citées (CIMBENIN, NOCIBE, Legrand, Schneider, Bosch, etc.) appartiennent à leurs propriétaires respectifs et sont mentionnées uniquement pour désigner avec précision les produits distribués.
          </p>
          <p className="mt-2">
            Les prix indiqués en Francs CFA (FCFA) sur le site le sont à titre d&apos;information pour le magasin d&apos;Abomey-Calavi et peuvent être soumis à variations selon les cours d&apos;importation, les volumes commandés ou les frais d&apos;acheminement sur chantier.
          </p>
        </section>
      </div>
    </div>
  );
}
