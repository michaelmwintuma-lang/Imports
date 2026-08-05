import React, { useState } from 'react';
import { useCompany } from '../../context/CompanyContext';
import { CompanyConfig } from '../../types';
import { Save, AlertCircle } from 'lucide-react';

const SettingsEditor: React.FC = () => {
  const { config, updateConfig } = useCompany();
  const [formData, setFormData] = useState<CompanyConfig>(config);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CompanyConfig) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-editorial p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-heading font-bold text-forest-dark">Company Branding & Configuration</h2>
        <p className="text-charcoal/70 text-sm mt-1">Live updates across the entire platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1">Company Name</label>
            <input 
              type="text" 
              name="companyName" 
              value={formData.companyName} 
              onChange={handleChange}
              className="w-full border border-cream-muted rounded-md px-4 py-2 focus:outline-none focus:border-forest-main focus:ring-1 focus:ring-forest-main"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1">Tagline</label>
            <input 
              type="text" 
              name="tagline" 
              value={formData.tagline} 
              onChange={handleChange}
              className="w-full border border-cream-muted rounded-md px-4 py-2 focus:outline-none focus:border-forest-main focus:ring-1 focus:ring-forest-main"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1">Supporting Statement</label>
            <input 
              type="text" 
              name="supportingStatement" 
              value={formData.supportingStatement} 
              onChange={handleChange}
              className="w-full border border-cream-muted rounded-md px-4 py-2 focus:outline-none focus:border-forest-main focus:ring-1 focus:ring-forest-main"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/80 mb-1">Logo URL (Optional)</label>
            <input 
              type="text" 
              name="logoUrl" 
              value={formData.logoUrl || ''} 
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-cream-muted rounded-md px-4 py-2 focus:outline-none focus:border-forest-main focus:ring-1 focus:ring-forest-main"
            />
          </div>
        </div>

        <div className="border-t border-cream-muted/50 pt-6">
          <h3 className="text-lg font-heading font-semibold text-forest-dark mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className="w-full border border-cream-muted rounded-md px-4 py-2 focus:outline-none focus:border-forest-main focus:ring-1 focus:ring-forest-main"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1">Phone Number</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                className="w-full border border-cream-muted rounded-md px-4 py-2 focus:outline-none focus:border-forest-main focus:ring-1 focus:ring-forest-main"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1">WhatsApp Number</label>
              <input 
                type="text" 
                name="whatsApp" 
                value={formData.whatsApp} 
                onChange={handleChange}
                placeholder="+233551234567"
                className="w-full border border-cream-muted rounded-md px-4 py-2 focus:outline-none focus:border-forest-main focus:ring-1 focus:ring-forest-main"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1">Business Hours</label>
              <input 
                type="text" 
                name="businessHours" 
                value={formData.businessHours} 
                onChange={handleChange}
                className="w-full border border-cream-muted rounded-md px-4 py-2 focus:outline-none focus:border-forest-main focus:ring-1 focus:ring-forest-main"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-charcoal/80 mb-1">Physical Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                className="w-full border border-cream-muted rounded-md px-4 py-2 focus:outline-none focus:border-forest-main focus:ring-1 focus:ring-forest-main"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-charcoal/80 mb-1">WhatsApp Default Message</label>
              <textarea 
                name="whatsAppPreFilledMsg" 
                value={formData.whatsAppPreFilledMsg} 
                onChange={handleChange}
                rows={2}
                className="w-full border border-cream-muted rounded-md px-4 py-2 focus:outline-none focus:border-forest-main focus:ring-1 focus:ring-forest-main"
              />
              <p className="text-xs text-charcoal/50 mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> This is the pre-filled message when buyers click the WhatsApp widget.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="bg-forest-main text-white px-6 py-2.5 rounded-md font-medium hover:bg-forest-light transition-colors flex items-center gap-2"
          >
            <Save size={18} />
            {saved ? 'Saved Successfully!' : 'Save Configuration'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default SettingsEditor;
