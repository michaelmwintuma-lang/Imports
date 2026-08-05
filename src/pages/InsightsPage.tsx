import React, { useState } from 'react';
import { useCompany } from '../context/CompanyContext';
import { useDatabase } from '../context/DatabaseContext';
import { BookOpen, Search, ArrowRight, Tag, Clock } from 'lucide-react';

const InsightsPage: React.FC = () => {
  const { config } = useCompany();
  const { articles } = useDatabase();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Agriculture', 'Export & Trade', 'Agro-Processing', 'Market Insights'];

  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-cream-bg min-h-screen">
      {/* Hero */}
      <section className="bg-forest-dark text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-accent/20 border border-gold-accent/40 text-gold-light text-xs font-semibold uppercase tracking-wider mb-6">
            Knowledge Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6">
            Agriculture, Food & <br />
            <span className="text-gold-accent">Trade Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl font-light leading-relaxed">
            Market analysis, value-addition techniques, Ghanaian export regulations, and agricultural trade intelligence for commercial buyers and industry partners.
          </p>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-12 border-b border-cream-muted bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${selectedCategory === cat
                    ? 'bg-forest-main text-white'
                    : 'bg-cream-bg text-charcoal/70 hover:bg-cream-muted'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-cream-muted bg-cream-bg text-xs focus:outline-none focus:ring-2 focus:ring-forest-main"
            />
            <Search className="w-4 h-4 text-charcoal/40 absolute left-3 top-2.5" />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <article key={article.id} className="bg-white rounded-2xl border border-cream-muted overflow-hidden shadow-sm hover:shadow-editorial transition-all group flex flex-col justify-between">
                <div>
                  <div className="aspect-16/10 overflow-hidden relative">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-forest-main/90 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-full tracking-wider">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-charcoal/50 mb-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                      <span>•</span>
                      <span>{article.publishedDate}</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-forest-dark mb-3 group-hover:text-forest-light transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-charcoal/70 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-transparent">
                  <span className="text-xs font-heading font-bold text-forest-main inline-flex items-center gap-1 group-hover:text-gold-dark transition-colors">
                    Read Intelligence Report <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20 text-charcoal/60">
              No articles matching "{searchTerm}" in category {selectedCategory}.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
