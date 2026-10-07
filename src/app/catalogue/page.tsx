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
  LayoutGrid,
  List,
  RotateCcw,
  Check,
  ChevronDown,
  Sparkles,
  PackageCheck,
  AlertCircle,
} from "lucide-react";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCat = searchParams.get("cat") || "all";

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(100000);
  const [sortBy, setSortBy] = useState<"pertinence" | "prix-asc" | "prix-desc" | "nom">("pertinence");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const allBrands = useMemo(() => {
    const brands = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.marque) brands.add(p.marque);
    });
    return Array.from(brands).sort();
  }, []);

  // Filtrage combiné
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Recherche textuelle
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
      if (selectedCategory !== "all") {
        const categoryObj = initialCategories.find((c) => c.slug === selectedCategory || c.id === selectedCategory);
        if (categoryObj && product.categoryId !== categoryObj.id && product.categoryId !== categoryObj.slug) {
          return false;
        }
      }

      // Filtre marque
      if (selectedBrand !== "all" && product.marque !== selectedBrand) {
        return false;
      }

      // Filtre disponibilité
      if (onlyInStock && !product.enStock) {
        return false;
      }

      // Filtre fourchette de prix
      if (product.prixFcfa && product.prixFcfa > priceMax) {
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
  }, [search, selectedCategory, selectedBrand, onlyInStock, priceMax, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setOnlyInStock(false);
    setPriceMax(100000);
    setSortBy("pertinence");
    setVisibleCount(12);
  };

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedBrand !== "all" ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (priceMax < 100000 ? 1 : 0) +
    (search ? 1 : 0);

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* En-tête de page épuré */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary-600 uppercase tracking-widest bg-primary-50 border border-primary-200 px-3 py-1 rounded-full mb-3">
          <Layers className="w-4 h-4 text-primary-600" />
          <span>Matériaux & Quincaillerie en Stock Réel</span>
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900">
              Catalogue des Matériaux <span className="text-primary-600">QUALITMAT SARL</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Tarifs transparents en FCFA, fiches techniques et devis instantané par WhatsApp. <strong>{filteredProducts.length}</strong> référence(s) disponible(s).
            </p>
          </div>

          {/* Recherche intégrée au top */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              placeholder="Filtrer un nom ou une réf..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs px-3.5 py-2.5 pl-9 rounded-xl border border-slate-300 focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600 shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Barre d'outils Catalogue : Compteur, Tri, Toggle Grille/Liste & Bouton filtre Mobile */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          {/* Bouton filtre mobile */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden btn-touch flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtres {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
          </button>

          <span className="text-xs sm:text-sm font-bold text-slate-800">
            Disponibles : <strong className="text-primary-600 font-extrabold">{filteredProducts.length}</strong> référence(s)
          </span>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="hidden sm:inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-bold ml-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Sélecteur de tri */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="hidden sm:inline">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-900"
            >
              <option value="pertinence">Pertinence / Phare</option>
              <option value="prix-asc">Prix : croissant</option>
              <option value="prix-desc">Prix : décroissant</option>
              <option value="nom">Nom : A à Z</option>
            </select>
          </div>

          {/* Toggle Grille / Liste */}
          <div className="hidden sm:flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "grid"
                  ? "bg-white text-brand-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Affichage en Grille"
              aria-label="Affichage en Grille"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "list"
                  ? "bg-white text-brand-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Affichage en Liste"
              aria-label="Affichage en Liste"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Disposition principale : Sidebar filtres sticky (Desktop) + Grille produits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Desktop Sticky (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs sticky top-24 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-heading font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary-600" />
              <span>Filtres de recherche</span>
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-primary-600 hover:underline font-bold"
              >
                Tout effacer
              </button>
            )}
          </div>

          {/* Catégories en accordéon / liste avec badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Rayons & Catégories
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                  selectedCategory === "all"
                    ? "bg-primary-600 text-white font-bold shadow-md shadow-primary-600/20"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>Toutes les catégories</span>
                <span className="text-[10px] opacity-80">{initialProducts.length}</span>
              </button>

              {initialCategories.map((c) => {
                const count = initialProducts.filter(
                  (p) => p.categoryId === c.id || p.categoryId === c.slug
                ).length;
                const isSelected = selectedCategory === c.slug || selectedCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                      isSelected
                        ? "bg-primary-600 text-white font-bold shadow-md shadow-primary-600/20"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="truncate pr-2">{c.nom}</span>
                    <span className="text-[10px] opacity-70 bg-white/20 px-1.5 py-0.2 rounded">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slider / Fourchette de prix */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Prix max unitaire :</span>
              <span className="text-primary-600 font-mono font-extrabold">
                {priceMax.toLocaleString()} FCFA
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="2000"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-primary-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1 000 FCFA</span>
              <span>100 000+ FCFA</span>
            </div>
          </div>

          {/* Disponibilité */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Disponibilité
            </h4>
            <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer p-1.5 rounded-lg hover:bg-slate-50">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600 focus:ring-primary-600 accent-primary-600"
              />
              <span className="flex items-center gap-1.5">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>En stock uniquement</span>
              </span>
            </label>
          </div>

          {/* Marques */}
          {allBrands.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Marques & Fabricants
              </h4>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary-600"
              >
                <option value="all">Toutes les marques</option>
                {allBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          )}
        </aside>

        {/* Zone Principale : Grille ou Liste de Produits (9 cols) */}
        <main className="lg:col-span-9">
          {displayedProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PackageOpen className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-2">
                Aucun produit ne correspond à vos critères
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                Essayez d&apos;élargir vos filtres de recherche ou de réinitialiser la sélection pour afficher tous nos matériaux.
              </p>
              <button
                onClick={resetFilters}
                className="btn-touch px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                Réinitialiser tous les filtres
              </button>
            </div>
          ) : (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {/* Bouton "Charger Plus" (Pagination Intelligente) */}
              {filteredProducts.length > visibleCount && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="btn-touch px-6 py-3 rounded-xl bg-white border border-primary-600 hover:bg-primary-50 text-primary-600 font-extrabold text-xs sm:text-sm shadow-sm hover:shadow transition active:scale-95 inline-flex items-center gap-2"
                  >
                    <span>Charger plus de matériaux ({filteredProducts.length - visibleCount} restants)</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Drawer / Bottom-Sheet Filtres Mobile */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setMobileFilterOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl p-6 overflow-y-auto z-10 animate-slide-up space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary-600" />
                <span>Filtrer les matériaux</span>
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Catégories */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Catégorie
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`p-2 rounded-xl text-xs font-semibold text-left border ${
                    selectedCategory === "all"
                      ? "border-primary-600 bg-primary-50 text-primary-600 font-bold"
                      : "border-slate-200 text-slate-700"
                  }`}
                >
                  Toutes
                </button>
                {initialCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`p-2 rounded-xl text-xs font-semibold text-left border truncate ${
                      selectedCategory === c.slug
                        ? "border-primary-600 bg-primary-50 text-primary-600 font-bold"
                        : "border-slate-200 text-slate-700"
                    }`}
                  >
                    {c.nom}
                  </button>
                ))}
              </div>
            </div>

            {/* Disponibilité */}
            <div>
              <label className="flex items-center gap-3 text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-primary-600 accent-primary-600"
                />
                <span>En stock uniquement</span>
              </label>
            </div>

            {/* Prix Max */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>Prix max :</span>
                <span className="text-primary-600 font-extrabold">{priceMax.toLocaleString()} FCFA</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="2000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
            </div>

            {/* Bouton Appliquer */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={resetFilters}
                className="btn-touch flex-1 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Réinitialiser
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn-touch flex-1 py-3 bg-primary-600 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Voir {filteredProducts.length} résultat(s)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-slate-400">
          <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-2" />
          <span>Chargement du catalogue Qualitmat...</span>
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
