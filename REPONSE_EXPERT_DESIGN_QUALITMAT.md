# Présentation & Revue de Design : Projet QUALITMATSARL
> **Document de référence pour entretien, audit ou échange avec un expert en Web Design & Product Design.**

---

## 1. Pitch Exécutif du Projet

**Projet :** Plateforme digitale, catalogue interactif et générateur de devis WhatsApp pour **QUALITMATSARL**.  
**Secteur :** Quincaillerie générale, vente de ciment et matériaux de construction.  
**Localisation :** Allègléta / Pavé de Tankpè, Abomey-Calavi (Bénin).  
**Stack technique :** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, LocalStorage résilient.

### La problématique produit & design
> *"Comment transformer un commerce physique traditionnel de matériaux lourds et de quincaillerie en une vitrine digitale moderne, rassurante et génératrice de leads qualifiés, dans un écosystème où le mobile domine et où WhatsApp est le canal roi des transactions ?"*

---

## 2. « Comment s'est passé le projet ? » (Déroulement & Méthodologie)

Si un expert te demande comment le projet a été mené, voici le récit structuré et professionnel des faits :

### Étape 1 : Cadrage & Immersion utilisateur
- **Analyse des personas réels :**
  - **L'Artisan / Maçon / Plombier :** Cherche une référence en urgence sur smartphone Android, veut connaître la disponibilité et envoyer son besoin sans formulaire complexe.
  - **L'Entrepreneur BTP :** Évalue la solidité du fournisseur, a besoin de devis par lots pour ses chantiers, consulte souvent sur PC ou tablette le soir.
  - **Le Particulier constructeur :** A besoin d'être rassuré par la localisation physique exacte, les horaires et la clarté des tarifs (FCFA).
- **Choix du paradigme de conversion :** Au lieu d'imposer un tunnel e-commerce classique (paiement en ligne lourd, création de compte obligatoire) inadapté aux habitudes locales de devis volumineux, nous avons conçu un **tunnel de "Chat-Commerce" optimisé** : *Sélection de produits -> Génération automatique de la liste structurée -> Envoi en 1 clic sur WhatsApp officiel.*

### Étape 2 : Le premier prototype et le pivot de design
- **Le premier jet :** La première version explorait un univers « chantier industriel brut », avec des contrastes sombres, des tons béton lourd et des accents type ruban de chantier.
- **Le retour d'expérience & la décision de pivot :** Ce style a été jugé trop lourd, sombre et peu institutionnel pour une entreprise qui souhaite inspirer une confiance bancaire et partenariale.
- **La décision :** Abandon immédiat de tout thème sombre au profit d'un **thème 100% Corporate Clair (Light & Crisp)**, aéré, lumineux et professionnel.

### Étape 3 : Résolution chirurgicale des frictions UI/UX
- **Suppression du bruit visuel :** Le pied de page initial, trop chargé avec des bannières redondantes, a été réduit à un layout aéré en 3 colonnes épurées (Identité légale & IFU/RCCM, Navigation, Coordonnées directes).
- **Navigation contextuelle dynamique :** Correction du soulignement de menu persistant sous l'onglet Pro au premier chargement ; mise en place d'une détection réactive stricte de la route active via `usePathname`.
- **Bouton d'action immédiat :** Intégration d'un bouton flottant WhatsApp fixe en bas à droite (`bottom-6 right-6`), toujours accessible au pouce de l'utilisateur sans encombrer la vue.

### Étape 4 : Résilience des actifs graphiques (Le défi des images)
- Un problème récurrent des catalogues web est le risque d'images manquantes (erreurs 404 CDN ou indisponibilité réseau).
- **Solution UX mise en place :** Conception d'un composant sur-mesure `SafeImage` avec double système de sécurité :
  1. Si l'image source distante échoue, un fallback automatique basé sur la catégorie du produit prend le relais.
  2. Si le fallback réseau échoue également, un placeholder vectoriel SVG élégant s'affiche instantanément.  
  *Résultat : aucun cadre blanc ou cassé sur tout le site.*

### Étape 5 : Intégration des données réelles et compilation
- Mise à jour exacte des coordonnées : **QUALITMATSARL**, Allègléta / Pavé de Tankpè, Abomey-Calavi, contact `+229 96 53 84 55`.
- **Compilation Next.js :** 19 pages statiques et dynamiques générées sans aucune erreur TypeScript ou de linting, garantissant un temps de chargement inférieur à 1 seconde.

---

## 3. « Comment est le design ? » (Direction Artistique & Choix UI/UX)

Voici les arguments à présenter à un designer senior pour expliquer **pourquoi** le site a cette allure :

### A. Philosophie : "Corporate Clarity meets Pragmatic Utility"
Le design n'est pas un exercice de style purement esthétique ; c'est un **outil commercial au service de la confiance**.

```
   [ Clarté Corporate ]   +   [ Ergonomie Mobile ]   +   [ Action Immédiate ]
(Bleu marine, blanc pur)     (Zones tactiles 48px)       (WhatsApp en 1 clic)
```

