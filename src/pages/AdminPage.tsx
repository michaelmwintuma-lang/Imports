import React, { useState } from 'react';
import SettingsEditor from '../components/admin/SettingsEditor';
import ProductManager from '../components/admin/ProductManager';
import { Settings, Users, Package, FileText, LogOut } from 'lucide-react';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  // Simple mock login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-heading font-extrabold text-forest-dark">
            Admin Portal
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-cream-muted">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1">
                  <input required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-forest-main focus:border-forest-main sm:text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1">
                  <input type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-forest-main focus:border-forest-main sm:text-sm" />
                </div>
              </div>

              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-forest-main hover:bg-forest-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-main transition-colors">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'products', label: 'Product & Sector Images', icon: <Package size={18} /> },
    { id: 'rfq', label: 'RFQ Pipeline', icon: <FileText size={18} /> },
    { id: 'suppliers', label: 'Suppliers', icon: <Users size={18} /> },
    { id: 'settings', label: 'Configuration', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-cream-bg flex">
      {/* Sidebar */}
      <div className="w-64 bg-forest-dark text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-heading font-bold text-gold-accent">Control Center</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                  ? 'bg-gold-accent/20 text-gold-light font-bold'
                  : 'text-cream-muted/70 hover:bg-white/5 hover:text-white'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-cream-muted/70 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'settings' && <SettingsEditor />}
        {activeTab === 'rfq' && (
          <div className="bg-white rounded-xl shadow-editorial p-8 text-center border border-cream-muted">
            <FileText size={48} className="mx-auto text-forest-main/30 mb-4" />
            <h3 className="text-xl font-heading font-bold text-charcoal">RFQ Pipeline Management</h3>
            <p className="text-charcoal/60 mt-2">View and manage B2B buyer quotes here.</p>
          </div>
        )}
        {activeTab === 'suppliers' && (
          <div className="bg-white rounded-xl shadow-editorial p-8 text-center border border-cream-muted">
            <Users size={48} className="mx-auto text-forest-main/30 mb-4" />
            <h3 className="text-xl font-heading font-bold text-charcoal">Supplier Applications</h3>
            <p className="text-charcoal/60 mt-2">Review and onboard Ghanaian farmers and aggregators.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
