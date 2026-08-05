import React from 'react';
import { useCompany } from '../context/CompanyContext';
import { Cog, ArrowRight, Check } from 'lucide-react';

const AgroProcessingPage: React.FC = () => {
  const { config } = useCompany();

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
      <section className="bg-forest-dark text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-accent/20 border border-gold-accent/40 text-gold-light text-xs font-semibold uppercase tracking-wider mb-4">
            Agro-Processing & Value Addition
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-4">
            Adding Value To <br />
            <span className="text-gold-accent">Ghana's Agriculture</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl font-light leading-relaxed">
            Transforming raw Ghanaian harvests into market-ready, food-grade ingredients, flours, dried chips, and starches meeting strict global import standards.
          </p>
        </div>
      </section>

      {/* 8-Step Pipeline */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
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
              <div key={idx} className="p-6 bg-white dark:bg-dark-card rounded-2xl border border-cream-muted dark:border-dark-border shadow-sm hover:shadow-editorial transition-all group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-heading font-extrabold text-gold-accent">{s.num}</span>
                  <div className="w-8 h-8 rounded-full bg-forest-main/10 dark:bg-gold-accent/20 text-forest-main dark:text-gold-accent flex items-center justify-center group-hover:bg-forest-main group-hover:text-white transition-colors">
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
                <div className="w-10 h-10 rounded-xl bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark flex items-center justify-center mb-4">
                  <Cog className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-heading font-bold text-forest-dark dark:text-white mb-2">{cap}</h3>
                <p className="text-xs text-charcoal/70 dark:text-dark-text/70 leading-relaxed mb-4">
                  Executed under strict sanitation protocols, adhering to international HACCP & ISO guidelines.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-forest-main dark:text-gold-accent">
                  <Check className="w-4 h-4 text-gold-accent" /> Available Upon Request
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Operations Preview */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-forest-dark text-white rounded-3xl p-6 md:p-12 overflow-hidden relative border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest text-gold-accent uppercase mb-2 block">
                  Processing Infrastructure
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Inside Our Agro-Processing Operations
                </h2>
                <p className="text-sm text-white/80 leading-relaxed mb-5">
                  Equipped with food-grade stainless steel milling circuits, flash dryers, automated vacuum packaging machines, and climate-controlled storage zones to safeguard freshness.
                </p>
                <ul className="space-y-2.5 text-xs text-white/90 mb-6">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-gold-accent" /> Stainless Steel 304 Contact Surfaces
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-gold-accent" /> Automated Dust Suppression & Particle Control
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-gold-accent" /> In-House Quality Assurance Laboratory
                  </li>
                </ul>
              </div>

              <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/agro-processing-factory.jpg"
                  alt="Agro-processing Machinery"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgroProcessingPage;
