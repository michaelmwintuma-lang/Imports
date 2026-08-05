import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useCompany } from '../../context/CompanyContext';
import { Product, SectorImages } from '../../types';
import { Image, Edit, Save, Plus, Check, Eye, RefreshCw } from 'lucide-react';

const ProductManager: React.FC = () => {
  const { products, updateProduct, addProduct } = useDatabase();
  const { config, updateConfig } = useCompany();

  const [activeSubTab, setActiveSubTab] = useState<'products' | 'sectors'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [sectorImages, setSectorImages] = useState<SectorImages>(config.sectorImages || {
    'Flours & Starches': 'https://images.unsplash.com/photo-1627914619999-5f214242bbbf?q=80&w=2000&auto=format&fit=crop',
    'Cocoa & Coffee': 'https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?q=80&w=2000&auto=format&fit=crop',
    'Spices & Seasonings': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=2000&auto=format&fit=crop',
    'Roots & Tubers': 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=2000&auto=format&fit=crop',
    'Grains & Cereals': 'https://images.unsplash.com/photo-1509358211425-44d6963c5825?q=80&w=2000&auto=format&fit=crop',
    'Value-Added Products': 'https://images.unsplash.com/photo-1608248597262-6750013b19eb?q=80&w=2000&auto=format&fit=crop',
    'Fruits & Vegetables': 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=2000&auto=format&fit=crop'
  });
  const [savedSectorMessage, setSavedSectorMessage] = useState(false);

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return;
    setEditingProduct({ ...editingProduct, imageUrl: e.target.value });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  const handleSectorImageChange = (sector: keyof SectorImages, url: string) => {
    setSectorImages(prev => ({ ...prev, [sector]: url }));
  };

  const handleSaveSectorImages = () => {
    updateConfig({ sectorImages });
    setSavedSectorMessage(true);
    setTimeout(() => setSavedSectorMessage(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-editorial p-6 md:p-8 border border-cream-muted">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-cream-muted">
        <div>
          <h2 className="text-2xl font-heading font-bold text-forest-dark">Product & Sector Image Manager</h2>
          <p className="text-charcoal/70 text-sm mt-1">Replace commodity images and sector banner media live across the website.</p>
        </div>

        {/* Sub-tabs */}
        <div className="flex gap-2 bg-cream-bg p-1 rounded-xl border border-cream-muted">
          <button
            onClick={() => setActiveSubTab('products')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'products' ? 'bg-forest-main text-white shadow-sm' : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            Product Commodity Images ({products.length})
          </button>
          <button
            onClick={() => setActiveSubTab('sectors')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'sectors' ? 'bg-forest-main text-white shadow-sm' : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            Sector Category Images (7)
          </button>
        </div>
      </div>

      {/* SECTOR IMAGES TAB */}
      {activeSubTab === 'sectors' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-heading font-bold text-forest-dark">Custom Sector Images</h3>
            <button
              onClick={handleSaveSectorImages}
              className="bg-forest-main text-white px-5 py-2.5 rounded-lg text-xs font-heading font-bold hover:bg-forest-dark transition-all flex items-center gap-2"
            >
              <Save size={16} />
              {savedSectorMessage ? 'Sector Images Saved!' : 'Save Sector Images'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(Object.keys(sectorImages) as string[]).map((sector) => (
              <div key={sector} className="p-5 rounded-xl border border-cream-muted bg-cream-bg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-heading font-bold text-sm text-forest-dark">{sector}</span>
                    <span className="px-2 py-0.5 rounded bg-gold-accent/20 text-gold-dark text-[10px] font-mono font-bold uppercase">Sector</span>
                  </div>
                  <div className="aspect-16/9 rounded-lg overflow-hidden mb-3 border border-cream-muted bg-white">
                    <img
                      src={sectorImages[sector] || ''}
                      alt={sector}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLElement).setAttribute('src', 'https://via.placeholder.com/600x400?text=Invalid+Image+URL'); }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-charcoal/70 uppercase mb-1">
                    Image URL Field
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={sectorImages[sector] || ''}
                      onChange={(e) => handleSectorImageChange(sector, e.target.value)}
                      placeholder="Paste image URL here..."
                      className="flex-1 px-3 py-2 rounded-lg border border-cream-muted text-xs bg-white focus:outline-none focus:ring-2 focus:ring-forest-main"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeSubTab === 'products' && (
        <div>
          {editingProduct ? (
            <form onSubmit={handleSaveProduct} className="p-6 bg-cream-bg rounded-2xl border border-cream-muted space-y-6">
              <div className="flex justify-between items-center border-b border-cream-muted pb-4">
                <h3 className="text-lg font-heading font-bold text-forest-dark">Edit Image & Details for {editingProduct.name}</h3>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="text-xs text-charcoal/60 hover:text-charcoal underline"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-charcoal uppercase mb-2">Product Image Preview</label>
                  <div className="aspect-4/3 rounded-xl overflow-hidden border border-cream-muted bg-white mb-3">
                    <img
                      src={editingProduct.imageUrl}
                      alt={editingProduct.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLElement).setAttribute('src', 'https://via.placeholder.com/600x400?text=Invalid+Image+URL'); }}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal uppercase mb-1">Image URL Field *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.imageUrl}
                      onChange={handleProductImageChange}
                      className="w-full px-3 py-2 rounded-lg border border-cream-muted bg-white text-xs focus:outline-none focus:ring-2 focus:ring-forest-main"
                    />
                    <p className="text-[11px] text-charcoal/50 mt-1">Paste your custom photograph URL above to replace this product image live.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal uppercase mb-1">Product Name</label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-cream-muted bg-white text-xs focus:outline-none focus:ring-2 focus:ring-forest-main"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal uppercase mb-1">Sector / Category</label>
                    <input
                      type="text"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-cream-muted bg-white text-xs focus:outline-none focus:ring-2 focus:ring-forest-main"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-cream-muted">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-charcoal/70 hover:bg-cream-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-forest-main text-white font-heading font-bold text-xs hover:bg-forest-dark transition-all flex items-center gap-2 shadow-sm"
                >
                  <Save size={16} /> Save Product Image & Details
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div key={prod.id} className="p-4 rounded-xl border border-cream-muted bg-cream-bg flex flex-col justify-between group">
                  <div>
                    <div className="relative aspect-4/3 rounded-lg overflow-hidden mb-3 border border-cream-muted bg-white">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLElement).setAttribute('src', 'https://via.placeholder.com/600x400?text=Invalid+Image+URL'); }}
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-forest-main/90 text-white text-[10px] font-bold uppercase">
                        {prod.category}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-sm text-forest-dark mb-1">{prod.name}</h4>
                    <p className="text-[11px] text-charcoal/60 line-clamp-2 mb-4">{prod.description}</p>
                  </div>

                  <div className="pt-3 border-t border-cream-muted flex justify-between items-center">
                    <span className="text-[10px] font-mono text-charcoal/50">Origin: {prod.origin}</span>
                    <button
                      onClick={() => setEditingProduct(prod)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-cream-muted text-forest-main hover:bg-forest-main hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                      <Image size={14} /> Replace Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductManager;
