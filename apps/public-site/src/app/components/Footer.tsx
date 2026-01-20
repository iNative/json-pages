import React from 'react';
import { useFooter } from './Footer.hooks';

export const Footer: React.FC = () => {
  const { siteTitle, currentYear, footerLinks } = useFooter();

  return (
    <footer className="bg-primary-3 text-white links-white pb-4 footer-1 py-5">
      <div className="container">
        <div className="row">
          
          {/* COLONNA 1: Contatti / Info */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="mb-3 font-weight-bold">Contatti</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="mailto:info@example.com" className="text-white-50">info@{siteTitle.toLowerCase().replace(/\s/g, '')}.it</a>
              </li>
              <li className="text-white-50">
                Via della Libertà, Palermo
              </li>
            </ul>
          </div>

          {/* COLONNA 2: Link Utili */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="mb-3 font-weight-bold">Link Utili</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {footerLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.path} className="text-white-50 hover-white transition">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNA 3: Copyright */}
          <div className="col-lg-4 text-lg-right mt-4 mt-lg-0">
            <div className="mb-2">
               <span className="h5 font-weight-bold">{siteTitle}</span>
            </div>
            <small className="text-white-50">
                &copy; {currentYear} Tutti i diritti riservati.
            </small>
            <div className="mt-2">
               <small className="text-muted">Powered by JsonPages React</small>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};