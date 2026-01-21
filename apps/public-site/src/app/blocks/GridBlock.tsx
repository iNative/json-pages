import React from 'react';
import { GridBlockData, BlockSettings } from '@json-pages/shared-data';
import { useGridBlock } from './GridBlock.hooks';
import { Box, Server, Layers, Cpu, Palette, Zap, Terminal, Globe, Layout } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  'react': Box, 'nodejs': Server, 'angular': Layers, 'bolt': Zap,
  'palette': Palette, 'cpu': Cpu, 'terminal': Terminal, 'globe': Globe, 'layout': Layout
};

interface Props { data: GridBlockData; settings?: BlockSettings; }

export const GridBlock: React.FC<Props> = ({ data, settings }) => {
  const { items, loading } = useGridBlock(data, settings);
  if (loading) return null;

  return (
    <section className="container mb-24">
      {/* SECTION TITLE: size 1.5rem, margin-bottom 2rem */}
      {data.title && (
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
             {/* Icona decorativa opzionale se vuoi matchare 'Architecture Stack' con icona */}
             {data.title}
          </h2>
      )}

      {/* GRID: gap 1.5rem, minmax 300px */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const IconComponent = ICON_MAP[item.icon?.toLowerCase() || ''] || Box;

          return (
            <div 
              key={item.id} 
              className="
                group relative flex flex-col h-full
                bg-site-card border border-site-border rounded-xl p-8
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:border-site-accent hover:shadow-2xl
              "
            >
              {/* CARD ICON: accent color, accent-glow bg, 40x40px */}
              <div className="mb-5 w-10 h-10 flex items-center justify-center rounded-lg bg-[rgba(88,166,255,0.15)] text-site-accent text-xl">
                 <IconComponent size={20} />
              </div>

              {/* CARD TITLE: size 1.1rem, bold */}
              <h3 className="text-lg font-semibold mb-3 text-white">
                {item.title}
              </h3>

              {/* CARD BODY: size 0.95rem, color secondary */}
              <p className="text-[0.95rem] leading-relaxed text-site-text-sec flex-grow">
                {item.body}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};