import React from 'react';
import { useCompany } from '../context/CompanyContext';

const ImportExportPage: React.FC = () => {
  const { config } = useCompany();

  return (
    <div className="bg-cream-bg dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Hero */}
      <section className="bg-forest-dark text-white py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-accent/20 border border-gold-accent/40 text-gold-light text-xs font-semibold uppercase tracking-wider mb-4">
            International Trade Capabilities
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-4">
            Import & Export <br />
            <span className="text-gold-accent">Global Trade Services</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl font-light leading-relaxed">
            Connecting premium Ghanaian agricultural commodities with international buyers in Europe, North America, Middle East, Asia, and West Africa, alongside vetted imports for Ghana.
          </p>
        </div>
      </section>

      {/* Export Process Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
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
              <div key={idx} className="p-6 bg-white dark:bg-dark-card rounded-2xl border border-cream-muted dark:border-dark-border shadow-sm flex flex-col md:flex-row items-start md:items-center gap-5">
                <div className="w-10 h-10 rounded-xl bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark font-heading font-extrabold flex items-center justify-center text-sm shrink-0">
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

      {/* Import Section */}
      <section className="py-12 bg-white dark:bg-dark-card border-y border-cream-muted dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
                Inbound Logistics
              </span>
              <h2 className="text-3xl font-heading font-bold text-forest-dark dark:text-white mb-4">
                Sourcing & Importation for Ghana
              </h2>
              <p className="text-sm text-charcoal/80 dark:text-dark-text/80 leading-relaxed mb-4">
                In addition to exporting Ghanaian produce, <strong>{config.companyName}</strong> imports select food products, raw ingredients, and agricultural inputs to serve domestic wholesalers, retailers, and food manufacturers across Ghana.
              </p>
              <div className="space-y-3 text-xs text-charcoal/80 dark:text-dark-text/80">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-forest-main/10 dark:bg-gold-accent/20 text-forest-main dark:text-gold-accent flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <p>Strict supplier verification to prevent sub-standard food imports.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-forest-main/10 dark:bg-gold-accent/20 text-forest-main dark:text-gold-accent flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <p>Full port clearance, FDA Ghana registration compliance, and warehousing.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-forest-main/10 dark:bg-gold-accent/20 text-forest-main dark:text-gold-accent flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <p>Efficient local wholesale distribution networks throughout Ghana.</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-forest-dark text-white border border-white/10 shadow-editorial">
              <h3 className="text-2xl font-heading font-bold text-white mb-3">Export Destinations & Markets</h3>
              <p className="text-xs text-white/80 leading-relaxed mb-5">
                We serve international importers, Asian ingredient buyers, European African specialty food distributors, and North American ethnic food chains.
              </p>
              <div className="flex flex-wrap gap-2">
                {config.exportMarkets.map((market: string, idx: number) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full bg-gold-accent/20 border border-gold-accent/30 text-gold-light text-xs font-medium">
                    {market}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImportExportPage;
