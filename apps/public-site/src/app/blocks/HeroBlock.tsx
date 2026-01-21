import React from 'react';
import { HeroBlockData, BlockSettings } from '@json-pages/shared-data';
import { useHeroBlock } from './HeroBlock.hooks';

interface Props { data: HeroBlockData; settings?: BlockSettings; }

export const HeroBlock: React.FC<Props> = ({ data, settings }) => {
  const { title, subtitle, category } = useHeroBlock(data, settings);

  return (
    // .hero margin-bottom: 6rem
    <section className="container mb-24 animate-[fadeIn_0.8s_ease-out]">
      
      {/* BADGE: accent-glow background, border, radius 20px */}
      {category && (
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-[rgba(88,166,255,0.15)] text-site-accent border border-[rgba(88,166,255,0.3)] mb-6">
          {category}
        </span>
      )}

      {/* H1: size 3.5rem, line-height 1.1, Gradient Text */}
      <h1 className="text-4xl md:text-[3.5rem] font-bold leading-[1.1] mb-6 text-gradient-hero">
        {title}
      </h1>

      {/* P: size 1.25rem, color secondary, max-width 600px */}
      {subtitle && (
        <p className="text-xl text-site-text-sec max-w-[600px] mb-8">
          {subtitle}
        </p>
      )}
    </section>
  );
};