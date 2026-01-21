import React from 'react';
import { PageBlock } from '@json-pages/shared-data';

// Importiamo tutti i blocchi disponibili
import { HeroBlock } from '../blocks/HeroBlock';
import { GridBlock } from '../blocks/GridBlock';
import { TextBlock } from '../blocks/TextBlock';
import { CodeBlock } from '../blocks/CodeBlock'; // 👈 Assicurati di aver creato questo file nello step precedente

export const BlockRenderer: React.FC<{ block: PageBlock }> = ({ block }) => {
  // Se il blocco è nascosto da CMS, non renderizziamo nulla
  if (block.settings?.hidden) return null;

  switch (block.type) {
    case 'hero':
      return <HeroBlock data={block.data} settings={block.settings} />;
    
    case 'grid':
      return <GridBlock data={block.data} settings={block.settings} />;

    case 'code':
      // 👇 Ora TypeScript riconosce questo tipo grazie all'aggiornamento di shared-data
      return <CodeBlock data={block.data} settings={block.settings} />;
    
    case 'text':
    case 'html': 
      return <TextBlock data={block.data} settings={block.settings} />;

    default:
      console.warn(`⚠️ [BlockRenderer] Tipo blocco sconosciuto: ${block.type}`);
      return (
        <div className="p-4 border border-dashed border-yellow-500/50 text-yellow-500 rounded bg-yellow-500/5 text-center">
          Blocco <strong>{block.type}</strong> non supportato o in fase di sviluppo.
        </div>
      );
  }
};