import React, { useState } from 'react';
import { useCompany } from '../context/CompanyContext';
import { useDatabase } from '../context/DatabaseContext';
import { ArticleItem } from '../types';
import InsightDetailModal from '../components/insights/InsightDetailModal';
import { Cog, ArrowRight, Check, Newspaper, Clock } from 'lucide-react';

const AgroProcessingPage: React.FC = () => {
  const { config } = useCompany();
  const { articles } = useDatabase();
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const agroArticles = articles.filter(a => a.category === 'Agro-Processing' || a.category === 'Market Trends');

  const steps = [
    { num: '01', title: 'SOURCE', desc: 'Direct farm gate procurement from audited farmer cooperatives across Ghana.' },
    { num: '02', title: 'INSPECT', desc: 'Rigorous moisture, pesticide residue, and raw material purity testing.' },
    { num: '03', title: 'CLEAN', desc: 'Multi-stage washing, peeling, and mechanical foreign matter separation.' },
    { num: '04', title: 'PROCESS', desc: 'Precision industrial drying, micro-milling, granulating, or vacuum frying.' },
    { num: '05', title: 'QUALITY CONTROL', desc: 'Laboratory batch sampling for particle size, purity, and microbial standards.' },
    { num: '06', title: 'PACKAGE', desc: 'Nitrogen-flushed vacuum sealed bags, 25kg Kraft paper sacks, or bulk jumbo totes.' },
    { num: '07', title: 'STORE', desc: 'Climate-controlled, palletized warehousing with pest-controlled monitoring.' },
    { num: '08', title: 'EXPORT', desc: 'Container loading, Phytosanitary certification, and global port dispatch.' },
  ];

  return (
    <div className="bg-cream-bg dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Hero */}
      <section className="bg-brand-navy text-white pt-28 pb-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center max-w-4xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-coral/20 border border-brand-coral/40 text-brand-coral text-xs font-bold uppercase tracking-wider mb-5">
            Agro-Processing & Value Addition
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-5 leading-tight tracking-tight">
            Adding Value To <br />
            <span className="text-brand-coral">Ghana's Harvests</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed max-w-3xl mx-auto">
            Transforming raw Ghanaian crops into market-ready, food-grade ingredients, flours, dried chips, and starches meeting strict international FDA standards.
          </p>
        </div>
      </section>

      {/* 8-Step Pipeline */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-brand-coral uppercase mb-2 block">
              Process Methodology
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-forest-dark dark:text-white">
              From Raw Harvest to Certified Product
            </h2>
            <p className="text-charcoal/70 dark:text-dark-text/70 mt-2 text-sm">
              Our 8-stage processing methodology ensures zero contamination, high nutrient preservation, and consistent shelf stability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, idx) => (
              <div key={idx} className="p-6 bg-white dark:bg-dark-card rounded-2xl border border-cream-muted dark:border-dark-border shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-heading font-extrabold text-brand-coral">{s.num}</span>
                  <div className="w-8 h-8 rounded-full bg-brand-sky dark:bg-dark-muted text-brand-blue dark:text-brand-coral flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-heading font-bold text-forest-dark dark:text-white mb-2">{s.title}</h3>
                <p className="text-xs text-charcoal/70 dark:text-dark-text/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processing Capabilities Cards */}
      <section className="py-12 bg-white dark:bg-dark-card border-y border-cream-muted dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-heading font-bold text-forest-dark dark:text-white mb-3">
              Our Processing Capabilities
            </h2>
            <p className="text-sm text-charcoal/80 dark:text-dark-text/80 max-w-2xl">
              We leverage modern machinery to customize particle size, moisture content, and packaging options based on buyer specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.processingCapabilities.map((cap: string, i: number) => (
              <div key={i} className="p-6 rounded-2xl bg-cream-bg dark:bg-dark-muted border border-cream-muted dark:border-dark-border">
                <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center mb-4">
                  <Cog className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-heading font-bold text-forest-dark dark:text-white mb-2">{cap}</h3>
                <p className="text-xs text-charcoal/70 dark:text-dark-text/70 leading-relaxed mb-4">
                  Executed under strict sanitation protocols, adhering to international HACCP & ISO guidelines.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue dark:text-brand-coral">
                  <Check className="w-4 h-4 text-brand-coral" /> Available Upon Request
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real News & Sub-session Insights */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-coral/10 text-brand-coral text-xs font-bold uppercase tracking-wider mb-2">
                <Newspaper className="w-3.5 h-3.5" /> Agro-Processing Insights & Sub-sessions
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-forest-dark dark:text-white">
                Technical Reports & Processing Innovations
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agroArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => { setSelectedArticle(article); setIsModalOpen(true); }}
                className="bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-dark-border p-6 shadow-xs hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-charcoal/60 dark:text-dark-text/60 mb-3">
                    <span className="px-2.5 py-0.5 bg-brand-sky dark:bg-dark-muted text-brand-blue font-bold rounded-md">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-coral" /> {article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-heading font-extrabold text-forest-dark dark:text-white mb-2 group-hover:text-brand-blue dark:group-hover:text-brand-coral transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 dark:text-dark-text/70 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-cream-muted dark:border-dark-border flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-blue dark:text-brand-coral group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Click for Full Technical Insight <ArrowRight className="w-3.5 h-3.5" />
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
    </div>
  );
};

export default AgroProcessingPage;