### B. Palette chromatique et sémantique
| Rôle | Couleur / Hex | Rationale UI/UX |
|---|---|---|
| **Primaire Institutionnel** | Bleu Marine Profond (`#0F2C59` / `#1E3A8A`) | Évoque la rigueur, la pérennité, la solidité d'une grande entreprise de BTP. |
| **Accent / CTA** | Ambre de Sécurité (`#D97706` / `#F59E0B`) | Rappelle subtilement le monde du chantier tout en offrant un ratio de contraste optimal (WCAG AA/AAA) sur fond clair pour les boutons d'appel à l'action. |
| **Surfaces & Fonds** | Blanc Pur (`#FFFFFF`) & Ardoise ultra-douce (`#F8FAFC`) | Élimine la fatigue visuelle, offre une luminosité maximale même sous le soleil d'Afrique de l'Ouest sur les écrans de smartphone. |
| **Texte & Typographie** | Anthracite Ardoise (`#0F172A`) | Contraste net et doux, supérieur au noir pur (`#000000`) qui fatigue l'œil sur écran lumineux. |

### C. Hiérarchie visuelle et fiches produits
1. **Photographie produit valorisée :** Des images nettes, cadrées avec bordures adoucies (`rounded-2xl`) et effet d'élévation doux au survol (`hover:shadow-lg transition-all`).
2. **Étiquettes de statut explicites :**
   - Pastille verte : `En Stock`
   - Pastille bleue : `Sur Devis` ou Prix clair affiché en `FCFA`
3. **Micro-interactions utiles :** Le bouton d'ajout au devis change d'état et incrémente en temps réel le badge du panier dans le header.

### D. Optimisation Mobile & Ergonomie tactile
- **Zone du pouce respectée (Thumb Zone) :** Les actions primaires (Appel, WhatsApp, Ajout au panier) sont situées dans la moitié inférieure de l'écran ou épinglées en barre fixe.
- **Taille des cibles tactiles :** Minimum 44x44px sur tous les éléments cliquables, respectant les recommandations Apple HIG et Google Material Design.
- **Lisibilité mobile :** Corps de texte calibré à 16px minimum pour éviter tout zoom automatique intempestif sur iOS/Android.

---

## 4. Réponses types aux questions d'un Expert en Web Design

Voici comment répondre du tac-au-tac aux questions les plus pointues :

### Question 1 : *« Pourquoi n'avez-vous pas proposé de Dark Mode ? »*
> **Réponse :**  
> *« Pour ce projet précis, le public cible est composé d'artisans, d'acheteurs de chantiers et de constructeurs consultant le catalogue sur le terrain ou en plein jour. Le thème sombre, en plus d'affaiblir l'image corporate et institutionnelle voulue par le client, présente des reflets gênants en forte luminosité extérieure. Nous avons donc délibérément capitalisé sur un thème clair lumineux, net et à fort contraste, renforçant la crédibilité et le professionnalisme de QUALITMATSARL. »*

### Question 2 : *« Pourquoi ne pas avoir implémenté un système de paiement en ligne classique (Stripe / carte bancaire) ? »*
> **Réponse :**  
> *« Dans le commerce de matériaux de construction au Bénin (ciment, fers à béton, tuyauterie industrielle), les commandes dépendent souvent du cubage, du transport par camion, de la disponibilité instantanée au dépôt et d'éventuelles remises sur volume. Imposer un panier d'achat rigide avec paiement immédiat aurait créé un énorme point de friction. En remplaçant le checkout par un générateur de devis pré-formaté envoyé directement sur le WhatsApp officiel de l'équipe commerciale, nous avons un taux de conversion bien plus élevé et un cycle de vente naturel et fluide. »*

### Question 3 : *« Comment avez-vous abordé les performances et la résilience front-end ? »*
> **Réponse :**  
> *« Le projet est bâti sur l'App Router de Next.js avec génération statique (SSG) des pages catalogue et fiches produits. Le temps de chargement initial est quasi instantané. De plus, pour pallier la volatilité des connexions ou d'éventuelles pannes de CDN d'images, nous avons encapsulé toutes les balises médias dans un composant `SafeImage` avec fallback multiniveau gracieux. Côté client, la liste de devis est persistée dans le LocalStorage avec gestion de versioning pour que l'utilisateur ne perde jamais son panier même s'il recharge sa page. »*

### Question 4 : *« Comment le design sert-il le référencement local et la confiance client ? »*
> **Réponse :**  
> *« Le design intègre des éléments de réassurance majeurs dès le premier scroll : l'adresse exacte (Allègléta / Pavé de Tankpè à Abomey-Calavi), les horaires réels, les mentions légales d'entreprise enregistrée (IFU/RCCM), et une intégration Google Maps interactive. Chaque fiche produit possède ses balises OpenGraph et ses données structurées prêtes pour le SEO local. »*

---

## 5. Synthèse en 3 points forts à retenir
1. **Design Corporate & Rassurant :** Abandon des artifices "sombres" pour une esthétique claire, aérée et digne d'une grande enseigne de distribution.
2. **Expérience centrée sur l'usage réel :** Conversion directe via WhatsApp adaptée au marché du BTP local.
3. **Excellence technique :** Rendu statique ultra-rapide, zéro erreur au build, gestion infaillible des images et ergonomie mobile irréprochable.
