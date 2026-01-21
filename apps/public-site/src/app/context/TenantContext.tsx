import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. Definiamo la forma dello stato
interface TenantState {
  tenantId: string;
  isResolved: boolean;
}

// 2. Creiamo il contesto
const TenantContext = createContext<TenantState | undefined>(undefined);

// 3. Creiamo il Provider
export const TenantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tenantId, setTenantId] = useState<string>('default');
  const [isResolved, setIsResolved] = useState<boolean>(false);

  useEffect(() => {
    const resolveTenant = async () => {
      const hostname = window.location.hostname;
      let resolvedId = 'landing';

      // A. Dev Override (es. localhost:4200/?tenant=trinacria)
      if (hostname.includes('localhost')) {
        const params = new URLSearchParams(window.location.search);
        const override = params.get('tenant');
        if (override) {
          console.log(`🔧 [Dev] Tenant forced: ${override}`);
          setTenantId(override);
          setIsResolved(true);
          return;
        }
      }

      // B. Chiamata API al Backend (tramite Proxy)
      try {
        const response = await fetch(`/api/system/resolve?hostname=${hostname}`);
        if (response.ok) {
          const data = await response.json();
          resolvedId = data.tenantId;
        } else {
          console.warn('⚠️ API Resolve fallita, uso default landing');
        }
      } catch (error) {
        console.error('❌ Errore connessione backend:', error);
      }

      console.log(`🌍 Tenant Attivo: ${resolvedId}`);
      setTenantId(resolvedId);
      setIsResolved(true);
    };

    resolveTenant();
  }, []);

  // C. Blocchiamo il rendering finché non sappiamo "chi siamo"
  if (!isResolved) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <p>Caricamento Configurazione...</p>
      </div>
    );
  }

  return (
    <TenantContext.Provider value={{ tenantId, isResolved }}>
      {children}
    </TenantContext.Provider>
  );
};

// 4. Hook per usare il contesto
export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant deve essere usato dentro un TenantProvider');
  }
  return context;
};