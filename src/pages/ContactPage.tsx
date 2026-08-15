import React, { useState } from 'react';
import { useCompany } from '../context/CompanyContext';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, User, Building2, Globe2, HelpCircle, AlignLeft } from 'lucide-react';

const ContactPage: React.FC = () => {
  const { config } = useCompany();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      const response = await fetch("https://formsubmit.co/ajax/michaeldmwintuma@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Website Enquiry: ${formData.subject}`,
          _captcha: "false",
          _template: "table",
          _replyto: formData.email,
          _autoresponse: "Thank you for reaching out to us! We have successfully received your submission and our team is already reviewing your details. Rest assured, one of our specialists will get back to you shortly. We appreciate your interest and look forward to working with you!",
          ...formData
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          company: '',
          country: '',
          email: '',
          phone: '',
          subject: 'General Enquiry',
          message: ''
        });
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsAppUrl = `https://wa.me/${config.whatsApp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(config.whatsAppPreFilledMsg)}`;

  return (
    <div className="bg-cream-bg dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Hero */}
      <section className="bg-forest-dark text-white pt-28 pb-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center max-w-4xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-accent/20 border border-gold-accent/40 text-gold-light text-xs font-semibold uppercase tracking-wider mb-5">
            Direct Communication
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-5 leading-tight tracking-tight">
            Connect With Our <br />
            <span className="text-gold-accent">Trade & Sales Team</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed max-w-3xl mx-auto">
            Whether you are an international buyer seeking quotation, a distributor, or an agricultural supplier in Ghana, we are ready to assist.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Contact Information Column */}
            <div className="space-y-6">
              <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-dark-card border border-cream-muted dark:border-dark-border shadow-editorial">
                <h3 className="text-2xl font-heading font-bold text-forest-dark dark:text-white mb-6">Head Office</h3>

                <div className="space-y-5 text-xs md:text-sm text-charcoal/80 dark:text-dark-text/80">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-forest-main/10 dark:bg-gold-accent/20 text-forest-main dark:text-gold-accent flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-charcoal/50 dark:text-dark-text/50 uppercase block mb-0.5">Physical Address & Landmark</span>
                      <span className="block font-medium">{config.address}</span>
                      {config.landmark && (
                        <span className="block text-xs font-semibold text-brand-blue dark:text-brand-coral mt-0.5">Landmark: {config.landmark}</span>
                      )}
                    </div>
                  </div>

                  {config.poBox && (
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-forest-main/10 dark:bg-gold-accent/20 text-forest-main dark:text-gold-accent flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-charcoal/50 dark:text-dark-text/50 uppercase block mb-0.5">Postal Box & Digital Address</span>
                        <span className="block font-medium">{config.poBox}</span>
                        {config.digitalAddress && (
                          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-dark-muted font-mono text-xs font-bold text-slate-800 dark:text-white border border-slate-200 dark:border-dark-border">
                            GPS: {config.digitalAddress}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-forest-main/10 dark:bg-gold-accent/20 text-forest-main dark:text-gold-accent flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-charcoal/50 dark:text-dark-text/50 uppercase block mb-0.5">Business Email</span>
                      <a href={`mailto:${config.email}`} className="font-semibold text-forest-main dark:text-gold-accent hover:underline">{config.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-forest-main/10 dark:bg-gold-accent/20 text-forest-main dark:text-gold-accent flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-charcoal/50 dark:text-dark-text/50 uppercase block mb-0.5">Telephone Lines</span>
                      <div className="flex flex-col gap-1">
                        <a href={`tel:${config.phone}`} className="font-semibold text-forest-main dark:text-gold-accent hover:underline">
                          {config.phone}
                        </a>
                        {config.additionalPhone && (
                          <a href={`tel:${config.additionalPhone}`} className="font-semibold text-slate-700 dark:text-dark-text hover:underline">
                            {config.additionalPhone}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-forest-main/10 dark:bg-gold-accent/20 text-forest-main dark:text-gold-accent flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-charcoal/50 dark:text-dark-text/50 uppercase block mb-0.5">Business Hours</span>
                      <span>{config.businessHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Box */}
              <div className="p-6 md:p-8 rounded-3xl bg-forest-main text-white shadow-lg border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-gold-accent text-forest-dark flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-heading font-bold mb-2">WhatsApp Instant Enquiry</h4>
                <p className="text-xs text-white/80 leading-relaxed mb-6">
                  Chat directly with our export sales team for instant product specifications and volume availability.
                </p>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-white text-forest-dark font-heading font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center justify-center gap-2"
                >
                  Message Us On WhatsApp
                </a>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-dark-card rounded-3xl p-6 md:p-10 border border-cream-muted dark:border-dark-border shadow-editorial">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 rounded-full bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark mx-auto flex items-center justify-center mb-5">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-forest-dark dark:text-white mb-3">
                      Enquiry Submitted!
                    </h3>
                    <p className="text-charcoal/80 dark:text-dark-text/80 max-w-md mx-auto mb-6 text-xs md:text-sm">
                      Thank you for contacting <strong>{config.companyName}</strong>. Our international sales desk will review your details and reply via email within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3 rounded-xl bg-forest-main dark:bg-gold-accent text-white dark:text-forest-dark font-heading font-bold text-xs uppercase tracking-wider hover:bg-forest-dark transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-forest-dark dark:text-white mb-2">
                        Send An Enquiry
                      </h2>
                      <p className="text-xs text-charcoal/70 dark:text-dark-text/70 mb-4">
                        Complete the form below to connect with our trade desk.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name Input */}
                      <div className="relative group">
                        <label className="block text-[11px] font-bold text-charcoal/70 dark:text-dark-text/70 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-forest-main dark:group-focus-within:text-gold-accent">
                          Your Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal/40 dark:text-dark-text/40 group-focus-within:text-forest-main dark:group-focus-within:text-gold-accent transition-colors">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="e.g. John Smith"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-cream-muted dark:border-dark-border bg-gray-50/50 dark:bg-dark-bg text-charcoal dark:text-dark-text text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-forest-main/10 dark:focus:ring-gold-accent/10 focus:border-forest-main dark:focus:border-gold-accent hover:border-forest-main/30 dark:hover:border-gold-accent/30"
                          />
                        </div>
                      </div>

                      {/* Company Input */}
                      <div className="relative group">
                        <label className="block text-[11px] font-bold text-charcoal/70 dark:text-dark-text/70 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-forest-main dark:group-focus-within:text-gold-accent">
                          Company Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal/40 dark:text-dark-text/40 group-focus-within:text-forest-main dark:group-focus-within:text-gold-accent transition-colors">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Global Trade Corp"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-cream-muted dark:border-dark-border bg-gray-50/50 dark:bg-dark-bg text-charcoal dark:text-dark-text text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-forest-main/10 dark:focus:ring-gold-accent/10 focus:border-forest-main dark:focus:border-gold-accent hover:border-forest-main/30 dark:hover:border-gold-accent/30"
                          />
                        </div>
                      </div>

                      {/* Country Input */}
                      <div className="relative group">
                        <label className="block text-[11px] font-bold text-charcoal/70 dark:text-dark-text/70 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-forest-main dark:group-focus-within:text-gold-accent">
                          Country *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal/40 dark:text-dark-text/40 group-focus-within:text-forest-main dark:group-focus-within:text-gold-accent transition-colors">
                            <Globe2 className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="e.g. United Kingdom"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-cream-muted dark:border-dark-border bg-gray-50/50 dark:bg-dark-bg text-charcoal dark:text-dark-text text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-forest-main/10 dark:focus:ring-gold-accent/10 focus:border-forest-main dark:focus:border-gold-accent hover:border-forest-main/30 dark:hover:border-gold-accent/30"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="relative group">
                        <label className="block text-[11px] font-bold text-charcoal/70 dark:text-dark-text/70 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-forest-main dark:group-focus-within:text-gold-accent">
                          Business Email *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal/40 dark:text-dark-text/40 group-focus-within:text-forest-main dark:group-focus-within:text-gold-accent transition-colors">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            required
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-cream-muted dark:border-dark-border bg-gray-50/50 dark:bg-dark-bg text-charcoal dark:text-dark-text text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-forest-main/10 dark:focus:ring-gold-accent/10 focus:border-forest-main dark:focus:border-gold-accent hover:border-forest-main/30 dark:hover:border-gold-accent/30"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Subject Select */}
                    <div className="relative group mt-5">
                      <label className="block text-[11px] font-bold text-charcoal/70 dark:text-dark-text/70 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-forest-main dark:group-focus-within:text-gold-accent">
                        Enquiry Subject
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal/40 dark:text-dark-text/40 group-focus-within:text-forest-main dark:group-focus-within:text-gold-accent transition-colors">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-cream-muted dark:border-dark-border bg-gray-50/50 dark:bg-dark-bg text-charcoal dark:text-dark-text text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-forest-main/10 dark:focus:ring-gold-accent/10 focus:border-forest-main dark:focus:border-gold-accent hover:border-forest-main/30 dark:hover:border-gold-accent/30 cursor-pointer appearance-none"
                        >
                          <option value="Product Quotation Request">Product Quotation Request</option>
                          <option value="Distributor & Partnership Enquiry">Distributor & Partnership Enquiry</option>
                          <option value="Supplier / Farmer Partnership">Supplier / Farmer Partnership</option>
                          <option value="General Business Enquiry">General Business Enquiry</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-charcoal/40 dark:text-dark-text/40">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="relative group mt-5">
                      <label className="block text-[11px] font-bold text-charcoal/70 dark:text-dark-text/70 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-forest-main dark:group-focus-within:text-gold-accent">
                        Message / Product Requirements *
                      </label>
                      <div className="relative">
                        <div className="absolute top-4 left-0 pl-4 flex pointer-events-none text-charcoal/40 dark:text-dark-text/40 group-focus-within:text-forest-main dark:group-focus-within:text-gold-accent transition-colors">
                          <AlignLeft className="w-4 h-4" />
                        </div>
                        <textarea
                          rows={5}
                          required
                          placeholder="Specify product, quantity, target shipping port, and timeline..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-cream-muted dark:border-dark-border bg-gray-50/50 dark:bg-dark-bg text-charcoal dark:text-dark-text text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-forest-main/10 dark:focus:ring-gold-accent/10 focus:border-forest-main dark:focus:border-gold-accent hover:border-forest-main/30 dark:hover:border-gold-accent/30 resize-y"
                        ></textarea>
                      </div>
                    </div>

                    {error && (
                      <div className="mt-5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-medium text-center flex items-center justify-center gap-2">
                        <HelpCircle className="w-5 h-5" /> Sorry, there was a problem sending your message. Please try again.
                      </div>
                    )}

                    <div className="mt-8">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-forest-main to-forest-dark dark:from-gold-accent dark:to-gold-light text-white dark:text-forest-dark font-heading font-bold hover:shadow-xl hover:shadow-forest-main/20 dark:hover:shadow-gold-accent/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed group"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 dark:border-forest-dark/30 border-t-white dark:border-t-forest-dark rounded-full animate-spin"></div>
                        ) : (
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        )}
                        {isSubmitting ? 'Transmitting Request...' : 'Send Official Enquiry'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
