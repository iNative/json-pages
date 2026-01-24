// FILE: apps/public-site/src/app/hooks/useThemeLoader.ts
import { useEffect, useState } from 'react';

export const useThemeLoader = (tenantId: string) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!tenantId) return;

    // Percorso API gestito da AssetsController nel backend
    const baseUrl = `/api/assets/${tenantId}`; 
    console.log(`🎨 [ThemeLoader] Iniezione asset per: ${tenantId}`);

    const cssFiles = [
      `${baseUrl}/css/style.css` 
    ];

    const loadCss = (href: string) => {
      // Evitiamo duplicati
      if (document.querySelector(`link[href="${href}"]`)) return;

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.setAttribute('data-tenant-asset', 'true');
      document.head.appendChild(link);
    };

    const loadAssets = async () => {
      try {
        cssFiles.forEach(loadCss);
        // Simuliamo un piccolo delay se necessario, o assumiamo caricamento CSS immediato dal browser
        // In produzione reale, si potrebbe usare onload sul tag link, ma per ora basta questo.
        console.log('✅ [ThemeLoader] Richiesta asset inviata');
        setLoaded(true);
      } catch (error) {
        console.error('❌ [ThemeLoader] Errore critico:', error);
        // Anche in caso di errore, settiamo loaded true per non bloccare l'app per sempre
        setLoaded(true); 
      }
    };

    loadAssets();

    return () => {
      // Cleanup al cambio tenant (opzionale se l'app fa refresh completo)
      document.querySelectorAll('[data-tenant-asset]').forEach(el => el.remove());
      setLoaded(false);
    };

  }, [tenantId]);

  return loaded;
};