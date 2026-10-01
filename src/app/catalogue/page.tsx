"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { initialCategories, initialProducts } from "@/data/initialData";
import ProductCard from "@/components/common/ProductCard";
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  PackageOpen,
  ArrowUpDown,
  Layers,
} from "lucide-react";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCat = searchParams.get("cat") || "all";

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<"pertinence" | "prix-asc" | "prix-desc" | "nom">("pertinence");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const allBrands = useMemo(() => {
    const brands = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.marque) brands.add(p.marque);
    });
    return Array.from(brands).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const inNom = product.nom.toLowerCase().includes(q);
        const inDesc = product.description.toLowerCase().includes(q);
        const inRef = product.reference ? product.reference.toLowerCase().includes(q) : false;
        const inBrand = product.marque ? product.marque.toLowerCase().includes(q) : false;
        const inCat = product.categoryName ? product.categoryName.toLowerCase().includes(q) : false;
        if (!inNom && !inDesc && !inRef && !inBrand && !inCat) return false;
      }

      if (selectedCategory !== "all" && product.categoryId !== selectedCategory) {
        return false;
      }

      if (selectedBrand !== "all" && product.marque !== selectedBrand) {
        return false;
      }

      if (onlyInStock && !product.enStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "prix-asc") {
        return (a.prixFcfa || 999999999) - (b.prixFcfa || 999999999);
      }
      if (sortBy === "prix-desc") {
        return (b.prixFcfa || 0) - (a.prixFcfa || 0);
      }
      if (sortBy === "nom") {
        return a.nom.localeCompare(b.nom);
      }
      return (b.vedette ? 1 : 0) - (a.vedette ? 1 : 0);
    });
  }, [search, selectedCategory, selectedBrand, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setOnlyInStock(false);
    setSortBy("pertinence");
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* En-tête de page épuré */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <span className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5 mb-1">
          <Layers className="w-4 h-4 text-amber-500" />
          <span>Matériaux & Quincaillerie en Stock</span>
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900">
              Catalogue Général des Matériaux
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Consultez nos prix unitaires indicatifs en FCFA et préparez votre devis direct. {filteredProducts.length} référence(s) disponible(s).
            </p>
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden btn-touch bg-white text-slate-800 border border-slate-300 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 self-start"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-900" />
            <span>Filtres & Tri ({filteredProducts.length})</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Barre latérale des Filtres */}
        <aside
          className={`lg:col-span-3 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-6 ${
            mobileFilterOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-900" />
              <span>Filtrer les produits</span>
            </span>
            {(search || selectedCategory !== "all" || selectedBrand !== "all" || onlyInStock) && (
              <button
                onClick={resetFilters}
                className="text-xs text-brand-900 hover:underline font-semibold"
              >
                Réinitialiser
              </button>
            )}
          </div>

          {/* Recherche textuelle */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
              Mot-clé / Référence
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Ex : ciment, 2.5 mm, 100mm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-3 py-2 pl-9 rounded-lg focus:outline-none focus:border-brand-900 focus:bg-white"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Catégories */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
              Rayon Spécialisé
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                  selectedCategory === "all"
                    ? "bg-brand-900 text-white font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>Toutes les catégories</span>
                <span className="text-[11px] opacity-75">{initialProducts.length}</span>
              </button>
              {initialCategories.map((cat) => {
                const count = initialProducts.filter((p) => p.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                      selectedCategory === cat.id
                        ? "bg-brand-900 text-white font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate pr-2">{cat.nom}</span>
                    <span className="text-[11px] opacity-75">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Marques */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
              Marque & Fabricant
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-brand-900"
            >
              <option value="all">Toutes les marques</option>
              {allBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Disponibilité */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 text-brand-900 rounded border-slate-300 focus:ring-brand-900"
              />
              <span>En stock uniquement</span>
            </label>
          </div>
        </aside>

        {/* Section Principale */}
        <div className="lg:col-span-9">
          {/* Barre de tri supérieure */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-500">
              Affichage de <strong className="text-slate-900 font-semibold">{filteredProducts.length}</strong> produit(s)
            </span>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-500 font-medium flex items-center gap-1 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-brand-900" />
                <span>Trier par :</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 text-slate-800 font-medium text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-brand-900 w-full sm:w-auto"
              >
                <option value="pertinence">Produits phares d&apos;abord</option>
                <option value="prix-asc">Prix croissant (FCFA)</option>
                <option value="prix-desc">Prix décroissant (FCFA)</option>
                <option value="nom">Nom alphabétique (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Grille des résultats */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
              <PackageOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Aucun produit ne correspond à ces critères
              </h3>
              <p className="text-xs text-slate-500 mt-2 mb-6">
                Essayez d&apos;élargir vos filtres ou contactez-nous directement sur WhatsApp pour vérifier notre stock en entrepôt.
              </p>
              <button
                onClick={resetFilters}
                className="btn-touch bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-sm"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Chargement du catalogue...</div>}>
      <CatalogueContent />
    </Suspense>
  );
}
