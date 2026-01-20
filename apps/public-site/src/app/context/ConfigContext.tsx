import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTenant } from './TenantContext';
// Importiamo le interfacce dalla libreria condivisa
import { SiteConfig, MenuItem } from '@json-pages/shared-data';

interface ConfigState {
  site: SiteConfig | null;
  menu: MenuItem[];
  loading: boolean;
}

const ConfigContext = createContext<ConfigState | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { tenantId, isResolved } = useTenant();
  const [site, setSite] = useState<SiteConfig | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isResolved || !tenantId) return;

    const loadConfig = async () => {
      setLoading(true);
      try {
        // Headers fondamentali per il routing multi-tenant del Backend
        const headers = { 'X-Site-ID': tenantId };

        const [siteRes, menuRes] = await Promise.all([
          fetch('/api/config/site', { headers }),
          fetch('/api/config/menu', { headers })
        ]);

        if (siteRes.ok) setSite(await siteRes.json());
        if (menuRes.ok) setMenu(await menuRes.json());
        
      } catch (error) {
        console.error('❌ Errore caricamento config:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, [tenantId, isResolved]);

  return (
    <ConfigContext.Provider value={{ site, menu, loading }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig deve essere usato dentro ConfigProvider');
  return context;
};