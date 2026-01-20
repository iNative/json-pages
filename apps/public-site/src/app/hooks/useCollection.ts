import { useState, useEffect } from 'react';
import { useTenant } from '../context/TenantContext';
import { ContentItem } from '@json-pages/shared-data';

export const useCollection = (collectionName: string) => {
  const { tenantId } = useTenant();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenantId || !collectionName) return;

    const fetchCollection = async () => {
      setLoading(true);
      try {
        const headers = { 'X-Site-ID': tenantId };
        const res = await fetch(`/api/content/${collectionName}`, { headers });
        
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        } else {
          // Se la collezione non esiste (es. 404), ritorniamo array vuoto "gracefully"
          console.warn(`⚠️ Collezione '${collectionName}' non trovata o vuota.`);
          setItems([]);
        }
      } catch (err) {
        console.error(`❌ Errore fetch collezione [${collectionName}]:`, err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionName, tenantId]);

  return { items, loading };
};