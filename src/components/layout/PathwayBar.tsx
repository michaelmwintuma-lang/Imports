import React from 'react';
import { Link } from 'react-router-dom';

const PathwayBar: React.FC = () => {
  return (
    <div className="bg-forest-dark text-cream-bg text-xs md:text-sm font-medium py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center space-x-1">
          <span className="opacity-70 font-semibold">I AM A:</span>
          <Link to="/products" className="hover:text-gold-accent transition-colors underline decoration-gold-accent/30 underline-offset-4">Buyer</Link>
          <span className="opacity-40">|</span>
          <Link to="/markets" className="hover:text-gold-accent transition-colors underline decoration-gold-accent/30 underline-offset-4">Distributor</Link>
          <span className="opacity-40">|</span>
          <Link to="/suppliers" className="hover:text-gold-accent transition-colors underline decoration-gold-accent/30 underline-offset-4 font-bold text-gold-light">Farmer Member (Benefits & Join)</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">EN</a>
          <span className="opacity-40">|</span>
          <Link to="/admin" className="opacity-80 hover:opacity-100 transition-opacity">Portal Login</Link>
        </div>
      </div>
    </div>
  );
};

export default PathwayBar;
