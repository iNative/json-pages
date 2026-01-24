// FILE: apps/public-site/src/app/Shell.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { DynamicPage } from './pages/DynamicPage';
import { useTenant } from './context/TenantContext';
import { useThemeLoader } from './hooks/useThemeLoader';

export const Shell: React.FC = () => {
  const { tenantId } = useTenant();
  
  // 1. Iniezione CSS Dinamico (Bloccante per evitare FOUC)
  const themeLoaded = useThemeLoader(tenantId);

  // 2. Spinner di caricamento mentre il CSS viene scaricato
  if (!themeLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="fade-page flex flex-col min-h-screen font-sans text-site-text bg-site-bg">
       {/* Header Shadcn */}
       <Header />

       {/* Main Content Area */}
       <main className="flex-grow">
          <Routes>
             {/* Rotta Home Page */}
             <Route path="/" element={<DynamicPage />} />
             
             {/* Rotta Dinamica per slug */}
             <Route path="/:slug" element={<DynamicPage />} />
          </Routes>
       </main>
       
       {/* Footer Shadcn */}
       <Footer />
    </div>
  );
};