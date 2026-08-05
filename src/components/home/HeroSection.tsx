import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCompany } from '../../context/CompanyContext';

interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  highlightTitle: string;
  description: string;
  imageUrl: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const HeroSection: React.FC = () => {
  const { config } = useCompany();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      badge: "Import, Export & Agro-Processing Enterprise",
      title: "Import & Export of",
      highlightTitle: "Assorted Ghana Food Products",
      description: `Specializing in the sourcing, value-added processing, and international supply of premium Ghanaian agricultural commodities for global and domestic markets.`,
      imageUrl: "/images/hero-cassava-roots.jpg",
      primaryCtaText: "Explore Product Catalogue",
      primaryCtaLink: "/products",
      secondaryCtaText: "Become a Member / Supplier",
      secondaryCtaLink: "/suppliers"
    },
    {
      id: 2,
      badge: "Industrial Agro-Processing & Milling",
      title: "State-of-the-Art",
      highlightTitle: "Value-Added Food Processing",
      description: "Transforming fresh Ghanaian cassava, green plantain, yams, and cocoa into export-grade High Quality Cassava Flour (HQCF), starches, and natural extracts.",
      imageUrl: "/images/agro-processing-factory.jpg",
      primaryCtaText: "Agro-Processing Capabilities",
      primaryCtaLink: "/agro-processing",
      secondaryCtaText: "Request Quotation",
      secondaryCtaLink: "/products"
    },
    {
      id: 3,
      badge: "Supplier & Farmer Cooperative Network",
      title: "Guaranteed Off-Take &",
      highlightTitle: "Fascinating Member Benefits",
      description: "Empowering Ghanaian farmers with fair locked-in pricing, direct farm-gate logistics pickups, free laboratory testing, and rapid 48-hour electronic payouts.",
      imageUrl: "/images/ghana-agro%201.jpg",
      primaryCtaText: "Join Farmer Member Network",
      primaryCtaLink: "/suppliers",
      secondaryCtaText: "Learn Member Privileges",
      secondaryCtaLink: "/suppliers#membership-form"
    },
    {
      id: 4,
      badge: "FDA Ghana & Phytosanitary Certified",
      title: "Uncompromising Quality &",
      highlightTitle: "Global Export Compliance",
      description: "Rigorous laboratory testing, aflatoxin screening, cold-chain preservation, and full phytosanitary clearance for European, American, and Asian ports.",
      imageUrl: "/images/import-export-shipping.jpg",
      primaryCtaText: "Quality & Certifications",
      primaryCtaLink: "/quality",
      secondaryCtaText: "Global Trade Markets",
      secondaryCtaLink: "/markets"
    },
    {
      id: 5,
      badge: "Import, Export & Agro-Processing Enterprise",
      title: "Import & Export of",
      highlightTitle: "Assorted Ghana Food Products",
      description: "Specializing in the sourcing, value-added processing, and international supply of premium Ghanaian agricultural commodities for global and domestic markets.",
      imageUrl: "/images/Soybeans.jpg",
      primaryCtaText: "Explore Product Catalogue",
      primaryCtaLink: "/products",
      secondaryCtaText: "Become a Member / Supplier",
      secondaryCtaLink: "/suppliers"
    },
    {
      id: 6,
      badge: "Import, Export & Agro-Processing Enterprise",
      title: "Import & Export of",
      highlightTitle: "Assorted Ghana Food Products",
      description: "Specializing in the sourcing, value-added processing, and international supply of premium Ghanaian agricultural commodities for global and domestic markets.",
      imageUrl: "/images/Cowpeas.jpg",
      primaryCtaText: "Explore Product Catalogue",
      primaryCtaLink: "/products",
      secondaryCtaText: "Become a Member / Supplier",
      secondaryCtaLink: "/suppliers"
    },
    {
      id: 7,
      badge: "Import, Export & Agro-Processing Enterprise",
      title: "Import & Export of",
      highlightTitle: "Assorted Ghana Food Products",
      description: "Specializing in the sourcing, value-added processing, and international supply of premium Ghanaian agricultural commodities for global and domestic markets.",
      imageUrl: "/images/Green plantain.jpg",
      primaryCtaText: "Explore Product Catalogue",
      primaryCtaLink: "/products",
      secondaryCtaText: "Become a Member / Supplier",
      secondaryCtaLink: "/suppliers"
    }
  ];

  // Automatic slide rotation every 5 seconds continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-forest-dark text-white select-none">
      {/* BACKGROUND IMAGE SLIDESHOW WITH CROSSFADE */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1595855759920-8658239e7b02?q=80&w=2000&auto=format&fit=crop';
            }}
            className="w-full h-full object-cover scale-105 transition-transform duration-10000 ease-out"
          />
          {/* Dark Overlay Gradient for Editorial Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/85 to-forest-dark/40" />
        </div>
      ))}

      {/* FOREGROUND CONTENT LAYER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-20 w-full pt-32 md:pt-48 pb-16 md:pb-24 flex-grow flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-accent/20 border border-gold-accent/40 text-gold-light text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in max-w-full truncate">
            <span className="w-2 h-2 rounded-full bg-gold-accent animate-ping shrink-0" />
            <span className="truncate">{heroSlides[currentSlide].badge}</span>
          </div>

          {/* Heading with Highlight */}
          <h1 className="text-[32px] leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-wide md:leading-tight mb-6 md:mb-8 min-h-[110px] sm:min-h-[140px] md:min-h-[180px] transition-all duration-500 [word-break:keep-all]">
            {heroSlides[currentSlide].title} <br />
            <span className="text-gold-accent block mt-1 md:mt-2">
              {heroSlides[currentSlide].highlightTitle}
            </span>
          </h1>

          {/* Slide Description */}
          <p className="text-sm sm:text-base md:text-xl text-white/90 font-light leading-relaxed mb-8 max-w-2xl min-h-[80px] sm:min-h-[60px] md:min-h-[72px]">
            {heroSlides[currentSlide].description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              to={heroSlides[currentSlide].primaryCtaLink}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gold-accent text-forest-dark font-heading font-bold text-sm hover:bg-gold-light transition-all shadow-lg hover:shadow-gold-accent/30 uppercase tracking-wider"
            >
              {heroSlides[currentSlide].primaryCtaText} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={heroSlides[currentSlide].secondaryCtaLink}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white/10 backdrop-blur-md text-white font-heading font-semibold text-sm hover:bg-white/20 border border-white/20 transition-all uppercase tracking-wider"
            >
              {heroSlides[currentSlide].secondaryCtaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
