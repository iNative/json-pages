import React from 'react';
import { PageBlock } from '@json-pages/shared-data';
import { HeroBlock } from '../blocks/HeroBlock';
import { TextBlock } from '../blocks/TextBlock';
import { GridBlock } from '../blocks/GridBlock';

export const BlockRenderer: React.FC<{ block: PageBlock }> = ({ block }) => {
  // Se il blocco è nascosto da CMS, non renderizziamo nulla
  if (block.settings?.hidden) return null;

  switch (block.type) {
    case 'hero':
      return <HeroBlock data={block.data} settings={block.settings} />;
    
    case 'text':
    case 'html': // Gestiamo entrambi con TextBlock
      return <TextBlock data={block.data} settings={block.settings} />;
      
    case 'grid':
      return <GridBlock data={block.data} settings={block.settings} />;

    // TODO: Aggiungere qui altri casi futuri (es. 'gallery', 'form')

    default:
      console.warn(`⚠️ Tipo blocco sconosciuto: ${block.type}`, block);
      return (
        <div className="alert alert-warning m-5 text-center">
          Blocco <strong>{block.type}</strong> non supportato.
        </div>
      );
  }
};