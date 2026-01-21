import { HeroBlockData, BlockSettings } from '@json-pages/shared-data';

export const useHeroBlock = (data: HeroBlockData, settings?: BlockSettings) => {
  const containerClass = settings?.container === 'fluid' ? 'w-full' : 'container mx-auto px-4';
  
  return {
    title: data.title,
    subtitle: data.subtitle,
    category: data.category,
    align: data.align || 'center',
    containerClass,
    style: {
      paddingTop: settings?.paddingTop || '4rem',
      paddingBottom: settings?.paddingBottom || '4rem',
    }
  };
};