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
    (p) => p.categoryId === currentCategory.id
  );

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Fil d'ariane (Breadcrumbs) */}
      <nav className="flex items-center gap-2 text-xs text-acier-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-bleu">Accueil</Link>
        <ChevronRight className="w-3.5 h-3.5 text-acier-400" />
        <Link href="/catalogue" className="hover:text-bleu">Catalogue</Link>
        <ChevronRight className="w-3.5 h-3.5 text-acier-400" />
        <span className="font-bold text-acier uppercase">{currentCategory.nom}</span>
      </nav>

      {/* En-tête de la Catégorie */}
      <div className="bg-acier-900 text-white rounded-2xl p-6 sm:p-10 mb-8 border border-acier-800 shadow-xl relative overflow-hidden">
        <div className="h-1.5 stripe-accent w-full absolute top-0 left-0" />

        <div className="max-w-2xl relative z-10">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-jaune uppercase tracking-wider mb-3 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tous les rayons</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase text-white leading-tight">
            {currentCategory.nom}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-acier-200 leading-relaxed">
            {currentCategory.description}
          </p>

          <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-jaune">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>{categoryProducts.length} référence(s) en stock</span>
            </span>
            <span className="text-acier-600">•</span>
            <span className="flex items-center gap-1.5 text-acier-300">
              <ShieldCheck className="w-4 h-4 text-jaune" />
              <span>Conforme aux normes du BTP</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grille des produits de la catégorie */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-beton-dark p-12 text-center max-w-lg mx-auto">
          <p className="text-sm text-acier-600">Aucun produit dans ce rayon actuellement.</p>
          <Link
            href="/catalogue"
            className="mt-4 inline-block btn-touch bg-jaune text-acier-950 font-bold uppercase text-xs px-5 py-2.5 rounded"
          >
            Retour au catalogue
          </Link>
        </div>
      )}
    </div>
  );
}
