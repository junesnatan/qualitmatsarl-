"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "@/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantite?: number) => void;
  updateQuantity: (productId: string, quantite: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalEstimatedFcfa: number;
  hasSurDevisItems: boolean;
  toast: string | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "qualimat_quote_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger le panier depuis le localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Erreur de chargement du panier :", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sauvegarder dans localStorage dès qu'il change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Erreur de sauvegarde du panier :", e);
      }
    }
  }, [items, isLoaded]);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const addToCart = (product: Product, quantite = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        showNotification(`Quantité mise à jour : ${existing.quantite + quantite} ${product.unite}`);
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantite: item.quantite + quantite }
            : item
        );
      } else {
        showNotification(`Ajouté à votre liste de devis : ${product.nom}`);
        return [...prev, { product, quantite }];
      }
    });
  };

  const updateQuantity = (productId: string, quantite: number) => {
    if (quantite <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantite } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) {
        showNotification(`Retiré de la liste : ${item.product.nom}`);
      }
      return prev.filter((i) => i.product.id !== productId);
    });
  };

  const clearCart = () => {
    setItems([]);
    showNotification("Votre liste de devis a été vidée.");
  };

  const dismissToast = () => setToast(null);

  const totalItems = items.reduce((acc, item) => acc + item.quantite, 0);

  const totalEstimatedFcfa = items.reduce((acc, item) => {
    if (item.product.prixFcfa && item.product.modePrix === "affiche") {
      return acc + item.product.prixFcfa * item.quantite;
    }
    return acc;
  }, 0);

  const hasSurDevisItems = items.some(
    (item) => item.product.modePrix === "sur_devis" || item.product.prixFcfa === null
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalEstimatedFcfa,
        hasSurDevisItems,
        toast,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
