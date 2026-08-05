import React from 'react';

interface PillBadgeProps {
  label: string;
  type?: 'category' | 'status' | 'origin' | 'certification' | 'default';
}

const PillBadge: React.FC<PillBadgeProps> = ({ label, type = 'default' }) => {
  const getStyles = () => {
    switch (type) {
      case 'category':
        return 'bg-forest-main/10 text-forest-main border-forest-main/20';
      case 'origin':
        return 'bg-earth-sand text-earth-brown border-earth-brown/20';
      case 'status':
        return 'bg-gold-light text-gold-dark border-gold-accent/40';
      case 'certification':
        return 'bg-cream-muted text-charcoal/70 border-cream-muted/80';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles()}`}>
      {label}
    </span>
  );
};

export default PillBadge;
