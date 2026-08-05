import React, { useState } from 'react';
import { useCompany } from '../../context/CompanyContext';
import { useDatabase } from '../../context/DatabaseContext';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface RFQWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

const RFQWizardModal: React.FC<RFQWizardModalProps> = ({ isOpen, onClose, initialProduct }) => {
  const { config } = useCompany();
  const { addRFQ, products } = useDatabase();

  const [submitted, setSubmitted] = useState(false);
  const [rfqNumber, setRfqNumber] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    country: '',
    email: '',
    phone: '',
    whatsApp: '',
    productName: initialProduct || (products[0]?.name || 'High Quality Cassava Flour (HQCF)'),
    quantity: '10',
    unit: 'Metric Tons',
    packagingPreference: '25kg Kraft Paper Bags',
    destinationPort: 'Rotterdam (CIF)',
    specificationsRequired: '',
    additionalNotes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    addRFQ({
      id: `rfq-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      rfqNumber: generatedRef,
      fullName: formData.fullName,
      companyName: formData.companyName,
      country: formData.country,
      email: formData.email,
      phone: formData.phone,
      whatsApp: formData.whatsApp,
      productName: formData.productName,
      quantity: formData.quantity,
      unit: formData.unit,
      packagingPreference: formData.packagingPreference,
      destinationPort: formData.destinationPort,
      specificationsRequired: formData.specificationsRequired,
      additionalNotes: formData.additionalNotes,
      status: 'NEW'
    });

    setRfqNumber(generatedRef);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-dark-card rounded-3xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl border border-cream-muted dark:border-dark-border max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-cream-bg dark:bg-dark-muted flex items-center justify-center text-charcoal/60 dark:text-dark-text/60 hover:text-charcoal dark:hover:text-dark-text transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark mx-auto flex items-center justify-center mb-5 shadow-lg">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono font-bold text-gold-dark dark:text-gold-accent uppercase tracking-widest block mb-2">
              Quotation Request Logged
            </span>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-forest-dark dark:text-white mb-2">
              {rfqNumber}
            </h3>
            <p className="text-charcoal/80 dark:text-dark-text/80 text-xs md:text-sm max-w-md mx-auto mb-6">
              Thank you, {formData.fullName}. Your quotation request for <strong>{formData.quantity} {formData.unit} of {formData.productName}</strong> has been assigned reference <strong>{rfqNumber}</strong>. Our trade desk will contact your email ({formData.email}) with formal pricing & Incoterm details.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark font-heading font-bold text-xs uppercase tracking-wider hover:bg-forest-dark transition-all"
            >
              Close Quotation Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-accent/10 dark:bg-gold-accent/20 text-gold-dark dark:text-gold-accent text-[11px] font-bold uppercase tracking-wider mb-2">
                Trade Desk
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-forest-dark dark:text-white">
                Request A Product Quotation
              </h2>
              <p className="text-xs text-charcoal/70 dark:text-dark-text/70 mt-1">
                Tell us your target product, quantity, packaging, and shipping destination port.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Miller"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1">
                  Company / Individual Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EuroFood Trading / John Doe"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Netherlands / United States"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="david@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1">
                  Telephone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+44 20 7946 0912"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1">
                  Product Required *
                </label>
                <select
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent cursor-pointer"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                  <option value="Custom Ghanaian Commodity">Other Custom Commodity</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1">
                  Quantity Required
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 20"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-2/3 px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                  />
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-1/3 px-2 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent cursor-pointer"
                  >
                    <option value="Metric Tons">Metric Tons</option>
                    <option value="20ft FCL Container">20ft FCL Container</option>
                    <option value="40ft FCL Container">40ft FCL Container</option>
                    <option value="Bags / Sacks">Bags / Sacks</option>
                    <option value="Kg">Kg</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1">
                  Destination Port / City & Incoterm
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hamburg (CIF) or Tema Port (FOB)"
                  value={formData.destinationPort}
                  onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1">
                Custom Specifications / Packaging Instructions
              </label>
              <textarea
                rows={3}
                placeholder="Specify moisture limits, mesh size, private label requirements, or delivery timeline..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark font-heading font-bold text-xs uppercase tracking-wider hover:bg-forest-dark transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" /> Submit Quote Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RFQWizardModal;
