import React from 'react';
import { Link } from 'react-router-dom';
import { useCompany } from '../../context/CompanyContext';
import { MapPin, Phone, Mail, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const { config } = useCompany();

  return (
    <footer className="bg-forest-dark relative overflow-hidden text-cream-bg pt-16 pb-6 border-t-4 border-gold-accent">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-10">
          
          {/* Company Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-gold-light to-gold-dark text-forest-dark flex items-center justify-center rounded-xl font-heading font-bold text-xl shadow-lg shadow-gold-accent/20">
                {config.companyName.charAt(0)}
              </div>
              <span className="font-heading font-extrabold text-2xl lg:text-3xl text-white tracking-tight">
                {config.companyName}
              </span>
            </div>
            <p className="text-cream-muted/70 text-sm leading-relaxed max-w-sm">
              {config.tagline} Connecting Ghana's rich agricultural heritage with global markets through quality, traceability, and sustainable practices.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Instagram, label: 'Instagram' },
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-gold-accent hover:text-forest-dark hover:border-gold-accent transition-all duration-300 hover:-translate-y-1"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-lg text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent"></span> Quick Links
            </h4>
            <ul className="space-y-3.5 text-sm">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Product Catalogue', path: '/products' },
                { name: 'Quality & Certs', path: '/quality' },
                { name: 'Become a Member', path: '/suppliers' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-cream-muted/70 hover:text-gold-light transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-gold-accent" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Areas */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-lg text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent"></span> Business Areas
            </h4>
            <ul className="space-y-3.5 text-sm">
              {[
                { name: 'Agro-Processing', path: '/agro-processing' },
                { name: 'Export & Distribution', path: '/trade' },
                { name: 'Global Markets', path: '/markets' },
                { name: 'Insights & News', path: '/insights' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-cream-muted/70 hover:text-gold-light transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-gold-accent" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
            <h4 className="font-heading font-bold text-lg text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent"></span> Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-cream-muted/80">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-forest-main/40 flex items-center justify-center shrink-0 group-hover:bg-gold-accent transition-colors">
                  <MapPin size={16} className="text-gold-accent group-hover:text-forest-dark transition-colors" />
                </div>
                <span className="pt-1.5 leading-snug">{config.address}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-forest-main/40 flex items-center justify-center shrink-0 group-hover:bg-gold-accent transition-colors">
                  <Phone size={16} className="text-gold-accent group-hover:text-forest-dark transition-colors" />
                </div>
                <span>{config.phone}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-forest-main/40 flex items-center justify-center shrink-0 group-hover:bg-gold-accent transition-colors">
                  <Mail size={16} className="text-gold-accent group-hover:text-forest-dark transition-colors" />
                </div>
                <a href={`mailto:${config.email}`} className="hover:text-white transition-colors">{config.email}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream-muted/50 pb-4 md:pb-0 pr-0 md:pr-24">
          <p>&copy; {new Date().getFullYear()} {config.companyName}. All rights reserved.</p>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="w-1 h-1 rounded-full bg-white/20 hidden md:block"></span>
            <Link to="/admin" className="hover:text-gold-accent transition-colors font-medium">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
