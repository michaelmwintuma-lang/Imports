import React from 'react';
import { Product } from '../../types';
import PillBadge from '../common/PillBadge';
import { ArrowRight, Box, ShieldCheck, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onRequestQuote: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRequestQuote }) => {
  return (
    <div className="card-editorial flex flex-col h-full group overflow-hidden bg-white dark:bg-dark-card border-t-4 border-t-gold-accent border-x border-b border-cream-muted dark:border-dark-border p-6 shadow-md hover:shadow-editorial-hover transition-all duration-300 relative rounded-2xl">
      {/* Decorative subtle background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-main/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="mb-4 flex justify-between items-start">
        <PillBadge label={product.category} type="category" />
      </div>
      
      <div className="flex flex-col flex-grow relative z-10">
        <h3 className="text-xl font-heading font-bold text-forest-dark dark:text-white mb-3 group-hover:text-gold-dark dark:group-hover:text-gold-accent transition-colors">
          {product.name}
        </h3>
        
        <p className="text-charcoal/80 dark:text-dark-text/80 text-sm mb-6 flex-grow leading-relaxed">
          {product.description}
        </p>


      </div>
    </div>
  );
};

export default ProductCard;
