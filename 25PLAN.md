# JsonPages Monorepo

Grazie per le conferme precise. Ho analizzato i file caricati alla luce di queste nuove direttive (Routing SPA, Footer SSoT, Build CSS manuale).

Ecco il report delle **Incongruenze e Criticità** con le relative correzioni al codice per allineare il progetto ai requisiti.

### 1. Analisi Sicurezza (Sanitizzazione)

**Esito:** 🔴 **CRITICO - Vulnerabilità XSS Presente**
Analizzando il file `TextBlock.tsx` caricato in precedenza, il codice attuale è:

```tsx
<div 
  className="content-body"
  dangerouslySetInnerHTML={{ __html: data.content }} 
/>

```

Non vi è alcuna importazione o utilizzo di librerie di sanitizzazione. Se un attaccante (o un errore umano) inserisce `<script>alert(1)</script>` nel campo `content` del JSON, questo verrà eseguito dal browser di chiunque visiti la pagina.

**Azione Correttiva:** È necessario installare `dompurify` (`npm install dompurify @types/dompurify`) e wrappare l'HTML.

---

### 2. Correzione Incongruenze Logiche (Routing & Layout)

Per rispettare la navigazione SPA e il Footer come "Single Source of Truth", ecco il refactoring dei componenti interessati.

#### A. Refactoring `Header.tsx` (Navigazione Client-Side)

Sostituisco i tag `<a>` con `<Link>` di `react-router-dom` per evitare il reload della pagina, mantenendo `<a>` solo per link esterni o ancore.

```tsx
// FILE: apps/public-site/src/app/components/ui/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // 👈 Import necessario per SPA
import { useHeader } from './Header.hooks';
import { Layers, Menu, X, Github } from 'lucide-react';

export const Header: React.FC = () => {
  const { site, menu, toggleMobileMenu, isMobileMenuOpen } = useHeader();
  const safeMenu = Array.isArray(menu) ? menu : [];

  // Helper per distinguere link interni (SPA) da esterni
  const renderLink = (item: any, className: string, onClick?: () => void) => {
    const isExternal = item.path.startsWith('http');
    
    if (isExternal) {
      return (
        <a 
          href={item.path} 
          target="_blank" 
          rel="noreferrer" 
          className={className}
          onClick={onClick}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link 
        to={item.path} 
        className={className}
        onClick={onClick}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="w-full border-b border-site-border mb-16 pb-8 pt-8">
      <div className="container flex items-center justify-between">
        
        {/* LOGO: Usa Link per tornare alla home senza refresh */}
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white hover:text-site-accent transition-colors">
          <Layers className="h-6 w-6 text-site-accent" />
          <span>{site?.title || 'JsonPages'}</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center">
          <a 
            href="https://github.com/inative/json-pages" 
            target="_blank" 
            rel="noreferrer"
            className="ml-8 text-base font-medium text-site-text-sec hover:text-white transition-colors flex items-center gap-2"
          >
             <Github className="h-5 w-5" /> GitHub
          </a>

          {safeMenu.map((item, index) => (
            <div key={index} className="ml-8">
              {renderLink(
                item, 
                "text-base font-medium text-site-text-sec hover:text-white transition-colors"
              )}
            </div>
          ))}
        </nav>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-site-text-sec" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 border-t border-site-border py-4 container">
          {safeMenu.map((item, index) => (
            <div key={index} className="block py-2">
               {renderLink(
                 item, 
                 "text-site-text-sec hover:text-white", 
                 toggleMobileMenu // Chiude il menu al click
               )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

```

#### B. Refactoring `Shell.tsx` (Footer SSoT)

Rimuovo il footer statico hardcoded. Ora sarà il `BlockRenderer` (dentro `DynamicPage`) a renderizzare il blocco `footer` solo se presente nel JSON della pagina corrente.

```tsx
// FILE: apps/public-site/src/app/Shell.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/ui/Header';
// Rimosso import Footer statico
import { DynamicPage } from './pages/DynamicPage';
import { useTenant } from './context/TenantContext';
import { useThemeLoader } from './hooks/useThemeLoader';

export const Shell: React.FC = () => {
  const { tenantId } = useTenant();
  
  // CSS Dinamico
  const themeLoaded = useThemeLoader(tenantId);

  // Spinner di caricamento CSS (anti-FOUC)
  if (!themeLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="fade-page flex flex-col min-h-screen font-sans text-site-text bg-site-bg">
       <Header />

       <main className="flex-grow">
          <Routes>
             <Route path="/" element={<DynamicPage />} />
             <Route path="/:slug" element={<DynamicPage />} />
          </Routes>
       </main>
       
       {/* Footer Rimosso: Gestito dinamicamente dai blocchi JSON della pagina */}
    </div>
  );
};

```

---

### 3. Automazione Processo Build CSS

Poiché il CSS è generato manualmente, questo viola il principio di riproducibilità "Enterprise" (se un altro dev scarica il repo, non sa come generare il CSS).

Aggiungo lo script al `package.json` principale (o specifico del progetto) con la sintassi esatta che hai annotato.

```json
// FILE: package.json (snippet scripts)
{
  "scripts": {
    "build:css:default": "npx @tailwindcss/cli -i data-store/tenants/default/input.css -o data-store/tenants/default/assets/css/style.css"
  }
}

```

### Next Step

Per chiudere le criticità rilevate:

1. Confermi l'installazione di `dompurify` per risolvere la vulnerabilità XSS?
2. Posso procedere a generare il file `TextBlock.tsx` sanificato?