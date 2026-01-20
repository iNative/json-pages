import { useState, useEffect } from 'react';
import { useTenant } from '../context/TenantContext';
import { PageDefinition } from '@json-pages/shared-data';

export const usePage = (slug?: string) => {
  const { tenantId } = useTenant();
  const [page, setPage] = useState<PageDefinition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Se il tenant non è ancora risolto, aspettiamo
    if (!tenantId) return;

    const fetchPage = async () => {
      setLoading(true);
      setError(null);
      
      // Normalizzazione: se lo slug è undefined, null o "/", chiediamo 'home'
      const targetSlug = (!slug || slug === '/') ? 'home' : slug;

      console.log(`📄 [usePage] Fetching: ${targetSlug} per ${tenantId}`);

      try {
        const headers = { 'X-Site-ID': tenantId };
        // Chiamata all'API NestJS (proxata)
        const res = await fetch(`/api/pages/${targetSlug}`, { headers });
        
        if (!res.ok) {
           if (res.status === 404) {
             throw new Error('Pagina non trovata');
           }
           throw new Error(`Errore server: ${res.statusText}`);
        }

        const data = await res.json();
        setPage(data);
      } catch (err: any) {
        console.error(`❌ Errore caricamento pagina [${targetSlug}]:`, err);
        setError(err.message || 'Errore sconosciuto');
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug, tenantId]);

  return { page, loading, error };
};