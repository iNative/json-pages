// FILE: apps/public-site/src/app/utils/security.ts
import DOMPurify from 'dompurify';

/**
 * Configurazione Enterprise per la sanitizzazione.
 * Permette tag di formattazione sicuri ma rimuove script, iframe e attributi pericolosi (on*).
 */
const SANITIZE_CONFIG = {
  USE_PROFILES: { html: true }, // Profilo standard HTML sicuro
  ADD_ATTR: ['target'], // Permette target="_blank" sui link
};

export const sanitizeHtml = (dirtyContent: string): string => {
  if (!dirtyContent) return '';
  return DOMPurify.sanitize(dirtyContent, SANITIZE_CONFIG);
};