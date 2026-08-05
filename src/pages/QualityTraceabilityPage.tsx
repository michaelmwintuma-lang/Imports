import React from 'react';
import { useCompany } from '../context/CompanyContext';
import { useDatabase } from '../context/DatabaseContext';
import { Award } from 'lucide-react';

const QualityTraceabilityPage: React.FC = () => {
  const { config } = useCompany();
  const { certifications } = useDatabase();

  return (
    <div className="bg-cream-bg dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Hero Header */}
      <section className="bg-forest-dark text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-accent/20 border border-gold-accent/40 text-gold-light text-xs font-semibold uppercase tracking-wider mb-4">
            Trust & Compliance
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-4">
            Quality You Can Trust, <br />
            <span className="text-gold-accent">Certified Assurance</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl font-light leading-relaxed">
            Every shipment leaving our facility undergoes rigorous quality control, laboratory testing, and sanitation compliance — guaranteeing food safety, purity, and origin integrity.
          </p>
        </div>
      </section>

      {/* Quality Control Pillars */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
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
              <div key={i} className="p-6 bg-white dark:bg-dark-card rounded-2xl border border-cream-muted dark:border-dark-border shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark font-heading font-bold flex items-center justify-center mb-4 text-sm">
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
            <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
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
              <div key={cert.id} className="p-6 rounded-2xl bg-cream-bg dark:bg-dark-muted border border-cream-muted dark:border-dark-border flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark flex items-center justify-center mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-heading font-bold text-forest-dark dark:text-white mb-1">{cert.title}</h4>
                  <p className="text-xs text-charcoal/60 dark:text-dark-text/60 mb-3">{cert.issuingBody}</p>
                  <p className="text-xs font-mono text-charcoal/80 dark:text-dark-text/80 bg-white dark:bg-dark-card p-2 rounded border border-cream-muted dark:border-dark-border">
                    No: {cert.certificateNumber}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-cream-muted dark:border-dark-border text-[11px] text-charcoal/60 dark:text-dark-text/60 flex justify-between">
                  <span>Issued: {cert.issueDate}</span>
                  <span>Valid: {cert.expiryDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QualityTraceabilityPage;
