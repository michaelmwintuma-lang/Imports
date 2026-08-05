import React, { useState } from 'react';
import { useCompany } from '../context/CompanyContext';
import { Building2, ShoppingBag, Truck, FileCheck, ArrowRight } from 'lucide-react';
import RFQWizardModal from '../components/products/RFQWizardModal';

const GlobalMarketsPage: React.FC = () => {
  const { config } = useCompany();
  const [selectedRegion, setSelectedRegion] = useState('Europe');
  const [isRFQOpen, setIsRFQOpen] = useState(false);

  const regionDetails: Record<string, { desc: string; demand: string[]; ports: string }> = {
    'Europe': {
      desc: 'Europe is Ghana\'s primary market for premium agricultural exports. High demand for organic produce, raw cocoa, fresh tropical fruits, and ethically sourced shea butter.',
      demand: ['Raw Cocoa & Derivatives', 'Fresh Pineapples & Mangoes', 'Cashew Nuts', 'Shea Butter', 'Yams'],
      ports: 'Rotterdam, Hamburg, Antwerp, Felixstowe, Le Havre'
    },
    'North America': {
      desc: 'A rapidly growing market driven by health-conscious consumers and the African diaspora. Key imports include ethnic food staples, premium cocoa products, and shea butter.',
      demand: ['Shea Butter', 'Yam Tubers', 'Gari & Plantain Flour', 'Spices (Shito, Pepper)', 'Cocoa Powder'],
      ports: 'New York / New Jersey, Houston, Savannah, Toronto, Montreal'
    },
    'Middle East': {
      desc: 'An emerging market for Ghanaian fresh produce, nuts, and spices. Focus on bulk agricultural commodities, halal-certified processed foods, and grains.',
      demand: ['Fresh Fruits', 'Cashew Nuts', 'Spices & Pepper', 'Cassava Starch', 'Grains'],
      ports: 'Jebel Ali (Dubai), Jeddah, Hamad Port, Salalah'
    },
    'West Africa & Africa': {
      desc: 'Leveraging ECOWAS and AfCFTA frameworks, intra-African trade focuses on food security staples, processed ingredients, and regional cash crops.',
      demand: ['Palm Oil', 'Maize & Soybeans', 'Processed Cassava (Gari)', 'Salt', 'Beverages & Bitters'],
      ports: 'Lagos (Apapa/Tin Can), Abidjan, Tema, Dakar, Mombasa'
    },
    'Asia': {
      desc: 'Asia represents a massive industrial and raw commodity market. Huge demand for raw nuts for processing, industrial starches, and cocoa.',
      demand: ['Raw Cashew Nuts', 'Industrial Cassava Chips', 'Cocoa Beans', 'Shea Nuts', 'Sesame Seeds'],
      ports: 'Shanghai, Ningbo-Zhoushan, Singapore, Ho Chi Minh City, Nhava Sheva'
    }
  };

  return (
    <div className="bg-cream-bg dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Hero */}
      <section className="bg-forest-dark text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-accent/20 border border-gold-accent/40 text-gold-light text-xs font-semibold uppercase tracking-wider mb-4">
            Global Trade Operations
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-4">
            From Ghana To <br />
            <span className="text-gold-accent">The World</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl font-light leading-relaxed">
            Delivering quality-checked Ghanaian agricultural produce to international importers, supermarkets, food manufacturers, and wholesale distributors worldwide.
          </p>
        </div>
      </section>

      {/* Regional Explorer */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
              Market Footprint
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-forest-dark dark:text-white">
              Target & Served Trade Regions
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.keys(regionDetails).map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-5 py-2.5 rounded-full text-xs font-heading font-semibold transition-all ${selectedRegion === reg
                  ? 'bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark shadow-md'
                  : 'bg-white dark:bg-dark-card text-charcoal/80 dark:text-dark-text border border-cream-muted dark:border-dark-border hover:border-forest-main/50'
                  }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Active Region Card */}
          <div className="bg-white dark:bg-dark-card rounded-3xl p-6 md:p-10 border border-cream-muted dark:border-dark-border shadow-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold text-gold-dark dark:text-gold-accent uppercase tracking-wider block mb-2">Region Focus</span>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-forest-dark dark:text-white mb-3">{selectedRegion}</h3>
                <p className="text-sm text-charcoal/80 dark:text-dark-text/80 leading-relaxed mb-5">
                  {regionDetails[selectedRegion].desc}
                </p>

                <div className="mb-5">
                  <span className="text-xs font-bold text-charcoal/60 dark:text-dark-text/60 uppercase block mb-2">Key Demanded Commodities</span>
                  <div className="flex flex-wrap gap-2">
                    {regionDetails[selectedRegion].demand.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-cream-bg dark:bg-dark-muted border border-cream-muted dark:border-dark-border text-xs font-semibold text-forest-dark dark:text-gold-accent">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-forest-main/5 dark:bg-gold-accent/10 border border-forest-main/10 dark:border-gold-accent/20 text-xs">
                  <span className="font-bold text-forest-dark dark:text-gold-accent block mb-1">Common Shipping Ports:</span>
                  <span className="text-charcoal/80 dark:text-dark-text/80">{regionDetails[selectedRegion].ports}</span>
                </div>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-forest-dark text-white border border-white/10">
                <h4 className="text-xl font-heading font-bold text-white mb-2">International Buyer Services</h4>
                <p className="text-xs text-white/80 leading-relaxed mb-5">
                  We customize container stuffing, product moisture content, mesh sizes, and packaging branding to align with your country's food import regulations.
                </p>
                <button
                  onClick={() => setIsRFQOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-gold-accent text-forest-dark font-heading font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center justify-center gap-2"
                >
                  Request Regional Quotation <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buyer Centre Section */}
      <section className="py-12 bg-white dark:bg-dark-card border-t border-cream-muted dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
              Dedicated Portal
            </span>
            <h2 className="text-3xl font-heading font-bold text-forest-dark dark:text-white">
              International Buyer Centre
            </h2>
            <p className="text-charcoal/70 dark:text-dark-text/70 mt-2 text-sm">
              Designed specifically for commercial food buyers, importers, and supply chain directors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { icon: Building2, title: "Food Importers", desc: "Bulk agricultural commodities with certified Incoterms & ocean shipping documentation." },
              { icon: ShoppingBag, title: "Supermarket Chains", desc: "Pre-packaged, retail-ready Ghanaian food products with private label capabilities." },
              { icon: Truck, title: "Wholesalers", desc: "Palletized and containerized supply for regional food hubs and ethnic markets." },
              { icon: FileCheck, title: "Manufacturers", desc: "High-purity industrial starches, flours, and raw processing ingredients." }
            ].map((card, i) => (
              <div key={i} className="p-6 bg-cream-bg dark:bg-dark-muted rounded-2xl border border-cream-muted dark:border-dark-border text-center hover:border-forest-main/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark mx-auto flex items-center justify-center mb-3">
                  <card.icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-heading font-bold text-forest-dark dark:text-white mb-2">{card.title}</h4>
                <p className="text-xs text-charcoal/70 dark:text-dark-text/70 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RFQ Modal */}
      {isRFQOpen && <RFQWizardModal isOpen={isRFQOpen} onClose={() => setIsRFQOpen(false)} />}
    </div>
  );
};

export default GlobalMarketsPage;
