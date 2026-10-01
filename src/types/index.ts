export interface Category {
  id: string;
  slug: string;
  nom: string;
  description?: string;
  image?: string;
  position: number;
  parentId?: string | null;
  count?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  position: number;
}

export interface Product {
  id: string;
  slug: string;
  nom: string;
  description: string;
  categoryId: string;
  categoryName?: string;
  marque?: string;
  reference?: string;
  unite: string; // ex: "sac de 50 kg", "barre de 12 m", "couronne de 100 m"
  prixFcfa: number | null; // null si sur devis
  modePrix: "affiche" | "sur_devis";
  enStock: boolean;
  vedette: boolean;
  publie: boolean;
  images: string[];
  ficheTechnique?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantite: number;
  remarque?: string;
}

export interface QuoteRequest {
  id: string;
  nom?: string;
  telephone?: string;
  quartier?: string;
  items: {
    productId: string;
    nom: string;
    unite: string;
    quantite: number;
    prixUnitaire?: number | null;
  }[];
  totalEstime?: number;
  source: "whatsapp" | "web";
  statut: "nouveau" | "traite" | "annule";
  createdAt: string;
}

export interface ProRequest {
  id: string;
  societe: string;
  contact: string;
  telephone: string;
  email?: string;
  villeQuartier: string;
  description: string;
  typeChantier: "batiment" | "renovation" | "lotissement" | "autre";
  besoinsTexte?: string;
  statut: "nouveau" | "en_cours" | "devis_envoye" | "traite";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  nom: string;
  telephone: string;
  email?: string;
  sujet: string;
  message: string;
  statut: "nouveau" | "lu" | "repondu";
  createdAt: string;
}

export interface Promotion {
  id: string;
  titre: string;
  badge: string;
  texte: string;
  remise?: string;
  image?: string;
  lien?: string;
  debut?: string;
  fin?: string;
  publie: boolean;
}

export interface Testimonial {
  id: string;
  auteur: string;
  role: string; // ex: "Maçon-coffreur à Calavi", "Promoteur immobilier"
  texte: string;
  note: number; // sur 5
  date: string;
}

export interface SiteSettings {
  whatsappNumber: string; // format international sans +, ex: "22997000000"
  telephonePrincipal: string; // ex: "+229 97 00 00 00"
  telephoneSecondaire?: string;
  email: string;
  adresse: string; // ex: "Carrefour Arconville, Route Inter-États, Abomey-Calavi"
  ville: string;
  horairesSemaine: string; // ex: "Lundi - Samedi : 07h30 - 18h30"
  horairesDimanche: string; // ex: "Dimanche : 08h00 - 13h00"
  facebookUrl?: string;
  googleMapsUrl?: string;
  ifu?: string;
  rccm?: string;
}
