import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Globe, Truck, Package } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

const HeroSection: React.FC = () => {
  const { products } = useDatabase();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Extract all valid product images dynamically from database
  const productImages = products.map(p => ({
    name: p.name,
    category: p.category,
    imageUrl: p.imageUrl
  }));

  // Automatic slide rotation every 4.5 seconds continuously
  useEffect(() => {
    if (productImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [productImages.length]);

  const platformHighlights = [
    {
      badge: "FDA Ghana & Phytosanitary Compliant",
      title: "Ghanaian Agricultural Commodities",
      highlight: "& Value-Added Agro-Processing",
      subtitle: "Your trusted gateway for export-certified Ghanaian food produce, industrial milling, and bulk distribution directly to international sea and air ports.",
    },
    {
      badge: "Direct Farm-to-Port Supply Chain",
      title: "Authentic Ghanaian Produce",
      highlight: "Sourced & Processed at Scale",
      subtitle: "Empowering smallholder farming cooperatives with fair pricing, laboratory sanitation, and unbroken cold-chain export logistics.",
    },
    {
      badge: "Global Wholesale & Trade Distribution",
      title: "Worldwide Container Shipping",
      highlight: "To Europe, Americas, Asia & ECOWAS",
      subtitle: "Supplying Grade-A Pona yams, green plantains, double-roasted gari, natural flours, legumes, and indigenous spices to global distributors.",
    },
    {
      badge: "Verified Quality & Fast Quotations",
      title: "Seamless Online Procurement",
      highlight: "& Verified Product Traceability",
      subtitle: "Explore technical specifications, packaging options, phytosanitary certifications, and request wholesale RFQ quotes in seconds.",
    }
  ];

  const currentHighlight = platformHighlights[currentSlide % platformHighlights.length];
  const activeProduct = productImages[currentSlide] || productImages[0];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % productImages.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-forest-dark text-white select-none">
      {/* BACKGROUND IMAGE CAROUSEL WITH ALL PRODUCT IMAGES */}
      {productImages.map((prod, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={prod.imageUrl}
            alt={prod.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/fresh yam.jpeg';
            }}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
          />
          {/* Dark Gradient Backdrop Overlay for Text Legibility & Elegance */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/85 to-forest-dark/50" />
        </div>
      ))}

      {/* FOREGROUND CONTENT LAYER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-20 w-full pt-32 md:pt-40 pb-16 md:pb-24 flex-grow flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl flex flex-col items-center">
          
          {/* Platform Feature Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-accent/20 border border-gold-accent/40 text-gold-light text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in max-w-full">
            <ShieldCheck className="w-4 h-4 text-gold-accent shrink-0" />
            <span className="truncate">{currentHighlight.badge}</span>
          </div>

          {/* Core Landing Page Headline */}
          <h1 className="text-[32px] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-wide mb-6 min-h-[120px] sm:min-h-[140px] md:min-h-[170px] transition-all duration-500">
            {currentHighlight.title} <br />
            <span className="text-gold-accent block mt-1.5 md:mt-2">
              {currentHighlight.highlight}
            </span>
          </h1>

          {/* Site Value Proposition & Customer Expectations */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed mb-8 max-w-3xl min-h-[70px] sm:min-h-[60px] mx-auto">
            {currentHighlight.subtitle}
          </p>

          {/* Key Value Expectation Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 w-full max-w-3xl">
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col items-center justify-center text-center hover:bg-white/15 transition-all">
              <Globe className="w-5 h-5 text-gold-accent mb-1.5" />
              <span className="text-xs font-extrabold text-white">Global Shipping</span>
              <span className="text-[10px] text-white/70">Sea & Air Ports</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col items-center justify-center text-center hover:bg-white/15 transition-all">
              <ShieldCheck className="w-5 h-5 text-gold-accent mb-1.5" />
              <span className="text-xs font-extrabold text-white">FDA Certified</span>
              <span className="text-[10px] text-white/70">Phytosanitary Approved</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col items-center justify-center text-center hover:bg-white/15 transition-all">
              <Package className="w-5 h-5 text-gold-accent mb-1.5" />
              <span className="text-xs font-extrabold text-white">17+ Produce Types</span>
              <span className="text-[10px] text-white/70">Raw & Processed</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col items-center justify-center text-center hover:bg-white/15 transition-all">
              <Truck className="w-5 h-5 text-gold-accent mb-1.5" />
              <span className="text-xs font-extrabold text-white">Bulk Off-Take</span>
              <span className="text-[10px] text-white/70">Farmer Cooperatives</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gold-accent text-forest-dark font-heading font-bold text-sm hover:bg-gold-light hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-gold-accent/30 uppercase tracking-wider"
            >
              Browse Product Catalogue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/10 backdrop-blur-md text-white font-heading font-semibold text-sm hover:bg-white/20 hover:-translate-y-0.5 border border-white/20 transition-all uppercase tracking-wider"
            >
              Request Wholesale RFQ
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
