import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const WhyGhanaSection: React.FC = () => {
  const points = [
    "Ideal Agro-Ecological Zones for Cocoa, Cashew, Yam, Plantain & Cassava",
    "Stable Trade & Democratic Governance Fostering International Commerce",
    "Strategic Maritime & Air Export Hub for European, US & Middle East Ports",
    "GEPA & Ministry of Trade Export Incentives for Value-Added Processing",
    "Skilled Agronomic Workforce & Established Smallholder Cooperatives",
    "Strict FDA Ghana & Phytosanitary International Compliance"
  ];

  return (
    <section className="py-12 md:py-16 bg-cream-card dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="lg:w-1/2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-editorial h-[420px] md:h-[500px] border border-cream-muted dark:border-dark-border">
              <img 
                src="/images/ghana-agro%201.jpg" 
                alt="Ghana Agriculture" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-3 py-1 bg-gold-accent text-forest-dark text-xs font-bold rounded-md mb-2 uppercase tracking-wider">
                  ORIGIN GHANA
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-1">Ghanaian Agriculture</h3>
                <p className="text-cream-muted/90 text-xs font-light">The West African Hub for Export Quality Produce</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
                Competitive Country Advantage
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-forest-dark dark:text-white leading-tight mb-4">
                Why Source & Trade <span className="text-earth-green dark:text-gold-accent">with Ghana?</span>
              </h2>
              <p className="text-sm md:text-base text-charcoal/80 dark:text-dark-text/80 leading-relaxed">
                Ghana is globally recognized for its superior agricultural output—particularly raw cocoa, cashews, non-traditional exports, plantain flour, and High Quality Cassava Flour. Ghana offers fertile soil, favorable tropical climate, and strict international phytosanitary governance.
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-3">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3 p-3.5 bg-white dark:bg-dark-card rounded-xl shadow-sm border border-cream-muted dark:border-dark-border hover:border-gold-accent transition-colors">
                  <CheckCircle2 className="text-gold-accent shrink-0 mt-0.5" size={20} />
                  <span className="font-medium text-xs md:text-sm text-charcoal/90 dark:text-dark-text">{point}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyGhanaSection;
