import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDatabase } from '../context/DatabaseContext';
import ProductCard from '../components/products/ProductCard';
import ProductDetailModal from '../components/products/ProductDetailModal';
import { Product } from '../types';
import RFQWizardModal from '../components/products/RFQWizardModal';
import { Search, ShieldCheck, LayoutGrid, Wheat, Factory, Bean, Flame, Package, Award } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const { products } = useDatabase();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isRFQOpen, setIsRFQOpen] = useState<boolean>(false);
  const [selectedProductForRFQ, setSelectedProductForRFQ] = useState<string>('');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleRequestQuote = (product: Product) => {
    setSelectedProductForRFQ(product.name);
    setIsRFQOpen(true);
  };

  const CATEGORIES = [
    { name: 'All', icon: <LayoutGrid className="w-4 h-4" /> },
    { name: 'Staple Food Products', icon: <Wheat className="w-4 h-4" /> },
    { name: 'Flours & Starches', icon: <Factory className="w-4 h-4" /> },
    { name: 'Grains, Beans & Legumes', icon: <Bean className="w-4 h-4" /> },
    { name: 'Spices & Seasonings', icon: <Flame className="w-4 h-4" /> },
    { name: 'Dried & Processed Foods', icon: <Package className="w-4 h-4" /> },
    { name: 'Agro-Processed Products', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg pt-28 pb-12 sm:pb-16 transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        {/* Header Hero Banner */}
        <div className="mb-8 text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200 dark:bg-dark-muted text-slate-700 dark:text-dark-text text-xs font-bold uppercase tracking-wider mb-4 border border-slate-300 dark:border-dark-border">
            <ShieldCheck className="w-4 h-4 text-brand-blue" /> FDA Ghana Compliant
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            Assorted Ghanaian Product <span className="text-brand-blue">Gallery</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-dark-text/80 leading-relaxed">
            Browse our collection of Ghanaian agricultural commodities, processed food products, and specialty goods. Click any item for details or quote requests.
          </p>
        </div>

        {/* Category Filter Pills & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-dark-border">

          {/* Scrollable Category Filter Pills */}
          <div className="w-full md:w-auto overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-2 pb-2 md:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSearchParams({ category: cat.name });
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-colors shrink-0 border ${selectedCategory === cat.name
                      ? 'bg-brand-blue text-white border-brand-blue shadow-xs'
                      : 'bg-white dark:bg-dark-card text-slate-700 dark:text-dark-text/80 border-slate-200 dark:border-dark-border hover:bg-slate-100 dark:hover:bg-dark-muted'
                    }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 dark:text-dark-text/40 absolute left-3.5 top-3" />
          </div>

        </div>

        {/* Products Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={handleSelectProduct}
              onRequestQuote={handleRequestQuote}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-dark-border px-4 max-w-lg mx-auto">
            <p className="text-slate-600 dark:text-dark-text/70 text-sm mb-4">
              No gallery items found matching <strong>"{searchTerm || selectedCategory}"</strong>.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchParams({ category: 'All' }); setSearchTerm(''); }}
              className="px-6 py-2.5 rounded-xl bg-brand-blue text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xs hover:bg-forest-hover transition-colors"
            >
              Reset Gallery Filters
            </button>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onRequestQuote={handleRequestQuote}
      />

      {/* RFQ Wizard Modal */}
      {isRFQOpen && (
        <RFQWizardModal
          isOpen={isRFQOpen}
          onClose={() => setIsRFQOpen(false)}
          initialProduct={selectedProductForRFQ}
        />
      )}
    </div>
  );
};

export default ProductsPage;
