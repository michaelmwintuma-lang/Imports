import React from 'react';
import { Leaf, ShieldCheck, Globe, TrendingUp } from 'lucide-react';

const IntroSection: React.FC = () => {
  const features = [
    {
      icon: <Leaf className="text-forest-main dark:text-gold-accent" size={32} />,
      title: "Sustainable Sourcing",
      description: "Direct partnerships with Ghanaian farming cooperatives ensuring ethical fair-gate trade practices and environmental stewardship."
    },
    {
      icon: <ShieldCheck className="text-forest-main dark:text-gold-accent" size={32} />,
      title: "Certified Quality Control",
      description: "FDA Ghana and phytosanitary certified laboratory testing, moisture screening, and export compliance on all shipments."
    },
    {
      icon: <Globe className="text-forest-main dark:text-gold-accent" size={32} />,
      title: "Global Distribution Reach",
      description: "Cold-chain logistics and sea/air freight management servicing ports across Europe, North America, Middle East, and West Africa."
    },
    {
      icon: <TrendingUp className="text-forest-main dark:text-gold-accent" size={32} />,
      title: "Industrial Agro-Processing",
      description: "Milling fresh raw crops into High Quality Cassava Flour (HQCF), starches, dried spices, and packaged food products."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-cream-bg dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="lg:w-1/2 space-y-5">
            <div className="inline-block px-3 py-1 rounded-full bg-forest-main/10 dark:bg-gold-accent/20 text-forest-main dark:text-gold-accent text-xs font-bold uppercase tracking-wider">
              Ghana Agricultural Trade Leader
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-forest-dark dark:text-white leading-tight">
              Rooted in Ghana, <br/>
              <span className="text-earth-green dark:text-gold-accent">Delivering Excellence Globally.</span>
            </h2>
            <p className="text-base text-charcoal/80 dark:text-dark-text/80 leading-relaxed">
              We aggregate, value-process, and export the finest agricultural products Ghana produces. By bridging local farm gates directly to international importers, we maintain a transparent, certified, and fully traceable supply chain.
            </p>
            <p className="text-base text-charcoal/80 dark:text-dark-text/80 leading-relaxed">
              From raw commodities like cocoa beans, cashews, and ginger to industrial products like cassava starch and plantain flour, we ensure strict export quality benchmarks at every stage.
            </p>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="rounded-2xl overflow-hidden shadow-editorial border border-cream-muted dark:border-dark-border">
              <img 
                src="/images/ghana-agro.jpg" 
                alt="Agricultural processing in Ghana" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200';
                }}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-card p-6 rounded-xl shadow-editorial-hover border border-cream-muted dark:border-dark-border hidden md:block">
              <div className="text-3xl font-heading font-bold text-gold-dark dark:text-gold-accent mb-1">100% Verified</div>
              <div className="text-xs font-semibold text-charcoal/70 dark:text-dark-text/70 uppercase tracking-wider">FDA & Phytosanitary Clearances</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card-editorial p-6">
              <div className="bg-cream-muted dark:bg-dark-muted w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-heading font-bold text-forest-dark dark:text-white mb-2">{feature.title}</h3>
              <p className="text-charcoal/70 dark:text-dark-text/70 text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IntroSection;
