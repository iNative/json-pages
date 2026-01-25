import React from 'react';
import { PageBlock } from '@json-pages/shared-data';

// Importiamo tutti i blocchi
import { Header } from './ui/Header'; // 👈 IMPORT HEADER
import { Footer } from './ui/Footer';
import { HeroBlock } from '../blocks/HeroBlock';
import { GridBlock } from '../blocks/GridBlock';
import { TextBlock } from '../blocks/TextBlock';
import { CodeBlock } from '../blocks/CodeBlock';

export const BlockRenderer: React.FC<{ block: PageBlock }> = ({ block }) => {
  if (block.settings?.hidden) return null;

  switch (block.type) {
    case 'header': // 👈 GESTIONE HEADER
       // TypeScript ora riconosce block.data come HeaderBlockData
       return <Header data={block.data} settings={block.settings} />;

    case 'footer':
      return <Footer data={block.data} settings={block.settings} />;

    case 'hero':
      return <HeroBlock data={block.data} settings={block.settings} />;
    
    case 'grid':
      return <GridBlock data={block.data} settings={block.settings} />;

    case 'code':
      return <CodeBlock data={block.data} settings={block.settings} />;
    
    case 'text':
    case 'html': 
      return <TextBlock data={block.data} settings={block.settings} />;

    default:
      console.warn(`⚠️ [BlockRenderer] Tipo blocco sconosciuto: ${block.type}`);
      return null;
  }
};