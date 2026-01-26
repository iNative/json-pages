import React, { Suspense } from 'react';
import { PageBlock } from '@json-pages/shared-data';

// Componenti Statici (Core)
import { Header } from './ui/Header';
import { Footer } from './ui/Footer';
import { HeroBlock } from '../blocks/HeroBlock';
import { GridBlock } from '../blocks/GridBlock';
import { TextBlock } from '../blocks/TextBlock';
import { CodeBlock } from '../blocks/CodeBlock';

// 👇 DYNAMIC IMPORT (Silo)
// Usiamo l'alias @tenants definito in tsconfig e vite.config
// Nota: In un sistema reale, 'default' verrebbe sostituito dinamicamente dal tenantId
const TenantNxWelcome = React.lazy(() => import('@tenants/default/components/NxWelcome'));

export const BlockRenderer: React.FC<{ block: PageBlock }> = ({ block }) => {
  if (block.settings?.hidden) return null;

  switch (block.type) {
    case 'ui-test':
      return (
        <Suspense fallback={<div className="p-4 text-center">Caricamento componente tenant...</div>}>
          <TenantNxWelcome title={block.data?.title || 'Silo Verification'} />
        </Suspense>
      );

    case 'header': return <Header data={block.data} settings={block.settings} />;
    case 'footer': return <Footer data={block.data} settings={block.settings} />;
    case 'hero': return <HeroBlock data={block.data} settings={block.settings} />;
    case 'grid': return <GridBlock data={block.data} settings={block.settings} />;
    case 'code': return <CodeBlock data={block.data} settings={block.settings} />;
    case 'text':
    case 'html': return <TextBlock data={block.data} settings={block.settings} />;

    default:
      console.warn(`⚠️ [BlockRenderer] Tipo blocco sconosciuto: ${block.type}`);
      return null;
  }
};