import React from 'react';
import { Routes, Route } from 'react-router-dom'; // 👈 Import Routing
import { useTenant } from './context/TenantContext';
import { useThemeLoader } from './hooks/useThemeLoader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DynamicPage } from './pages/DynamicPage'; // 👈 Import Pagina

export const Shell: React.FC = () => {
  const { tenantId } = useTenant();
  const assetsLoaded = useThemeLoader(tenantId);

  // Loader iniziale (Anti-FOUC)
  if (!assetsLoaded) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Caricamento Tema...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-page d-flex flex-column min-vh-100">
       
       <Header />

       {/* Il Main ora contiene le Rotte Dinamiche */}
       <main className="flex-grow-1">
          <Routes>
             {/* 1. Rotta Home Page (path vuoto) */}
             <Route path="/" element={<DynamicPage />} />
             
             {/* 2. Rotta Generica (cattura qualsiasi slug come /chi-siamo, /atleti) */}
             <Route path="/:slug" element={<DynamicPage />} />
          </Routes>
       </main>
       
       <Footer />
       
    </div>
  );
};