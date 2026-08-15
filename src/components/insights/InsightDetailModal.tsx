import React from 'react';
import { ArticleItem } from '../../types';
import { X, Clock, Calendar, User, Tag, ArrowRight, Share2 } from 'lucide-react';

interface InsightDetailModalProps {
  article: ArticleItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const InsightDetailModal: React.FC<InsightDetailModalProps> = ({
  article,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="bg-white dark:bg-dark-card border border-cream-muted dark:border-dark-border w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-dark-muted/80 text-charcoal dark:text-dark-text hover:bg-brand-coral hover:text-white transition-all flex items-center justify-center shadow-md"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* Category & Article Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-dark-border">
            <span className="px-3 py-1 bg-brand-blue text-white text-xs font-bold rounded-lg shadow-xs">
              {article.category}
            </span>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 dark:text-dark-text/60">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-brand-coral" /> {article.publishedDate}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-blue" /> {article.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-forest-main" /> {article.author}</span>
            </div>
          </div>

          {/* Article Title & Lead Excerpt */}
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-forest-dark dark:text-white mb-4 leading-tight">
              {article.title}
            </h2>
            <p className="text-sm font-semibold text-slate-700 dark:text-dark-text/90 italic bg-slate-50 dark:bg-dark-muted p-4 rounded-r-xl border-l-2 border-slate-300 dark:border-slate-700 leading-relaxed">
              "{article.excerpt}"
            </p>
          </div>

          {/* Main Article Body Text */}
          <div className="space-y-4 text-sm md:text-base text-charcoal/80 dark:text-dark-text/80 leading-relaxed font-light">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Footer Navigation */}
          <div className="pt-6 border-t border-cream-muted dark:border-dark-border flex justify-between items-center">
            <span className="text-xs font-bold text-charcoal/60 dark:text-dark-text/60">
              Jal Expo Trade & Market Intelligence Hub
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-forest-hover text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              Done Reading
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InsightDetailModal;
