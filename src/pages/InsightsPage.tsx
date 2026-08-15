import React, { useState } from 'react';
import { useCompany } from '../context/CompanyContext';
import { useDatabase } from '../context/DatabaseContext';
import { ArticleItem } from '../types';
import InsightDetailModal from '../components/insights/InsightDetailModal';
import { Search, ArrowRight, Clock, Newspaper, ShieldCheck } from 'lucide-react';

const InsightsPage: React.FC = () => {
  const { config } = useCompany();
  const { articles } = useDatabase();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Article state for Modal
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const categories = ['All', 'Market Trends', 'Export Compliance', 'Agro-Processing'];

  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleArticleClick = (article: ArticleItem) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-cream-bg dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Hero */}
      <section className="bg-brand-navy text-white pt-28 pb-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center max-w-4xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-coral/20 border border-brand-coral/40 text-brand-coral text-xs font-bold uppercase tracking-wider mb-5">
            <Newspaper className="w-4 h-4" /> Market Intelligence & News Hub
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-5 leading-tight tracking-tight">
            Agriculture, Export & <br />
            <span className="text-brand-coral">Agro-Processing Insights</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed max-w-3xl mx-auto">
            Real-time market analysis, FDA export regulations, value-addition breakthroughs, and international food trade intelligence from {config.companyName}.
          </p>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-8 border-b border-cream-muted dark:border-dark-border bg-white dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedCategory === cat
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-cream-bg dark:bg-dark-muted text-charcoal/70 dark:text-dark-text/70 hover:bg-brand-sky'
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
              placeholder="Search news and insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-bg text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <Search className="w-4 h-4 text-charcoal/40 dark:text-dark-text/40 absolute left-3 top-3" />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <article
                key={article.id}
                onClick={() => handleArticleClick(article)}
                className="bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-dark-border overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 ease-out group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="aspect-16/10 overflow-hidden relative bg-cream-bg dark:bg-dark-bg">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/fresh yam.jpeg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-brand-blue/90 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-full tracking-wider">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-charcoal/50 dark:text-dark-text/50 mb-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-coral" /> {article.readTime}</span>
                      <span>•</span>
                      <span>{article.publishedDate}</span>
                    </div>
                    <h3 className="text-lg font-heading font-extrabold text-forest-dark dark:text-white mb-3 group-hover:text-brand-blue dark:group-hover:text-brand-coral transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-charcoal/70 dark:text-dark-text/70 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-transparent">
                  <span className="text-xs font-heading font-bold text-brand-blue dark:text-brand-coral inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Full News Insight <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20 text-charcoal/60 dark:text-dark-text/60">
              No articles found matching "{searchTerm}" in category {selectedCategory}.
            </div>
          )}
        </div>
      </section>

      {/* Insight Detail Reader Modal */}
      <InsightDetailModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default InsightsPage;
