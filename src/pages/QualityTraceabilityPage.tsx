import React, { useState } from 'react';
import { useCompany } from '../context/CompanyContext';
import { useDatabase } from '../context/DatabaseContext';
import { ArticleItem } from '../types';
import InsightDetailModal from '../components/insights/InsightDetailModal';
import { Award, ShieldCheck, Newspaper, Clock, ArrowRight } from 'lucide-react';

const QualityTraceabilityPage: React.FC = () => {
  const { config } = useCompany();
  const { certifications, articles } = useDatabase();
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const qualityArticles = articles.filter(a => a.category === 'Export Compliance');

  return (
    <div className="bg-cream-bg dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Hero Header */}
      <section className="bg-brand-navy text-white pt-28 pb-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center max-w-4xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-coral/20 border border-brand-coral/40 text-brand-coral text-xs font-bold uppercase tracking-wider mb-5">
            <ShieldCheck className="w-4 h-4" /> Trust & Compliance Assurance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-5 leading-tight tracking-tight">
            Quality You Can Trust, <br />
            <span className="text-brand-coral">Certified Standards</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed max-w-3xl mx-auto">
            Every shipment leaving our facility undergoes rigorous quality control, laboratory testing, and sanitation compliance — guaranteeing food safety, purity, and origin integrity.
          </p>
        </div>
      </section>

      {/* Quality Control Pillars */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-brand-coral uppercase mb-2 block">
              Operational Standards
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-forest-dark dark:text-white">
              Our 6 Quality Assurance Protocols
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Supplier Audit & Verification", desc: "Sourcing strictly from registered farming clusters with recorded agronomic practices." },
              { title: "Raw Material Laboratory Sampling", desc: "Testing moisture levels, foreign matter percentages, and pesticide residues prior to processing." },
              { title: "Hygienic Processing Controls", desc: "Food-grade stainless steel equipment, automated dust suppression, and worker sanitation protocols." },
              { title: "Microbial & Heavy Metal Assays", desc: "Batch sampling certified clear of salmonella, aflatoxins (<4ppb), e-coli, and heavy metals." },
              { title: "Nitrogen Flush Packaging", desc: "Protecting product freshness, shelf life, and preventing pest contamination during shipping." },
              { title: "Phytosanitary Export Inspection", desc: "Final verification and certification by Ministry of Food & Agriculture regulatory officers." }
            ].map((pillar, i) => (
              <div key={i} className="p-6 bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-dark-border shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-brand-blue text-white font-heading font-bold flex items-center justify-center mb-4 text-sm">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-heading font-bold text-forest-dark dark:text-white mb-2">{pillar.title}</h3>
                <p className="text-xs text-charcoal/70 dark:text-dark-text/70 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-12 bg-white dark:bg-dark-card border-t border-cream-muted dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold tracking-widest text-brand-coral uppercase mb-2 block">
              Verified Compliance
            </span>
            <h2 className="text-3xl font-heading font-bold text-forest-dark dark:text-white mb-3">
              Certifications & Standards
            </h2>
            <p className="text-sm text-charcoal/80 dark:text-dark-text/80 max-w-2xl">
              We operate under strict truth standards. All published certifications reflect verified operational compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {certifications.filter(c => c.status === 'ACTIVE').map((cert: any) => (
              <div key={cert.id} className="p-6 rounded-2xl bg-brand-sky dark:bg-dark-muted border border-brand-blue/10 dark:border-dark-border flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-heading font-bold text-forest-dark dark:text-white mb-1">{cert.title}</h4>
                  <p className="text-xs text-charcoal/60 dark:text-dark-text/60 mb-3">{cert.issuingBody}</p>
                  <p className="text-xs font-mono text-brand-blue dark:text-brand-coral bg-white dark:bg-dark-card p-2 rounded border border-cream-muted dark:border-dark-border">
                    No: {cert.certificateNumber}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-cream-muted dark:border-dark-border text-[11px] text-charcoal/60 dark:text-dark-text/60 flex justify-between font-medium">
                  <span>Issued: {cert.issueDate}</span>
                  <span>Valid: {cert.expiryDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real News & Quality Insights Sub-session */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-coral/10 text-brand-coral text-xs font-bold uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5" /> Compliance & Quality Sub-session News
            </div>
            <h2 className="text-3xl font-heading font-extrabold text-forest-dark dark:text-white">
              Food Safety & Phytosanitary Guidelines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {qualityArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => { setSelectedArticle(article); setIsModalOpen(true); }}
                className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-slate-200 dark:border-dark-border shadow-xs hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between group"
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
                    Read Quality Insight Report <ArrowRight className="w-3.5 h-3.5" />
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

export default QualityTraceabilityPage;
