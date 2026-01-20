import { useConfig } from '../context/ConfigContext';

export const useFooter = () => {
  const { site, menu } = useConfig();
  const currentYear = new Date().getFullYear();

  return {
    siteTitle: site?.title || 'JsonPages',
    // Filtriamo eventuali voci di menu specifiche per il footer se necessario
    // Per ora usiamo lo stesso menu principale come "Link Utili"
    footerLinks: menu, 
    currentYear,
    socials: site?.socials
  };
};