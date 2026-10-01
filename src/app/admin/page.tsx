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
  saveStoredCategories,
  getStoredPromotions,
  saveStoredPromotions,
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
  Clock,
  Eye,
  EyeOff,
  LogOut,
  Search,
  Check,
  HardHat,
  ArrowRight,
  TrendingUp,
  Download,
  Upload,
} from "lucide-react";

export default function AdminDashboardPage() {
  // Authentification locale
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Onglet actif
  const [activeTab, setActiveTab] = useState<
    "stats" | "products" | "categories" | "promotions" | "quotes" | "import" | "settings"
  >("stats");

  // Données
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [proRequests, setProRequests] = useState<ProRequest[]>([]);

  // Recherche produit dans l'admin
  const [productSearch, setProductSearch] = useState("");

  // Modal / Formulaire d'ajout / édition produit
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Champs formulaire produit
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

  // Message flash de notification admin
  const [adminFlash, setAdminFlash] = useState<string | null>(null);

  const flash = (msg: string) => {
    setAdminFlash(msg);
    setTimeout(() => setAdminFlash(null), 3500);
  };

  useEffect(() => {
    // Vérifier si session déjà active
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
    // Mot de passe de démonstration par défaut : "admin123" ou "qualimat"
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

  // Gestion Produit
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
      flash(`Nouveau produit ajouté en moins de 2 min : ${newProd.nom}`);
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
    flash("Disponibilité en stock modifiée");
  };

  const toggleVedette = (prodId: string) => {
    const updated = products.map((p) =>
      p.id === prodId ? { ...p, vedette: !p.vedette } : p
    );
    setProducts(updated);
    saveStoredProducts(updated);
    flash("Mise en vedette modifiée");
  };

  const deleteProduct = (prodId: string) => {
    if (confirm("Confirmez-vous la suppression de ce produit ?")) {
      const updated = products.filter((p) => p.id !== prodId);
      setProducts(updated);
      saveStoredProducts(updated);
      flash("Produit supprimé du catalogue");
    }
  };

  // Réglages du magasin
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings) {
      saveStoredSettings(settings);
      flash("Coordonnées et réglages du magasin enregistrés avec succès !");
    }
  };

  // Écran de connexion si non authentifié
  if (!isAuthenticated) {
    return (
      <div className="py-20 px-4 max-w-md mx-auto">
        <div className="bg-white rounded-2xl border-2 border-acier shadow-2xl p-8">
          <div className="w-14 h-14 bg-jaune text-acier-950 rounded-xl flex items-center justify-center mx-auto mb-4 shadow">
            <Lock className="w-7 h-7 stroke-[2.5]" />
          </div>

          <h1 className="font-heading font-black text-2xl text-acier uppercase text-center mb-1">
            Qualimat SARL — Administration
          </h1>
          <p className="text-xs text-acier-500 text-center mb-6">
            Espace sécurisé réservé aux gestionnaires de magasin
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-acier-700 mb-1">
                Mot de passe administrateur
              </label>
              <input
                type="password"
                required
                placeholder="Entrez le mot de passe (ex : qualimat)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-beton-light border border-beton-dark rounded p-3 text-sm focus:outline-none focus:border-jaune"
              />
            </div>

            {loginError && (
              <p className="text-xs text-rose-600 font-bold">
                Mot de passe incorrect. (Indice démo : tapez &laquo; qualimat &raquo;)
              </p>
            )}

            <button
              type="submit"
              className="w-full btn-touch bg-acier hover:bg-acier-800 text-jaune font-black uppercase text-xs px-6 py-3 rounded tracking-wider shadow transition"
            >
              Se connecter à l&apos;administration
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-beton text-center">
            <Link href="/" className="text-xs text-acier-500 hover:text-bleu">
              ← Retour au site public
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtrage produits dans l'admin
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
      {/* Barre supérieure Admin */}
      <div className="bg-acier-950 text-white rounded-xl p-4 sm:p-6 mb-8 border border-acier-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-jaune text-acier-950 rounded font-black flex items-center justify-center">
            <HardHat className="w-6 h-6 text-acier-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-xl text-white uppercase tracking-wider">
                QUALIMAT BACK-OFFICE
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 uppercase">
                En ligne
              </span>
            </div>
            <p className="text-xs text-acier-400">
              Gestion du catalogue, prix FCFA, stocks, demandes WhatsApp et réglages
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-jaune hover:underline font-bold uppercase tracking-wider flex items-center gap-1"
          >
            <span>Voir le site</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="btn-touch bg-acier-800 hover:bg-acier-700 text-white text-xs font-bold uppercase px-3 py-1.5 rounded flex items-center gap-1.5 border border-acier-700"
          >
            <LogOut className="w-4 h-4 text-jaune" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Message Flash */}
      {adminFlash && (
        <div className="mb-6 p-4 bg-acier text-jaune border-2 border-jaune rounded-xl flex items-center gap-2 text-xs font-bold shadow-lg animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-jaune shrink-0" />
          <span>{adminFlash}</span>
        </div>
      )}

      {/* Navigation des Onglets Admin */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-acier-300">
        <button
          onClick={() => setActiveTab("stats")}
          className={`btn-touch text-xs uppercase font-black px-4 py-2 rounded flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "stats"
              ? "bg-acier text-jaune shadow"
              : "bg-white text-acier-700 hover:bg-acier-100 border border-beton-dark"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Tableau de bord</span>
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`btn-touch text-xs uppercase font-black px-4 py-2 rounded flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "products"
              ? "bg-acier text-jaune shadow"
              : "bg-white text-acier-700 hover:bg-acier-100 border border-beton-dark"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Produits ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("quotes")}
          className={`btn-touch text-xs uppercase font-black px-4 py-2 rounded flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "quotes"
              ? "bg-acier text-jaune shadow"
              : "bg-white text-acier-700 hover:bg-acier-100 border border-beton-dark"
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Demandes reçues ({quoteRequests.length + proRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("categories")}
          className={`btn-touch text-xs uppercase font-black px-4 py-2 rounded flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "categories"
              ? "bg-acier text-jaune shadow"
              : "bg-white text-acier-700 hover:bg-acier-100 border border-beton-dark"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Rayons / Catégories ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("promotions")}
          className={`btn-touch text-xs uppercase font-black px-4 py-2 rounded flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "promotions"
              ? "bg-acier text-jaune shadow"
              : "bg-white text-acier-700 hover:bg-acier-100 border border-beton-dark"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Promotions</span>
        </button>

        <button
          onClick={() => setActiveTab("import")}
          className={`btn-touch text-xs uppercase font-black px-4 py-2 rounded flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "import"
              ? "bg-acier text-jaune shadow"
              : "bg-white text-acier-700 hover:bg-acier-100 border border-beton-dark"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Import CSV</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`btn-touch text-xs uppercase font-black px-4 py-2 rounded flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === "settings"
              ? "bg-acier text-jaune shadow"
              : "bg-white text-acier-700 hover:bg-acier-100 border border-beton-dark"
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          <span>Réglages Magasin</span>
        </button>
      </div>

      {/* CONTENU SELON ONGLET ACTIF */}

      {/* 1. Tableau de bord Stats */}
      {activeTab === "stats" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-beton-dark shadow-sm">
              <span className="text-xs text-acier-500 font-bold uppercase block">Références au Catalogue</span>
              <div className="text-3xl font-heading font-black text-acier mt-1">{products.length}</div>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                {products.filter((p) => p.enStock).length} actuellement en stock
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-beton-dark shadow-sm">
              <span className="text-xs text-acier-500 font-bold uppercase block">Devis préparés pour WhatsApp</span>
              <div className="text-3xl font-heading font-black text-bleu mt-1">{quoteRequests.length}</div>
              <span className="text-[11px] text-acier-500 font-semibold mt-1 block">
                Générés depuis le panier du site
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-beton-dark shadow-sm">
              <span className="text-xs text-acier-500 font-bold uppercase block">Demandes Chantiers Pro</span>
              <div className="text-3xl font-heading font-black text-jaune-hover mt-1">{proRequests.length}</div>
              <span className="text-[11px] text-acier-500 font-semibold mt-1 block">
                Dossiers BTP en attente
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-beton-dark shadow-sm">
              <span className="text-xs text-acier-500 font-bold uppercase block">Rayons actifs</span>
              <div className="text-3xl font-heading font-black text-acier mt-1">{categories.length}</div>
              <span className="text-[11px] text-bleu font-semibold mt-1 block">
                Gros Œuvre, Élec, Plomberie...
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-beton-dark p-6 shadow-sm">
            <h3 className="font-heading font-black text-xl text-acier uppercase mb-4">
              Opérations rapides
            </h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={openNewProductModal}
                className="btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-xs px-5 py-2.5 rounded flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un produit (en &lt; 2 min)</span>
              </button>
              <button
                onClick={() => setActiveTab("quotes")}
                className="btn-touch bg-acier-900 hover:bg-acier-800 text-white font-bold uppercase text-xs px-5 py-2.5 rounded flex items-center gap-2 shadow"
              >
                <ClipboardList className="w-4 h-4 text-jaune" />
                <span>Consulter les devis récents</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className="btn-touch bg-acier-100 hover:bg-acier-200 text-acier-800 font-bold uppercase text-xs px-5 py-2.5 rounded flex items-center gap-2"
              >
                <SettingsIcon className="w-4 h-4" />
                <span>Mettre à jour le WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Gestion Produits */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-acier-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Filtrer un produit par nom, référence ou marque..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-white border border-beton-dark text-xs px-3 py-2.5 pl-9 rounded focus:outline-none focus:border-jaune"
              />
            </div>

            <button
              onClick={openNewProductModal}
              className="btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-xs px-5 py-2.5 rounded flex items-center justify-center gap-2 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Produit</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-beton-dark shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-acier-700">
                <thead className="bg-acier text-white uppercase text-[11px] font-bold">
                  <tr>
                    <th className="p-3">Produit & Réf</th>
                    <th className="p-3">Rayon</th>
                    <th className="p-3">Unité</th>
                    <th className="p-3">Prix Magasin</th>
                    <th className="p-3 text-center">En Stock</th>
                    <th className="p-3 text-center">Phare</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-beton">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-beton-light transition">
                      <td className="p-3">
                        <div className="font-bold text-acier">{p.nom}</div>
                        <div className="text-[11px] text-acier-400">
                          {p.marque} {p.reference ? `• Réf: ${p.reference}` : ""}
                        </div>
                      </td>
                      <td className="p-3 text-bleu font-semibold">
                        {p.categoryName || categories.find((c) => c.id === p.categoryId)?.nom || "-"}
                      </td>
                      <td className="p-3 font-medium">{p.unite}</td>
                      <td className="p-3 font-bold text-acier">
                        {p.modePrix === "sur_devis" || !p.prixFcfa ? (
                          <span className="text-bleu">Sur devis</span>
                        ) : (
                          formatFcfa(p.prixFcfa)
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => toggleStock(p.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition ${
                            p.enStock
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {p.enStock ? "Oui" : "Épuisé"}
                        </button>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => toggleVedette(p.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition ${
                            p.vedette
                              ? "bg-jaune text-acier-950"
                              : "bg-acier-100 text-acier-500"
                          }`}
                        >
                          {p.vedette ? "★ Oui" : "Non"}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditProductModal(p)}
                            className="p-1.5 text-acier-500 hover:text-bleu transition"
                            title="Modifier"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-acier-500 hover:text-rose-600 transition"
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
          <div className="bg-white rounded-xl border border-beton-dark p-6 shadow-sm">
            <h3 className="font-heading font-black text-xl text-acier uppercase mb-4">
              Devis générés pour WhatsApp ({quoteRequests.length})
            </h3>
            {quoteRequests.length === 0 ? (
              <p className="text-xs text-acier-500">
                Aucun devis préparé pour le moment. Dès qu&apos;un client clique sur &laquo; Envoyer ma liste sur WhatsApp &raquo;, sa demande est tracée ici.
              </p>
            ) : (
              <div className="divide-y divide-beton space-y-4">
                {quoteRequests.map((q) => (
                  <div key={q.id} className="pt-4 first:pt-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-acier">
                        Client : {q.nom || "Anonyme"} {q.telephone ? `• Tél : ${q.telephone}` : ""}
                      </span>
                      <span className="text-acier-400">
                        {new Date(q.createdAt).toLocaleString("fr-FR")}
                      </span>
                    </div>
                    <p className="text-[11px] text-acier-500 mb-2">
                      Lieu / Quartier : {q.quartier || "Non précisé"}
                    </p>
                    <div className="bg-beton-light p-3 rounded text-xs space-y-1">
                      {q.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            • {it.nom} ({it.unite}) x <strong>{it.quantite}</strong>
                          </span>
                          <span className="text-acier-500">
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

          <div className="bg-white rounded-xl border border-beton-dark p-6 shadow-sm">
            <h3 className="font-heading font-black text-xl text-acier uppercase mb-4">
              Demandes Chantiers Espace Pro ({proRequests.length})
            </h3>
            {proRequests.length === 0 ? (
              <p className="text-xs text-acier-500">Aucune demande gros chantier Pro pour le moment.</p>
            ) : (
              <div className="divide-y divide-beton space-y-4">
                {proRequests.map((pr) => (
                  <div key={pr.id} className="pt-4 first:pt-0 text-xs">
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span className="text-acier">{pr.societe} (Contact: {pr.contact})</span>
                      <span className="text-acier-400">{new Date(pr.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-acier-600 mb-1">
                      Tél : <strong className="text-acier-900">{pr.telephone}</strong> • Ville : {pr.villeQuartier}
                    </p>
                    <p className="bg-beton-light p-3 rounded font-mono text-[11px] whitespace-pre-wrap">
                      {pr.besoinsTexte || pr.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Gestion Catégories */}
      {activeTab === "categories" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-xl border border-beton-dark shadow-sm">
                <span className="text-xs font-bold text-jaune-hover uppercase">Rayon #{c.position}</span>
                <h4 className="font-heading font-black text-xl text-acier uppercase mt-1 mb-2">
                  {c.nom}
                </h4>
                <p className="text-xs text-acier-600 mb-4">{c.description}</p>
                <div className="text-[11px] text-acier-400 font-mono">
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
          <div className="bg-white p-6 rounded-xl border border-beton-dark shadow-sm">
            <h3 className="font-heading font-black text-xl text-acier uppercase mb-4">
              Bandeaux Promotionnels Actifs
            </h3>
            <div className="space-y-4">
              {promotions.map((p) => (
                <div key={p.id} className="p-4 rounded-lg bg-acier-900 text-white border border-jaune">
                  <div className="text-xs font-bold text-jaune uppercase">{p.badge}</div>
                  <h4 className="font-heading font-black text-xl text-white uppercase mt-1">{p.titre}</h4>
                  <p className="text-xs text-acier-300 mt-2">{p.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Import CSV */}
      {activeTab === "import" && (
        <div className="bg-white p-6 rounded-xl border border-beton-dark shadow-sm max-w-2xl space-y-4">
          <h3 className="font-heading font-black text-xl text-acier uppercase">
            Importation Massive de Produits (CSV)
          </h3>
          <p className="text-xs text-acier-600 leading-relaxed">
            Vous disposez d&apos;un fichier Excel ou d&apos;une liste de prix fournisseur ? Téléchargez le modèle CSV Qualimat, remplissez les colonnes (Nom, Catégorie, Marque, Unité, Prix FCFA) puis importez-le en 1 clic.
          </p>

          <div className="p-4 bg-beton-light rounded border border-beton text-xs space-y-2">
            <div className="font-bold uppercase text-acier">Format des colonnes :</div>
            <code>nom;categorie_slug;marque;reference;unite;prix_fcfa;en_stock</code>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="data:text/csv;charset=utf-8,nom;categorie_slug;marque;reference;unite;prix_fcfa;en_stock%0ACiment%20CPJ%2035;gros-oeuvre;CIMBENIN;CIM-01;sac%20de%2050%20kg;4450;1"
              download="modele-catalogue-qualimat.csv"
              className="btn-touch bg-acier-100 hover:bg-acier-200 text-acier-800 font-bold uppercase text-xs px-4 py-2 rounded flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger le modèle CSV</span>
            </a>

            <button
              onClick={() => flash("Module d'import CSV prêt. Sélectionnez votre fichier .csv")}
              className="btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-bold uppercase text-xs px-4 py-2 rounded flex items-center gap-2 shadow"
            >
              <Upload className="w-4 h-4" />
              <span>Sélectionner un fichier CSV</span>
            </button>
          </div>
        </div>
      )}

      {/* 7. Réglages Magasin */}
      {activeTab === "settings" && settings && (
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-beton-dark shadow-sm max-w-2xl">
          <h3 className="font-heading font-black text-2xl text-acier uppercase mb-6">
            Réglages Généraux & Coordonnées Qualimat
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-acier-700 mb-1">
                Numéro WhatsApp Réception Devis (sans +, chiffres seuls) *
              </label>
              <input
                type="text"
                required
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full bg-beton-light border border-beton-dark rounded p-2.5 font-mono text-sm focus:outline-none focus:border-jaune"
              />
              <span className="text-[11px] text-acier-400 mt-1 block">
                Exemple pour le Bénin : 22997001122
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1">
                  Téléphone Principal Affiché *
                </label>
                <input
                  type="text"
                  required
                  value={settings.telephonePrincipal}
                  onChange={(e) => setSettings({ ...settings, telephonePrincipal: e.target.value })}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1">
                  Téléphone Secondaire
                </label>
                <input
                  type="text"
                  value={settings.telephoneSecondaire || ""}
                  onChange={(e) => setSettings({ ...settings, telephoneSecondaire: e.target.value })}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase text-acier-700 mb-1">
                Adresse Magasin Abomey-Calavi *
              </label>
              <input
                type="text"
                required
                value={settings.adresse}
                onChange={(e) => setSettings({ ...settings, adresse: e.target.value })}
                className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1">
                  Horaires Semaine (Lundi - Samedi)
                </label>
                <input
                  type="text"
                  value={settings.horairesSemaine}
                  onChange={(e) => setSettings({ ...settings, horairesSemaine: e.target.value })}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1">
                  Horaires Dimanche
                </label>
                <input
                  type="text"
                  value={settings.horairesDimanche}
                  onChange={(e) => setSettings({ ...settings, horairesDimanche: e.target.value })}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1">
                  Numéro IFU
                </label>
                <input
                  type="text"
                  value={settings.ifu || ""}
                  onChange={(e) => setSettings({ ...settings, ifu: e.target.value })}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1">
                  Numéro RCCM
                </label>
                <input
                  type="text"
                  value={settings.rccm || ""}
                  onChange={(e) => setSettings({ ...settings, rccm: e.target.value })}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-xs px-6 py-3 rounded tracking-wider shadow"
              >
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL D'AJOUT / ÉDITION PRODUIT (< 2 MINUTES) */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-acier-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border-2 border-jaune shadow-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="font-heading font-black text-2xl text-acier uppercase mb-2">
              {editingProduct ? "Modifier le produit" : "Ajouter un produit (Moins de 2 min)"}
            </h3>
            <p className="text-xs text-acier-500 mb-6">
              Remplissez les détails essentiels. Le produit sera immédiatement visible sur le catalogue public.
            </p>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Ciment CPJ 35 — Sac 50 kg"
                  value={formNom}
                  onChange={(e) => setFormNom(e.target.value)}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-acier-700 mb-1">
                    Rayon / Catégorie *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-acier-700 mb-1">
                    Marque / Fabricant
                  </label>
                  <input
                    type="text"
                    placeholder="Ex : CIMBENIN, MÉTAL BÉNIN, Bosch..."
                    value={formMarque}
                    onChange={(e) => setFormMarque(e.target.value)}
                    className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase text-acier-700 mb-1">
                    Unité de vente *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="sac 50 kg, barre 12m..."
                    value={formUnite}
                    onChange={(e) => setFormUnite(e.target.value)}
                    className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-acier-700 mb-1">
                    Mode Tarif
                  </label>
                  <select
                    value={formModePrix}
                    onChange={(e) => setFormModePrix(e.target.value as any)}
                    className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
                  >
                    <option value="affiche">Prix affiché</option>
                    <option value="sur_devis">Sur devis uniquement</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-acier-700 mb-1">
                    Prix en FCFA
                  </label>
                  <input
                    type="number"
                    placeholder="Ex : 4500"
                    disabled={formModePrix === "sur_devis"}
                    value={formPrix}
                    onChange={(e) => setFormPrix(e.target.value)}
                    className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1">
                  URL de l&apos;image du produit
                </label>
                <input
                  type="url"
                  placeholder="https://... (laisser vide pour photo par défaut)"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-acier-700 mb-1">
                  Description courte
                </label>
                <textarea
                  rows={2}
                  placeholder="Description technique du produit et usages recommandés..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-beton-light border border-beton-dark rounded p-2.5 text-xs focus:outline-none focus:border-jaune"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold uppercase text-acier-700">
                  <input
                    type="checkbox"
                    checked={formEnStock}
                    onChange={(e) => setFormEnStock(e.target.checked)}
                    className="w-4 h-4 text-jaune rounded border-beton-dark"
                  />
                  <span>En stock immédiat</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold uppercase text-acier-700">
                  <input
                    type="checkbox"
                    checked={formVedette}
                    onChange={(e) => setFormVedette(e.target.checked)}
                    className="w-4 h-4 text-jaune rounded border-beton-dark"
                  />
                  <span>Mettre en vedette (Accueil)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-beton">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="btn-touch px-4 py-2 rounded text-xs font-bold uppercase text-acier-600 hover:bg-acier-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-touch bg-jaune hover:bg-jaune-hover text-acier-950 font-black uppercase text-xs px-6 py-2.5 rounded shadow"
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
