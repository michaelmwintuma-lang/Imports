import React from 'react';
import { Sprout, Tractor, ShieldCheck, Factory, Package, Plane } from 'lucide-react';

const ValueChainPipeline: React.FC = () => {
  const steps = [
    { title: 'Sourcing & Farm Gate', icon: <Sprout size={24} /> },
    { title: 'Co-op Aggregation', icon: <Tractor size={24} /> },
    { title: 'Laboratory Testing', icon: <ShieldCheck size={24} /> },
    { title: 'Agro-Processing & Milling', icon: <Factory size={24} /> },
    { title: 'Export Packaging', icon: <Package size={24} /> },
    { title: 'Global Port Logistics', icon: <Plane size={24} /> },
  ];

  return (
    <section className="py-12 md:py-16 bg-forest-main text-white overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gold-light text-xs font-semibold uppercase tracking-wider mb-3">
            End-to-End Traceability
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-3 text-cream-bg">Our Integrated Value Chain</h2>
          <p className="text-sm md:text-base text-cream-muted/90 max-w-xl mx-auto">
            A certified 6-stage operational pipeline ensuring strict quality control from local farms to international buyer ports.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-forest-light via-gold-accent to-forest-light transform -translate-y-1/2 hidden lg:block opacity-30"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-forest-dark border-2 border-gold-accent/30 rounded-2xl flex items-center justify-center mb-4 text-gold-accent group-hover:border-gold-accent group-hover:bg-gold-accent/20 group-hover:scale-105 transition-all duration-300 shadow-lg relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gold-accent text-forest-dark font-bold text-[11px] rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <h4 className="font-heading font-bold text-sm text-cream-bg leading-snug">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ValueChainPipeline;
