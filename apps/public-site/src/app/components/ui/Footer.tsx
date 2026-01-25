// FILE: apps/public-site/src/app/components/ui/Footer.tsx

import React from 'react';
import { useFooter } from './Footer.hooks';
// 👇 IMPORTIAMO I TIPI
import { FooterBlockData, BlockSettings } from '@json-pages/shared-data';

// 👇 DEFINIZIONE PROPS
interface FooterProps {
  data?: FooterBlockData;
  settings?: BlockSettings;
}

export const Footer: React.FC<FooterProps> = ({ data, settings }) => {
  // Manteniamo l'hook per i fallback globali (es. siteTitle se non c'è copyright text custom)
  const { currentYear, siteTitle } = useFooter();

  // Logica di presentazione:
  // Se il JSON ha un copyrightText, usiamo quello.
  // Altrimenti costruiamo una stringa standard con Anno e Titolo Sito.
  const displayContent = data?.copyrightText 
    ? data.copyrightText 
    : `© ${currentYear} ${siteTitle}. All rights reserved.`;

  return (
    <footer 
      className="border-t border-border bg-background py-8 mt-auto"
      // Supporto base per settings CSS opzionali (es. colore di sfondo override)
      style={{ 
         backgroundColor: settings?.backgroundColor 
      }}
    >
      <div className={settings?.container === 'fluid' ? 'w-full px-4' : 'container mx-auto px-4 text-center'}>
        <p className="text-sm text-muted-foreground">
          {displayContent}
        </p>
      </div>
    </footer>
  );
};