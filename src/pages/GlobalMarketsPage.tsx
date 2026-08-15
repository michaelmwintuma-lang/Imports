import React, { useState } from 'react';
import { useCompany } from '../context/CompanyContext';
import { useDatabase } from '../context/DatabaseContext';
import { ArticleItem } from '../types';
import InsightDetailModal from '../components/insights/InsightDetailModal';
import { Building2, ShoppingBag, Truck, FileCheck, ArrowRight, Globe, Newspaper, Clock } from 'lucide-react';
import RFQWizardModal from '../components/products/RFQWizardModal';

const GlobalMarketsPage: React.FC = () => {
  const { config } = useCompany();
  const { articles } = useDatabase();
  const [selectedRegion, setSelectedRegion] = useState('Europe');
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const marketArticles = articles.filter(a => a.category === 'Market Trends');

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
      <section className="bg-brand-navy text-white pt-28 pb-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center max-w-4xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-coral/20 border border-brand-coral/40 text-brand-coral text-xs font-bold uppercase tracking-wider mb-5">
            <Globe className="w-4 h-4" /> Global Trade Operations
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-5 leading-tight tracking-tight">
            From Ghana To <br />
            <span className="text-brand-coral">Global Markets</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed max-w-3xl mx-auto">
            Delivering quality-checked Ghanaian agricultural produce to international importers, supermarkets, food manufacturers, and wholesale distributors worldwide.
          </p>
        </div>
      </section>

      {/* Regional Explorer */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-brand-coral uppercase mb-2 block">
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
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-white dark:bg-dark-card text-charcoal/80 dark:text-dark-text border border-cream-muted dark:border-dark-border hover:border-brand-blue/50'
                  }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Active Region Card */}
          <div className="bg-white dark:bg-dark-card rounded-3xl p-6 md:p-10 border border-cream-muted dark:border-dark-border shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold text-brand-coral uppercase tracking-wider block mb-2">Region Focus</span>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-forest-dark dark:text-white mb-3">{selectedRegion}</h3>
                <p className="text-sm text-charcoal/80 dark:text-dark-text/80 leading-relaxed mb-5">
                  {regionDetails[selectedRegion].desc}
                </p>

                <div className="mb-5">
                  <span className="text-xs font-bold text-charcoal/60 dark:text-dark-text/60 uppercase block mb-2">Key Demanded Commodities</span>
                  <div className="flex flex-wrap gap-2">
                    {regionDetails[selectedRegion].demand.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-brand-sky dark:bg-dark-muted border border-brand-blue/10 dark:border-dark-border text-xs font-bold text-brand-blue dark:text-brand-coral">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-sky dark:bg-dark-muted border border-brand-blue/10 dark:border-dark-border text-xs">
                  <span className="font-bold text-brand-blue dark:text-brand-coral block mb-1">Common Shipping Ports:</span>
                  <span className="text-charcoal/80 dark:text-dark-text/80">{regionDetails[selectedRegion].ports}</span>
                </div>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-brand-navy text-white border border-white/10 shadow-xl">
                <h4 className="text-xl font-heading font-bold text-white mb-2">International Buyer Services</h4>
                <p className="text-xs text-white/80 leading-relaxed mb-5">
                  We customize container stuffing, product moisture content, mesh sizes, and packaging branding to align with your country's food import regulations.
                </p>
                <button
                  onClick={() => setIsRFQOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-brand-coral hover:bg-brand-peach text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  Request Regional Quotation <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real News & Market Intelligence Sub-session */}
      <section className="py-16 bg-white dark:bg-dark-card border-t border-cream-muted dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-coral/10 text-brand-coral text-xs font-bold uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5" /> Market News & Global Intelligence
            </div>
            <h2 className="text-3xl font-heading font-extrabold text-forest-dark dark:text-white">
              Global Demand Reports & Commodity Trends
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => { setSelectedArticle(article); setIsModalOpen(true); }}
                className="bg-slate-50 dark:bg-dark-muted rounded-2xl p-6 border border-slate-200 dark:border-dark-border shadow-xs hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-charcoal/60 dark:text-dark-text/60 mb-3">
                    <span className="px-2.5 py-0.5 bg-brand-blue text-white font-bold rounded-md">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-coral" /> {article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-heading font-extrabold text-forest-dark dark:text-white mb-2 group-hover:text-brand-blue transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 dark:text-dark-text/70 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-cream-muted dark:border-dark-border flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-blue dark:text-brand-coral group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Market Intelligence Report <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insight Reader Modal */}
      <InsightDetailModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* RFQ Modal */}
      {isRFQOpen && <RFQWizardModal isOpen={isRFQOpen} onClose={() => setIsRFQOpen(false)} />}
    </div>
  );
};

export default GlobalMarketsPage;
