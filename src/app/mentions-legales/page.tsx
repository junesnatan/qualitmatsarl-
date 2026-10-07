import React from "react";
import { initialSettings } from "@/data/initialData";
import { ShieldCheck, FileText, Lock } from "lucide-react";

export default function MentionsLegalesPage() {
  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <div className="border-b border-slate-200 pb-6 mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary-600 uppercase tracking-widest bg-primary-50 border border-primary-200 px-3 py-1 rounded-full mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Cadre Juridique</span>
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900">
          Mentions Légales & Confidentialité des Données
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Conformité avec les lois de la République du Bénin (Loi n° 2017-20 portant Code du Numérique en République du Bénin).
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
        {/* Éditeur */}
        <section>
          <h2 className="font-heading font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" />
            <span>1. Informations Légales sur la Société</span>
          </h2>
          <div className="space-y-1.5 pl-4 border-l-2 border-primary-600 text-slate-700">
            <p><strong>Dénomination sociale :</strong> QUALITMATSARL (Société à Responsabilité Limitée)</p>
            <p><strong>Activité :</strong> Commerce général de quincaillerie, vente et distribution de matériaux de construction et outillage</p>
            <p><strong>Siège social :</strong> {initialSettings.adresse}, {initialSettings.ville}</p>
            <p><strong>Numéro IFU :</strong> {initialSettings.ifu}</p>
            <p><strong>Registre du Commerce et du Crédit Mobilier (RCCM) :</strong> {initialSettings.rccm}</p>
            <p><strong>Téléphone :</strong> {initialSettings.telephonePrincipal}</p>
            <p><strong>Courriel officiel :</strong> {initialSettings.email}</p>
          </div>
        </section>

        {/* Hébergement */}
        <section>
          <h2 className="font-heading font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary-600" />
            <span>2. Hébergement de la Plateforme</span>
          </h2>
          <p>
            Le site internet de QUALITMATSARL est hébergé sur des infrastructures cloud sécurisées conformes aux normes internationales de disponibilité et de chiffrement des données (protocoles SSL/TLS HTTPS).
          </p>
        </section>

        {/* Données personnelles */}
        <section>
          <h2 className="font-heading font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary-600" />
            <span>3. Protection des Données Personnelles (Code du Numérique Bénin / APDP)</span>
          </h2>
          <p className="mb-3">
            Conformément aux dispositions du Livre V de la Loi n° 2017-20 du 20 avril 2018 portant Code du Numérique en République du Bénin :
          </p>
          <ul className="space-y-2 pl-4 border-l-2 border-slate-300">
            <li>
              <strong>Finalité de la collecte :</strong> Les renseignements fournis dans les formulaires de devis et contact sont exclusivement réservés au traitement de vos demandes commerciales et à la logistique de livraison.
            </li>
            <li>
              <strong>Stockage local :</strong> Vos sélections d&apos;articles sont mémorisées sur votre propre appareil pour votre confort. Vous conservez le contrôle total pour vider votre liste à tout moment.
            </li>
            <li>
              <strong>Droits d&apos;accès :</strong> Vous pouvez exercer vos droits d&apos;accès, de modification ou de suppression en écrivant à <a href={`mailto:${initialSettings.email}`} className="text-primary-600 font-bold underline">{initialSettings.email}</a>.
            </li>
          </ul>
        </section>

        {/* Propriété intellectuelle */}
        <section>
          <h2 className="font-heading font-bold text-lg text-slate-900 mb-3">
            4. Marques & Tarification
          </h2>
          <p>
            Les marques citées (CIMBENIN, NOCIBE, Legrand, Schneider Electric, Bosch, Bellota, etc.) sont la propriété exclusive de leurs détenteurs respectifs et sont mentionnées uniquement pour caractériser les produits proposés à la vente.
          </p>
          <p className="mt-2">
            Les prix indiqués en Francs CFA (FCFA) sur le site sont indicatifs pour le magasin d&apos;Abomey-Calavi et peuvent faire l&apos;objet de variations selon les approvisionnements et les conditions de livraison sur site.
          </p>
        </section>
      </div>
    </div>
  );
}
