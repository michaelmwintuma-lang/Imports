import React from 'react';
import { Product } from '../../types';
import PillBadge from '../common/PillBadge';
import { ArrowRight, Thermometer } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="cursor-pointer flex flex-col h-full bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 ease-out rounded-xl overflow-hidden group"
    >
      {/* Gallery Image Container */}
      <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-100 dark:bg-dark-bg">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/fresh yam.jpeg';
          }}
        />
      </div>

      {/* Card Details Body */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-base font-heading font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-brand-blue transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-slate-600 dark:text-dark-text/70 text-xs line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

          {product.storageConditions && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-dark-text/60 mb-2 truncate">
              <Thermometer className="w-3.5 h-3.5 text-brand-blue shrink-0" />
              <span className="truncate">Storage: {product.storageConditions}</span>
            </div>
          )}
        </div>

        {/* Card Footer Link */}
        <div className="pt-3 border-t border-slate-100 dark:border-dark-border flex items-center justify-end">
          <span className="text-xs font-bold text-brand-blue dark:text-brand-coral flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
