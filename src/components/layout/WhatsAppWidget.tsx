import React, { useState, useEffect } from 'react';
import { useCompany } from '../../context/CompanyContext';
import { ArrowUp } from 'lucide-react';

const WhatsAppWidget: React.FC = () => {
  const { config } = useCompany();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Format phone number for WhatsApp wa.me link
  const formattedNumber = config.whatsApp.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(config.whatsAppPreFilledMsg);
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* SCROLL TO TOP BUTTON (White circle with green arrow) */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`w-11 h-11 rounded-full bg-white text-forest-main border border-cream-muted shadow-md flex items-center justify-center transition-all duration-300 hover:bg-forest-main hover:text-white hover:scale-110 active:scale-95 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>

      {/* OFFICIAL WHATSAPP FLOATING BUTTON */}
      <div className="relative group">
        {/* Animated Ping Aura behind the button */}
        <span className="absolute inset-0 rounded-2xl bg-[#25D366]/40 animate-ping pointer-events-none"></span>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-[#128C7E]/20 animate-ring relative z-10"
          aria-label="Chat with us on WhatsApp"
        >
          {/* Authentic Official WhatsApp SVG Logo */}
          <svg 
            viewBox="0 0 32 32" 
            className="w-9 h-9 fill-white drop-shadow-md" 
            aria-hidden="true"
          >
            <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 8.165-2.137c2.37 1.332 5.068 2.137 7.835 2.137 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.333c-2.454 0-4.856-0.655-6.96-1.9l-0.5-0.297-5.17 1.353 1.378-5.042-0.326-0.518c-1.365-2.174-2.089-4.686-2.089-7.263 0-7.534 6.133-13.667 13.667-13.667s13.667 6.133 13.667 13.667-6.133 13.667-13.667 13.667zM22.75 19.333c-0.37-0.185-2.19-1.08-2.528-1.203s-0.584-0.185-0.83 0.185c-0.247 0.37-0.957 1.203-1.173 1.45-0.216 0.247-0.432 0.278-0.802 0.093s-1.564-0.577-2.98-1.839c-1.102-0.983-1.847-2.197-2.063-2.567s-0.023-0.57 0.162-0.754c0.167-0.167 0.37-0.432 0.556-0.648s0.247-0.37 0.37-0.617c0.123-0.247 0.062-0.463-0.031-0.648s-0.83-2.003-1.14-2.744c-0.301-0.722-0.608-0.625-0.83-0.636s-0.457-0.012-0.704-0.012c-0.247 0-0.648 0.093-0.988 0.463s-1.296 1.265-1.296 3.086c0 1.821 1.327 3.58 1.512 3.827s2.611 3.988 6.327 5.593c0.884 0.382 1.574 0.61 2.113 0.781 0.888 0.282 1.696 0.242 2.334 0.147 0.712-0.106 2.19-0.895 2.5-1.759s0.309-1.605 0.216-1.759c-0.093-0.154-0.34-0.247-0.71-0.432z" />
          </svg>
        </a>

        {/* Hover Tooltip */}
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-forest-dark text-white text-xs font-bold py-2 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gold-accent/30">
          Chat on WhatsApp
        </span>
      </div>
    </div>
  );
};

export default WhatsAppWidget;
