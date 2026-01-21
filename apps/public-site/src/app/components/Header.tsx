import React from 'react';
import { useHeader } from './Header.hooks';
import { Layers, Menu, X, Github } from 'lucide-react';

export const Header: React.FC = () => {
  const { site, menu, toggleMobileMenu, isMobileMenuOpen } = useHeader();
  const safeMenu = Array.isArray(menu) ? menu : [];

  return (
    // header css: border-bottom: 1px solid var(--border); padding-bottom: 4rem; margin-bottom: 4rem;
    <header className="w-full border-b border-site-border mb-16 pb-8 pt-8">
      <div className="container flex items-center justify-between">
        
        {/* LOGO: font-weight 700, gap 12px */}
        <a href="/" className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white hover:text-site-accent transition-colors">
          <Layers className="h-6 w-6 text-site-accent" />
          <span>{site?.title || 'JsonPages'}</span>
        </a>

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
            <a 
              key={index} 
              href={item.path} 
              className="ml-8 text-base font-medium text-site-text-sec hover:text-white transition-colors"
            >
              {item.label}
            </a>
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
            <a 
              key={index} 
              href={item.path}
              className="block py-2 text-site-text-sec hover:text-white"
              onClick={toggleMobileMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};