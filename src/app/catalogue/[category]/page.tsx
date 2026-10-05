import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { initialCategories, initialProducts } from "@/data/initialData";
import ProductCard from "@/components/common/ProductCard";
import { ChevronRight, ArrowLeft, Layers, ShieldCheck } from "lucide-react";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return initialCategories.map((c) => ({
    category: c.slug,
  }));
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const currentCategory = initialCategories.find((c) => c.slug === params.category);

  if (!currentCategory) {
    notFound();
  }

  const categoryProducts = initialProducts.filter(
    (p) => p.categoryId === currentCategory.id || p.categoryId === currentCategory.slug
  );

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Fil d'ariane */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-brand-900">Accueil</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/catalogue" className="hover:text-brand-900">Catalogue</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">{currentCategory.nom}</span>
      </nav>

      {/* En-tête de la Catégorie épuré */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 mb-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-900 mb-3 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tous les rayons</span>
          </Link>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 leading-tight">
            {currentCategory.nom}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {currentCategory.description}
          </p>

          <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5 text-brand-900 font-semibold">
              <Layers className="w-4 h-4" />
              <span>{categoryProducts.length} référence(s) en stock</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Matériel conforme aux normes du bâtiment</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grille des produits */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
          <p className="text-sm text-slate-600">Aucun produit dans ce rayon actuellement.</p>
          <Link
            href="/catalogue"
            className="mt-4 inline-block btn-touch bg-brand-900 text-white font-semibold text-xs px-5 py-2.5 rounded-lg"
          >
            Retour au catalogue
          </Link>
        </div>
      )}
    </div>
  );
}
