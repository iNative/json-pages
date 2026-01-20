import React from 'react';
import { useHeader } from './Header.hooks'; // 👈 Importiamo solo l'hook

export const Header: React.FC = () => {
  // Una sola riga per connettere la logica
  const { site, menu, isMobileMenuOpen, toggleMobileMenu, logoUrl } = useHeader();

  return (
    <header className="site-header py-3 shadow-sm bg-white sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light px-0">
          
          {/* LOGO */}
          <a className="navbar-brand fade-page" href="/">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={site?.title || 'Logo'} 
                height="50"
                className="d-inline-block align-top"
                style={{ maxHeight: '50px', width: 'auto' }}
              />
            ) : (
              <span className="h4 mb-0 font-weight-bold">{site?.title}</span>
            )}
          </a>

          {/* MOBILE TOGGLER */}
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENU ITEMS */}
          <div className={`collapse navbar-collapse justify-content-end ${isMobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav align-items-center">
              {menu.map((item, index) => (
                <li key={index} className="nav-item">
                  <a href={item.path} className="nav-link px-3 font-weight-bold text-uppercase text-dark">
                    {item.label}
                  </a>
                </li>
              ))}
              
              <li className="nav-item ml-lg-3 mt-3 mt-lg-0">
                <a href="/contatti" className="btn btn-primary rounded-pill px-4 text-white">
                  Contattaci
                </a>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    </header>
  );
};