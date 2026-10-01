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
  Tag,
  Check,
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

  // Extraire les marques uniques
  const allBrands = useMemo(() => {
    const brands = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.marque) brands.add(p.marque);
    });
    return Array.from(brands).sort();
  }, []);

  // Filtrage et Tri
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Recherche textuelle insensible à la casse et tolérante
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const inNom = product.nom.toLowerCase().includes(q);
        const inDesc = product.description.toLowerCase().includes(q);
        const inRef = product.reference ? product.reference.toLowerCase().includes(q) : false;
        const inBrand = product.marque ? product.marque.toLowerCase().includes(q) : false;
        const inCat = product.categoryName ? product.categoryName.toLowerCase().includes(q) : false;
        if (!inNom && !inDesc && !inRef && !inBrand && !inCat) return false;
      }

      // Filtre catégorie
      if (selectedCategory !== "all" && product.categoryId !== selectedCategory) {
        return false;
      }

      // Filtre marque
      if (selectedBrand !== "all" && product.marque !== selectedBrand) {
        return false;
      }

      // Filtre stock
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
      {/* En-tête de page & Titre */}
      <div className="mb-8 border-b-2 border-acier-200 pb-6">
        <div className="text-xs font-bold text-bleu uppercase tracking-widest flex items-center gap-1.5 mb-1">
          <Tag className="w-4 h-4 text-jaune-hover" />
          <span>Matériaux disponibles immédiatement</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-acier uppercase">
              Catalogue Quincaillerie & Matériaux
            </h1>
            <p className="text-xs sm:text-sm text-acier-600 mt-1">
              Consultez nos prix en FCFA ou demandez un devis direct. {filteredProducts.length} référence(s) trouvée(s).
            </p>
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden btn-touch bg-acier text-jaune px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtres & Tri ({filteredProducts.length})</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Barre latérale des Filtres (Desktop) */}
        <aside
          className={`lg:col-span-3 bg-white p-5 rounded-xl border border-beton-dark shadow-sm space-y-6 ${
            mobileFilterOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-beton">
            <span className="font-heading font-bold text-lg text-acier uppercase flex items-center gap-2">
              <Filter className="w-4 h-4 text-jaune-hover" />
              <span>Filtres</span>
            </span>
            {(search || selectedCategory !== "all" || selectedBrand !== "all" || onlyInStock) && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:underline font-semibold"
              >
                Réinitialiser
              </button>
            )}
          </div>

          {/* Recherche textuelle instantanée */}
          <div>
            <label className="block text-xs font-bold uppercase text-acier-700 mb-2">
              Mot-clé / Référence
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-acier-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Ex : ciment, 2.5 mm, 100mm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-beton-light border border-beton-dark text-acier text-xs px-3 py-2 pl-9 rounded focus:outline-none focus:border-jaune"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-2 text-acier-400 hover:text-acier"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Catégories */}
          <div>
            <label className="block text-xs font-bold uppercase text-acier-700 mb-2">
              Rayon / Catégorie
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-3 py-1.5 rounded text-xs font-semibold flex items-center justify-between transition ${
                  selectedCategory === "all"
                    ? "bg-acier text-jaune"
                    : "text-acier-700 hover:bg-beton-light"
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
                    className={`w-full text-left px-3 py-1.5 rounded text-xs font-semibold flex items-center justify-between transition ${
                      selectedCategory === cat.id
                        ? "bg-acier text-jaune"
                        : "text-acier-700 hover:bg-beton-light"
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
            <label className="block text-xs font-bold uppercase text-acier-700 mb-2">
              Marques & Fabricants
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-beton-light border border-beton-dark text-acier text-xs px-3 py-2 rounded focus:outline-none focus:border-jaune"
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
          <div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase text-acier-700">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 text-jaune rounded border-beton-dark focus:ring-jaune"
              />
              <span>En stock uniquement</span>
            </label>
          </div>
        </aside>

        {/* Section Principale : Barre de tri & Grille de produits */}
        <div className="lg:col-span-9">
          {/* Barre de tri supérieure */}
          <div className="bg-white p-3.5 rounded-lg border border-beton-dark mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <span className="text-acier-600 font-medium">
              Affichage de <strong className="text-acier font-bold">{filteredProducts.length}</strong> produit(s)
            </span>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-acier-500 font-semibold flex items-center gap-1 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-jaune-hover" />
                <span>Trier par :</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-beton-light border border-beton-dark text-acier font-semibold text-xs px-3 py-1.5 rounded focus:outline-none focus:border-jaune w-full sm:w-auto"
              >
                <option value="pertinence">Phare / Nouveautés</option>
                <option value="prix-asc">Prix croissant (FCFA)</option>
                <option value="prix-desc">Prix décroissant (FCFA)</option>
                <option value="nom">Nom de A à Z</option>
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
            <div className="bg-white rounded-xl border border-beton-dark p-12 text-center max-w-lg mx-auto">
              <PackageOpen className="w-12 h-12 text-acier-300 mx-auto mb-3" />
              <h3 className="font-heading font-black text-xl text-acier uppercase">
                Aucun produit ne correspond à ces critères
              </h3>
              <p className="text-xs text-acier-500 mt-2 mb-6">
                Essayez d&apos;élargir vos filtres ou contactez-nous directement sur WhatsApp pour vérifier la disponibilité en réserve.
              </p>
              <button
                onClick={resetFilters}
                className="btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-bold uppercase text-xs px-5 py-2.5 rounded tracking-wider shadow"
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
    <Suspense fallback={<div className="p-12 text-center text-sm">Chargement du catalogue...</div>}>
      <CatalogueContent />
    </Suspense>
  );
}
