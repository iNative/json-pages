import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DynamicPage } from './pages/DynamicPage';

export const Shell: React.FC = () => {
  // Rimosso useThemeLoader e il blocco condizionale (spinner)
  // Ora il rendering è immediato e gestito dai componenti React nativi

  return (
    <div className="fade-page flex flex-col min-h-screen">
       {/* Header Shadcn */}
     

       {/* Main Content Area */}
       <main className="flex-grow-1">
          <Routes>
             {/* Rotta Home Page */}
             <Route path="/" element={<DynamicPage />} />
             
             {/* Rotta Dinamica per slug (es. /architecture, /features) */}
             <Route path="/:slug" element={<DynamicPage />} />
          </Routes>
       </main>
       
       {/* Footer Shadcn */}
       
    </div>
  );
};