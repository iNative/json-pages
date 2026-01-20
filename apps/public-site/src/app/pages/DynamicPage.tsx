import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePage } from '../hooks/usePage'; // Hook Step 5.1
import { BlockRenderer } from '../components/BlockRenderer';

export const DynamicPage: React.FC = () => {
  // react-router ci passa i parametri dell'URL
  const { slug } = useParams<{ slug: string }>();
  
  // Hook intelligente: se slug è undefined, scarica 'home'
  const { page, loading, error } = usePage(slug);

  // Aggiorna il titolo della tab del browser (SEO base)
  useEffect(() => {
    if (page?.meta?.title) {
      document.title = page.meta.title;
    }
  }, [page]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="sr-only">Caricamento pagina...</span>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="container py-5 text-center min-vh-100 d-flex flex-column justify-content-center">
        <h1 className="display-1 text-muted font-weight-bold">404</h1>
        <h2 className="h4 mb-4">Pagina non trovata</h2>
        <p className="text-muted mb-5">
           Sembra che la pagina <code>/{slug || 'home'}</code> non esista per questo sito.
        </p>
        <div>
            <a href="/" className="btn btn-primary rounded-pill px-4">Torna alla Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="dynamic-page fade-page">
      {/* Iteriamo sui blocchi definiti nel JSON (ordine garantito dall'array)
         e deleghiamo al BlockRenderer la visualizzazione
      */}
      {page.blocks.map(block => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
};