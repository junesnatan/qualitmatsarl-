import { CartItem, Product, Category, Promotion, SiteSettings, QuoteRequest, ProRequest } from "@/types";
import { initialProducts, initialCategories, initialPromotions, initialSettings } from "@/data/initialData";

const PRODUCTS_KEY = "qualimat_products_v3";
const CATEGORIES_KEY = "qualimat_categories_v3";
const PROMOTIONS_KEY = "qualimat_promotions_v3";
const SETTINGS_KEY = "qualimat_settings_v4";
const QUOTES_KEY = "qualimat_quotes";
const PRO_REQUESTS_KEY = "qualimat_pro_requests";

// Formateur monétaire officiel en FCFA (sans décimales)
export function formatFcfa(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) {
    return "Sur devis";
  }
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount) + " FCFA";
}

// Helpers de persistance navigateur
export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return initialProducts;
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    return data ? JSON.parse(data) : initialProducts;
  } catch (e) {
    return initialProducts;
  }
}

export function saveStoredProducts(products: Product[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }
}

export function getStoredCategories(): Category[] {
  if (typeof window === "undefined") return initialCategories;
  try {
    const data = localStorage.getItem(CATEGORIES_KEY);
    return data ? JSON.parse(data) : initialCategories;
  } catch (e) {
    return initialCategories;
  }
}

export function saveStoredCategories(categories: Category[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
}

export function getStoredPromotions(): Promotion[] {
  if (typeof window === "undefined") return initialPromotions;
  try {
    const data = localStorage.getItem(PROMOTIONS_KEY);
    return data ? JSON.parse(data) : initialPromotions;
  } catch (e) {
    return initialPromotions;
  }
}

export function saveStoredPromotions(promotions: Promotion[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(PROMOTIONS_KEY, JSON.stringify(promotions));
  }
}

export function getStoredSettings(): SiteSettings {
  if (typeof window === "undefined") return initialSettings;
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...initialSettings, ...JSON.parse(data) } : initialSettings;
  } catch (e) {
    return initialSettings;
  }
}

export function saveStoredSettings(settings: SiteSettings) {
  if (typeof window !== "undefined") {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
}

// Enregistrement des devis et demandes pro
export function getStoredQuoteRequests(): QuoteRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(QUOTES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function recordQuoteRequest(req: QuoteRequest) {
  if (typeof window !== "undefined") {
    const existing = getStoredQuoteRequests();
    existing.unshift(req);
    localStorage.setItem(QUOTES_KEY, JSON.stringify(existing));
  }
}

export function getStoredProRequests(): ProRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(PRO_REQUESTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function recordProRequest(req: ProRequest) {
  if (typeof window !== "undefined") {
    const existing = getStoredProRequests();
    existing.unshift(req);
    localStorage.setItem(PRO_REQUESTS_KEY, JSON.stringify(existing));
  }
}

/**
 * Générateur du message WhatsApp conforme à la Section 5.3 du Cahier des charges:
 *
 * Bonjour Qualimat, je souhaite un devis pour :
 * - Ciment CPJ 35, sac de 50 kg x 40
 * - Tuyau PVC Ø 100 mm, barre de 4 m x 12
 * - Câble 2,5 mm², couronne de 100 m x 2
 *
 * Nom : [saisi par le visiteur, facultatif]
 * Quartier : [saisi par le visiteur, facultatif]
 * Envoyé depuis le site Qualimat
 */
export function buildWhatsAppQuoteUrl(
  items: CartItem[],
  whatsappNumber: string,
  customerName?: string,
  customerQuartier?: string,
  customerPhone?: string
): { url: string; isTooLong: boolean; rawText: string } {
  let message = "Bonjour QUALITMATSARL, je souhaite un devis pour :\n";

  for (const item of items) {
    message += `- ${item.product.nom} (${item.product.unite}) x ${item.quantite}\n`;
  }

  if (customerName && customerName.trim() !== "") {
    message += `\nNom : ${customerName.trim()}`;
  }
  if (customerPhone && customerPhone.trim() !== "") {
    message += `\nTéléphone : ${customerPhone.trim()}`;
  }
  if (customerQuartier && customerQuartier.trim() !== "") {
    message += `\nQuartier : ${customerQuartier.trim()} (Abomey-Calavi / environs)`;
  }

  message += "\n\nEnvoyé depuis le site QUALITMATSARL";

  // Nettoyage du numéro : chiffres uniquement
  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  const encodedText = encodeURIComponent(message);
  const fullUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

  // Seuil d'URL sécurisé ~ 2000 caractères
  const isTooLong = fullUrl.length > 2000;

  return {
    url: fullUrl,
    isTooLong,
    rawText: message,
  };
}
