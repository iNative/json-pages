import React from 'react';
import { HeroBlockData, BlockSettings } from '@json-pages/shared-data';
import { useTenant } from '../context/TenantContext';

interface Props {
  data: HeroBlockData;
  settings?: BlockSettings;
}

export const HeroBlock: React.FC<Props> = ({ data, settings }) => {
  const { tenantId } = useTenant();

  // Helper per risolvere l'URL dell'immagine di background
  const resolveBg = (url?: string) => {
    if (!url) return undefined;
    if (url.startsWith('http')) return `url(${url})`;
    
    // Rimuove /assets/ iniziale se presente e costruisce il path API
    const clean = url.replace(/^\/?assets\//, '');
    return `url(/api/assets/${tenantId}/${clean})`;
  };

  const bgStyle = resolveBg(data.backgroundImage);

  return (
    <section 
      className={`hero-block position-relative ${settings?.cssClass || ''}`}
      style={{ 
        backgroundColor: settings?.backgroundColor || '#333',
        paddingTop: settings?.paddingTop || '5rem',
        paddingBottom: settings?.paddingBottom || '5rem',
        minHeight: '450px',
        display: 'flex',
        alignItems: 'center',
        // Overlay scuro per leggere meglio il testo
        backgroundImage: bgStyle ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), ${bgStyle}` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={settings?.container === 'fluid' ? 'container-fluid' : 'container'}>
        <div className={`text-${data.align || 'left'} text-white`}>
          
          {/* Badge Categoria/Data (opzionale) */}
          {(data.category || data.date) && (
            <div className="mb-3">
              <span className="badge badge-primary px-3 py-2">
                {data.category} {data.date && `| ${data.date}`}
              </span>
            </div>
          )}
          
          <h1 className="display-4 font-weight-bold mb-3">{data.title}</h1>
          
          {data.subtitle && (
            <p className="lead mb-4 opacity-90" style={{ maxWidth: '800px', margin: data.align === 'center' ? '0 auto' : undefined }}>
              {data.subtitle}
            </p>
          )}

          {data.ctaUrl && (
            <a href={data.ctaUrl} className="btn btn-primary btn-lg px-5 rounded-pill mt-3 shadow">
              {data.ctaLabel || 'Scopri di più'}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};