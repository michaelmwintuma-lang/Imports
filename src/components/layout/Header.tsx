import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCompany } from '../../context/CompanyContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Menu, X, Sun, Moon, ChevronDown, ArrowRight,
  Wheat, Layers, Sprout, Nut, Flame, Coffee, Droplets, Package, Grid, ShieldCheck
} from 'lucide-react';

const Header: React.FC = () => {
  const { config } = useCompany();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
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

  const productCategories = [
    {
      title: "Fresh Agricultural Produce",
      desc: "Yam, Cassava, Plantain, Cocoyam, Ginger, Chili, Mango, Pineapple",
      category: "Staple Food Products",
      icon: <Wheat className="w-5 h-5" />
    },
    {
      title: "Processed Food Products",
      desc: "Premium Gari, HQCF, Cassava Flour, Plantain Flour, Yam Flour, Chips",
      category: "Processed Cassava Products",
      icon: <Layers className="w-5 h-5" />
    },
    {
      title: "Grains, Beans & Legumes",
      desc: "Local Rice, Yellow/White Maize, Cowpeas, Soybeans, Millet, Sorghum",
      category: "Grains, Beans & Legumes",
      icon: <Sprout className="w-5 h-5" />
    },
    {
      title: "Nuts & Natural Products",
      desc: "Raw & Processed Cashew Nuts, Groundnuts, Coconut Commodities",
      category: "Nuts & Seeds",
      icon: <Nut className="w-5 h-5" />
    },
    {
      title: "Spices & Seasonings",
      desc: "Dried Chili, Ginger, Prekese, Grains of Selim (Hwentia), Dawadawa",
      category: "Spices & Seasonings",
      icon: <Flame className="w-5 h-5" />
    },
    {
      title: "Cocoa & Coffee Products",
      desc: "Raw Cocoa Beans, Cocoa Powder, Cocoa Butter, Chocolate, Coffee",
      category: "Cocoa & Coffee Products",
      icon: <Coffee className="w-5 h-5" />
    },
    {
      title: "Oils, Fats & Specialties",
      desc: "Red Palm Oil, Virgin Coconut Oil, Raw Shea Butter, Baobab, Moringa",
      category: "Oils & Fats",
      icon: <Droplets className="w-5 h-5" />
    },
    {
      title: "Agro-Processed Specialties",
      desc: "Shito Black Pepper Sauce, Tomato Paste, Fruit Jams, Ready Flour Mixes",
      category: "Agro-Processed Products",
      icon: <Package className="w-5 h-5" />
    }
  ];

  const isHeroPage = location.pathname === '/' || location.pathname === '/about';
  const isTransparent = isHeroPage && !isScrolled && !mobileMenuOpen;

  const headerBgClass = isTransparent
    ? 'bg-transparent'
    : 'bg-white dark:bg-dark-card shadow-[0_2px_20px_rgba(0,0,0,0.08)]';

  const textClass = isTransparent
    ? 'text-white'
    : 'text-charcoal dark:text-dark-text';

  const linkClass = (path: string) => `text-xs font-bold uppercase tracking-widest transition-all duration-300 ${location.pathname === path
      ? (isTransparent ? 'text-white border-b-2 border-gold-accent pb-1' : 'text-forest-main dark:text-gold-accent border-b-2 border-forest-main dark:border-gold-accent pb-1')
      : (isTransparent ? 'text-white/80 hover:text-white hover:-translate-y-0.5' : 'text-charcoal/80 dark:text-dark-text/80 hover:text-forest-main dark:hover:text-gold-accent hover:-translate-y-0.5')
    }`;

  return (
    <>
      {/* Absolute Header to allow hero sections to flow underneath without layout shift */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerBgClass} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>

        <div className={`transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center gap-4">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 shrink-0">
                {config.logoUrl ? (
                  <img src={config.logoUrl} alt={config.companyName} className="h-10 w-auto object-contain" />
                ) : (
                  <div className="h-10 w-10 bg-forest-main text-white flex items-center justify-center rounded-lg font-heading font-bold text-xl shadow-md">
                    {config.companyName.charAt(0)}
                  </div>
                )}
                <span className={`font-heading font-extrabold text-base md:text-xl tracking-tight transition-colors ${isTransparent ? 'text-white' : 'text-forest-main dark:text-gold-accent'
                  }`}>
                  {config.companyName}
                </span>
              </Link>

              {/* Desktop Nav - Right Aligned */}
              <div className="hidden lg:flex items-center justify-end gap-8 flex-grow ml-auto">
                <nav className="flex items-center gap-7">
                  <Link to="/" className={linkClass('/')}>Home</Link>
                  <Link to="/about" className={linkClass('/about')}>About Us</Link>

                  <Link to="/products?category=All" className={linkClass('/products')}>Products</Link>
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
              <div className="flex items-center gap-2 lg:hidden">
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  className={`p-2 rounded-full transition-all ${isTransparent ? 'bg-white/10 text-white' : 'bg-cream-bg text-forest-main'
                    }`}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-2 transition-colors ${isTransparent ? 'text-white hover:text-white/80' : 'text-forest-main dark:text-gold-accent'
                    }`}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-card shadow-2xl border-t border-cream-muted dark:border-dark-border px-4 py-6 space-y-3 max-h-[85vh] overflow-y-auto">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal dark:text-dark-text border-b border-cream-muted dark:border-dark-border pb-3">Home</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal dark:text-dark-text border-b border-cream-muted dark:border-dark-border pb-3">About Us</Link>

              <Link to="/products?category=All" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal dark:text-dark-text border-b border-cream-muted dark:border-dark-border pb-3">Products</Link>

              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold text-charcoal dark:text-dark-text border-b border-cream-muted dark:border-dark-border pb-3">Contact</Link>
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
