import React, { useState } from 'react';
import { useCompany } from '../context/CompanyContext';
import { useDatabase } from '../context/DatabaseContext';
import { ArticleItem } from '../types';
import InsightDetailModal from '../components/insights/InsightDetailModal';
import { Globe, ArrowRight, ShieldCheck, Newspaper, Clock } from 'lucide-react';

const ImportExportPage: React.FC = () => {
  const { config } = useCompany();
  const { articles } = useDatabase();
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const tradeArticles = articles.filter(a => a.category === 'Export Compliance' || a.category === 'Market Trends');

  return (
    <div className="bg-cream-bg dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Hero */}
      <section className="bg-brand-navy text-white pt-28 pb-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center max-w-4xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-coral/20 border border-brand-coral/40 text-brand-coral text-xs font-bold uppercase tracking-wider mb-5">
            <Globe className="w-4 h-4" /> Global Trade & Logistics
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-5 leading-tight tracking-tight">
            Import & Export <br />
            <span className="text-brand-coral">Global Trade Services</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed max-w-3xl mx-auto">
            Connecting premium Ghanaian agricultural commodities with international buyers in Europe, North America, Middle East, Asia, and West Africa, alongside vetted imports for Ghana.
          </p>
        </div>
      </section>

      {/* Export Process Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold tracking-widest text-brand-coral uppercase mb-2 block">
              Outbound Logistics
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-forest-dark dark:text-white mb-3">
              Our Export Operations Pipeline
            </h2>
            <p className="text-sm text-charcoal/80 dark:text-dark-text/80">
              We manage the entire export journey from farm-gate sourcing to port freight forwarding, ensuring hassle-free clearance for international importers.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { step: "01", title: "Buyer Product Specification & Contract", desc: "We define precise grade, moisture level, particle mesh, packaging type, and target port Incoterms (FOB Tema/Takoradi or CIF)." },
              { step: "02", title: "Harvest & Quality Verification", desc: "Raw materials are collected, inspected, and laboratory tested to ensure zero aflatoxins, contaminants, or pesticides." },
              { step: "03", title: "Agro-Processing & Packaging", desc: "Products are cleaned, dried, milled, or vacuum packaged in export-grade Kraft paper sacks, polypropylene woven bags, or jumbo totes." },
              { step: "04", title: "Export Documentation & Certifications", desc: "Issuance of Phytosanitary Certificates, Certificates of Origin, Certificate of Analysis (CoA), and Bill of Lading." },
              { step: "05", title: "Containerization & Port Dispatch", desc: "FCL (Full Container Load) or LCL consolidation, container stuffing, moisture absorber placement, and vessel departure." }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-dark-border shadow-xs flex flex-col md:flex-row items-start md:items-center gap-5">
                <div className="w-10 h-10 rounded-xl bg-brand-blue text-white font-heading font-extrabold flex items-center justify-center text-sm shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-bold text-forest-dark dark:text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-charcoal/70 dark:text-dark-text/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real News & Trade Insights Sub-session */}
      <section className="py-16 bg-white dark:bg-dark-card border-t border-cream-muted dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-coral/10 text-brand-coral text-xs font-bold uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5" /> Export Compliance & Market Insights
            </div>
            <h2 className="text-3xl font-heading font-extrabold text-forest-dark dark:text-white">
              International Trade & Phytosanitary Reports
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tradeArticles.map((article) => (
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
                  <h3 className="text-lg font-heading font-extrabold text-forest-dark dark:text-white mb-2 group-hover:text-brand-coral transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 dark:text-dark-text/70 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-cream-muted dark:border-dark-border flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-blue dark:text-brand-coral group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Export Compliance Insight <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insight Detail Modal */}
      <InsightDetailModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ImportExportPage;
