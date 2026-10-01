# Qualimat SARL — Quincaillerie & Matériaux de Construction (Abomey-Calavi, Bénin)

Site vitrine, catalogue interactif et générateur de devis instantané par WhatsApp conçu sur mesure pour **Qualimat SARL**.

---

## 🏗️ Fonctionnalités implémentées (Phase 1)

1. **Accueil & Présence locale (Abomey-Calavi) :**
   - Moteur de recherche visible immédiatement (< 300 ms).
   - Accès rapide aux rayons phares (Gros Œuvre, Électricité, Plomberie, Outillage, Peinture, Toiture).
   - Horaires d'ouverture, coordonnées et intégration de repérage Google Maps.
   - Bandeau promotionnel administrable et témoignages clients vérifiés.

2. **Catalogue & Fiches Matériaux :**
   - Navigation par rayon avec recherche instantanée tolérante aux mots-clés.
   - Filtres dynamiques par catégorie, marque et disponibilité en stock.
   - Tri par pertinence, prix croissant / décroissant en FCFA, ou nom.
   - Fiche produit détaillée avec spécifications techniques, prix ou mention *« Sur devis »*, et partage direct sur WhatsApp.

3. **Panier & Générateur de Devis WhatsApp (F-06 / F-07 / 5.3) :**
   - Panier persistant en `localStorage` (conservé au rechargement de page).
   - Contrôle précis des quantités (+ / - / suppression).
   - Calcul automatique du montant estimatif en FCFA.
   - Formulaire léger de coordonnées (Nom, Téléphone, Quartier).
   - Bouton d'envoi WhatsApp pré-rempli au format officiel exigé par le cahier des charges :
     ```text
     Bonjour Qualimat, je souhaite un devis pour :
     - Ciment CPJ 35, sac de 50 kg x 40
     - Tuyau PVC Ø 100 mm, barre de 4 m x 12
     - Câble 2,5 mm², couronne de 100 m x 2

     Nom : [visiteur]
     Quartier : [quartier] (Abomey-Calavi / environs)

     Envoyé depuis le site Qualimat
     ```
   - Enregistrement préalable de la demande pour les statistiques commerciales.

4. **Boutons d'action mobiles fixes (F-08) :**
   - Barre tactile en bas d'écran sur mobile avec boutons directs : **Appeler**, **WhatsApp** et **Ma Liste** avec badge de notification.

5. **Espace Pro & Chantiers BTP (F-10) :**
   - Formulaire de demande de cotation gros volumes (Gros œuvre, Rénovation, VRD).
   - Précision du contact, de l'entreprise, du lieu du chantier et bordereau de besoins.

6. **Administration & Back-office (A-01 à A-08) :**
   - Accès protégé par mot de passe (Démonstration : `qualimat`).
   - Gestion complète des produits (ajout en moins de 2 minutes, modification de prix, bascule stock en 1 clic).
   - Suivi des devis WhatsApp préparés et des demandes de chantiers pro reçues.
   - Paramétrage du magasin (Numéro WhatsApp, téléphones, horaires, adresse, IFU, RCCM).
   - Modèle d'import CSV téléchargeable.

7. **Cadre légal & Conformité :**
   - Mentions légales conformes au Code du Numérique en République du Bénin (APDP).

---

## 🎨 Charte Graphique Chantier

- **Acier Foncé :** `#16222B`
- **Jaune Sécurité :** `#F2B705`
- **Bleu Acier :** `#1F4E6B`
- **Béton Clair :** `#ECEDEE`
- **Bande Chantier :** Liseré rayé jaune et noir diagonal.

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js >= 18
- npm

### Installation & Lancement
```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev

# Construction et lancement de la version de production
npm run build
npm run start
```

Le site est accessible sur `http://localhost:3000`.
L'interface d'administration est disponible sur `http://localhost:3000/admin`.
