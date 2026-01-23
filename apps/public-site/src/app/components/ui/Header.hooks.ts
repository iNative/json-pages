import { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useTenant } from '../context/TenantContext';

export const useHeader = () => {
  const { site, menu } = useConfig();
  const { tenantId } = useTenant();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  // Calcolo URL Logo: Normalizza i percorsi provenienti dal JSON
  const getLogoUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    
    // Rimuove 'assets/' iniziale se presente e prepende il percorso API
    const cleanPath = url.replace(/^\/?assets\//, '');
    return `/api/assets/${tenantId}/${cleanPath}`;
  };

  return {
    site,
    menu,
    isMobileMenuOpen,
    toggleMobileMenu,
    logoUrl: getLogoUrl(site?.logoUrl)
  };
};