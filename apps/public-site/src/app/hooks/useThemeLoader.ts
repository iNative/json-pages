import { useEffect, useState } from 'react';

export const useThemeLoader = (tenantId: string) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!tenantId) return;

    // 👇 CORREZIONE: Aggiunto /api/ all'inizio del percorso
    // Il backend serve gli statici sotto il global prefix 'api'
    const baseUrl = `/api/assets/${tenantId}`; 
    console.log(`🎨 [ThemeLoader] Iniezione asset per: ${tenantId}`);

    const cssFiles = [
      `${baseUrl}/css/theme.css`,
      `${baseUrl}/css/user.css`
    ];

    const jsFiles = [
      `${baseUrl}/js/jquery.min.js`,
      `${baseUrl}/js/popper.min.js`,
      `${baseUrl}/js/bootstrap.js`,
      `${baseUrl}/js/aos.js`,
      `${baseUrl}/js/theme.js`
    ];

    // Helper per caricare CSS
    const loadCss = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.setAttribute('data-tenant-asset', 'true');
      document.head.appendChild(link);
    };

    // Helper per caricare JS (Promise-based)
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false; 
        script.setAttribute('data-tenant-asset', 'true');
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Errore caricamento ${src}`));
        document.body.appendChild(script);
      });
    };

    const loadAssets = async () => {
      try {
        cssFiles.forEach(loadCss);

        for (const src of jsFiles) {
          await loadScript(src);
        }

        console.log('✅ [ThemeLoader] Tutti gli asset caricati');
        setLoaded(true);
      } catch (error) {
        console.error('❌ [ThemeLoader] Errore critico:', error);
      }
    };

    loadAssets();

    return () => {
      document.querySelectorAll('[data-tenant-asset]').forEach(el => el.remove());
      setLoaded(false);
    };

  }, [tenantId]);

  return loaded;
};