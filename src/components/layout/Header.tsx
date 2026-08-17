import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCompany } from '../../context/CompanyContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Menu, X, Sun, Moon, ChevronDown, ChevronRight, Home, Info,
  Package, Briefcase, Factory, Globe, TrendingUp, Newspaper, Mail,
  Wheat, Layers, Sprout, Nut, Flame, Coffee, Droplets, Sparkles, ShieldCheck, Users
} from 'lucide-react';

const Header: React.FC = () => {
  const { config } = useCompany();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [businessAreasOpen, setBusinessAreasOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Transparent to Solid background transition
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHeroPage = location.pathname === '/' || location.pathname === '/about';
  const isTransparent = isHeroPage && !isScrolled && !mobileMenuOpen;

  const headerBgClass = isTransparent
    ? 'bg-transparent'
    : 'bg-white/95 dark:bg-dark-card/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]';

  const linkClass = (path: string) => `text-xs font-bold uppercase tracking-widest transition-all duration-300 ${location.pathname === path
    ? (isTransparent ? 'text-white border-b-2 border-gold-accent pb-1' : 'text-forest-main dark:text-gold-accent border-b-2 border-forest-main dark:border-gold-accent pb-1')
    : (isTransparent ? 'text-white/80 hover:text-white hover:-translate-y-0.5' : 'text-charcoal/80 dark:text-dark-text/80 hover:text-forest-main dark:hover:text-gold-accent hover:-translate-y-0.5')
    }`;

  const isActiveRoute = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isBusinessAreasActive = [
    '/agro-processing',
    '/export-distribution',
    '/global-markets',
    '/insights'
  ].some(p => location.pathname.startsWith(p));

  const mobileLinkClass = (path: string) => {
    const active = isActiveRoute(path);
    if (active) {
      return 'flex items-center justify-between min-h-[48px] px-3.5 py-2.5 rounded-xl text-sm font-extrabold text-brand-blue dark:text-gold-accent bg-slate-100/90 dark:bg-dark-muted/90 border-l-4 border-brand-blue dark:border-gold-accent shadow-xs transition-all duration-300 scale-[1.01]';
    }
    return 'flex items-center justify-between min-h-[48px] px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-dark-text/90 hover:bg-slate-100 dark:hover:bg-dark-muted hover:text-brand-blue dark:hover:text-gold-accent hover:translate-x-1.5 transition-all duration-200 group';
  };

  const mobileSubLinkClass = (path: string) => {
    const active = location.pathname === path;
    if (active) {
      return 'flex items-center justify-between min-h-[42px] px-3.5 rounded-lg text-xs font-extrabold text-brand-blue dark:text-gold-accent bg-brand-blue/10 dark:bg-gold-accent/20 border-l-3 border-brand-blue dark:border-gold-accent transition-all';
    }
    return 'flex items-center justify-between min-h-[42px] px-3.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-dark-text/80 hover:bg-slate-200/80 dark:hover:bg-dark-muted hover:text-brand-blue dark:hover:text-gold-accent hover:translate-x-1 transition-all group';
  };

  return (
    <>
      {/* Mobile Dark Backdrop Overlay when Menu is Open */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Absolute Header to allow hero sections to flow underneath without layout shift */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerBgClass} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>

        <div className={`transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center gap-4">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 shrink-0">
                {config.logoUrl ? (
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden bg-white shadow-md flex items-center justify-center shrink-0 border border-cream-muted dark:border-dark-border">
                    <img
                      src={config.logoUrl}
                      alt={config.companyName}
                      className="w-full h-full object-contain p-1 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 bg-brand-blue text-white flex items-center justify-center rounded-xl font-heading font-bold text-xl shadow-md">
                    {config.companyName.charAt(0)}
                  </div>
                )}
                <span className={`font-heading font-extrabold text-base md:text-xl tracking-tight transition-colors ${isTransparent ? 'text-white' : 'text-forest-dark dark:text-brand-coral'
                  }`}>
                  {config.companyName}
                </span>
              </Link>

              {/* Desktop Nav - Right Aligned */}
              <div className="hidden lg:flex items-center justify-end gap-8 flex-grow ml-auto">
                <nav className="flex items-center gap-7">
                  <Link to="/" className={linkClass('/')}>Home</Link>
                  <Link to="/about" className={linkClass('/about')}>About Us</Link>

                  <Link to="/products?category=All" className={linkClass('/products')}>Product Gallery</Link>
                  <Link to="/suppliers" className={linkClass('/suppliers')}>Members & Benefits</Link>

                  {/* Business Areas Dropdown */}
                  <div className="relative group">
                    <button className={`${linkClass('/business-areas')} flex items-center gap-1 cursor-default py-2`}>
                      Business Areas <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white dark:bg-dark-card rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-cream-muted dark:border-dark-border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Link to="/agro-processing" className="block px-5 py-3 text-[13px] font-bold text-charcoal/80 dark:text-dark-text/80 hover:text-forest-main dark:hover:text-gold-accent hover:bg-cream-bg dark:hover:bg-dark-muted transition-colors">Agro-Processing</Link>
                      <Link to="/export-distribution" className="block px-5 py-3 text-[13px] font-bold text-charcoal/80 dark:text-dark-text/80 hover:text-forest-main dark:hover:text-gold-accent hover:bg-cream-bg dark:hover:bg-dark-muted transition-colors">Export & Distribution</Link>
                      <Link to="/global-markets" className="block px-5 py-3 text-[13px] font-bold text-charcoal/80 dark:text-dark-text/80 hover:text-forest-main dark:hover:text-gold-accent hover:bg-cream-bg dark:hover:bg-dark-muted transition-colors">Global Markets</Link>
                      <Link to="/insights" className="block px-5 py-3 text-[13px] font-bold text-charcoal/80 dark:text-dark-text/80 hover:text-forest-main dark:hover:text-gold-accent hover:bg-cream-bg dark:hover:bg-dark-muted transition-colors">Insights & News</Link>
                    </div>
                  </div>

                  <Link to="/contact" className={linkClass('/contact')}>Contact</Link>
                </nav>

                <button
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  className={`p-2 rounded-full transition-all ${isTransparent
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-cream-bg dark:bg-dark-muted text-forest-main dark:text-gold-accent hover:bg-forest-main hover:text-white'
                    }`}
                  title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {/* Mobile Menu & Theme Toggle Controls */}
              <div className="flex items-center gap-2.5 lg:hidden">
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  className={`h-11 w-11 min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-all ${isTransparent
                    ? 'bg-white/15 text-white hover:bg-white/25 active:scale-95'
                    : 'bg-slate-100 dark:bg-dark-muted text-slate-900 dark:text-gold-accent hover:bg-slate-200 dark:hover:bg-dark-border active:scale-95'
                    }`}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Refined Mobile Menu Toggle Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`h-11 w-11 min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-all duration-300 ${mobileMenuOpen
                    ? 'bg-slate-900 text-white dark:bg-gold-accent dark:text-dark-card shadow-lg ring-2 ring-slate-400/30 scale-105'
                    : isTransparent
                      ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                      : 'bg-slate-100 dark:bg-dark-muted text-slate-900 dark:text-gold-accent hover:bg-brand-blue hover:text-white dark:hover:bg-gold-accent dark:hover:text-dark-card border border-slate-200 dark:border-dark-border'
                    }`}
                  aria-label="Toggle menu bar"
                >
                  {mobileMenuOpen ? (
                    <X size={22} className="transition-transform duration-300 rotate-90" />
                  ) : (
                    <Menu size={22} className="transition-transform duration-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Opaque Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-card shadow-2xl border-t border-b border-slate-200 dark:border-dark-border px-4 py-5 space-y-2 max-h-[85vh] overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-300">
              
              {/* Header Label inside Menu */}
              <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-slate-200/80 dark:border-dark-border text-[11px] font-extrabold text-slate-400 dark:text-dark-text/50 uppercase tracking-widest">
                <span>Navigation Menu</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-dark-muted text-brand-blue dark:text-gold-accent text-[10px] font-black border border-slate-200 dark:border-dark-border">
                  <Sparkles size={10} /> Active View
                </span>
              </div>

              {/* Home */}
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass('/')}
              >
                <span className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 ${isActiveRoute('/') ? 'bg-brand-blue text-white dark:bg-gold-accent dark:text-dark-card shadow-xs' : 'bg-slate-100 dark:bg-dark-muted text-slate-500 dark:text-dark-text/60 group-hover:text-brand-blue dark:group-hover:text-gold-accent'}`}>
                    <Home size={17} />
                  </div>
                  Home
                </span>
                {isActiveRoute('/') ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-blue text-white dark:bg-gold-accent dark:text-dark-card text-[10px] font-black uppercase tracking-wider shadow-2xs">Active</span>
                ) : (
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-brand-blue dark:text-gold-accent" />
                )}
              </Link>

              {/* About Us */}
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass('/about')}
              >
                <span className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 ${isActiveRoute('/about') ? 'bg-brand-blue text-white dark:bg-gold-accent dark:text-dark-card shadow-xs' : 'bg-slate-100 dark:bg-dark-muted text-slate-500 dark:text-dark-text/60 group-hover:text-brand-blue dark:group-hover:text-gold-accent'}`}>
                    <Info size={17} />
                  </div>
                  About Us
                </span>
                {isActiveRoute('/about') ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-blue text-white dark:bg-gold-accent dark:text-dark-card text-[10px] font-black uppercase tracking-wider shadow-2xs">Active</span>
                ) : (
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-brand-blue dark:text-gold-accent" />
                )}
              </Link>

              {/* Product Gallery */}
              <Link
                to="/products?category=All"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass('/products')}
              >
                <span className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 ${isActiveRoute('/products') ? 'bg-brand-blue text-white dark:bg-gold-accent dark:text-dark-card shadow-xs' : 'bg-slate-100 dark:bg-dark-muted text-slate-500 dark:text-dark-text/60 group-hover:text-brand-blue dark:group-hover:text-gold-accent'}`}>
                    <Package size={17} />
                  </div>
                  Product Gallery
                </span>
                {isActiveRoute('/products') ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-blue text-white dark:bg-gold-accent dark:text-dark-card text-[10px] font-black uppercase tracking-wider shadow-2xs">Active</span>
                ) : (
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-brand-blue dark:text-gold-accent" />
                )}
              </Link>

              {/* Business Areas Collapsible Section */}
              <div className="py-1">
                <button
                  onClick={() => setBusinessAreasOpen(!businessAreasOpen)}
                  className={`w-full flex items-center justify-between min-h-[48px] px-3.5 py-2.5 rounded-xl text-sm transition-all duration-300 group ${isBusinessAreasActive
                    ? 'font-extrabold text-brand-blue dark:text-gold-accent bg-slate-100/90 dark:bg-dark-muted/90 border-l-4 border-brand-blue dark:border-gold-accent shadow-xs'
                    : 'font-bold text-slate-700 dark:text-dark-text/90 hover:bg-slate-100 dark:hover:bg-dark-muted hover:text-brand-blue dark:hover:text-gold-accent hover:translate-x-1.5'
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 ${isBusinessAreasActive ? 'bg-brand-blue text-white dark:bg-gold-accent dark:text-dark-card shadow-xs' : 'bg-slate-100 dark:bg-dark-muted text-slate-500 dark:text-dark-text/60 group-hover:text-brand-blue dark:group-hover:text-gold-accent'}`}>
                      <Briefcase size={17} />
                    </div>
                    Business Areas
                  </span>
                  <div className="flex items-center gap-2">
                    {isBusinessAreasActive && (
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-blue/20 dark:bg-gold-accent/30 text-brand-blue dark:text-gold-accent text-[10px] font-black uppercase">Active Hub</span>
                    )}
                    <ChevronDown size={18} className={`transition-transform duration-300 ${businessAreasOpen ? 'rotate-180 text-brand-blue dark:text-gold-accent' : 'text-slate-400'}`} />
                  </div>
                </button>

                {/* Sub-Items */}
                {(businessAreasOpen || isBusinessAreasActive) && (
                  <div className="pl-4 pr-2 py-2 space-y-1.5 mt-1.5 bg-slate-50 dark:bg-dark-muted/50 rounded-xl border border-slate-200/60 dark:border-dark-border">
                    <Link
                      to="/agro-processing"
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileSubLinkClass('/agro-processing')}
                    >
                      <span className="flex items-center gap-2.5">
                        <Factory size={15} /> Agro-Processing
                      </span>
                      {location.pathname === '/agro-processing' ? (
                        <ChevronRight size={14} className="text-brand-blue dark:text-gold-accent" />
                      ) : (
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-brand-blue dark:text-gold-accent" />
                      )}
                    </Link>

                    <Link
                      to="/export-distribution"
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileSubLinkClass('/export-distribution')}
                    >
                      <span className="flex items-center gap-2.5">
                        <Globe size={15} /> Export & Distribution
                      </span>
                      {location.pathname === '/export-distribution' ? (
                        <ChevronRight size={14} className="text-brand-blue dark:text-gold-accent" />
                      ) : (
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-brand-blue dark:text-gold-accent" />
                      )}
                    </Link>

                    <Link
                      to="/global-markets"
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileSubLinkClass('/global-markets')}
                    >
                      <span className="flex items-center gap-2.5">
                        <TrendingUp size={15} /> Global Markets
                      </span>
                      {location.pathname === '/global-markets' ? (
                        <ChevronRight size={14} className="text-brand-blue dark:text-gold-accent" />
                      ) : (
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-brand-blue dark:text-gold-accent" />
                      )}
                    </Link>

                    <Link
                      to="/insights"
                      onClick={() => setMobileMenuOpen(false)}
                      className={mobileSubLinkClass('/insights')}
                    >
                      <span className="flex items-center gap-2.5">
                        <Newspaper size={15} /> Insights & News
                      </span>
                      {location.pathname === '/insights' ? (
                        <ChevronRight size={14} className="text-brand-blue dark:text-gold-accent" />
                      ) : (
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-brand-blue dark:text-gold-accent" />
                      )}
                    </Link>
                  </div>
                )}
              </div>

              {/* Member Network & Benefits */}
              <Link
                to="/suppliers"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass('/suppliers')}
              >
                <span className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 ${isActiveRoute('/suppliers') ? 'bg-brand-blue text-white dark:bg-gold-accent dark:text-dark-card shadow-xs' : 'bg-slate-100 dark:bg-dark-muted text-slate-500 dark:text-dark-text/60 group-hover:text-brand-blue dark:group-hover:text-gold-accent'}`}>
                    <Users size={17} />
                  </div>
                  Member Network & Benefits
                </span>
                {isActiveRoute('/suppliers') ? (
                  <span className="px-2.5 py-1 rounded-full bg-brand-blue text-white dark:bg-gold-accent dark:text-dark-card text-[10px] font-black uppercase tracking-wider shadow-2xs">Active</span>
                ) : (
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-brand-blue dark:text-gold-accent" />
                )}
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass('/contact')}
              >
                <span className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 ${isActiveRoute('/contact') ? 'bg-brand-blue text-white dark:bg-gold-accent dark:text-dark-card shadow-xs' : 'bg-slate-100 dark:bg-dark-muted text-slate-500 dark:text-dark-text/60 group-hover:text-brand-blue dark:group-hover:text-gold-accent'}`}>
                    <Mail size={17} />
                  </div>
                  Contact
                </span>
                {isActiveRoute('/contact') ? (
                  <span className="px-2.5 py-1 rounded-full bg-brand-blue text-white dark:bg-gold-accent dark:text-dark-card text-[10px] font-black uppercase tracking-wider shadow-2xs">Active</span>
                ) : (
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-brand-blue dark:text-gold-accent" />
                )}
              </Link>

            </div>
          )}
        </div>
      </header>

      {/* Spacer to prevent content from hiding under the fixed header when it's NOT a hero page */}
      {!isHeroPage && (
        <div className="h-[104px] w-full bg-transparent"></div>
      )}
    </>
  );
};

export default Header;
