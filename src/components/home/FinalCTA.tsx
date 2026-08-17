import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCompany } from '../../context/CompanyContext';

const FinalCTA: React.FC = () => {
  const { config } = useCompany();

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-forest-dark transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-gold-accent/20 border border-gold-accent/40 text-gold-light text-xs font-semibold uppercase tracking-wider mb-4">
          Global Trade Partnership
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          Ready to Partner with <span className="text-gold-accent">{config.companyName}</span>?
        </h2>
        <p className="text-base text-cream-muted/90 mb-8 max-w-xl mx-auto leading-relaxed">
          Whether you're a buyer seeking export-grade commodities or a Ghanaian farmer/supplier ready to expand into new markets, let's build a long-term commercial partnership.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/products"
            className="bg-gold-accent text-forest-dark px-8 py-3.5 rounded-full font-heading font-bold hover:bg-gold-light transition-all shadow-lg flex items-center justify-center gap-2 group text-sm uppercase tracking-wider"
          >
            Request Quotation
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/suppliers"
            className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-heading font-bold hover:bg-white/20 transition-all flex items-center justify-center text-sm uppercase tracking-wider"
          >
            Join Member Network
          </Link>
          <Link 
            to="/contact"
            className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-heading font-bold hover:bg-white/20 transition-all flex items-center justify-center text-sm uppercase tracking-wider"
          >
            Contact Sales Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
