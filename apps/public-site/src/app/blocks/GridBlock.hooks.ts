import { GridBlockData, BlockSettings } from '@json-pages/shared-data';
import { useCollection } from '../hooks/useCollection';

export const useGridBlock = (data: GridBlockData, settings?: BlockSettings) => {
  // ✅ 1. Usa l'hook reale per scaricare i dati dal file JSON specificato (es. 'features')
  const { items, loading } = useCollection(data.sourceCollection);

  // 2. Configurazione Layout CSS
  const gridCols = 'grid-cols-1 md:grid-cols-3';
  const gap = 'gap-6';

  // 3. Mappatura della modalità di visualizzazione (default: card)
  // Se in futuro aggiungi 'list' o 'carousel', gestiscilo qui.
  const mode = data.mode || 'card';

  return {
    items,      // I dati veri dal backend
    loading,    // Stato di caricamento
    mode,       
    containerClass: settings?.container === 'fluid' ? 'w-full' : 'container mx-auto px-4',
    gridClass: `grid ${gridCols} ${gap}`,
    style: {
      paddingTop: settings?.paddingTop || '4rem',
      paddingBottom: settings?.paddingBottom || '4rem',
      backgroundColor: settings?.backgroundColor
    }
  };
};