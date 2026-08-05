import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDatabase } from '../context/DatabaseContext';
import ProductCard from '../components/products/ProductCard';
import { Product } from '../types';
import RFQWizardModal from '../components/products/RFQWizardModal';
import { Search, Filter, X, ArrowLeft, ShieldCheck, LayoutGrid, Wheat, Factory, Bean, Flame, Coffee, Leaf, Package, Droplets, CupSoda, Cog, Sprout, Award } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const { products } = useDatabase();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
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

  const handleRequestQuote = (product: Product) => {
    setSelectedProductForRFQ(product.name);
    setIsRFQOpen(true);
  };

  const handleResetCategory = () => {
    setSelectedCategory('All');
    setSearchParams({ category: 'All' });
  };

  const CATEGORIES = [
    { name: 'All', icon: <LayoutGrid className="w-4 h-4" /> },
    { name: 'Staple Food Products', icon: <Wheat className="w-4 h-4" /> },
    { name: 'Processed Cassava Products', icon: <Factory className="w-4 h-4" /> },
    { name: 'Grains, Beans & Legumes', icon: <Bean className="w-4 h-4" /> },
    { name: 'Spices & Seasonings', icon: <Flame className="w-4 h-4" /> },
    { name: 'Cocoa & Coffee Products', icon: <Coffee className="w-4 h-4" /> },
    { name: 'Fruits & Vegetables', icon: <Leaf className="w-4 h-4" /> },
    { name: 'Dried & Processed Foods', icon: <Package className="w-4 h-4" /> },
    { name: 'Oils & Fats', icon: <Droplets className="w-4 h-4" /> },
    { name: 'Beverages', icon: <CupSoda className="w-4 h-4" /> },
    { name: 'Agro-Processed Products', icon: <Cog className="w-4 h-4" /> },
    { name: 'Nuts & Seeds', icon: <Sprout className="w-4 h-4" /> },
    { name: 'Organic & Specialty Products', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-cream-bg dark:bg-dark-bg py-8 sm:py-12 md:py-16 transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="mb-6 md:mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-accent/20 border border-gold-accent/40 text-gold-dark dark:text-gold-accent text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
              Export & Product Catalogue
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-main/10 border border-forest-main/30 dark:bg-forest-main/30 dark:border-forest-main/50 text-forest-main dark:text-gold-accent text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Operating under FDA
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold text-forest-dark dark:text-white mb-3 break-words leading-tight">
            Ghanaian Agricultural & Processed Products
          </h1>
          <p className="text-xs sm:text-base text-charcoal/80 dark:text-dark-text/80 max-w-3xl leading-relaxed">
            Explore our certified range of raw commodities and value-added agro-processed foods. All items are processed under strict FDA sanitation standards for international distribution.
          </p>
        </div>

        {/* Filter & Search Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-cream-muted dark:border-dark-border">
          
          {/* Scrollable Category Filter Icons */}
          <div className="flex-1 w-full overflow-hidden">
            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mb-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSearchParams({ category: cat.name });
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all shrink-0 border ${
                    selectedCategory === cat.name 
                      ? 'bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark border-forest-main dark:border-gold-accent shadow-md' 
                      : 'bg-white dark:bg-dark-card text-charcoal/80 dark:text-dark-text/80 border-cream-muted dark:border-dark-border hover:bg-cream-muted/30 dark:hover:bg-dark-muted/50'
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80 shrink-0">
            <input
              type="text"
              placeholder="Search by product name or specs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-muted dark:border-dark-border bg-white dark:bg-dark-card text-charcoal dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent shadow-sm"
            />
            <Search className="w-4 h-4 text-charcoal/40 dark:text-dark-text/40 absolute left-4 top-3.5" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onRequestQuote={handleRequestQuote} 
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-dark-card rounded-2xl border border-cream-muted dark:border-dark-border px-4">
            <p className="text-charcoal/60 dark:text-dark-text/60 text-sm mb-3">
              No products found for {selectedCategory !== 'All' ? `category "${selectedCategory}"` : 'your search'}.
            </p>
            <button 
              onClick={() => { handleResetCategory(); setSearchTerm(''); }}
              className="px-6 py-2.5 rounded-xl bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:bg-forest-dark transition-all inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Reset Filters & Display All Products
            </button>
          </div>
        )}

      </div>

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
