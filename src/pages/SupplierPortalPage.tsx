import React, { useState } from 'react';
import { useCompany } from '../context/CompanyContext';
import { useDatabase } from '../context/DatabaseContext';
import { CheckCircle2, Send, DollarSign, ShieldCheck, Globe2, Award, Building2, Users, ArrowRight } from 'lucide-react';

const SupplierPortalPage: React.FC = () => {
  const { config } = useCompany();
  const { addSupplierApplication } = useDatabase();

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    farmOrCompanyName: '',
    contactPerson: '',
    locationRegion: 'Eastern Region',
    locationDistrict: '',
    email: '',
    phone: '',
    productsSupplied: 'Cassava Roots',
    productionCapacityPerSeason: '',
    harvestSeasons: '',
    hasCertifications: false,
    certificationDetails: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.farmOrCompanyName || !formData.contactPerson || !formData.phone) return;

    setIsSubmitting(true);
    setError(false);

    try {
      // 1. Save to local state
      addSupplierApplication({
        farmOrCompanyName: formData.farmOrCompanyName,
        contactPerson: formData.contactPerson,
        locationRegion: formData.locationRegion,
        locationDistrict: formData.locationDistrict,
        email: formData.email,
        phone: formData.phone,
        productsSupplied: [formData.productsSupplied],
        productionCapacityPerSeason: formData.productionCapacityPerSeason || '50 Metric Tons',
        harvestSeasons: formData.harvestSeasons || 'Major Season (May - August)',
        hasCertifications: formData.hasCertifications,
        certificationDetails: formData.certificationDetails,
        notes: formData.notes
      });

      // 2. Send email via FormSubmit
      const response = await fetch("https://formsubmit.co/ajax/michaeldmwintuma@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Supplier Application: ${formData.farmOrCompanyName}`,
          _captcha: "false",
          _template: "table",
          _replyto: formData.email || undefined,
          _autoresponse: formData.email ? "Thank you for reaching out to us! We have successfully received your submission and our team is already reviewing your details. Rest assured, one of our specialists will get back to you shortly. We appreciate your interest and look forward to working with you!" : undefined,
          ...formData
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const memberBenefits = [
    {
      icon: Globe2,
      title: "Access to Market Information",
      highlight: "Market Intelligence",
      desc: "Gain real-time access to global export market prices, buyer demand forecasts, target market standards, trade tariffs, and strategic market intelligence."
    },
    {
      icon: Users,
      title: "Networking and Business Linkages",
      highlight: "Business Connections",
      desc: "Connect directly with verified international importers, institutional buyers, processing factories, logistics partners, and financial institutions across West Africa and overseas."
    },
    {
      icon: Award,
      title: "Specialized Training Programs",
      highlight: "Capacity Building",
      desc: "Participate in expert-led workshops covering export readiness, GlobalG.A.P. standards, FDA/HACCP food safety compliance, organic farming practices, and post-harvest loss prevention."
    },
    {
      icon: ShieldCheck,
      title: "Participation in International Trade Fairs & Export Promotion",
      highlight: "Global Trade Fairs",
      desc: "Access exclusive opportunities to showcase Ghanaian food products at major international trade exhibitions, food expos, and government-backed export promotion missions worldwide."
    },
    {
      icon: Building2,
      title: "Support in Presentation of Challenges to Government & Partners",
      highlight: "Policy & Advocacy",
      desc: "Receive strong institutional representation to present supply-chain bottlenecks, trade policy issues, and infrastructure challenges directly to government bodies and international development partners."
    },
    {
      icon: DollarSign,
      title: "Guaranteed Off-Take Contracts & 48-Hour Payouts",
      highlight: "Guaranteed Revenue",
      desc: "Secure long-term purchasing contracts with locked-in prices, direct farm-gate logistics pickups, and rapid 48-hour electronic payout directly to Mobile Money or bank accounts."
    }
  ];

  return (
    <div className="bg-cream-bg dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Hero Header */}
      <section className="bg-forest-dark text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-accent/20 border border-gold-accent/40 text-gold-light text-xs font-semibold uppercase tracking-wider mb-4">
            Supplier & Exporter Network Membership
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-4">
            Become A Member & <br />
            <span className="text-gold-accent">Unlock Key Commercial Privileges</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl font-light leading-relaxed mb-6">
            Join <strong>{config.companyName}</strong>'s supplier and exporter network. Enjoy market intelligence, international trade fair participation, guaranteed off-take contracts, and policy advocacy support.
          </p>

          <a
            href="#membership-form"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gold-accent text-forest-dark font-heading font-bold text-sm hover:bg-gold-light transition-all shadow-lg uppercase tracking-wider"
          >
            Apply For Membership Below <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* MEMBER BENEFITS SECTION */}
      <section className="py-12 md:py-16 border-b border-cream-muted dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-gold-dark dark:text-gold-accent uppercase mb-2 block">
              Exclusive Member Privileges
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-forest-dark dark:text-white">
              Key Benefits For Registered Members
            </h2>
            <p className="text-charcoal/70 dark:text-dark-text/70 mt-3 text-sm md:text-base">
              We empower Ghanaian farmers, aggregators, agro-processors, and exporters with institutional and commercial advantages designed for long-term growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-cream-muted dark:border-dark-border shadow-sm hover:shadow-editorial transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <div className="w-12 h-12 rounded-xl bg-forest-main text-white dark:bg-gold-accent dark:text-forest-dark flex items-center justify-center shadow-md">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-forest-main/10 dark:bg-gold-accent/20 text-forest-main dark:text-gold-accent text-[11px] font-bold uppercase tracking-wider">
                      {benefit.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-forest-dark dark:text-white mb-2 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 dark:text-dark-text/70 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="membership-form" className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-white dark:bg-dark-card rounded-3xl p-6 md:p-10 border border-cream-muted dark:border-dark-border shadow-editorial">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark mx-auto flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-forest-dark dark:text-white mb-3">
                  Membership Application Received!
                </h3>
                <p className="text-charcoal/80 dark:text-dark-text/80 max-w-md mx-auto mb-6 text-sm leading-relaxed">
                  Thank you for applying to join <strong>{config.companyName}</strong>'s Supplier & Exporter Network. Our membership committee will inspect your details and contact you via phone or WhatsApp within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 rounded-xl bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark font-heading font-semibold text-xs uppercase tracking-wider hover:bg-forest-dark transition-all"
                >
                  Submit Another Member Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-accent/10 dark:bg-gold-accent/20 text-gold-dark dark:text-gold-accent text-[11px] font-bold uppercase tracking-wider mb-2">
                    Member Registration
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-forest-dark dark:text-white mb-2">
                    Supplier & Exporter Membership Form
                  </h2>
                  <p className="text-xs text-charcoal/70 dark:text-dark-text/70 mb-4">
                    Fill in your farm or enterprise details below to unlock market information, trade fair access, training, and guaranteed off-take contracts.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1.5">
                      Farm or Enterprise Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suhum Organic Roots Co-op"
                      value={formData.farmOrCompanyName}
                      onChange={(e) => setFormData({ ...formData, farmOrCompanyName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1.5">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1.5">
                      Region in Ghana *
                    </label>
                    <select
                      value={formData.locationRegion}
                      onChange={(e) => setFormData({ ...formData, locationRegion: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                    >
                      <option>Ashanti Region</option>
                      <option>Bono / Bono East Region</option>
                      <option>Central Region</option>
                      <option>Eastern Region</option>
                      <option>Greater Accra Region</option>
                      <option>Northern / Savannah Region</option>
                      <option>Volta Region</option>
                      <option>Western / Western North Region</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1.5">
                      District / Community Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Suhum / Nsawam"
                      value={formData.locationDistrict}
                      onChange={(e) => setFormData({ ...formData, locationDistrict: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1.5">
                      Telephone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+233 24 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="farmer@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1.5">
                      Primary Crops / Commodities Supplied
                    </label>
                    <select
                      value={formData.productsSupplied}
                      onChange={(e) => setFormData({ ...formData, productsSupplied: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                    >
                      <option>Cassava Roots</option>
                      <option>Green Plantain</option>
                      <option>Yam (Pona / White Yam)</option>
                      <option>Dried Ginger / Fresh Ginger</option>
                      <option>Chili Pepper / Grains of Selim</option>
                      <option>Raw Cocoa Beans</option>
                      <option>Raw Cashew Nuts</option>
                      <option>White Maize / Corn</option>
                      <option>Shea Nuts / Shea Butter</option>
                      <option>Other Agricultural Commodity</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1.5">
                      Estimated Seasonal Tonnage (Tons)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 50 Tons per Harvest"
                      value={formData.productionCapacityPerSeason}
                      onChange={(e) => setFormData({ ...formData, productionCapacityPerSeason: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal dark:text-dark-text uppercase tracking-wider mb-1.5">
                    Additional Farm Details or Certifications
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your farming acreage, organic practices, harvest months, or cooperative members..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-muted dark:border-dark-border bg-cream-bg dark:bg-dark-muted text-charcoal dark:text-dark-text text-xs focus:outline-none focus:ring-2 focus:ring-forest-main dark:focus:ring-gold-accent"
                  ></textarea>
                </div>

                {error && (
                  <p className="text-red-500 text-xs text-center">There was an error sending your application. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark font-heading font-bold hover:bg-forest-dark transition-all flex items-center justify-center gap-2 shadow-lg text-xs uppercase tracking-wider disabled:opacity-70"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <><Send className="w-4 h-4 text-gold-accent dark:text-forest-dark" /> Register For Membership Now</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupplierPortalPage;
