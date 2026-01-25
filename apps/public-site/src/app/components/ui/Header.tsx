import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useHeader } from './Header.hooks';
import { Layers, Menu, X, Github } from 'lucide-react';
// 👇 IMPORT TIPI
import { HeaderBlockData, BlockSettings } from '@json-pages/shared-data';

// 👇 INTERFACCIA PROPS
interface HeaderProps {
  data?: HeaderBlockData;
  settings?: BlockSettings;
}

export const Header: React.FC<HeaderProps> = ({ data, settings }) => {
  const { site, menu, toggleMobileMenu, isMobileMenuOpen } = useHeader();
  const safeMenu = Array.isArray(menu) ? menu : [];

  // ... (funzione getNavLinkClass invariata) ...
  const getNavLinkClass = (isActive: boolean, mobile = false) => {
      // (Mantieni il codice esistente per le classi)
      const base = mobile 
      ? "block py-2 transition-colors" 
      : "ml-8 text-base font-medium transition-colors";
    
      if (isActive) return `${base} text-white font-bold`; 
      return `${base} text-site-text-sec hover:text-white`; 
  };

  // ESEMPIO DI UTILIZZO DATA: Gestione Sticky (opzionale)
  const stickyClass = data?.sticky ? 'sticky top-0 z-50 bg-site-bg/95 backdrop-blur supports-[backdrop-filter]:bg-site-bg/60' : '';

  return (
    // Applichiamo classi dinamiche o settings
    <header className={`w-full border-b border-site-border mb-16 pb-8 pt-8 ${stickyClass} ${settings?.cssClass || ''}`}>
      <div className={settings?.container === 'fluid' ? 'w-full px-4 flex items-center justify-between' : 'container flex items-center justify-between'}>
        
        {/* ... (Resto del JSX invariato: Logo, Nav, Mobile Menu) ... */}
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
            <NavLink 
              key={index} 
              to={item.path} 
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              {item.label}
            </NavLink>
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
            <NavLink 
              key={index} 
              to={item.path}
              className={({ isActive }) => getNavLinkClass(isActive, true)}
              onClick={toggleMobileMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};