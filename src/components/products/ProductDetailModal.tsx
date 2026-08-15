import React from 'react';
import { Product } from '../../types';
import { X, CheckCircle2, ArrowRight, Package, Thermometer } from 'lucide-react';
import PillBadge from '../common/PillBadge';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onRequestQuote,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-slate-100 dark:bg-dark-muted text-slate-700 dark:text-dark-text hover:bg-slate-200 dark:hover:bg-dark-border transition-colors flex items-center justify-center shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Image Preview Container */}
            <div className="aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-bg relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/fresh yam.jpeg';
                }}
              />
            </div>

            {/* Product Details & Content */}
            <div className="flex flex-col justify-between h-full space-y-5">
              <div>
                <h2 className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white mb-3 leading-tight">
                  {product.name}
                </h2>
                
                <p className="text-sm text-slate-600 dark:text-dark-text/80 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Storage Conditions Section */}
                {product.storageConditions && (
                  <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-dark-muted border border-slate-200 dark:border-dark-border">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-dark-text/80 mb-1 flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-brand-blue" /> Storage Conditions
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-dark-text/90 font-medium">
                      {product.storageConditions}
                    </p>
                  </div>
                )}

                {/* Packaging Options */}
                {product.packagingOptions && product.packagingOptions.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-dark-text/60 mb-2 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5" /> Packaging & Format Options
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.packagingOptions.map((pkg, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-dark-muted rounded-lg text-xs font-semibold text-slate-700 dark:text-dark-text">
                          {pkg}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {product.certifications && product.certifications.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-dark-text/60 mb-2">
                      Verified Quality Standards
                    </h4>
                    <div className="space-y-1.5">
                      {product.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-dark-text">
                          <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-dark-border flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onRequestQuote(product);
                  }}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-brand-blue hover:bg-forest-hover text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  Inquire About Product <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-100 dark:bg-dark-muted text-slate-700 dark:text-dark-text hover:bg-slate-200 text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
