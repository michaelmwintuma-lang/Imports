import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, PlaneTakeoff, ShieldCheck } from 'lucide-react';

const BusinessAreasCards: React.FC = () => {
  const areas = [
    {
      id: 'agro-processing',
      title: 'Industrial Agro-Processing',
      description: 'State-of-the-art milling converting fresh raw crops into high-value High Quality Cassava Flour (HQCF), starches, and processed spices.',
      image: '/images/agro-processing-factory.jpg',
      icon: <Factory size={24} className="text-gold-accent" />,
      link: '/agro-processing'
    },
    {
      id: 'export',
      title: 'Global Export & Distribution',
      description: 'Reliable bulk exportation of Ghanaian commodities including cocoa, cashews, dried ginger, plantain flour, and shea butter to international ports.',
      image: '/images/import-export-shipping.jpg',
      icon: <PlaneTakeoff size={24} className="text-gold-accent" />,
      link: '/trade'
    },
    {
      id: 'traceability',
      title: 'Quality & Phytosanitary Traceability',
      description: 'Complete farm-to-port batch tracking, moisture screening, aflatoxin testing, and FDA Ghana export compliance.',
      image: '/images/global-distribution-logistics.jpg',
      icon: <ShieldCheck size={24} className="text-gold-accent" />,
      link: '/quality'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-dark-card border-y border-cream-muted dark:border-dark-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
            Core Enterprise Operations
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-forest-dark dark:text-white mb-4">
            Our Key Commercial Pillars
          </h2>
          <p className="text-base text-charcoal/80 dark:text-dark-text/80">
            We operate across the entire agricultural value chain from farm-gate sourcing to international port delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((area) => (
            <div key={area.id} className="group card-editorial overflow-hidden flex flex-col h-full">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={area.image} 
                  alt={area.title} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-forest-dark/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/10">
                  {area.icon}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-heading font-bold text-forest-dark dark:text-white mb-3">{area.title}</h3>
                <p className="text-charcoal/70 dark:text-dark-text/70 text-xs leading-relaxed mb-6 flex-grow">
                  {area.description}
                </p>
                <Link 
                  to={area.link}
                  className="inline-flex items-center gap-2 text-forest-main dark:text-gold-accent font-semibold text-xs uppercase tracking-wider hover:text-gold-dark dark:hover:text-gold-light transition-colors mt-auto"
                >
                  Explore Pillar Capabilities
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessAreasCards;
