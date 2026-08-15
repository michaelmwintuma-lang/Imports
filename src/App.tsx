import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppWidget from './components/layout/WhatsAppWidget';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import AgroProcessingPage from './pages/AgroProcessingPage';
import ImportExportPage from './pages/ImportExportPage';
import QualityTraceabilityPage from './pages/QualityTraceabilityPage';
import GlobalMarketsPage from './pages/GlobalMarketsPage';
import SupplierPortalPage from './pages/SupplierPortalPage';
import InsightsPage from './pages/InsightsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Admin Route - Dedicated Control Center */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Public Routes with Layout */}
          <Route path="*" element={
            <>
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/agro-processing" element={<AgroProcessingPage />} />
                  <Route path="/trade" element={<ImportExportPage />} />
                  <Route path="/export-distribution" element={<ImportExportPage />} />
                  <Route path="/quality" element={<QualityTraceabilityPage />} />
                  <Route path="/markets" element={<GlobalMarketsPage />} />
                  <Route path="/global-markets" element={<GlobalMarketsPage />} />
                  <Route path="/suppliers" element={<SupplierPortalPage />} />
                  <Route path="/insights" element={<InsightsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppWidget />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
