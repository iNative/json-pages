export function resolveTenantId(): string {
  const hostname = window.location.hostname;

  // 1. Sviluppo (localhost)
  if (hostname.includes('localhost')) {
    const urlParams = new URLSearchParams(window.location.search);
    // Permette di testare altri siti: localhost:4200/?tenant=demo
    return urlParams.get('tenant') || 'trinacria';
  }

  // 2. Produzione (Mappa Domini)
  const domainMap: Record<string, string> = {
    'stately-hamster.netlify.app': 'trinacria',
    'www.canottieritrinacria.it': 'trinacria',
    // 'www.studio-legale.it': 'studio'
  };

  return domainMap[hostname] || 'trinacria';
}