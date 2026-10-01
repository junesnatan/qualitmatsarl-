"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Product,
  Category,
  Promotion,
  SiteSettings,
  QuoteRequest,
  ProRequest,
} from "@/types";
import {
  getStoredProducts,
  saveStoredProducts,
  getStoredCategories,
  getStoredPromotions,
  getStoredSettings,
  saveStoredSettings,
  getStoredQuoteRequests,
  getStoredProRequests,
  formatFcfa,
} from "@/lib/storage";
import {
  Lock,
  Package,
  Layers,
  Sparkles,
  ClipboardList,
  FileSpreadsheet,
  Settings as SettingsIcon,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  LogOut,
  Search,
  Building2,
  ArrowRight,
  TrendingUp,
  Download,
  Upload,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "stats" | "products" | "categories" | "promotions" | "quotes" | "import" | "settings"
  >("stats");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [proRequests, setProRequests] = useState<ProRequest[]>([]);

  const [productSearch, setProductSearch] = useState("");

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formNom, setFormNom] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formMarque, setFormMarque] = useState("");
  const [formRef, setFormRef] = useState("");
  const [formUnite, setFormUnite] = useState("sac de 50 kg");
  const [formPrix, setFormPrix] = useState("");
  const [formModePrix, setFormModePrix] = useState<"affiche" | "sur_devis">("affiche");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formEnStock, setFormEnStock] = useState(true);
  const [formVedette, setFormVedette] = useState(false);

  const [adminFlash, setAdminFlash] = useState<string | null>(null);

  const flash = (msg: string) => {
    setAdminFlash(msg);
    setTimeout(() => setAdminFlash(null), 3500);
  };

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("qualimat_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
    loadData();
  }, []);

  const loadData = () => {
    setProducts(getStoredProducts());
    setCategories(getStoredCategories());
    setPromotions(getStoredPromotions());
    setSettings(getStoredSettings());
    setQuoteRequests(getStoredQuoteRequests());
    setProRequests(getStoredProRequests());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "admin123" || passwordInput === "qualimat") {
      setIsAuthenticated(true);
      sessionStorage.setItem("qualimat_admin_auth", "true");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("qualimat_admin_auth");
  };

  const openNewProductModal = () => {
    setEditingProduct(null);
    setFormNom("");
    setFormCategory(categories[0]?.id || "");
    setFormMarque("");
    setFormRef("");
    setFormUnite("sac de 50 kg");
    setFormPrix("");
    setFormModePrix("affiche");
    setFormDescription("");
    setFormImage("");
    setFormEnStock(true);
    setFormVedette(false);
    setShowProductModal(true);
  };

  const openEditProductModal = (p: Product) => {
    setEditingProduct(p);
    setFormNom(p.nom);
    setFormCategory(p.categoryId);
    setFormMarque(p.marque || "");
    setFormRef(p.reference || "");
    setFormUnite(p.unite);
    setFormPrix(p.prixFcfa ? p.prixFcfa.toString() : "");
    setFormModePrix(p.modePrix);
    setFormDescription(p.description);
    setFormImage(p.images[0] || "");
    setFormEnStock(p.enStock);
    setFormVedette(p.vedette);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNom || !formCategory) return;

    const selectedCat = categories.find((c) => c.id === formCategory);

    const newProd: Product = {
      id: editingProduct ? editingProduct.id : "prod-" + Date.now(),
      slug:
        editingProduct?.slug ||
        formNom
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-") + "-" + Date.now().toString().slice(-4),
      nom: formNom,
      categoryId: formCategory,
      categoryName: selectedCat ? selectedCat.nom : "Gros Œuvre",
      marque: formMarque || "Qualimat",
      reference: formRef || undefined,
      unite: formUnite,
      prixFcfa: formModePrix === "sur_devis" || !formPrix ? null : parseInt(formPrix, 10),
      modePrix: formModePrix,
      description: formDescription || "Matériau de haute qualité certifié pour le bâtiment.",
      images: [
        formImage ||
          "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
      ],
      enStock: formEnStock,
      vedette: formVedette,
      publie: true,
      updatedAt: new Date().toISOString(),
    };

    let updatedList: Product[];
    if (editingProduct) {
      updatedList = products.map((p) => (p.id === editingProduct.id ? newProd : p));
      flash(`Produit mis à jour : ${newProd.nom}`);
    } else {
      updatedList = [newProd, ...products];
      flash(`Nouveau produit ajouté au catalogue : ${newProd.nom}`);
    }

    setProducts(updatedList);
    saveStoredProducts(updatedList);
    setShowProductModal(false);
  };

  const toggleStock = (prodId: string) => {
    const updated = products.map((p) =>
      p.id === prodId ? { ...p, enStock: !p.enStock } : p
    );
    setProducts(updated);
    saveStoredProducts(updated);
    flash("Statut du stock mis à jour");
  };

  const toggleVedette = (prodId: string) => {
    const updated = products.map((p) =>
      p.id === prodId ? { ...p, vedette: !p.vedette } : p
    );
    setProducts(updated);
    saveStoredProducts(updated);
    flash("Mise en vedette mise à jour");
  };

  const deleteProduct = (prodId: string) => {
    if (confirm("Confirmez-vous la suppression de ce produit ?")) {
      const updated = products.filter((p) => p.id !== prodId);
      setProducts(updated);
      saveStoredProducts(updated);
      flash("Produit supprimé du catalogue");
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings) {
      saveStoredSettings(settings);
      flash("Coordonnées et réglages du magasin enregistrés !");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-20 px-4 max-w-md mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          <div className="w-14 h-14 bg-brand-50 text-brand-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-100">
            <Lock className="w-7 h-7 stroke-[2.5]" />
          </div>

          <h1 className="font-heading font-extrabold text-2xl text-slate-900 text-center mb-1">
            Qualimat SARL — Administration
          </h1>
          <p className="text-xs text-slate-500 text-center mb-6">
            Espace sécurisé réservé aux gestionnaires du magasin
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mot de passe administrateur
              </label>
              <input
                type="password"
                required
                placeholder="Entrez le mot de passe (ex : qualimat)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-900 focus:bg-white"
              />
            </div>

            {loginError && (
              <p className="text-xs text-rose-600 font-semibold">
                Mot de passe incorrect. (Indice démo : tapez &laquo; qualimat &raquo;)
              </p>
            )}

            <button
              type="submit"
              className="w-full btn-touch bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs px-6 py-3 rounded-lg shadow-sm transition"
            >
              Se connecter au tableau de bord
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <Link href="/" className="text-xs text-slate-500 hover:text-brand-900 font-medium">
              ← Retour au site public
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    if (!productSearch) return true;
    const q = productSearch.toLowerCase();
    return (
      p.nom.toLowerCase().includes(q) ||
      (p.reference && p.reference.toLowerCase().includes(q)) ||
      (p.marque && p.marque.toLowerCase().includes(q))
    );
  });

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      {/* Barre supérieure Corporate */}
      <div className="bg-brand-900 text-white rounded-2xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                QUALIMAT GESTION
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                En ligne
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Gestion de catalogue, prix FCFA, stocks et suivi des demandes clients
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-amber-300 hover:underline font-semibold flex items-center gap-1"
          >
            <span>Voir le site</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="btn-touch bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition"
          >
            <LogOut className="w-4 h-4 text-amber-300" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {adminFlash && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs font-semibold shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{adminFlash}</span>
        </div>
      )}

      {/* Navigation des Onglets épurée */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("stats")}
          className={`btn-touch text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "stats"
              ? "bg-brand-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Vue d&apos;ensemble</span>
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`btn-touch text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "products"
              ? "bg-brand-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Catalogue ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("quotes")}
          className={`btn-touch text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "quotes"
              ? "bg-brand-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Demandes Reçues ({quoteRequests.length + proRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("categories")}
          className={`btn-touch text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "categories"
              ? "bg-brand-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Rayons ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("promotions")}
          className={`btn-touch text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "promotions"
              ? "bg-brand-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Promotions</span>
        </button>

        <button
          onClick={() => setActiveTab("import")}
          className={`btn-touch text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "import"
              ? "bg-brand-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Import CSV</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`btn-touch text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "settings"
              ? "bg-brand-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          <span>Réglages Magasin</span>
        </button>
      </div>

      {/* 1. Tableau de bord */}
      {activeTab === "stats" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-medium uppercase block">Références au Catalogue</span>
              <div className="text-3xl font-heading font-extrabold text-slate-900 mt-1">{products.length}</div>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                {products.filter((p) => p.enStock).length} en stock immédiat
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-medium uppercase block">Devis générés pour WhatsApp</span>
              <div className="text-3xl font-heading font-extrabold text-brand-900 mt-1">{quoteRequests.length}</div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Préparés depuis le panier
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-medium uppercase block">Demandes Chantiers Pro</span>
              <div className="text-3xl font-heading font-extrabold text-amber-600 mt-1">{proRequests.length}</div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Dossiers BTP reçus
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-medium uppercase block">Rayons actifs</span>
              <div className="text-3xl font-heading font-extrabold text-slate-900 mt-1">{categories.length}</div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Catégories de vente
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">
              Raccourcis Gestion
            </h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={openNewProductModal}
                className="btn-touch bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un produit (en &lt; 2 min)</span>
              </button>
              <button
                onClick={() => setActiveTab("quotes")}
                className="btn-touch bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2"
              >
                <ClipboardList className="w-4 h-4 text-brand-900" />
                <span>Voir les devis reçus</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className="btn-touch bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2"
              >
                <SettingsIcon className="w-4 h-4" />
                <span>Numéro WhatsApp & Horaires</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Produits */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Filtrer par nom, référence ou marque..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 text-xs px-3 py-2.5 pl-9 rounded-lg focus:outline-none focus:border-brand-900"
              />
            </div>

            <button
              onClick={openNewProductModal}
              className="btn-touch bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Produit</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Produit & Référence</th>
                    <th className="p-3.5">Rayon</th>
                    <th className="p-3.5">Unité</th>
                    <th className="p-3.5">Prix Magasin</th>
                    <th className="p-3.5 text-center">En Stock</th>
                    <th className="p-3.5 text-center">Phare</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-900">{p.nom}</div>
                        <div className="text-[11px] text-slate-400">
                          {p.marque} {p.reference ? `• Réf: ${p.reference}` : ""}
                        </div>
                      </td>
                      <td className="p-3.5 text-brand-900 font-medium">
                        {p.categoryName || categories.find((c) => c.id === p.categoryId)?.nom || "-"}
                      </td>
                      <td className="p-3.5">{p.unite}</td>
                      <td className="p-3.5 font-bold text-slate-900">
                        {p.modePrix === "sur_devis" || !p.prixFcfa ? (
                          <span className="text-brand-900">Sur devis</span>
                        ) : (
                          formatFcfa(p.prixFcfa)
                        )}
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => toggleStock(p.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                            p.enStock
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {p.enStock ? "En stock" : "Épuisé"}
                        </button>
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => toggleVedette(p.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                            p.vedette
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {p.vedette ? "★ Oui" : "Non"}
                        </button>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditProductModal(p)}
                            className="p-1.5 text-slate-400 hover:text-brand-900 transition"
                            title="Modifier"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. Demandes reçues */}
      {activeTab === "quotes" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">
              Devis générés pour WhatsApp ({quoteRequests.length})
            </h3>
            {quoteRequests.length === 0 ? (
              <p className="text-xs text-slate-500">
                Aucun devis enregistré pour le moment. Dès qu&apos;un client clique sur &laquo; Envoyer ma liste sur WhatsApp &raquo;, sa sélection apparaît ici.
              </p>
            ) : (
              <div className="divide-y divide-slate-100 space-y-4">
                {quoteRequests.map((q) => (
                  <div key={q.id} className="pt-4 first:pt-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-900">
                        Client : {q.nom || "Anonyme"} {q.telephone ? `• Tél : ${q.telephone}` : ""}
                      </span>
                      <span className="text-slate-400">
                        {new Date(q.createdAt).toLocaleString("fr-FR")}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2">
                      Lieu / Quartier : {q.quartier || "Non précisé"}
                    </p>
                    <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 border border-slate-200">
                      {q.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            • {it.nom} ({it.unite}) x <strong>{it.quantite}</strong>
                          </span>
                          <span className="text-slate-500">
                            {it.prixUnitaire ? formatFcfa(it.prixUnitaire * it.quantite) : "Sur devis"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">
              Demandes Chantiers Espace Pro ({proRequests.length})
            </h3>
            {proRequests.length === 0 ? (
              <p className="text-xs text-slate-500">Aucune demande gros chantier Pro pour le moment.</p>
            ) : (
              <div className="divide-y divide-slate-100 space-y-4">
                {proRequests.map((pr) => (
                  <div key={pr.id} className="pt-4 first:pt-0 text-xs">
                    <div className="flex items-center justify-between font-semibold mb-1">
                      <span className="text-slate-900">{pr.societe} (Contact: {pr.contact})</span>
                      <span className="text-slate-400">{new Date(pr.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-600 mb-1">
                      Tél : <strong className="text-slate-900">{pr.telephone}</strong> • Ville : {pr.villeQuartier}
                    </p>
                    <p className="bg-slate-50 p-3 rounded-lg font-mono text-[11px] whitespace-pre-wrap border border-slate-200">
                      {pr.besoinsTexte || pr.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Catégories */}
      {activeTab === "categories" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-[11px] font-semibold text-brand-900 uppercase">Rayon #{c.position}</span>
                <h4 className="font-heading font-bold text-lg text-slate-900 mt-1 mb-2">
                  {c.nom}
                </h4>
                <p className="text-xs text-slate-600 mb-4">{c.description}</p>
                <div className="text-[11px] text-slate-400 font-mono">
                  Slug : /{c.slug}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Promotions */}
      {activeTab === "promotions" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">
              Bandeaux Promotionnels Actifs
            </h3>
            <div className="space-y-4">
              {promotions.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-brand-50 border border-brand-200">
                  <div className="text-[11px] font-bold text-brand-900 uppercase">{p.badge}</div>
                  <h4 className="font-heading font-bold text-base text-slate-900 mt-1">{p.titre}</h4>
                  <p className="text-xs text-slate-600 mt-1">{p.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Import CSV */}
      {activeTab === "import" && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl space-y-4">
          <h3 className="font-heading font-bold text-lg text-slate-900">
            Importation Massive de Produits (CSV)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Téléchargez le modèle CSV Qualimat, préparez votre fichier de prix et importez vos nouvelles références d&apos;un seul geste.
          </p>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
            <div className="font-semibold text-slate-700">Colonnes requises :</div>
            <code className="text-brand-900 font-mono text-[11px]">nom;categorie_slug;marque;reference;unite;prix_fcfa;en_stock</code>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="data:text/csv;charset=utf-8,nom;categorie_slug;marque;reference;unite;prix_fcfa;en_stock%0ACiment%20CPJ%2035;gros-oeuvre;CIMBENIN;CIM-01;sac%20de%2050%20kg;4450;1"
              download="modele-catalogue-qualimat.csv"
              className="btn-touch bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger le modèle CSV</span>
            </a>

            <button
              onClick={() => flash("Module prêt. Sélectionnez votre fichier .csv")}
              className="btn-touch bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
            >
              <Upload className="w-4 h-4" />
              <span>Sélectionner un fichier CSV</span>
            </button>
          </div>
        </div>
      )}

      {/* 7. Réglages */}
      {activeTab === "settings" && settings && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-6">
            Réglages Généraux & Coordonnées Qualimat
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Numéro WhatsApp Réception Devis (sans +, chiffres seuls) *
              </label>
              <input
                type="text"
                required
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-sm focus:outline-none focus:border-brand-900 focus:bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Exemple pour le Bénin : 22997001122
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Téléphone Principal *
                </label>
                <input
                  type="text"
                  required
                  value={settings.telephonePrincipal}
                  onChange={(e) => setSettings({ ...settings, telephonePrincipal: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Téléphone Secondaire
                </label>
                <input
                  type="text"
                  value={settings.telephoneSecondaire || ""}
                  onChange={(e) => setSettings({ ...settings, telephoneSecondaire: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Adresse Magasin Abomey-Calavi *
              </label>
              <input
                type="text"
                required
                value={settings.adresse}
                onChange={(e) => setSettings({ ...settings, adresse: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Horaires Semaine (Lundi - Samedi)
                </label>
                <input
                  type="text"
                  value={settings.horairesSemaine}
                  onChange={(e) => setSettings({ ...settings, horairesSemaine: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Horaires Dimanche
                </label>
                <input
                  type="text"
                  value={settings.horairesDimanche}
                  onChange={(e) => setSettings({ ...settings, horairesDimanche: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Numéro IFU
                </label>
                <input
                  type="text"
                  value={settings.ifu || ""}
                  onChange={(e) => setSettings({ ...settings, ifu: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Numéro RCCM
                </label>
                <input
                  type="text"
                  value={settings.rccm || ""}
                  onChange={(e) => setSettings({ ...settings, rccm: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="btn-touch bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs px-6 py-2.5 rounded-lg shadow-sm"
              >
                Enregistrer les réglages
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Ajout/Édition Produit */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="font-heading font-bold text-xl text-slate-900 mb-1">
              {editingProduct ? "Modifier le produit" : "Ajouter un produit au catalogue"}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Renseignez les informations de base. Le produit sera immédiatement visible sur le catalogue.
            </p>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Ciment CPJ 35 — Sac 50 kg"
                  value={formNom}
                  onChange={(e) => setFormNom(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Rayon / Catégorie *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Marque / Fabricant
                  </label>
                  <input
                    type="text"
                    placeholder="Ex : CIMBENIN, MÉTAL BÉNIN, Bosch..."
                    value={formMarque}
                    onChange={(e) => setFormMarque(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Unité de vente *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="sac 50 kg, barre 12m..."
                    value={formUnite}
                    onChange={(e) => setFormUnite(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mode Tarif
                  </label>
                  <select
                    value={formModePrix}
                    onChange={(e) => setFormModePrix(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900"
                  >
                    <option value="affiche">Prix affiché</option>
                    <option value="sur_devis">Sur devis uniquement</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Prix en FCFA
                  </label>
                  <input
                    type="number"
                    placeholder="Ex : 4500"
                    disabled={formModePrix === "sur_devis"}
                    value={formPrix}
                    onChange={(e) => setFormPrix(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  URL de l&apos;image du produit
                </label>
                <input
                  type="url"
                  placeholder="https://... (laisser vide pour photo par défaut)"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Description succincte
                </label>
                <textarea
                  rows={2}
                  placeholder="Description technique du produit et usages recommandés..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-900 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formEnStock}
                    onChange={(e) => setFormEnStock(e.target.checked)}
                    className="w-4 h-4 text-brand-900 rounded border-slate-300 focus:ring-brand-900"
                  />
                  <span>En stock immédiat</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formVedette}
                    onChange={(e) => setFormVedette(e.target.checked)}
                    className="w-4 h-4 text-brand-900 rounded border-slate-300 focus:ring-brand-900"
                  />
                  <span>Produit phare (Accueil)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="btn-touch px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-touch bg-brand-900 hover:bg-brand-800 text-white font-semibold text-xs px-6 py-2.5 rounded-lg shadow-sm"
                >
                  {editingProduct ? "Mettre à jour" : "Ajouter le produit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
