import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CompanyConfig } from '../types';
import { defaultConfig } from '../config/companyConfig';

interface CompanyContextType {
  config: CompanyConfig;
  updateConfig: (newConfig: Partial<CompanyConfig>) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<CompanyConfig>(defaultConfig);

  const updateConfig = (newConfig: Partial<CompanyConfig>) => {
    setConfig((prev: CompanyConfig) => ({ ...prev, ...newConfig }));
  };

  return (
    <CompanyContext.Provider value={{ config, updateConfig }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};
