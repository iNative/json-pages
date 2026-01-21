import { BlockSettings } from '@json-pages/shared-data';

export interface CodeBlockData {
  lines: { type: 'comment' | 'command'; text: string }[];
}

export const useCodeBlock = (data: CodeBlockData, settings?: BlockSettings) => {
  return {
    lines: data.lines || [],
    containerClass: settings?.container === 'fluid' ? 'w-full' : 'container mx-auto px-4',
    style: {
      paddingTop: settings?.paddingTop || '4rem',
      paddingBottom: settings?.paddingBottom || '4rem',
    }
  };
};