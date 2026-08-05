import React from 'react';
import { useCompany } from '../context/CompanyContext';
import { Target, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { config } = useCompany();

  const corePrinciples = [
    {
      title: "Agro-Processing Excellence",
      desc: "Utilizing modern milling technologies, hygienic stainless-steel contact surfaces, and precision moisture testing to convert raw crops into export-grade flours, starches, and spices."
    },
    {
      title: "Export Trade Compliance",
      desc: "Strict adherence to Ministry of Food & Agriculture Phytosanitary protocols, FDA Ghana certifications, Aflatoxin testing (<4ppb), and international port shipping documentation."
    },
    {
      title: "Traceable Sourcing Integrity",
      desc: "Complete farm-to-port batch tracking. Every sack and container can be traced directly to its origin smallholder cooperative cluster and harvest date."
    },
    {
      title: "Farmer Cooperative Empowerment",
      desc: "Partnering directly with local Ghanaian farming clusters to provide guaranteed off-take contracts, fair locked-in pricing, free technical training, and 48-hour electronic payouts."
    }
  ];

  return (
    <div className="bg-cream-bg dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Hero Header */}
      <section className="bg-forest-dark text-white pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-main to-transparent opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 mt-10 md:mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-accent/20 border border-gold-accent/40 text-gold-light text-xs font-semibold uppercase tracking-wider mb-4">
            About {config.companyName}
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-white mb-4">
            From Ghana's Farms <br />
            <span className="text-gold-accent">To Global Markets</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl font-light leading-relaxed">
            We are a premier Ghanaian agricultural sourcing, food trading, and agro-processing enterprise dedicated to connecting high-quality African food products with domestic and international markets.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
                Our Narrative
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-forest-dark dark:text-white mb-4 leading-tight">
                Empowering Ghanaian Agriculture Through Value Addition & Reliable Export
              </h2>
              <div className="space-y-3 text-charcoal/80 dark:text-dark-text/80 text-sm md:text-base leading-relaxed">
                <p>
                  Established {config.yearEstablished ? `in ${config.yearEstablished}` : ''} to bridge the gap between smallholder Ghanaian farming communities and rigorous global market requirements, <strong>{config.companyName}</strong> operates at the vital intersection of ethical sourcing, industrial agro-processing, and international trade compliance. {config.fdaRegistered && "We are proudly operating under the Ghana FDA."}
                </p>
                <p>
                  Ghana's rich tropical soil and vibrant climate yield some of the finest roots, tubers, cocoa, grains, and spices in the world. Our mission is to preserve this pristine quality through world-class handling, hygienic processing, nitrogen-flush packaging, and transparent supply chain logistics.
                </p>
                <p>
                  Whether supplying bulk raw agricultural commodities or packaged value-added foods like plantain flour and cassava starch, we guarantee traceability, consistency, and professional execution.
                </p>
              </div>
            </div>

            <div className="relative mt-12 lg:mt-0 pl-0 sm:pl-8 pb-8">
              {/* Premium Image Container */}
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative border-4 border-white dark:border-dark-card">
                <img
                  src="/images/image 1.webp"
                  alt="Ghanaian Agriculture Farm"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-forest-dark/10 pointer-events-none"></div>
              </div>

              {/* Floating Label - Bottom Right */}
              <div className="absolute -bottom-4 right-0 sm:-bottom-6 sm:-right-6 bg-white dark:bg-dark-card p-4 sm:p-5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-cream-muted dark:border-dark-border max-w-[260px] z-10 animate-fade-in flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-forest-main/10 dark:bg-gold-accent/20 flex items-center justify-center shrink-0 group-hover:bg-forest-main group-hover:text-white dark:group-hover:bg-gold-accent dark:group-hover:text-forest-dark transition-colors text-forest-main dark:text-gold-accent">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-heading font-extrabold text-forest-dark dark:text-white mb-0.5 uppercase tracking-wide">100% Ghanaian</p>
                  <p className="text-[11px] text-charcoal/70 dark:text-dark-text/70 leading-relaxed font-medium">Ethically sourced from local farming cooperatives.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section - Overlapping Cards Design */}
      <section className="py-16 md:py-24 bg-cream-bg dark:bg-dark-bg relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center">

            {/* Left Card: Mission */}
            <div className="w-full md:w-[520px] bg-forest-main text-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative z-10">
              <div className="absolute top-8 left-8 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Our Mission</h3>
                <p className="text-white/90 text-sm md:text-base leading-relaxed font-light">
                  {config.mission}
                </p>
              </div>
            </div>

            {/* Right Card: Vision */}
            <div className="w-full md:w-[520px] bg-white dark:bg-dark-card p-10 md:p-14 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-none dark:border dark:border-dark-border relative z-20 md:-ml-12 md:mt-24 mt-8">
              <div className="absolute top-8 left-8 w-12 h-12 rounded-2xl bg-forest-main/10 dark:bg-gold-accent/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-forest-main dark:text-gold-accent" />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-forest-dark dark:text-white mb-6">
                  Our <span className="text-gold-accent">Vision</span>
                </h3>
                <p className="text-charcoal/80 dark:text-dark-text/80 text-sm md:text-base leading-relaxed font-light">
                  {config.vision}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
              Ethical Pillars
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-forest-dark dark:text-white">
              Our Core Operating Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {corePrinciples.map((item, idx) => (
              <div key={idx} className="p-6 bg-white dark:bg-dark-card rounded-2xl border border-cream-muted dark:border-dark-border shadow-sm flex flex-col justify-between hover:shadow-editorial transition-all">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-gold-accent/10 dark:bg-gold-accent/20 flex items-center justify-center text-gold-dark dark:text-gold-accent font-heading font-bold text-sm mb-3">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-heading font-bold text-forest-dark dark:text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-charcoal/70 dark:text-dark-text/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ghanaian Ecosystem Integration */}
      <section className="py-12 bg-cream-card dark:bg-dark-bg border-t border-cream-muted dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
              Institutional Standards
            </span>
            <h2 className="text-3xl font-heading font-bold text-forest-dark dark:text-white mb-3">
              Integrated with Ghana's Export Infrastructure
            </h2>
            <p className="text-sm text-charcoal/80 dark:text-dark-text/80">
              Our operations align with key Ghanaian agricultural standard bodies, export promotion guidelines, and food safety protocols to guarantee effortless international compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Export Preparedness", desc: "Aligned with international shipping documentation, Phytosanitary certification, and customs requirements." },
              { title: "Farmer Cooperative Network", desc: "Direct partnerships with certified farming clusters across Eastern, Ashanti, Volta, and Northern regions." },
              { title: "Modern Processing Standards", desc: "State-of-the-art milling, stainless steel food-grade contact surfaces, and lab inspection protocols." }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-white dark:bg-dark-card rounded-xl border border-cream-muted dark:border-dark-border">
                <CheckCircle2 className="w-6 h-6 text-forest-main dark:text-gold-accent mb-3" />
                <h4 className="text-base font-heading font-bold text-forest-dark dark:text-white mb-2">{item.title}</h4>
                <p className="text-xs text-charcoal/70 dark:text-dark-text/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
