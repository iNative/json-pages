import React from 'react';
import { GridBlockData, BlockSettings } from '@json-pages/shared-data';
import { useCollection } from '../hooks/useCollection'; // 👈 Hook creato nello step 5.1
import { useTenant } from '../context/TenantContext';

interface Props {
  data: GridBlockData;
  settings?: BlockSettings;
}

export const GridBlock: React.FC<Props> = ({ data, settings }) => {
  const { items, loading } = useCollection(data.sourceCollection);
  const { tenantId } = useTenant();

  const resolveImg = (url?: string) => {
    if (!url) return 'https://via.placeholder.com/400x250?text=No+Image';
    if (url.startsWith('http')) return url;
    return `/api/assets/${tenantId}/${url.replace(/^\/?assets\//, '')}`;
  };

  // Applichiamo il limite se definito nel JSON (es. "limit": 6)
  const displayItems = data.limit ? items.slice(0, data.limit) : items;

  return (
    <section 
      className={settings?.cssClass}
      style={{
        paddingTop: settings?.paddingTop || '4rem',
        paddingBottom: settings?.paddingBottom || '4rem',
        backgroundColor: settings?.backgroundColor
      }}
    >
      <div className={settings?.container === 'fluid' ? 'container-fluid' : 'container'}>
        
        {/* Titolo della Sezione (Opzionale, se gestito fuori dal blocco Grid nel JSON) */}
        {/* <h2 className="mb-5 text-center font-weight-bold">Ultimi Aggiornamenti</h2> */}
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Caricamento {data.sourceCollection}...</p>
          </div>
        ) : (
          <div className="row">
            {displayItems.map(item => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0 hover-lift transition">
                  {item.image && (
                    <div style={{ height: '220px', overflow: 'hidden' }}>
                        <img 
                          src={resolveImg(item.image)} 
                          className="card-img-top" 
                          alt={item.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                  )}
                  <div className="card-body d-flex flex-column">
                    {item.tags && item.tags.length > 0 && (
                        <div className="mb-2">
                            <span className="badge badge-light text-secondary border mr-1">
                                {item.tags[0]}
                            </span>
                        </div>
                    )}
                    <h5 className="card-title font-weight-bold mb-2">{item.title}</h5>
                    {item.subtitle && <h6 className="card-subtitle mb-3 text-muted small text-uppercase">{item.subtitle}</h6>}
                    <p className="card-text text-secondary mb-4 flex-grow-1">
                        {item.body ? item.body.substring(0, 120) + '...' : ''}
                    </p>
                    <a href="#" className="font-weight-bold text-primary text-decoration-none stretched-link">
                        Leggi tutto &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
            
            {!loading && displayItems.length === 0 && (
               <div className="col-12 text-center text-muted py-5 bg-light rounded">
                 Nessun contenuto trovato in "<strong>{data.sourceCollection}</strong>".
               </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};